"use client"

import { DollarSign, TrendingUp, TrendingDown, Target, Percent } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const monthlyPnL = [
  { month: "Jan", revenue: 95, expenses: 72, profit: 23 },
  { month: "Feb", revenue: 102, expenses: 76, profit: 26 },
  { month: "Mar", revenue: 110, expenses: 80, profit: 30 },
  { month: "Apr", revenue: 118, expenses: 85, profit: 33 },
  { month: "May", revenue: 125.8, expenses: 91.1, profit: 34.7 },
]

const expenseBreakdown = [
  { category: "Payroll", amount: 45.2 },
  { category: "Vendor Payments", amount: 18.6 },
  { category: "Overheads", amount: 12.3 },
  { category: "Travel", amount: 8.4 },
  { category: "Technology", amount: 4.2 },
  { category: "Others", amount: 2.4 },
]

const detailedPnL = [
  { particular: "Revenue", actual: 125.80, budget: 110.20, variance: 15.60, percent: 14.16 },
  { particular: "Direct Costs", actual: 72.40, budget: 65.10, variance: -7.30, percent: -11.21 },
  { particular: "Gross Profit", actual: 53.40, budget: 45.10, variance: 8.30, percent: 18.40 },
  { particular: "Indirect Costs", actual: 18.70, budget: 16.20, variance: -2.50, percent: -15.43 },
  { particular: "Operating Profit", actual: 34.70, budget: 28.90, variance: 5.80, percent: 20.07 },
  { particular: "Taxes", actual: 8.68, budget: 7.23, variance: -1.45, percent: -20.06 },
  { particular: "Net Profit", actual: 18.60, budget: 14.20, variance: 4.40, percent: 30.98 },
]

export default function PnLOverviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="P&L Management"
        description="Comprehensive Profit & Loss overview across all business units"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button>Generate Report</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Revenue" value="₹125.8M" change={18.5} icon={DollarSign} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Expenses" value="₹91.1M" change={12.3} trend="up" icon={TrendingDown} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
        <KPICard title="Gross Profit" value="₹53.4M" change={18.4} icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Net Profit" value="₹18.6M" change={30.9} icon={Target} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Net Margin" value="14.8%" change={2.1} icon={Percent} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly P&L Trend" description="Revenue, Expenses & Profit (₹M)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyPnL}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Expense Breakdown" description="By category (₹M)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={100} />
                <Tooltip />
                <Bar dataKey="amount" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Amount (₹M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>P&L Statement</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">This Month</Button>
              <Button variant="ghost" size="sm">Quarter</Button>
              <Button variant="ghost" size="sm">Year</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-3 text-left font-medium">Particulars</th>
                  <th className="py-3 text-right font-medium">Actual (₹M)</th>
                  <th className="py-3 text-right font-medium">Budget (₹M)</th>
                  <th className="py-3 text-right font-medium">Variance</th>
                  <th className="py-3 text-right font-medium">Variance %</th>
                </tr>
              </thead>
              <tbody>
                {detailedPnL.map((row) => (
                  <tr key={row.particular} className="border-b last:border-0">
                    <td className="py-3 font-medium">{row.particular}</td>
                    <td className="py-3 text-right">{row.actual.toFixed(2)}</td>
                    <td className="py-3 text-right">{row.budget.toFixed(2)}</td>
                    <td className={`py-3 text-right font-medium ${row.particular === "Net Profit" || row.particular === "Gross Profit" || row.particular === "Operating Profit" || row.particular === "Revenue" ? "text-emerald-500" : "text-red-500"}`}>
                      {row.variance > 0 ? "+" : ""}{row.variance.toFixed(2)}
                    </td>
                    <td className={`py-3 text-right font-medium ${row.particular === "Net Profit" || row.particular === "Gross Profit" || row.particular === "Operating Profit" || row.particular === "Revenue" ? "text-emerald-500" : "text-red-500"}`}>
                      {row.percent > 0 ? "+" : ""}{row.percent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
