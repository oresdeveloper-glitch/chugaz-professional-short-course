import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"

export async function POST(req: Request) {
  const body = await req.json()
  const data = readData()
  data.messages.push({
    id: Date.now(),
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
    created_at: new Date().toISOString(),
  })
  writeData(data)
  return NextResponse.json({ message: "Message sent successfully" })
}
