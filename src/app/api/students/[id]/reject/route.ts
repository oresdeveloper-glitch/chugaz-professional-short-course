import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = readData()
  const index = data.students.findIndex((s: any) => s.registration_number === id || String(s.id) === id)
  if (index === -1) return NextResponse.json({ message: "Student not found" }, { status: 404 })
  data.students[index].status = "rejected"
  writeData(data)
  return NextResponse.json({ message: "Student rejected" })
}
