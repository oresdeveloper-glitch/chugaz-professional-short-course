import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (!request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  // Security headers
  const headers = response.headers

  // Prevent MIME type sniffing
  headers.set("X-Content-Type-Options", "nosniff")

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY")

  // Enable XSS filter in older browsers
  headers.set("X-XSS-Protection", "1; mode=block")

  // Referrer policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Disable permissions for sensitive features
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()")

  // Content Security Policy (restrictive for API)
  headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data:;"
  )

  // HSTS (only in production)
  if (process.env.NODE_ENV === "production") {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  }

  // Prevent caching of sensitive API responses
  if (request.method === "GET" && (request.nextUrl.pathname.includes("/auth/me") || request.nextUrl.pathname.includes("/students"))) {
    headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate")
    headers.set("Pragma", "no-cache")
    headers.set("Expires", "0")
  }

  return response
}

export const config = {
  matcher: "/api/:path*",
}
