export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const db = getDb()
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (!q || q.length < 2) return NextResponse.json({ results: [] })

  const lower = q.toLowerCase()

  const clients = db.clients.filter(c => c.name.toLowerCase().includes(lower)).slice(0, 5).map(c => ({ id: c.id, name: c.name, type: "client", subtitle: c.region }))
  const projects = db.projects.filter(p => p.name.toLowerCase().includes(lower)).slice(0, 5).map(p => ({ id: p.id, name: p.name, type: "project", subtitle: p.status }))
  const employees = db.employees.filter(e => e.name.toLowerCase().includes(lower) || e.role.toLowerCase().includes(lower)).slice(0, 5).map(e => ({ id: e.id, name: e.name, type: "employee", subtitle: e.department }))

  return NextResponse.json({ results: [...clients, ...projects, ...employees] })
}
