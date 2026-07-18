export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = getCurrentUser()
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  return NextResponse.json({ user })
}
