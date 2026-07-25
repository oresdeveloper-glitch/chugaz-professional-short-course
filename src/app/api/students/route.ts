import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"

export async function GET() {
  const data = readData()
  const students = data.students.map((s: any) => {
    const { password, ...rest } = s
    return rest
  })
  return NextResponse.json({ data: students })
}
