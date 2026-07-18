export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { status: "at_risk" },
    include: { client: true, transactions: { select: { type: true, amount: true } } },
  })

  const budgets = await prisma.budget.findMany()
  const overBudget = budgets.filter(b => b.actual > b.budgeted)

  const invoices = await prisma.invoice.findMany({
    where: { status: "overdue" },
    include: { client: true },
  })

  const anomalies = []

  for (const p of projects) {
    const revenue = p.transactions.filter(t => t.type === "revenue").reduce((a, b) => a + b.amount, 0)
    const margin = revenue > 0 ? ((revenue - p.budget * 0.6) / revenue) * 100 : 0
    if (margin < 15) {
      anomalies.push({
        severity: margin < 10 ? "high" : "medium",
        title: `${p.name} margin at ${margin.toFixed(1)}%`,
        description: `Project for ${p.client.name} has margin below threshold. Budget: ₹${(p.budget / 100000).toFixed(0)}L, Revenue: ₹${(revenue / 100000).toFixed(0)}L`,
        category: "Margin Drop",
        detected: "Real-time",
      })
    }
  }

  for (const b of overBudget) {
    const variance = ((b.actual - b.budgeted) / b.budgeted * 100).toFixed(0)
    anomalies.push({
      severity: Number(variance) > 20 ? "high" : "medium",
      title: `${b.category} over budget by ${variance}%`,
      description: `${b.department} department: Budgeted ₹${(b.budgeted / 100000).toFixed(0)}L, Actual ₹${(b.actual / 100000).toFixed(0)}L`,
      category: "Budget Overrun",
      detected: "Real-time",
    })
  }

  for (const inv of invoices) {
    anomalies.push({
      severity: "medium",
      title: `Overdue invoice from ${inv.client.name}`,
      description: `${inv.invoiceNumber}: ₹${(inv.amount / 100000).toFixed(1)}L overdue since ${inv.dueDate?.toISOString().split("T")[0]}`,
      category: "Payment Delay",
      detected: "Real-time",
    })
  }

  return NextResponse.json({ anomalies })
}
