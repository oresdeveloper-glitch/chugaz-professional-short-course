import { NextResponse } from "next/server"
import { readData, writeData, getNextRegNumber } from "@/lib/server-store"
import { hashPassword } from "@/lib/auth-server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s\-()]{7,15}$/

export async function POST(req: Request) {
  const body = await req.json()
  const { first_name, last_name, email, phone, password, password_confirmation } = body

  const errors: Record<string, string[]> = {}

  if (!first_name || !first_name.trim()) errors.first_name = ["First name is required"]
  if (!last_name || !last_name.trim()) errors.last_name = ["Last name is required"]
  if (!email || !EMAIL_RE.test(email)) errors.email = ["Valid email is required"]
  if (!phone || !PHONE_RE.test(phone)) errors.phone = ["Valid phone number is required"]
  if (!password || password.length < 6) errors.password = ["Password must be at least 6 characters"]
  if (password !== password_confirmation) errors.password_confirmation = ["Passwords do not match"]

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Validation failed", errors }, { status: 422 })
  }

  const data = readData()
  if (data.students.find((s: any) => s.email === email.toLowerCase())) {
    return NextResponse.json({ message: "Email already registered", errors: { email: ["Already taken"] } }, { status: 422 })
  }

  const regNum = getNextRegNumber()
  const student = {
    id: Date.now(),
    registration_number: regNum,
    first_name: first_name.trim(),
    middle_name: body.middle_name?.trim() || null,
    last_name: last_name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    whatsapp: body.whatsapp?.trim() || null,
    password: hashPassword(password),
    gender: body.gender || null,
    date_of_birth: body.date_of_birth || null,
    nationality: body.nationality?.trim() || null,
    occupation: body.occupation?.trim() || null,
    education_level: body.education_level || null,
    region: body.region?.trim() || null,
    district: body.district?.trim() || null,
    street: body.street?.trim() || null,
    postal_address: body.postal_address?.trim() || null,
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
    data: { student: { ...student, password: undefined }, registration_number: regNum },
  }, { status: 201 })
}
