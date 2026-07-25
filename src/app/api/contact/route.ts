import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { checkRateLimit } from "@/lib/auth-server"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`contact:${ip}`, 3, 60000)) {
    return NextResponse.json({ message: "Too many messages. Try again later." }, { status: 429 })
  }

  const body = await req.json()
  const { name, email, subject, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ message: "Name, email, and message are required" }, { status: 422 })
  }

  const data = readData()
  data.messages.push({
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    subject: subject?.trim() || null,
    message: message.trim(),
    created_at: new Date().toISOString(),
  })
  writeData(data)
  return NextResponse.json({ message: "Message sent successfully" })
}
