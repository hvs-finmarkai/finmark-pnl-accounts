"use client"

import { useEffect, useState } from "react"
import { DollarSign, TrendingUp, TrendingDown, Target, Percent } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/shared/toast-provider"
import { downloadCSV } from "@/lib/download"
import { formatCurrency } from "@/lib/utils"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function PnLOverviewPage() {
  const { toast } = useToast()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/pnl").then(r => r.json()).then(setData)
  }, [])

  function handleExport() {
    if (!data) return
    downloadCSV(data.statement.map((r: any) => ({
      Particulars: r.particular,
      "Actual (₹)": r.actual.toFixed(0),
      "Budget (₹)": r.budget.toFixed(0),
      "Variance (₹)": r.variance.toFixed(0),
      "Variance %": r.variancePercent,
    })), "pnl_statement")
    toast("P&L Statement exported as CSV")
  }

  function handleGenerateReport() {
    if (!data) return
    const report = `P&L REPORT - Generated ${new Date().toLocaleDateString()}\n\nRevenue: ${formatCurrency(data.summary.revenue)}\nExpenses: ${formatCurrency(data.summary.expenses)}\nGross Profit: ${formatCurrency(data.summary.grossProfit)}\nNet Profit: ${formatCurrency(data.summary.netProfit)}\nGross Margin: ${data.summary.grossMargin}%\nNet Margin: ${data.summary.netMargin}%\n\nDETAILED STATEMENT:\n${data.statement.map((r: any) => `${r.particular}: Actual ₹${(r.actual/100000).toFixed(0)}L | Budget ₹${(r.budget/100000).toFixed(0)}L | Variance ${r.variancePercent}%`).join("\n")}`
    const blob = new Blob([report], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `PnL_Report_${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast("Report generated and downloaded")
  }

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const { summary, statement, monthlyData, expensesByCategory } = data

  return (
    <div className="space-y-6">
      <PageHeader
        title="P&L Management"
        description="Comprehensive Profit & Loss overview across all business units"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>Export</Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Revenue" value={formatCurrency(summary.revenue)} change={18.5} icon={DollarSign} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Expenses" value={formatCurrency(summary.expenses)} change={12.3} trend="up" icon={TrendingDown} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
        <KPICard title="Gross Profit" value={formatCurrency(summary.grossProfit)} change={18.4} icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Net Profit" value={formatCurrency(summary.netProfit)} change={30.9} icon={Target} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Net Margin" value={`${summary.netMargin}%`} change={2.1} icon={Percent} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly P&L Trend" description="Revenue & Expenses (₹Cr)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={(monthlyData || []).map((m: any) => ({ month: m.month, revenue: Number(m.revenue) / 10000000, expenses: Number(m.expenses) / 10000000 }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Expense Breakdown" description="By category (₹Cr)">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={(expensesByCategory || []).map((e: any) => ({ category: e.category, amount: (e.total || 0) / 10000000 }))} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip />
                <Bar dataKey="amount" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Amount (₹Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>P&L Statement</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExport}>Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="py-3 text-left font-medium">Particulars</th>
                  <th className="py-3 text-right font-medium">Actual (₹)</th>
                  <th className="py-3 text-right font-medium">Budget (₹)</th>
                  <th className="py-3 text-right font-medium">Variance</th>
                  <th className="py-3 text-right font-medium">Variance %</th>
                </tr>
              </thead>
              <tbody>
                {statement.map((row: any) => (
                  <tr key={row.particular} className="border-b last:border-0">
                    <td className="py-3 font-medium">{row.particular}</td>
                    <td className="py-3 text-right">{formatCurrency(row.actual)}</td>
                    <td className="py-3 text-right">{formatCurrency(row.budget)}</td>
                    <td className={`py-3 text-right font-medium ${row.variance >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {row.variance >= 0 ? "+" : ""}{formatCurrency(Math.abs(row.variance))}
                    </td>
                    <td className={`py-3 text-right font-medium ${parseFloat(row.variancePercent) >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                      {parseFloat(row.variancePercent) >= 0 ? "+" : ""}{row.variancePercent}%
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
