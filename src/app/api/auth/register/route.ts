import { NextResponse } from "next/server"
import { readData, writeData, getNextRegNumber } from "@/lib/server-store"
import { hashPassword, checkRateLimit } from "@/lib/auth-server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s\-()]{7,15}$/
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const MAX_LENGTH = 200

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`register:${ip}`, 5, 60000)) {
    return NextResponse.json({ message: "Too many registration attempts. Try again later." }, { status: 429 })
  }

  const body = await req.json()

  if (body.website && body.website.trim()) {
    return NextResponse.json({ message: "Bot detected" }, { status: 400 })
  }

  const first_name = body.first_name?.trim() || ""
  const middle_name = body.middle_name?.trim() || null
  const last_name = body.last_name?.trim() || ""
  const email = body.email?.toLowerCase().trim() || ""
  const phone = body.phone?.trim() || ""
  const whatsapp = body.whatsapp?.trim() || null
  const password = body.password || ""
  const password_confirmation = body.password_confirmation || ""

  const errors: Record<string, string[]> = {}

  if (!first_name) errors.first_name = ["First name is required"]
  else if (first_name.length > MAX_LENGTH) errors.first_name = [`Max ${MAX_LENGTH} characters`]

  if (!last_name) errors.last_name = ["Last name is required"]
  else if (last_name.length > MAX_LENGTH) errors.last_name = [`Max ${MAX_LENGTH} characters`]

  if (middle_name && middle_name.length > MAX_LENGTH) errors.middle_name = [`Max ${MAX_LENGTH} characters`]

  if (!email) errors.email = ["Email is required"]
  else if (!EMAIL_RE.test(email)) errors.email = ["Invalid email format"]
  else if (email.length > MAX_LENGTH) errors.email = [`Max ${MAX_LENGTH} characters`]

  if (!phone) errors.phone = ["Phone number is required"]
  else if (!PHONE_RE.test(phone)) errors.phone = ["Invalid phone format"]
  else if (phone.length > MAX_LENGTH) errors.phone = [`Max ${MAX_LENGTH} characters`]

  if (whatsapp && !PHONE_RE.test(whatsapp)) errors.whatsapp = ["Invalid phone format"]
  if (whatsapp && whatsapp.length > MAX_LENGTH) errors.whatsapp = [`Max ${MAX_LENGTH} characters`]

  if (!password) errors.password = ["Password is required"]
  else if (!PASSWORD_RE.test(password)) errors.password = [
    "Min 8 characters with uppercase, lowercase, and a number"
  ]

  if (password !== password_confirmation) errors.password_confirmation = ["Passwords do not match"]

  for (const field of ["nationality", "occupation", "region", "district", "street", "postal_address"]) {
    const val = body[field]?.trim()
    if (val && val.length > MAX_LENGTH) errors[field] = [`Max ${MAX_LENGTH} characters`]
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Validation failed", errors }, { status: 422 })
  }

  const data = readData()

  if (data.students.find((s: any) => s.email === email)) {
    return NextResponse.json({ message: "Email already registered", errors: { email: ["Already taken"] } }, { status: 422 })
  }

  if (data.students.find((s: any) => s.phone === phone)) {
    return NextResponse.json({ message: "Phone already registered", errors: { phone: ["Already taken"] } }, { status: 422 })
  }

  if (whatsapp && data.students.find((s: any) => s.whatsapp === whatsapp)) {
    return NextResponse.json({ message: "WhatsApp already registered", errors: { whatsapp: ["Already taken"] } }, { status: 422 })
  }

  const regNum = getNextRegNumber()
  const student = {
    id: Date.now(),
    registration_number: regNum,
    first_name,
    middle_name,
    last_name,
    email,
    phone,
    whatsapp,
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
