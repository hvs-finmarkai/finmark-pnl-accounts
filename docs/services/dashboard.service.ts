import { prisma } from "@/lib/prisma"

export async function getDashboardData() {
  const [
    revenueAgg,
    expenseAgg,
    activeProjects,
    atRiskProjects,
    activeEmployees,
    benchEmployees,
    activeClients,
    unreadNotifs,
    recentNotifications,
    topProjectsRaw,
  ] = await Promise.all([
    prisma.transaction.aggregate({ where: { type: "revenue" }, _sum: { amount: true } }),
    prisma.transaction.aggregate({ where: { type: "expense" }, _sum: { amount: true } }),
    prisma.project.count({ where: { status: { in: ["in_progress", "planning"] } } }),
    prisma.project.count({ where: { status: "at_risk" } }),
    prisma.employee.count({ where: { status: "active" } }),
    prisma.employee.count({ where: { status: "bench" } }),
    prisma.client.count({ where: { status: "active" } }),
    prisma.notification.count({ where: { userId: 1, isRead: false } }),
    prisma.notification.findMany({ where: { userId: 1 }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.project.findMany({
      include: { client: true, transactions: { where: { type: "revenue" } } },
      orderBy: { budget: "desc" },
      take: 5,
    }),
  ])

  const revenue = revenueAgg._sum.amount || 0
  const expenses = expenseAgg._sum.amount || 0
  const grossProfit = revenue - expenses

  const monthlyRevenue = await prisma.$queryRaw`
    SELECT to_char(date, 'YYYY-MM') as month, SUM(amount) as total
    FROM transactions WHERE type = 'revenue'
    GROUP BY month ORDER BY month
  ` as any[]

  const expensesByCategory = await prisma.$queryRaw`
    SELECT category, SUM(amount) as total
    FROM transactions WHERE type = 'expense'
    GROUP BY category ORDER BY total DESC
  ` as any[]

  const topProjects = topProjectsRaw.map(p => {
    const rev = p.transactions.reduce((a: number, t: any) => a + t.amount, 0)
    return {
      id: p.id,
      name: p.name,
      status: p.status,
      budget: p.budget,
      client_name: p.client.name,
      revenue: rev,
      margin: rev > 0 ? (((rev - p.budget * 0.6) / rev) * 100).toFixed(1) : "0",
    }
  })

  const topClients = await prisma.client.findMany({
    include: { transactions: { where: { type: "revenue" } } },
    orderBy: { contractValue: "desc" },
  })

  return {
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
    monthlyRevenue,
    expensesByCategory,
    topProjects,
    topClients: topClients.map(c => ({
      ...c,
      revenue: c.transactions.reduce((a: number, t: any) => a + t.amount, 0),
      transactions: undefined,
    })),
    recentNotifications,
  }
}
