"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"

export default function ProfitabilityPage() {
  const [clients, setClients] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/clients").then(r => r.json()).then(setClients)
  }, [])

  if (!clients.length) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const chartData = clients.map((c: any) => ({
    name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
    margin: parseFloat(c.margin),
    revenue: c.revenue / 1000000,
  }))

  return (
    <div className="space-y-6">
      <PageHeader title="Client Profitability" description="Analyze profit margins across all clients" />

      <ChartCard title="Margin by Client" description="Profit margin percentage">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" unit="%" />
              <Tooltip />
              <Bar dataKey="margin" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Margin %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Client</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Revenue</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Expenses</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Profit</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Margin</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c: any) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{c.name}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(c.revenue)}</td>
                <td className="py-3 px-4 text-right text-red-500">{formatCurrency(c.expenses)}</td>
                <td className="py-3 px-4 text-right text-emerald-500">{formatCurrency(c.revenue - c.expenses)}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`font-medium ${parseFloat(c.margin) >= 20 ? "text-emerald-500" : parseFloat(c.margin) >= 10 ? "text-amber-500" : "text-red-500"}`}>
                    {c.margin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
