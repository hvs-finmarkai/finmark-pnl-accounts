"use client"

import { Target, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const budgetData = [
  { department: "Engineering", budget: 42, actual: 38.5 },
  { department: "Sales", budget: 25, actual: 26.8 },
  { department: "Operations", budget: 18, actual: 16.2 },
  { department: "Marketing", budget: 12, actual: 11.5 },
  { department: "HR", budget: 8, actual: 7.8 },
]

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget vs Actual"
        description="Compare budgeted figures against actual spending"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">Download</Button>
            <Button>Revise Budget</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Budget" value="₹110.2M" change={0} trend="flat" icon={Target} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Actual Spending" value="₹91.1M" change={-17.3} trend="down" icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Under Budget" value="₹19.1M" change={17.3} icon={CheckCircle2} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Over Budget Items" value="2" change={-1} trend="down" icon={AlertTriangle} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
      </div>

      <ChartCard title="Budget vs Actual by Department" description="Values in ₹M">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Budget (₹M)" />
              <Bar dataKey="actual" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Actual (₹M)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <Card>
        <CardHeader>
          <CardTitle>Variance Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-3 text-left font-medium">Department</th>
                <th className="py-3 text-right font-medium">Budget (₹M)</th>
                <th className="py-3 text-right font-medium">Actual (₹M)</th>
                <th className="py-3 text-right font-medium">Variance</th>
                <th className="py-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((row) => {
                const variance = row.budget - row.actual
                return (
                  <tr key={row.department} className="border-b last:border-0">
                    <td className="py-3 font-medium">{row.department}</td>
                    <td className="py-3 text-right">₹{row.budget}M</td>
                    <td className="py-3 text-right">₹{row.actual}M</td>
                    <td className={`py-3 text-right font-medium ${variance >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {variance >= 0 ? "+" : ""}{variance.toFixed(1)}M
                    </td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${variance >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                        {variance >= 0 ? "Under" : "Over"} Budget
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
