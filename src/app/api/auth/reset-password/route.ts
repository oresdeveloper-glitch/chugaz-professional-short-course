import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { hashPassword, checkRateLimit } from "@/lib/auth-server"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  const { email, code, password } = body
  if (!checkRateLimit(`reset:${ip}`, 5, 60000)) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 })
  }

  if (!email || !code || !password) {
    return NextResponse.json({ message: "Email, code, and new password are required" }, { status: 422 })
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 422 })
  }

  const data = readData()
  data.resetCodes = data.resetCodes || []

  const idx = data.resetCodes.findIndex((r: any) => r.email === email.toLowerCase().trim() && r.code === code)
  if (idx === -1) {
    return NextResponse.json({ message: "Invalid or expired code" }, { status: 400 })
  }

  const record = data.resetCodes[idx]
  if (Date.now() > record.expiresAt) {
    data.resetCodes.splice(idx, 1)
    writeData(data)
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
  writeData(data)

  return NextResponse.json({ message: "Password has been reset successfully. You can now login." })
}
