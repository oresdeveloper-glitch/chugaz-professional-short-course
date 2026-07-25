import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"

function toCamelCase(s: any) {
  if (!s) return null
  const { password, ...rest } = s
  return {
    regNo: rest.registration_number,
    firstName: rest.first_name,
    middleName: rest.middle_name,
    lastName: rest.last_name,
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
    status: rest.status,
    createdAt: rest.created_at,
  }
}

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")
  const data = readData()

  if (!auth || !auth.startsWith("Bearer ")) {
    return NextResponse.json({ data: { type: "guest", student: null } })
  }

  const token = auth.slice(7)

  if (token.startsWith("admin_token_")) {
    const admin = data.admins[0]
    const { password, ...safe } = admin
    return NextResponse.json({ data: { type: "admin", admin: safe } })
  }

  if (token.startsWith("token_")) {
    const studentId = parseInt(token.split("_")[1], 10)
    const student = data.students.find((s: any) => s.id === studentId)
    if (student) {
      return NextResponse.json({ data: { type: "student", student: toCamelCase(student) } })
    }
  }

  return NextResponse.json({ data: { type: "guest", student: null } })
}
