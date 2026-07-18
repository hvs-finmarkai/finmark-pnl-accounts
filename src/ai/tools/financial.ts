import { prisma } from "@/lib/prisma"

export async function getRevenueData() {
  const total = await prisma.transaction.aggregate({ where: { type: "revenue" }, _sum: { amount: true } })
  const byMonth = await prisma.$queryRaw`
    SELECT to_char(date, 'YYYY-MM') as month, SUM(amount) as total
    FROM transactions WHERE type = 'revenue' GROUP BY month ORDER BY month
  ` as any[]
  return { total: total._sum.amount || 0, monthly: byMonth }
}

export async function getExpenseData() {
  const total = await prisma.transaction.aggregate({ where: { type: "expense" }, _sum: { amount: true } })
  const byCategory = await prisma.transaction.groupBy({
    by: ["category"],
    where: { type: "expense" },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  })
  return { total: total._sum.amount || 0, byCategory: byCategory.map(e => ({ category: e.category, amount: e._sum.amount })) }
}

export async function getMarginData() {
  const projects = await prisma.project.findMany({
    include: { client: true, transactions: { select: { type: true, amount: true } } },
  })
  return projects.map(p => {
    const revenue = p.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const cost = p.budget * 0.6
    const margin = revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0
    return { name: p.name, client: p.client.name, status: p.status, budget: p.budget, revenue, margin: margin.toFixed(1), isAtRisk: margin < 15 }
  })
}

export async function getClientProfitability() {
  const clients = await prisma.client.findMany({
    include: { transactions: { select: { type: true, amount: true } } },
  })
  return clients.map(c => {
    const revenue = c.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = c.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)
    return { name: c.name, region: c.region, status: c.status, revenue, expenses, profit: revenue - expenses, margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0" }
  }).sort((a, b) => b.revenue - a.revenue)
}

export async function getWorkforceMetrics() {
  const employees = await prisma.employee.findMany()
  const active = employees.filter(e => e.status === "active")
  const bench = employees.filter(e => e.status === "bench")
  const avgUtil = active.length > 0 ? active.reduce((a, b) => a + b.utilization, 0) / active.length : 0
  const benchCost = bench.reduce((a, b) => a + b.salary, 0)
  return { total: employees.length, active: active.length, bench: bench.length, avgUtilization: avgUtil.toFixed(1), monthlyBenchCost: benchCost, totalMonthlyCost: employees.reduce((a, b) => a + b.salary, 0) }
}

export async function getBudgetVariance() {
  const budgets = await prisma.budget.findMany()
  return budgets.map(b => ({
    category: b.category,
    department: b.department,
    budgeted: b.budgeted,
    actual: b.actual,
    variance: b.actual - b.budgeted,
    variancePercent: b.budgeted > 0 ? (((b.actual - b.budgeted) / b.budgeted) * 100).toFixed(1) : "0",
    isOverBudget: b.actual > b.budgeted,
  }))
}

export async function getProjectRisks() {
  const projects = await prisma.project.findMany({
    where: { status: "at_risk" },
    include: { client: true, manager: true },
  })
  return projects.map(p => ({ name: p.name, client: p.client.name, manager: p.manager.name, budget: p.budget, progress: p.progress, deadline: p.endDate }))
}
