export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const where: any = {}
  if (status && status !== "all") where.status = status

  const employees = await prisma.employee.findMany({
    where,
    include: { project: { select: { name: true } } },
    orderBy: { utilization: "desc" },
  })

  const allEmployees = await prisma.employee.findMany()
  const active = allEmployees.filter(e => e.status === "active")
  const bench = allEmployees.filter(e => e.status === "bench")
  const avgUtil = active.length > 0 ? active.reduce((a, b) => a + b.utilization, 0) / active.length : 0

  const byDepartment = await prisma.employee.groupBy({
    by: ["department"],
    _count: { id: true },
    _avg: { utilization: true },
    _sum: { salary: true },
  })

  const skillMap: Record<string, number> = {}
  allEmployees.forEach(e => {
    if (e.skills) e.skills.split(",").forEach(s => { skillMap[s.trim()] = (skillMap[s.trim()] || 0) + 1 })
  })

  return NextResponse.json({
    employees: employees.map(e => ({ ...e, project_name: e.project?.name || null })),
    summary: { total: allEmployees.length, active: active.length, bench: bench.length, avgUtilization: avgUtil.toFixed(1), totalMonthlyCost: allEmployees.reduce((a, b) => a + b.salary, 0), billable: active.length },
    byDepartment: byDepartment.map(d => ({ department: d.department || "Unknown", count: d._count.id, avg_util: d._avg.utilization || 0, total_salary: d._sum.salary || 0 })),
    skills: Object.entries(skillMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
  })
}
