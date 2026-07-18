export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const allocations = await prisma.costAllocation.findMany({ orderBy: { totalCost: "desc" } })
  const totalShared = allocations.reduce((a, b) => a + b.totalCost, 0)
  const totalAllocated = allocations.reduce((a, b) => a + b.allocatedCost, 0)
  const pendingCount = allocations.filter(c => c.status === "pending").length

  return NextResponse.json({
    allocations: allocations.map(a => ({ id: a.id, cost_center: a.costCenter, driver: a.driver, total_cost: a.totalCost, allocated_cost: a.allocatedCost, rule: a.rule, department: a.department, status: a.status })),
    summary: { totalShared, totalAllocated, unallocated: totalShared - totalAllocated, pendingApprovals: pendingCount },
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  if (body.action === "approve") {
    await prisma.costAllocation.update({ where: { id: body.id }, data: { status: "approved" } })
    return NextResponse.json({ message: "Approved" })
  }

  if (body.action === "simulate") {
    const allocations = await prisma.costAllocation.findMany()
    const simulated = allocations.map(a => ({
      id: a.id, costCenter: a.costCenter, total_cost: a.totalCost,
      simulated_cost: a.totalCost * (body.factor || 1.1),
      savings: a.totalCost - a.totalCost * (body.factor || 1.1),
    }))
    return NextResponse.json({ simulated })
  }

  return NextResponse.json({ message: "OK" })
}
