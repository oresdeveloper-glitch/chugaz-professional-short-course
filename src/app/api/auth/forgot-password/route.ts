import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { checkRateLimit } from "@/lib/auth-server"
import { sendResetCodeEmail, isConfigured } from "@/lib/email"
import crypto from "crypto"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  const { email } = body
  if (!checkRateLimit(`forgot:${ip}`, 3, 60000)) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 })
  }

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 422 })
  }

  const data = readData()
  const normalized = email.toLowerCase().trim()
  const exists = data.students.some((s: any) => s.email === normalized)
    || data.admins.some((a: any) => a.email === normalized)

  if (!exists) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 })
  }

  const code = crypto.randomInt(100000, 999999).toString()
  const expiresAt = Date.now() + 15 * 60 * 1000

  data.resetCodes = data.resetCodes || []
  data.resetCodes.push({ email: normalized, code, expiresAt })
  writeData(data)

  const result = await sendResetCodeEmail(normalized, code)

  const alwaysShow = true
  const devCode = code

  if (!isConfigured || !result.ok || alwaysShow) {
    const msg = !isConfigured
      ? `Your reset code: ${code}`
      : !result.ok
        ? `Email unavailable (${result.error}). Your reset code: ${code}`
        : `A 6-digit code has been sent to your email. Dev code: ${code}`
    return NextResponse.json({ message: msg, devCode })
  }

  return NextResponse.json({ message: "A 6-digit code has been sent to your email" })
}
