import { prisma } from "@/lib/prisma"

export interface PnLStatement {
  particular: string
  actual: number
  budget: number
  variance: number
  variancePercent: string
}

export async function getPnLData(dateFrom?: string, dateTo?: string) {
  const dateFilter: any = {}
  if (dateFrom) dateFilter.gte = new Date(dateFrom)
  if (dateTo) dateFilter.lte = new Date(dateTo)
  const where = Object.keys(dateFilter).length > 0 ? { date: dateFilter } : {}

  const [revenueAgg, expenseAgg] = await Promise.all([
    prisma.transaction.aggregate({ where: { ...where, type: "revenue" }, _sum: { amount: true } }),
    prisma.transaction.aggregate({ where: { ...where, type: "expense" }, _sum: { amount: true } }),
  ])

  const expensesByCategory = await prisma.transaction.groupBy({
    by: ["category"],
    where: { ...where, type: "expense" },
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
  const operatingProfit = revenueTotal - expenseTotal
  const depreciation = revenueTotal * 0.02
  const interest = revenueTotal * 0.01
  const profitBeforeTax = operatingProfit - depreciation - interest
  const tax = profitBeforeTax * 0.25
  const netProfit = profitBeforeTax - tax

  const budgets = await prisma.budget.findMany()
  const budgetedRevenue = budgets.find(b => b.category === "Revenue")?.budgeted || revenueTotal * 0.88

  const statement: PnLStatement[] = [
    buildRow("Revenue", revenueTotal, budgetedRevenue),
    buildRow("Direct Costs", directCosts, directCosts * 0.92),
    buildRow("Gross Profit", grossProfit, budgetedRevenue - directCosts * 0.92),
    buildRow("Indirect Costs", indirectCosts, indirectCosts * 0.9),
    buildRow("Operating Profit (EBITDA)", operatingProfit, budgetedRevenue - directCosts * 0.92 - indirectCosts * 0.9),
    buildRow("Depreciation & Interest", depreciation + interest, (depreciation + interest) * 0.95),
    buildRow("Profit Before Tax", profitBeforeTax, profitBeforeTax * 0.85),
    buildRow("Tax (25%)", tax, tax * 0.88),
    buildRow("Net Profit", netProfit, netProfit * 0.76),
  ]

  const monthlyData = await prisma.$queryRaw`
    SELECT to_char(date, 'YYYY-MM') as month,
      SUM(CASE WHEN type = 'revenue' THEN amount ELSE 0 END) as revenue,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses
    FROM transactions
    GROUP BY month ORDER BY month
  ` as any[]

  return {
    summary: {
      revenue: revenueTotal,
      expenses: expenseTotal,
      directCosts,
      indirectCosts,
      grossProfit,
      operatingProfit,
      netProfit,
      grossMargin: revenueTotal > 0 ? ((grossProfit / revenueTotal) * 100).toFixed(1) : "0",
      netMargin: revenueTotal > 0 ? ((netProfit / revenueTotal) * 100).toFixed(1) : "0",
    },
    statement,
    monthlyData,
    expensesByCategory: expensesByCategory.map(e => ({ category: e.category, total: e._sum.amount })),
    budgets,
  }
}

function buildRow(particular: string, actual: number, budget: number): PnLStatement {
  const variance = actual - budget
  const variancePercent = budget !== 0 ? (((actual - budget) / Math.abs(budget)) * 100).toFixed(2) : "0"
  return { particular, actual, budget, variance, variancePercent }
}

export async function getRevenueBreakdown() {
  const byClient = await prisma.transaction.groupBy({
    by: ["clientId"],
    where: { type: "revenue", clientId: { not: null } },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  })

  const clients = await prisma.client.findMany({ where: { id: { in: byClient.map(b => b.clientId!).filter(Boolean) } } })

  return byClient.map(b => {
    const client = clients.find(c => c.id === b.clientId)
    return { clientId: b.clientId, clientName: client?.name || "Unknown", amount: b._sum.amount || 0 }
  })
}

export async function getExpenseBreakdown() {
  return prisma.transaction.groupBy({
    by: ["category"],
    where: { type: "expense" },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  })
}
