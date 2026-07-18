"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Target, BarChart3, AlertTriangle } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function ForecastPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/pnl").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const forecastData = [
    ...(data.monthlyData || []).map((m: any) => ({ month: m.month, actual: m.revenue / 1000000, forecast: null })),
    { month: "2025-06", actual: null, forecast: 132 },
    { month: "2025-07", actual: null, forecast: 138 },
    { month: "2025-08", actual: null, forecast: 142.5 },
    { month: "2025-09", actual: null, forecast: 148 },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Forecast" description="Revenue and profit projections based on current trends" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Q3 Forecast Revenue" value="₹142.5M" change={13.3} icon={TrendingUp} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Q3 Forecast Profit" value="₹21.2M" change={14.0} icon={Target} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Forecast Accuracy" value="87%" change={2.1} icon={BarChart3} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
        <KPICard title="Risk Adjusted" value="₹135.8M" change={-4.7} trend="down" icon={AlertTriangle} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
      </div>

      <ChartCard title="Revenue Forecast" description="Actual vs Projected (₹M)">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual" connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Forecast" connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <Card>
        <CardHeader><CardTitle>Forecast Assumptions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Revenue Drivers</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Project pipeline</span><span className="font-medium">₹45M</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Recurring revenue</span><span className="font-medium">₹38M</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">New business</span><span className="font-medium">₹12M</span></div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Cost Assumptions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Headcount growth</span><span className="font-medium">+5%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Salary increase</span><span className="font-medium">+8%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Vendor inflation</span><span className="font-medium">+3%</span></div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Risk Factors</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Client churn risk</span><span className="font-medium text-amber-500">Medium</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Market conditions</span><span className="font-medium text-emerald-500">Stable</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Resource availability</span><span className="font-medium text-amber-500">Tight</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
