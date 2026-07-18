export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const [revenueAgg, expenseAgg, activeProjects, atRiskProjects, activeEmployees, benchEmployees, activeClients, unreadNotifs, recentNotifications] = await Promise.all([
    prisma.transaction.aggregate({ where: { type: "revenue" }, _sum: { amount: true } }),
    prisma.transaction.aggregate({ where: { type: "expense" }, _sum: { amount: true } }),
    prisma.project.count({ where: { status: { in: ["in_progress", "planning"] } } }),
    prisma.project.count({ where: { status: "at_risk" } }),
    prisma.employee.count({ where: { status: "active" } }),
    prisma.employee.count({ where: { status: "bench" } }),
    prisma.client.count({ where: { status: "active" } }),
    prisma.notification.count({ where: { userId: 1, isRead: false } }),
    prisma.notification.findMany({ where: { userId: 1 }, orderBy: { createdAt: "desc" }, take: 5 }),
  ])

  const revenue = revenueAgg._sum.amount || 0
  const expenses = expenseAgg._sum.amount || 0
  const grossProfit = revenue - expenses

  const topProjects = await prisma.project.findMany({
    include: { client: true, transactions: { where: { type: "revenue" } } },
    orderBy: { budget: "desc" },
    take: 5,
  })

  const topClients = await prisma.client.findMany({
    include: { transactions: { where: { type: "revenue" } } },
    orderBy: { contractValue: "desc" },
  })

  const expensesByCategory = await prisma.transaction.groupBy({
    by: ["category"],
    where: { type: "expense" },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  })

  return NextResponse.json({
    kpis: {
      revenue,
      expenses,
      grossProfit,
      netProfit: grossProfit * 0.53,
      netMargin: revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(1) : "0",
      grossMargin: revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(1) : "0",
      activeProjects,
      atRiskProjects,
      totalEmployees: activeEmployees,
      benchEmployees,
      activeClients,
      unreadNotifications: unreadNotifs,
    },
    topProjects: topProjects.map(p => {
      const rev = p.transactions.reduce((a, t) => a + t.amount, 0)
      return { id: p.id, name: p.name, status: p.status, budget: p.budget, client_name: p.client.name, revenue: rev, margin: rev > 0 ? (((rev - p.budget * 0.6) / rev) * 100).toFixed(1) : "0" }
    }),
    topClients: topClients.map(c => ({ id: c.id, name: c.name, status: c.status, contractValue: c.contractValue, revenue: c.transactions.reduce((a, t) => a + t.amount, 0) })),
    expensesByCategory: expensesByCategory.map(e => ({ category: e.category, total: e._sum.amount })),
    recentNotifications,
  })
}
