"use client"

import { useEffect, useState } from "react"
import { DollarSign, TrendingUp, FileText, Clock } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useToast } from "@/components/shared/toast-provider"
import { downloadCSV } from "@/lib/download"

const defaultRevenueBySource = [
  { source: "Project Delivery", amount: 85.6 },
  { source: "Consulting", amount: 22.4 },
  { source: "Support", amount: 12.8 },
  { source: "Training", amount: 5.0 },
]

const defaultMonthlyRevenue = [
  { month: "Jan", invoiced: 95, collected: 88 },
  { month: "Feb", invoiced: 102, collected: 95 },
  { month: "Mar", invoiced: 110, collected: 103 },
  { month: "Apr", invoiced: 118, collected: 112 },
  { month: "May", invoiced: 125.8, collected: 118 },
]

const defaultClients = [
  { name: "TechCorp Inc.", revenue: 25.6, growth: 22.1, share: 20.3 },
  { name: "Global Solutions", revenue: 18.7, growth: 15.8, share: 14.9 },
  { name: "InnovateX", revenue: 15.2, growth: 28.4, share: 12.1 },
  { name: "HealthPlus", revenue: 12.3, growth: 8.5, share: 9.8 },
  { name: "FidServe Global", revenue: 11.7, growth: -2.3, share: 9.3 },
]

export default function RevenuePage() {
  const [revenueBySource, setRevenueBySource] = useState(defaultRevenueBySource)
  const [monthlyRevenue, setMonthlyRevenue] = useState(defaultMonthlyRevenue)
  const [clients] = useState(defaultClients)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/pnl")
      .then(r => r.json())
      .then(data => {
        if (data.monthlyData && data.monthlyData.length > 0) {
          setMonthlyRevenue(data.monthlyData.map((m: any) => ({
            month: m.month,
            invoiced: Number(m.revenue) / 1_000_000,
            collected: Number(m.revenue) * 0.94 / 1_000_000,
          })))
        }
      })
      .catch(() => {})
  }, [])

  const handleExport = () => {
    const rows = [
      ...revenueBySource.map(r => ({
        Type: "Revenue Source",
        Name: r.source,
        "Amount (₹M)": r.amount,
      })),
      ...clients.map(c => ({
        Type: "Client",
        Name: c.name,
        "Revenue (₹M)": c.revenue,
        "Growth %": c.growth,
        "Share %": c.share,
      })),
    ]
    downloadCSV(rows, "revenue_report")
    toast("Revenue data exported successfully", "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue"
        description="Track revenue sources, invoices, and collections"
        actions={<Button variant="outline" onClick={handleExport}>Export</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value="₹125.8M" change={18.5} icon={DollarSign} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Revenue Growth" value="18.5%" change={3.2} icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Pending Invoices" value="₹7.8M" change={-5.2} trend="down" icon={FileText} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
        <KPICard title="Avg Collection Days" value="32 days" change={-4.1} trend="down" icon={Clock} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Revenue by Source" description="Breakdown by service type (₹M)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueBySource}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="source" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Amount (₹M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Invoiced vs Collected" description="Monthly comparison (₹M)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <Bar dataKey="invoiced" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Invoiced" />
                <Bar dataKey="collected" fill="#10B981" radius={[4, 4, 0, 0]} name="Collected" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Revenue Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-3 text-left font-medium">Client</th>
                <th className="py-3 text-right font-medium">Revenue (₹M)</th>
                <th className="py-3 text-right font-medium">Growth</th>
                <th className="py-3 text-right font-medium">Share</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.name} className="border-b last:border-0">
                  <td className="py-3 font-medium">{client.name}</td>
                  <td className="py-3 text-right">₹{client.revenue}M</td>
                  <td className={`py-3 text-right font-medium ${client.growth > 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {client.growth > 0 ? "+" : ""}{client.growth}%
                  </td>
                  <td className="py-3 text-right">{client.share}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
