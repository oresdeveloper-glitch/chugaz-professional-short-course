import { NextResponse } from "next/server"
import { readData, writeData, getNextRegNumber } from "@/lib/server-store"
import { hashPassword, checkRateLimit, generatePaymentRef, validateTransactionId, sanitizeObject, sanitizeInput } from "@/lib/auth-server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s\-()]{7,15}$/
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
const MAX_LENGTH = 200

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
  if (!checkRateLimit(`register:${ip}`, 5, 60000)) {
    return NextResponse.json({ message: "Too many registration attempts. Try again later." }, { status: 429 })
  }

  let fd: FormData
  try { fd = await req.formData() } catch { return NextResponse.json({ message: "Invalid request body" }, { status: 400 }) }

  // Validate request body size
  const sizeJson = JSON.stringify({ body: [...fd.keys()], photo: (fd.get("photo") instanceof File) ? (fd.get("photo") as File).size : 0 })
  if (sizeJson.length > 4096) {
    return NextResponse.json({ message: "Request body too large" }, { status: 413 })
  }

  const body: Record<string, any> = {}
  for (const key of fd.keys()) {
    const v = fd.get(key)
    if (key === "photo" && v instanceof File) {
      const buf = Buffer.from(await v.arrayBuffer())
      if (buf.length > 2 * 1024 * 1024) {
        return NextResponse.json({ message: "Photo exceeds 2MB limit" }, { status: 413 })
      }
      body.photo = `data:${v.type || "image/jpeg"};base64,${buf.toString("base64")}`
      continue
    }
    if (typeof v === "string") body[key] = v
  }

  // Sanitize all string inputs
  const sanitizedBody = sanitizeObject(body)

  if (sanitizedBody.website && sanitizedBody.website.trim()) {
    return NextResponse.json({ message: "Bot detected" }, { status: 400 })
  }

  const first_name = sanitizedBody.first_name?.trim() || ""
  const middle_name = sanitizedBody.middle_name?.trim() || null
  const last_name = sanitizedBody.last_name?.trim() || ""
  const email = sanitizedBody.email?.toLowerCase().trim() || ""
  const phone = sanitizedBody.phone?.trim() || ""
  const whatsapp = sanitizedBody.whatsapp?.trim() || null
  const password = sanitizedBody.password || ""
  const password_confirmation = sanitizedBody.password_confirmation || ""

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

  if (!sanitizedBody.photo) errors.photo = ["Passport photo (150x150px) is required"]

  if (!password) errors.password = ["Password is required"]
  else if (!PASSWORD_RE.test(password)) errors.password = [
    "Min 8 characters with uppercase, lowercase, and a number"
  ]

  if (password !== password_confirmation) errors.password_confirmation = ["Passwords do not match"]

  for (const field of ["nationality", "occupation", "region", "district", "street", "postal_address"]) {
    const val = sanitizedBody[field]?.trim()
    if (val && val.length > MAX_LENGTH) errors[field] = [`Max ${MAX_LENGTH} characters`]
  }

  const payment_method = sanitizedBody.payment_method || null
  const transaction_id = sanitizedBody.transaction_id?.trim() || null

  const courses: string[] = []
  for (const key of Object.keys(sanitizedBody)) {
    const m = key.match(/^courses\[(\d+)\]$/)
    if (m && sanitizedBody[key]) courses[Number(m[1])] = sanitizedBody[key]
  }

  if (payment_method === "mobile" && !transaction_id) {
    errors.transaction_id = ["Transaction ID is required for mobile payments"]
  }
  if (transaction_id && !validateTransactionId(transaction_id)) {
    errors.transaction_id = ["Invalid transaction ID format"]
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ message: "Validation failed", errors }, { status: 422 })
  }

  const data = await readData()

  if (data.students.find((s: any) => s.email === email)) {
    return NextResponse.json({ message: "Email already registered", errors: { email: ["Already taken"] } }, { status: 422 })
  }

  if (data.students.find((s: any) => s.phone === phone)) {
    return NextResponse.json({ message: "Phone already registered", errors: { phone: ["Already taken"] } }, { status: 422 })
  }

  if (whatsapp && data.students.find((s: any) => s.whatsapp === whatsapp)) {
    return NextResponse.json({ message: "WhatsApp already registered", errors: { whatsapp: ["Already taken"] } }, { status: 422 })
  }

  const regNum = await getNextRegNumber()
  const payment_ref = generatePaymentRef(regNum)
  const student = {
    id: Date.now(),
    registration_number: regNum,
    first_name: sanitizeInput(first_name),
    middle_name: middle_name ? sanitizeInput(middle_name) : null,
    last_name: sanitizeInput(last_name),
    email,
    phone,
    whatsapp,
    password: hashPassword(password),
    photo: sanitizedBody.photo || null,
    gender: sanitizedBody.gender || null,
    date_of_birth: sanitizedBody.date_of_birth || null,
    nationality: sanitizedBody.nationality?.trim() || null,
    occupation: sanitizedBody.occupation?.trim() || null,
    education_level: sanitizedBody.education_level || null,
    region: sanitizedBody.region?.trim() || null,
    district: sanitizedBody.district?.trim() || null,
    street: sanitizedBody.street?.trim() || null,
    postal_address: sanitizedBody.postal_address?.trim() || null,
    training_mode: sanitizedBody.training_mode || null,
    preferred_time: sanitizedBody.preferred_time || null,
    courses: courses.filter(Boolean),
    payment_method,
    transaction_id,
    payment_ref,
    status: "pending",
    payment_status: "pending",
    created_at: new Date().toISOString(),
  }

  data.students.push(student)
  await writeData(data)

  return NextResponse.json({
    message: "Registration successful",
    data: {
      student: { ...student, password: undefined },
      registration_number: regNum,
      payment_ref,
    },
  }, { status: 201 })
}
