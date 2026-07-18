export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  const db = getDb()
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get("client_id")

  let contracts = db.contracts.map(ct => {
    const client = db.clients.find(c => c.id === ct.client_id)
    return { ...ct, client_name: client?.name || "" }
  })

  if (clientId) contracts = contracts.filter(c => c.client_id === parseInt(clientId))

  const totalActiveValue = db.contracts.filter(c => c.status === "active").reduce((a, b) => a + b.value, 0)

  return NextResponse.json({ contracts, totalActiveValue })
}
