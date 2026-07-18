export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET() {
  const db = getDb()
  return NextResponse.json({
    notifications: db.notifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    unreadCount: db.notifications.filter(n => n.is_read === 0).length,
  })
}

export async function PATCH(request: NextRequest) {
  const db = getDb()
  const { id, markAllRead } = await request.json()

  if (markAllRead) {
    db.notifications.forEach(n => { n.is_read = 1 })
  } else if (id) {
    const notif = db.notifications.find(n => n.id === id)
    if (notif) notif.is_read = 1
  }

  return NextResponse.json({ message: "Updated", unreadCount: db.notifications.filter(n => n.is_read === 0).length })
}
