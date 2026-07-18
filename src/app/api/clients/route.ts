export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const db = getDb()
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")

  let clients = db.clients.map(c => {
    const revenue = db.transactions.filter(t => t.client_id === c.id && t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = db.transactions.filter(t => t.client_id === c.id && t.type === "expense").reduce((a, b) => a + b.amount, 0)
    const projectCount = db.projects.filter(p => p.client_id === c.id).length
    return { ...c, revenue, expenses, project_count: projectCount, margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0" }
  })

  if (status && status !== "all") clients = clients.filter(c => c.status === status)
  if (search) clients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase()))

  return NextResponse.json(clients.sort((a, b) => b.revenue - a.revenue))
}

export async function POST(request: NextRequest) {
  const db = getDb()
  const body = await request.json()
  const newClient = { id: db.clients.length + 1, ...body, status: body.status || "active", health_score: 80 }
  db.clients.push(newClient)
  return NextResponse.json({ id: newClient.id, message: "Client created" }, { status: 201 })
}
