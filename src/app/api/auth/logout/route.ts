import { NextResponse } from "next/server"
import { readData, writeData } from "@/lib/server-store"

export async function POST(req: Request) {
  const auth = req.headers.get("authorization")
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.slice(7)
    const data = await readData()
    data.tokens = data.tokens || []
    data.tokens = data.tokens.filter((t: any) => t.token !== token)
    await writeData(data)
  }
  return NextResponse.json({ message: "Logged out" })
}
