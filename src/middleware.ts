import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const { pathname } = request.nextUrl

  const publicPaths = ["/login", "/api/auth/login"]
  const isPublic = publicPaths.some((p) => pathname.startsWith(p))

  if (isPublic) {
    if (token && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  if (!token && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
