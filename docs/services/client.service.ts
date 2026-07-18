import { prisma } from "@/lib/prisma"
import { ClientStatus } from "@prisma/client"

export async function getClients(filters?: { status?: string; search?: string }) {
  const where: any = {}

  if (filters?.status && filters.status !== "all") {
    where.status = filters.status as ClientStatus
  }
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { industry: { contains: filters.search, mode: "insensitive" } },
      { region: { contains: filters.search, mode: "insensitive" } },
    ]
  }

  const clients = await prisma.client.findMany({
    where,
    include: {
      projects: { select: { id: true } },
      transactions: { select: { type: true, amount: true } },
    },
    orderBy: { contractValue: "desc" },
  })

  return clients.map(c => {
    const revenue = c.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const expenses = c.transactions.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0)
    return {
      id: c.id,
      name: c.name,
      industry: c.industry,
      region: c.region,
      status: c.status,
      contractValue: c.contractValue,
      healthScore: c.healthScore,
      contactPerson: c.contactPerson,
      contactEmail: c.contactEmail,
      revenue,
      expenses,
      projectCount: c.projects.length,
      margin: revenue > 0 ? (((revenue - expenses) / revenue) * 100).toFixed(1) : "0",
    }
  })
}

export async function createClient(data: {
  name: string
  industry?: string
  region?: string
  contractValue?: number
  contactPerson?: string
  contactEmail?: string
}) {
  return prisma.client.create({ data: { ...data, contractValue: data.contractValue || 0 } })
}

export async function getClientById(id: number) {
  return prisma.client.findUnique({
    where: { id },
    include: { projects: true, contracts: true, invoices: true, transactions: true },
  })
}
