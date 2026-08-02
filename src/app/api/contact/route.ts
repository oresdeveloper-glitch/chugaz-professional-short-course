import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"
import { checkRateLimit, sanitizeInput, validateBodySize } from "@/lib/auth-server"

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`contact:${ip}`, 3, 60000)) {
    return NextResponse.json({ message: "Too many messages. Try again later." }, { status: 429 })
  }

  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  
  if (!validateBodySize(body)) {
    return NextResponse.json({ message: "Message too large" }, { status: 413 })
  }

  const { name, email, subject, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ message: "Name, email, and message are required" }, { status: 422 })
  }

  const data = readData()
  data.messages.push({
    id: Date.now(),
    name: sanitizeInput(name.trim()),
    email: email.trim(),
    subject: subject ? sanitizeInput(subject.trim()) : null,
    message: sanitizeInput(message.trim()),
    created_at: new Date().toISOString(),
  })
  writeData(data)
  return NextResponse.json({ message: "Message sent successfully" })
}
