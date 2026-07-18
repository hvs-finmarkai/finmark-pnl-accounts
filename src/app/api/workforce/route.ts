export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const db = getDb()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  let employees = db.employees.map(e => {
    const project = db.projects.find(p => p.id === e.project_id)
    return { ...e, project_name: project?.name || null }
  })

  if (status && status !== "all") employees = employees.filter(e => e.status === status)

  const active = db.employees.filter(e => e.status === "active")
  const bench = db.employees.filter(e => e.status === "bench")
  const avgUtil = active.length > 0 ? (active.reduce((a, b) => a + b.utilization, 0) / active.length) : 0
  const totalSalary = db.employees.reduce((a, b) => a + b.salary, 0)

  const byDepartment = Object.entries(
    db.employees.reduce((acc: any, e) => {
      if (!acc[e.department]) acc[e.department] = { count: 0, total_util: 0, total_salary: 0 }
      acc[e.department].count++
      acc[e.department].total_util += e.utilization
      acc[e.department].total_salary += e.salary
      return acc
    }, {})
  ).map(([department, data]: any) => ({ department, count: data.count, avg_util: data.total_util / data.count, total_salary: data.total_salary }))

  const skillMap: Record<string, number> = {}
  db.employees.forEach(e => {
    if (e.skills) e.skills.split(",").forEach((s: string) => { skillMap[s.trim()] = (skillMap[s.trim()] || 0) + 1 })
  })
  const skills = Object.entries(skillMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)

  return NextResponse.json({
    employees,
    summary: { total: db.employees.length, active: active.length, bench: bench.length, avgUtilization: avgUtil.toFixed(1), totalMonthlyCost: totalSalary, billable: active.length },
    byDepartment,
    skills,
  })
}
