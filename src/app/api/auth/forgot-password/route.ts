import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { checkRateLimit, validateBodySize } from "@/lib/auth-server"
import { sendResetCodeEmail, isConfigured } from "@/lib/email"
import crypto from "crypto"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`forgot:${ip}`, 3, 60000)) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  
  if (!validateBodySize(body)) {
    return NextResponse.json({ message: "Request body too large" }, { status: 413 })
  }

  const { email } = body

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 422 })
  }

  const data = readData()
  const normalized = email.toLowerCase().trim()
  const exists = data.students.some((s: any) => s.email === normalized)
    || data.admins.some((a: any) => a.email === normalized)

  // Always return the same message to prevent email enumeration
  if (!exists) {
    return NextResponse.json({ message: "If the email exists, a reset code has been sent" })
  }

  const code = crypto.randomInt(100000, 999999).toString()
  const expiresAt = Date.now() + 15 * 60 * 1000

  data.resetCodes = data.resetCodes || []
  data.resetCodes.push({ email: normalized, code: await hashData(code), expiresAt })
  writeData(data)

  // Send the actual plain code via email (not stored plain)
  const result = await sendResetCodeEmail(normalized, code)

  if (!isConfigured || !result.ok) {
    // In development, return the code
    return NextResponse.json({ message: `Reset code sent. Dev code: ${code}`, devCode: code })
  }

  return NextResponse.json({ message: "If the email exists, a reset code has been sent" })
}

async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(data))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}
