import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.slice(7)
  const data = await readData()

  const tok = (data.tokens || []).find((t: any) => t.token === token)
  if (!tok) return NextResponse.json({ message: "Invalid token" }, { status: 401 })

  const student = data.students.find((s: any) => s.id === tok.userId)
  if (!student) return NextResponse.json({ message: "Student not found" }, { status: 404 })

  const notifications = (data.notifications || [])
    .filter((n: any) => n.student_email === student.email)
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const unread = notifications.filter((n: any) => !n.read).length

  return NextResponse.json({ data: notifications, unread })
}
