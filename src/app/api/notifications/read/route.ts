import { NextResponse } from "next/server"
import { readData, writeData, getDefaults } from "@/lib/server-store"

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.slice(7)
  const body = await req.json()
  const notificationId = body.id

  const data = readData()

  const tok = (data.tokens || []).find((t: any) => t.token === token)
  if (!tok) return NextResponse.json({ message: "Invalid token" }, { status: 401 })

  const student = data.students.find((s: any) => s.id === tok.userId)
  if (!student) return NextResponse.json({ message: "Student not found" }, { status: 404 })

  data.notifications = data.notifications || []

  if (notificationId === "all") {
    data.notifications.forEach((n: any) => {
      if (n.student_email === student.email) n.read = true
    })
  } else {
    const n = data.notifications.find((n: any) => n.id === Number(notificationId))
    if (n && n.student_email === student.email) n.read = true
  }

  writeData(data)
  return NextResponse.json({ message: "Notifications marked as read" })
}
