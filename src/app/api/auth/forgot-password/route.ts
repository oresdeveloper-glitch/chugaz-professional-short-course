import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"
import { checkRateLimit } from "@/lib/auth-server"

export async function POST(req: Request) {
  const { email } = await req.json()

  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`forgot:${ip}`, 3, 60000)) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 })
  }

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 422 })
  }

  const data = readData()
  const exists = data.students.some((s: any) => s.email === email.toLowerCase())
    || data.admins.some((a: any) => a.email === email.toLowerCase())

  if (!exists) {
    return NextResponse.json({ message: "Email not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Password reset link sent to your email" })
}
