import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { verifyPassword, generateToken, hashPassword, checkRateLimit } from "@/lib/auth-server"

export async function POST(req: Request) {
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password required" }, { status: 422 })
  }

  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`login:${ip}`, 10, 60000)) {
    return NextResponse.json({ message: "Too many attempts. Try again later." }, { status: 429 })
  }

  const data = readData()

  function migratePassword(record: any): boolean {
    if (!record.password || !record.password.includes(":")) {
      record.password = hashPassword(record.password)
      return true
    }
    return false
  }

  const admin = data.admins.find((a: any) => a.email === email.toLowerCase())
  if (admin) {
    if (migratePassword(admin)) writeData(data)
    if (verifyPassword(password, admin.password)) {
      const token = generateToken("admin", admin.id)
      return NextResponse.json({
        message: "Login successful",
        data: {
          type: "admin",
          admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, phone: admin.phone },
          token,
        },
      })
    }
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  const student = data.students.find((s: any) => s.email === email.toLowerCase())
  if (student) {
    if (student.status === "rejected") {
      return NextResponse.json({ message: "Your account has been rejected. Contact support for more information." }, { status: 403 })
    }
    if (migratePassword(student)) writeData(data)
    if (verifyPassword(password, student.password)) {
      const token = generateToken("student", student.id)
      const { password: _, ...safe } = student
      return NextResponse.json({
        message: "Login successful",
        data: { type: "student", student: safe, token },
      })
    }
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
}
