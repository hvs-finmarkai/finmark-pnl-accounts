export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  const where: any = {}
  if (status && status !== "all") where.status = status
  if (search) where.OR = [{ name: { contains: search, mode: "insensitive" } }, { industry: { contains: search, mode: "insensitive" } }]

  const clients = await prisma.client.findMany({
    where,
    include: { projects: { select: { id: true } }, transactions: { select: { type: true, amount: true } } },
    orderBy: { contractValue: "desc" },
  })

  return NextResponse.json(clients.map(c => {
    const revenue = c.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = c.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)
    return { id: c.id, name: c.name, industry: c.industry, region: c.region, status: c.status, contractValue: c.contractValue, healthScore: c.healthScore, contactPerson: c.contactPerson, revenue, expenses, project_count: c.projects.length, margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0" }
  }))
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const client = await prisma.client.create({ data: { name: body.name, industry: body.industry, region: body.region, contractValue: body.contract_value || 0, contactPerson: body.contact_person, contactEmail: body.contact_email } })
  return NextResponse.json({ id: client.id, message: "Client created" }, { status: 201 })
}
