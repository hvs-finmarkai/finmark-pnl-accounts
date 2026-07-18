export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const [revenueAgg, expenseAgg] = await Promise.all([
    prisma.transaction.aggregate({ where: { type: "revenue" }, _sum: { amount: true } }),
    prisma.transaction.aggregate({ where: { type: "expense" }, _sum: { amount: true } }),
  ])

  const expensesByCategory = await prisma.transaction.groupBy({
    by: ["category"],
    where: { type: "expense" },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  })

  const revenueTotal = revenueAgg._sum.amount || 0
  const expenseTotal = expenseAgg._sum.amount || 0
  const categoryMap: Record<string, number> = {}
  expensesByCategory.forEach(e => { categoryMap[e.category || "Other"] = e._sum.amount || 0 })

  const directCosts = (categoryMap["Payroll"] || 0) + (categoryMap["Vendor"] || 0)
  const indirectCosts = expenseTotal - directCosts
  const grossProfit = revenueTotal - directCosts
  const netProfit = revenueTotal - expenseTotal

  const budgetedRevenue = revenueTotal * 0.88

  const statement = [
    { particular: "Revenue", actual: revenueTotal, budget: budgetedRevenue },
    { particular: "Direct Costs", actual: directCosts, budget: directCosts * 0.92 },
    { particular: "Gross Profit", actual: grossProfit, budget: budgetedRevenue - directCosts * 0.92 },
    { particular: "Indirect Costs", actual: indirectCosts, budget: indirectCosts * 0.9 },
    { particular: "Operating Profit", actual: netProfit + indirectCosts * 0.1, budget: budgetedRevenue - directCosts * 0.92 - indirectCosts * 0.9 },
    { particular: "Taxes (25%)", actual: netProfit * 0.25, budget: netProfit * 0.22 },
    { particular: "Net Profit", actual: netProfit, budget: netProfit * 0.76 },
  ].map(row => ({ ...row, variance: row.actual - row.budget, variancePercent: row.budget !== 0 ? (((row.actual - row.budget) / Math.abs(row.budget)) * 100).toFixed(2) : "0" }))

  const monthlyData = await prisma.$queryRaw`
    SELECT to_char(date, 'YYYY-MM') as month,
      SUM(CASE WHEN type = 'revenue' THEN amount ELSE 0 END) as revenue,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
    FROM transactions GROUP BY month ORDER BY month
  ` as any[]

  const budgets = await prisma.budget.findMany()

  return NextResponse.json({
    summary: { revenue: revenueTotal, expenses: expenseTotal, directCosts, indirectCosts, grossProfit, netProfit, grossMargin: revenueTotal > 0 ? ((grossProfit / revenueTotal) * 100).toFixed(1) : "0", netMargin: revenueTotal > 0 ? ((netProfit / revenueTotal) * 100).toFixed(1) : "0" },
    statement,
    monthlyData,
    expensesByCategory: expensesByCategory.map(e => ({ category: e.category, total: e._sum.amount })),
    budgets,
  })
}
