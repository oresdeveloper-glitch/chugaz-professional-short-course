import crypto from "crypto"
import { readData, writeData } from "./server-store"

const ITERATIONS = 100000
const KEY_LENGTH = 64
const DIGEST = "sha512"
const TOKEN_EXPIRY_HOURS = 24

const TX_ID_RE = /^[A-Za-z0-9]{6,30}$/

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

export function generateToken(type: "student" | "admin", userId: number): string {
  const raw = crypto.randomUUID()
  const expiresAt = Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  const token = `${type}_${raw}_${userId}`

  const data = readData()
  data.tokens = data.tokens || []
  data.tokens.push({
    token,
    type,
    userId,
    expiresAt,
    createdAt: Date.now(),
  })
  writeData(data)

  return token
}

export function verifyToken(token: string): { type: string; userId: number } | null {
  const data = readData()
  data.tokens = data.tokens || []
  const entry = data.tokens.find((t: any) => t.token === token)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    data.tokens = data.tokens.filter((t: any) => t.token !== token)
    writeData(data)
    return null
  }
  return { type: entry.type, userId: entry.userId }
}

export function requireAdmin(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false
  const token = authHeader.slice(7)
  const result = verifyToken(token)
  return result !== null && result.type === "admin"
}

export function cleanExpiredTokens(): void {
  const data = readData()
  data.tokens = data.tokens || []
  const before = data.tokens.length
  data.tokens = data.tokens.filter((t: any) => Date.now() <= t.expiresAt)
  if (data.tokens.length !== before) writeData(data)
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= maxAttempts) return false
  entry.count++
  return true
}
