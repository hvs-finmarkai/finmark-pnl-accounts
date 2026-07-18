export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (!q || q.length < 2) return NextResponse.json({ results: [] })

  const [clients, projects, employees] = await Promise.all([
    prisma.client.findMany({ where: { name: { contains: q, mode: "insensitive" } }, take: 5, select: { id: true, name: true, region: true } }),
    prisma.project.findMany({ where: { name: { contains: q, mode: "insensitive" } }, take: 5, select: { id: true, name: true, status: true } }),
    prisma.employee.findMany({ where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { role: { contains: q, mode: "insensitive" } }] }, take: 5, select: { id: true, name: true, department: true } }),
  ])

  return NextResponse.json({
    results: [
      ...clients.map(c => ({ id: c.id, name: c.name, type: "client", subtitle: c.region })),
      ...projects.map(p => ({ id: p.id, name: p.name, type: "project", subtitle: p.status })),
      ...employees.map(e => ({ id: e.id, name: e.name, type: "employee", subtitle: e.department })),
    ],
  })
}
