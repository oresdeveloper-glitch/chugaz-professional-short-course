import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { hashPassword, checkRateLimit, validateBodySize } from "@/lib/auth-server"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`reset:${ip}`, 5, 60000)) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  
  if (!validateBodySize(body)) {
    return NextResponse.json({ message: "Request body too large" }, { status: 413 })
  }

  const { email, code, password } = body

  if (!email || !code || !password) {
    return NextResponse.json({ message: "Email, code, and new password are required" }, { status: 422 })
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 422 })
  }

  const data = await readData()
  data.resetCodes = data.resetCodes || []

  // Hash the incoming code to compare against stored hashed code
  const hashedCode = await hashData(code)
  const idx = data.resetCodes.findIndex((r: any) => r.email === email.toLowerCase().trim() && r.code === hashedCode)
  if (idx === -1) {
    return NextResponse.json({ message: "Invalid or expired code" }, { status: 400 })
  }

  const record = data.resetCodes[idx]
  if (Date.now() > record.expiresAt) {
    data.resetCodes.splice(idx, 1)
    await writeData(data)
    return NextResponse.json({ message: "Code has expired. Request a new one." }, { status: 400 })
  }

  const normalized = email.toLowerCase().trim()
  const hashed = hashPassword(password)

  const student = data.students.find((s: any) => s.email === normalized)
  if (student) {
    student.password = hashed
  } else {
    const admin = data.admins.find((a: any) => a.email === normalized)
    if (admin) admin.password = hashed
  }

  data.resetCodes.splice(idx, 1)
  await writeData(data)

  return NextResponse.json({ message: "Password has been reset successfully. You can now login." })
}

async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder()
  const buf = await crypto.subtle.digest("SHA-256", encoder.encode(data))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}
