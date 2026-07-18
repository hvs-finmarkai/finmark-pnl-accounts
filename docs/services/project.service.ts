import { prisma } from "@/lib/prisma"
import { ProjectStatus } from "@prisma/client"

export async function getProjects(filters?: { status?: string; search?: string }) {
  const where: any = {}

  if (filters?.status && filters.status !== "all") {
    where.status = filters.status.replace("-", "_") as ProjectStatus
  }
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { client: { name: { contains: filters.search, mode: "insensitive" } } },
    ]
  }

  const projects = await prisma.project.findMany({
    where,
    include: {
      client: { select: { name: true } },
      manager: { select: { name: true } },
      employees: { select: { id: true } },
      transactions: { select: { type: true, amount: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return projects.map(p => {
    const revenue = p.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = p.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)
    return {
      id: p.id,
      name: p.name,
      status: p.status,
      priority: p.priority,
      budget: p.budget,
      startDate: p.startDate,
      endDate: p.endDate,
      progress: p.progress,
      description: p.description,
      clientName: p.client.name,
      managerName: p.manager.name,
      resourceCount: p.employees.length,
      revenue,
      expenses,
      margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0",
    }
  })
}

export async function createProject(data: any) {
  return prisma.project.create({ data })
}
