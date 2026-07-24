import { api, ApiError } from "./api"

export interface AuthUser {
  id: number
  email: string
  firstName: string
  lastName: string
  regNo: string
  role: "student" | "admin"
  token?: string
}

export async function login(email: string, password: string): Promise<AuthUser | null> {
  try {
    const res = await api.post("/auth/login", { email, password })
    const { type, student, admin, token } = res.data

    const user: AuthUser = {
      id: student?.id || admin?.id,
      email: student?.email || admin?.email,
      firstName: student?.first_name || admin?.name?.split(" ")[0] || "Admin",
      lastName: student?.last_name || admin?.name?.split(" ").slice(1).join(" ") || "",
      regNo: student?.registration_number || "ADMIN001",
      role: type === "admin" ? "admin" : "student",
      token,
    }

    localStorage.setItem("chugaz_user", JSON.stringify(user))
    localStorage.setItem("chugaz_token", token)
    return user
  } catch (e) {
    if (e instanceof ApiError) return null
    throw e
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout")
  } catch {
    // always clear local state
  }
  localStorage.removeItem("chugaz_user")
  localStorage.removeItem("chugaz_token")
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("chugaz_user")
  return stored ? JSON.parse(stored) : null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function isAdmin(): boolean {
  const user = getCurrentUser()
  return user?.role === "admin"
}

export async function getStudentData(email: string): Promise<any> {
  try {
    const res = await api.get(`/auth/me`)
    return res.data?.student || null
  } catch {
    return null
  }
}

export async function getAllStudents(): Promise<any[]> {
  try {
    const res = await api.get("/students")
    return res.data || []
  } catch {
    return []
  }
}
