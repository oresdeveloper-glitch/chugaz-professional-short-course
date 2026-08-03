import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"
import { verifyToken } from "@/lib/auth-server"

function toCamelCase(s: any) {
  if (!s) return null
  const { password, ...rest } = s
  return {
    regNo: rest.registration_number,
    firstName: rest.first_name,
    middleName: rest.middle_name,
    lastName: rest.last_name,
    photo: rest.photo || null,
    gender: rest.gender,
    dateOfBirth: rest.date_of_birth,
    nationality: rest.nationality,
    occupation: rest.occupation,
    educationLevel: rest.education_level,
    phone: rest.phone,
    whatsapp: rest.whatsapp,
    email: rest.email,
    region: rest.region,
    district: rest.district,
    street: rest.street,
    postalAddress: rest.postal_address,
    courses: rest.courses || [],
    trainingMode: rest.training_mode,
    preferredTime: rest.preferred_time,
    paymentMethod: rest.payment_method,
    paymentRef: rest.payment_ref,
    transactionId: rest.transaction_id,
    paymentStatus: rest.payment_status,
    status: rest.status,
    createdAt: rest.created_at,
  }
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ data: { type: "guest", student: null } })
  }

  const token = auth.slice(7)
  const result = verifyToken(token)
  if (!result) {
    return NextResponse.json({ data: { type: "guest", student: null } })
  }

  const data = readData()

  if (result.type === "admin") {
    const admin = data.admins[0]
    if (!admin) return NextResponse.json({ data: { type: "guest", student: null } })
    const { password, ...safe } = admin
    return NextResponse.json({ data: { type: "admin", admin: safe } })
  }

  if (result.type === "student") {
    const student = data.students.find((s: any) => s.id === result.userId)
    if (student) {
      return NextResponse.json({ data: { type: "student", student: toCamelCase(student) } })
    }
  }

  return NextResponse.json({ data: { type: "guest", student: null } })
}
