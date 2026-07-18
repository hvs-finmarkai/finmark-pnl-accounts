export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"

export async function GET() {
  const db = getDb()

  const revenueTotal = db.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
  const expenseTotal = db.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)

  const expensesByCategory = Object.entries(
    db.transactions.filter(t => t.type === "expense").reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
  ).map(([category, total]) => ({ category, total })).sort((a: any, b: any) => b.total - a.total)

  const directCosts = expensesByCategory.filter((e: any) => ["Payroll", "Vendor"].includes(e.category)).reduce((a: number, b: any) => a + (b.total as number), 0)
  const indirectCosts = expenseTotal - directCosts
  const grossProfit = revenueTotal - directCosts
  const netProfit = revenueTotal - expenseTotal

  const monthlyData = Object.entries(
    db.transactions.reduce((acc: any, t) => {
      const month = t.date.slice(0, 7)
      if (!acc[month]) acc[month] = { revenue: 0, expenses: 0 }
      if (t.type === "revenue") acc[month].revenue += t.amount
      else acc[month].expenses += t.amount
      return acc
    }, {})
  ).map(([month, data]: any) => ({ month, ...data })).sort((a: any, b: any) => a.month.localeCompare(b.month))

  const statement = [
    { particular: "Revenue", actual: revenueTotal, budget: revenueTotal * 0.88 },
    { particular: "Direct Costs", actual: directCosts, budget: directCosts * 0.92 },
    { particular: "Gross Profit", actual: grossProfit, budget: (revenueTotal * 0.88) - (directCosts * 0.92) },
    { particular: "Indirect Costs", actual: indirectCosts, budget: indirectCosts * 0.9 },
    { particular: "Operating Profit", actual: netProfit + (indirectCosts * 0.1), budget: (revenueTotal * 0.88) - (directCosts * 0.92) - (indirectCosts * 0.9) },
    { particular: "Taxes", actual: netProfit * 0.25, budget: netProfit * 0.22 },
    { particular: "Net Profit", actual: netProfit, budget: netProfit * 0.76 },
  ].map(row => ({
    ...row,
    variance: row.actual - row.budget,
    variancePercent: row.budget !== 0 ? (((row.actual - row.budget) / Math.abs(row.budget)) * 100).toFixed(2) : "0",
  }))

  return NextResponse.json({
    summary: { revenue: revenueTotal, expenses: expenseTotal, directCosts, indirectCosts, grossProfit, netProfit, grossMargin: revenueTotal > 0 ? ((grossProfit / revenueTotal) * 100).toFixed(1) : "0", netMargin: revenueTotal > 0 ? ((netProfit / revenueTotal) * 100).toFixed(1) : "0" },
    statement,
    monthlyData,
    expensesByCategory,
    budgets: db.budgets,
  })
}
