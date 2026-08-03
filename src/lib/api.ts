const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api"

interface ApiResponse<T = any> {
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

class ApiError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== "undefined" ? localStorage.getItem("chugaz_token") : null

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new ApiError(
      json.message || "Something went wrong",
      res.status,
      json.errors
    )
  }

  return json
}

export const api = {
  get: <T = any>(endpoint: string) => request<T>(endpoint),
  post: <T = any>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
  postForm: <T = any>(endpoint: string, formData: FormData) =>
    request<T>(endpoint, { method: "POST", body: formData }),
  put: <T = any>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: <T = any>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
}

export { ApiError }
export type { ApiResponse }
