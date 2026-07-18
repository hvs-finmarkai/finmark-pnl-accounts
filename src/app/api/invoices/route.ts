export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("client_id")
  const status = searchParams.get("status")

  const where: any = {}
  if (clientId) where.clientId = parseInt(clientId)
  if (status && status !== "all") where.status = status

  const invoices = await prisma.invoice.findMany({
    where,
    include: { client: { select: { name: true } }, project: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  })

  const totals = await prisma.invoice.aggregate({
    _sum: { amount: true },
  })
  const paid = await prisma.invoice.aggregate({ where: { status: "paid" }, _sum: { amount: true } })
  const pending = await prisma.invoice.aggregate({ where: { status: "pending" }, _sum: { amount: true } })
  const overdue = await prisma.invoice.aggregate({ where: { status: "overdue" }, _sum: { amount: true } })

  return NextResponse.json({
    invoices: invoices.map(i => ({ ...i, client_name: i.client.name, project_name: i.project?.name || "" })),
    totals: { total: totals._sum.amount || 0, paid: paid._sum.amount || 0, pending: pending._sum.amount || 0, overdue: overdue._sum.amount || 0 },
  })
}
