export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET() {
  const db = getDb()
  const totalShared = db.cost_allocations.reduce((a, b) => a + b.total_cost, 0)
  const totalAllocated = db.cost_allocations.reduce((a, b) => a + b.allocated_cost, 0)
  const pendingCount = db.cost_allocations.filter(c => c.status === "pending").length

  return NextResponse.json({
    allocations: db.cost_allocations,
    summary: { totalShared, totalAllocated, unallocated: totalShared - totalAllocated, pendingApprovals: pendingCount },
  })
}

export async function POST(request: NextRequest) {
  const db = getDb()
  const body = await request.json()

  if (body.action === "approve") {
    const item = db.cost_allocations.find(c => c.id === body.id)
    if (item) item.status = "approved"
    return NextResponse.json({ message: "Approved" })
  }

  if (body.action === "simulate") {
    const simulated = db.cost_allocations.map(a => ({
      ...a,
      simulated_cost: a.total_cost * (body.factor || 1.1),
      savings: a.total_cost - a.total_cost * (body.factor || 1.1),
    }))
    return NextResponse.json({ simulated })
  }

  return NextResponse.json({ message: "OK" })
}
