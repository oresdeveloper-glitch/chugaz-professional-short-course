import crypto from "crypto"
import { readData, writeData } from "./server-store"
import fs from "fs"
import path from "path"
import os from "os"

const ITERATIONS = 100000
const KEY_LENGTH = 64
const DIGEST = "sha512"
const TOKEN_EXPIRY_HOURS = 24
const MAX_BODY_SIZE = 100 * 1024 // 100KB max request body
const MAX_STRING_LENGTH = 500 // Max length for any string field

const TX_ID_RE = /^[A-Za-z0-9]{6,30}$/

// Use file-based rate limiting for persistence across serverless invocations
function getRateLimitDir(): string {
  const dir = process.env.CHUGAZ_DATA_DIR || path.join(os.tmpdir(), "chugaz_ratelimit")
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  return dir
}

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 60000): boolean {
  // Try in-memory first (fast path)
  const now = Date.now()
  
  // File-based fallback for persistence
  const dir = getRateLimitDir()
  const filePath = path.join(dir, `${key.replace(/[^a-zA-Z0-9]/g, "_")}.json`)
  
  try {
    let data: { count: number; resetAt: number } = { count: 0, resetAt: now + windowMs }
    if (fs.existsSync(filePath)) {
      try {
        data = JSON.parse(fs.readFileSync(filePath, "utf-8"))
      } catch {}
    }
    
    if (now > data.resetAt) {
      data = { count: 1, resetAt: now + windowMs }
      fs.writeFileSync(filePath, JSON.stringify(data))
      return true
    }
    
    if (data.count >= maxAttempts) return false
    data.count++
    fs.writeFileSync(filePath, JSON.stringify(data))
    return true
  } catch {
    // Fallback: allow if file system fails
    return true
  }
}

export function validateBodySize(body: any): boolean {
  try {
    const str = JSON.stringify(body)
    return str.length <= MAX_BODY_SIZE
  } catch {
    return false
  }
}

export function sanitizeInput(value: string): string {
  if (!value) return value
  // Strip HTML tags
  let sanitized = value.replace(/<[^>]*>/g, "")
  // Strip script tags and event handlers
  sanitized = sanitized.replace(/[<>]/g, "")
  // Limit length
  sanitized = sanitized.slice(0, MAX_STRING_LENGTH)
  return sanitized
}

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      // Preserve photo data URLs in full; strip HTML chars but do not truncate
      result[key] = key === "photo" ? value.replace(/[<>]/g, "") : sanitizeInput(value)
    } else if (value === null || value === undefined) {
      result[key] = value
    } else {
      result[key] = value
    }
  }
  return result
}

export function generatePaymentRef(regNum: string): string {
  const raw = crypto.randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()
  return `CHUGAZ-${raw}-${regNum.slice(-4)}`
}

export function validateTransactionId(txId: string): boolean {
  return TX_ID_RE.test(txId)
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  const verify = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")
  return hash === verify
}

export async function generateToken(type: "student" | "admin", userId: number): Promise<string> {
  const raw = crypto.randomUUID()
  const expiresAt = Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  const token = `${type}_${raw}_${userId}`

  const data = await readData()
  data.tokens = data.tokens || []
  data.tokens.push({
    token,
    type,
    userId,
    expiresAt,
    createdAt: Date.now(),
    lastActivity: Date.now(),
  })
  await writeData(data)

  return token
}

export async function verifyToken(token: string): Promise<{ type: string; userId: number } | null> {
  const data = await readData()
  data.tokens = data.tokens || []
  const entry = data.tokens.find((t: any) => t.token === token)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    data.tokens = data.tokens.filter((t: any) => t.token !== token)
    await writeData(data)
    return null
  }
  // Update last activity
  entry.lastActivity = Date.now()
  void writeData(data)
  return { type: entry.type, userId: entry.userId }
}

export async function requireAdmin(authHeader: string | null): Promise<boolean> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false
  const token = authHeader.slice(7)
  const result = await verifyToken(token)
  return result !== null && result.type === "admin"
}

export async function cleanExpiredTokens(): Promise<void> {
  const data = await readData()
  data.tokens = data.tokens || []
  const before = data.tokens.length
  data.tokens = data.tokens.filter((t: any) => Date.now() <= t.expiresAt)
  if (data.tokens.length !== before) await writeData(data)
}

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function validateCSRFToken(token: string, stored: string): boolean {
  if (!token || !stored) return false
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(stored))
}
