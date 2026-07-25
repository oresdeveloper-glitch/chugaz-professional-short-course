import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password required" }, { status: 422 })
  }

  const data = readData()

  const admin = data.admins.find((a: any) => a.email === email && a.password === password)
  if (admin) {
    return NextResponse.json({
      message: "Login successful",
      data: {
        type: "admin",
        admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role, phone: admin.phone },
        token: `admin_token_${admin.id}_${Date.now()}`,
      },
    })
  }

  const student = data.students.find((s: any) => s.email === email && s.password === password)
  if (student) {
    const { password: _, ...safe } = student
    return NextResponse.json({
      message: "Login successful",
      data: {
        type: "student",
        student: safe,
        token: `token_${student.id}_${Date.now()}`,
      },
    })
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
}
