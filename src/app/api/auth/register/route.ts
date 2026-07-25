import { NextResponse } from "next/server"
import { readData, writeData, getNextRegNumber } from "@/lib/server-store"

export async function POST(req: Request) {
  const body = await req.json()
  const { first_name, last_name, email, phone, password, password_confirmation } = body

  if (!first_name || !last_name || !email || !phone || !password) {
    return NextResponse.json({ message: "Missing required fields", errors: {} }, { status: 422 })
  }
  if (password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters", errors: {} }, { status: 422 })
  }
  if (password !== password_confirmation) {
    return NextResponse.json({ message: "Passwords do not match", errors: {} }, { status: 422 })
  }

  const data = readData()
  if (data.students.find((s: any) => s.email === email)) {
    return NextResponse.json({ message: "Email already registered", errors: { email: ["Already taken"] } }, { status: 422 })
  }

  const regNum = getNextRegNumber()
  const student = {
    id: Date.now(),
    registration_number: regNum,
    first_name,
    middle_name: body.middle_name || null,
    last_name,
    email,
    phone,
    whatsapp: body.whatsapp || null,
    password,
    gender: body.gender || null,
    date_of_birth: body.date_of_birth || null,
    nationality: body.nationality || null,
    occupation: body.occupation || null,
    education_level: body.education_level || null,
    region: body.region || null,
    district: body.district || null,
    street: body.street || null,
    postal_address: body.postal_address || null,
    training_mode: body.training_mode || null,
    preferred_time: body.preferred_time || null,
    courses: body.courses || [],
    payment_method: body.payment_method || null,
    status: "pending",
    payment_status: "pending",
    created_at: new Date().toISOString(),
  }

  data.students.push(student)
  writeData(data)

  return NextResponse.json({
    message: "Registration successful",
    data: { student, token: `token_${student.id}_${Date.now()}` },
  }, { status: 201 })
}
