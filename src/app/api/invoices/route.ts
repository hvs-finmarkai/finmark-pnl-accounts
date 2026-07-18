export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const db = getDb()
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("client_id")
  const status = searchParams.get("status")

  let invoices = db.invoices.map(inv => {
    const client = db.clients.find(c => c.id === inv.client_id)
    const project = db.projects.find(p => p.id === inv.project_id)
    return { ...inv, client_name: client?.name || "", project_name: project?.name || "" }
  })

  if (clientId) invoices = invoices.filter(i => i.client_id === parseInt(clientId))
  if (status && status !== "all") invoices = invoices.filter(i => i.status === status)

  const totals = {
    total: db.invoices.reduce((a, b) => a + b.amount, 0),
    paid: db.invoices.filter(i => i.status === "paid").reduce((a, b) => a + b.amount, 0),
    pending: db.invoices.filter(i => i.status === "pending").reduce((a, b) => a + b.amount, 0),
    overdue: db.invoices.filter(i => i.status === "overdue").reduce((a, b) => a + b.amount, 0),
  }

  return NextResponse.json({ invoices, totals })
}
