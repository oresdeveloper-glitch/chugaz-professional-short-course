import { NextResponse } from "next/server"
import { testConnection, sendResetCodeEmail } from "@/lib/email"
import { requireAdmin } from "@/lib/auth-server"

export async function GET(req: Request) {
  if (!requireAdmin(req.headers.get("authorization"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  const result = await testConnection()
  return NextResponse.json(result, { status: result.ok ? 200 : 500 })
}

export async function POST(req: Request) {
  if (!requireAdmin(req.headers.get("authorization"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
  let body: any
  try { body = await req.json() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }
  const { email } = body
  if (!email) return NextResponse.json({ message: "Email is required" }, { status: 422 })

  const result = await sendResetCodeEmail(email, "TEST123")
  return NextResponse.json(result, { status: result.ok ? 200 : 500 })
}
