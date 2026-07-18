export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("client_id")

  const where: any = {}
  if (clientId) where.clientId = parseInt(clientId)

  const contracts = await prisma.contract.findMany({
    where,
    include: { client: { select: { name: true } } },
    orderBy: { startDate: "desc" },
  })

  const totalActiveValue = await prisma.contract.aggregate({ where: { status: "active" }, _sum: { value: true } })

  return NextResponse.json({
    contracts: contracts.map(c => ({ ...c, client_name: c.client.name })),
    totalActiveValue: totalActiveValue._sum.value || 0,
  })
}
