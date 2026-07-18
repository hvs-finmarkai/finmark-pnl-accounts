export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const notifications = await prisma.notification.findMany({ where: { userId: 1 }, orderBy: { createdAt: "desc" } })
  const unreadCount = await prisma.notification.count({ where: { userId: 1, isRead: false } })
  return NextResponse.json({ notifications, unreadCount })
}

export async function PATCH(request: NextRequest) {
  const { id, markAllRead } = await request.json()

  if (markAllRead) {
    await prisma.notification.updateMany({ where: { userId: 1 }, data: { isRead: true } })
  } else if (id) {
    await prisma.notification.update({ where: { id }, data: { isRead: true } })
  }

  const unreadCount = await prisma.notification.count({ where: { userId: 1, isRead: false } })
  return NextResponse.json({ message: "Updated", unreadCount })
}
