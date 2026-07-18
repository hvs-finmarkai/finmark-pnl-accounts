export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashSync } from "bcryptjs"

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, department: true, isActive: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.email || !body.name || !body.password) {
    return NextResponse.json({ error: "Email, name, and password are required" }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } })
  if (existing) {
    return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      passwordHash: hashSync(body.password, 10),
      role: body.role || "viewer",
      department: body.department || null,
    },
    select: { id: true, email: true, name: true, role: true, department: true },
  })

  return NextResponse.json({ user, message: "User created successfully" }, { status: 201 })
}
