export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET() {
  const db = getDb()

  const revenueTotal = db.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
  const expenseTotal = db.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)
  const grossProfit = revenueTotal - expenseTotal
  const activeProjects = db.projects.filter(p => ["in-progress", "planning"].includes(p.status)).length
  const atRiskProjects = db.projects.filter(p => p.status === "at-risk").length
  const activeEmployees = db.employees.filter(e => e.status === "active").length
  const benchEmployees = db.employees.filter(e => e.status === "bench").length
  const unreadNotifs = db.notifications.filter(n => n.is_read === 0).length

  const monthlyRevenue = Object.entries(
    db.transactions.filter(t => t.type === "revenue").reduce((acc: any, t) => {
      const month = t.date.slice(0, 7)
      acc[month] = (acc[month] || 0) + t.amount
      return acc
    }, {})
  ).map(([month, total]) => ({ month, total }))

  const expensesByCategory = Object.entries(
    db.transactions.filter(t => t.type === "expense").reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
  ).map(([category, total]) => ({ category, total })).sort((a: any, b: any) => b.total - a.total)

  const topProjects = db.projects.map(p => {
    const rev = db.transactions.filter(t => t.project_id === p.id && t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    return { ...p, revenue: rev, margin: rev > 0 ? (((rev - p.budget * 0.6) / rev) * 100).toFixed(1) : "0" }
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  const topClients = db.clients.map(c => {
    const rev = db.transactions.filter(t => t.client_id === c.id && t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    return { ...c, revenue: rev }
  }).sort((a, b) => b.revenue - a.revenue)

  return NextResponse.json({
    kpis: {
      revenue: revenueTotal,
      expenses: expenseTotal,
      grossProfit,
      netProfit: grossProfit * 0.53,
      netMargin: revenueTotal > 0 ? ((grossProfit / revenueTotal) * 100).toFixed(1) : "0",
      grossMargin: revenueTotal > 0 ? ((grossProfit / revenueTotal) * 100).toFixed(1) : "0",
      activeProjects,
      atRiskProjects,
      totalEmployees: activeEmployees,
      benchEmployees,
      activeClients: db.clients.filter(c => c.status === "active").length,
      unreadNotifications: unreadNotifs,
    },
    monthlyRevenue,
    expensesByCategory,
    topProjects,
    topClients,
    recentNotifications: db.notifications.slice(0, 5),
  })
}
