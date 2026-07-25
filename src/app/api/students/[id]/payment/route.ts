import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { requireAdmin } from "@/lib/auth-server"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req.headers.get("authorization"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const data = readData()
  const index = data.students.findIndex((s: any) => s.registration_number === id || String(s.id) === id)
  if (index === -1) return NextResponse.json({ message: "Student not found" }, { status: 404 })

  const student = data.students[index]
  student.payment_status = student.payment_status === "confirmed" ? "pending" : "confirmed"
  writeData(data)

  return NextResponse.json({
    message: `Payment ${student.payment_status === "confirmed" ? "confirmed" : "reset to pending"}`,
    payment_status: student.payment_status,
  })
}
