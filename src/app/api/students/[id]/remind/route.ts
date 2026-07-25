import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { requireAdmin } from "@/lib/auth-server"

const REASONS = ["payment", "registration", "document", "general"] as const

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req.headers.get("authorization"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const reason = body.reason || "general"

  if (!REASONS.includes(reason)) {
    return NextResponse.json({ message: "Invalid reminder reason" }, { status: 422 })
  }

  const data = readData()
  const index = data.students.findIndex((s: any) => s.registration_number === id || String(s.id) === id)
  if (index === -1) return NextResponse.json({ message: "Student not found" }, { status: 404 })

  const student = data.students[index]
  const notification = {
    id: Date.now(),
    student_email: student.email,
    reason,
    title: getTitle(reason),
    message: getMessage(reason, student),
    read: false,
    created_at: new Date().toISOString(),
  }

  data.notifications = data.notifications || []
  data.notifications.push(notification)
  writeData(data)

  return NextResponse.json({ message: "Reminder sent", notification })
}

function getTitle(reason: string): string {
  const titles: Record<string, string> = {
    payment: "Payment Reminder",
    registration: "Registration Follow-up",
    document: "Document Request",
    general: "General Notice",
  }
  return titles[reason] || "Notification"
}

function getMessage(reason: string, student: any): string {
  const name = `${student.first_name} ${student.last_name}`
  const messages: Record<string, string> = {
    payment: `Dear ${name}, this is a reminder to complete your payment for the registered courses. Please use your payment reference when sending M-Pesa.`,
    registration: `Dear ${name}, thank you for registering with CHUGAZ Stationery. Please check your registration status and complete any pending steps.`,
    document: `Dear ${name}, please submit the required documents (passport photo, academic certificates) to complete your registration.`,
    general: `Dear ${name}, please check your student portal for important updates regarding your courses.`,
  }
  return messages[reason] || `Dear ${name}, please check your student portal for updates.`
}
