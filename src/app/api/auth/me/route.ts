import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"

export async function GET() {
  const data = readData()
  const user = data.students[0]
  if (!user) return NextResponse.json({ data: { type: "guest", student: null } })
  return NextResponse.json({ data: { type: "student", student: user } })
}
