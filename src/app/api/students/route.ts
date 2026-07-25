import { NextResponse } from "next/server"
import { readData } from "@/lib/server-store"
import { requireAdmin } from "@/lib/auth-server"

export async function GET(req: Request) {
  if (!requireAdmin(req.headers.get("authorization"))) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const data = readData()
  const students = data.students.map((s: any) => {
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
      paymentRef: rest.payment_ref,
      transactionId: rest.transaction_id,
      paymentStatus: rest.payment_status,
      status: rest.status,
      createdAt: rest.created_at,
    }
  })
  return NextResponse.json({ data: students })
}
