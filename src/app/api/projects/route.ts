export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  const where: any = {}
  if (status && status !== "all") where.status = status.replace("-", "_")
  if (search) where.OR = [{ name: { contains: search, mode: "insensitive" } }]

  const projects = await prisma.project.findMany({
    where,
    include: { client: { select: { name: true } }, manager: { select: { name: true } }, employees: { select: { id: true } }, transactions: { select: { type: true, amount: true } } },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(projects.map(p => {
    const revenue = p.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = p.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)
    return { id: p.id, name: p.name, status: p.status, priority: p.priority, budget: p.budget, start_date: p.startDate, end_date: p.endDate, progress: p.progress, description: p.description, client_name: p.client.name, manager_name: p.manager.name, resource_count: p.employees.length, revenue, expenses, margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0" }
  }))
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const project = await prisma.project.create({ data: { name: body.name, clientId: body.client_id, managerId: body.manager_id, status: body.status || "planning", priority: body.priority || "medium", budget: body.budget || 0, startDate: body.start_date ? new Date(body.start_date) : null, endDate: body.end_date ? new Date(body.end_date) : null, description: body.description } })
  return NextResponse.json({ id: project.id, message: "Project created" }, { status: 201 })
}
