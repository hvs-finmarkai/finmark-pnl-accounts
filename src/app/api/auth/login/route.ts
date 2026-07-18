export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createToken } from "@/lib/auth"
import { compareSync } from "bcryptjs"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !compareSync(password, user.passwordHash)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = createToken({ userId: user.id, email: user.email, role: user.role, name: user.name })

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role, department: user.department },
    token,
  })

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  })

  return response
}
