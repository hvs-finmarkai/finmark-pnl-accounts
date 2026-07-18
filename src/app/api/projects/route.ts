export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const db = getDb()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let projects = db.projects.map(p => {
    const client = db.clients.find(c => c.id === p.client_id)
    const manager = db.users.find(u => u.id === p.manager_id)
    const revenue = db.transactions.filter(t => t.project_id === p.id && t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = db.transactions.filter(t => t.project_id === p.id && t.type === "expense").reduce((a, b) => a + b.amount, 0)
    const resourceCount = db.employees.filter(e => e.project_id === p.id).length
    return { ...p, client_name: client?.name || "", manager_name: manager?.name || "", revenue, expenses, resource_count: resourceCount, margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0" }
  })

  if (status && status !== "all") projects = projects.filter(p => p.status === status)
  if (search) projects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.client_name.toLowerCase().includes(search.toLowerCase()))

  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  const db = getDb()
  const body = await request.json()
  const newProject = { id: db.projects.length + 1, ...body, progress: 0 }
  db.projects.push(newProject)
  return NextResponse.json({ id: newProject.id, message: "Project created" }, { status: 201 })
}
