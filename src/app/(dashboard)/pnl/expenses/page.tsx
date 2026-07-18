"use client"

import { useEffect, useState } from "react"
import { Wallet, TrendingDown, CreditCard, AlertTriangle } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useToast } from "@/components/shared/toast-provider"
import { downloadCSV } from "@/lib/download"

const defaultExpenseData = [
  { name: "Payroll", value: 45.2, color: "#3B82F6" },
  { name: "Vendor Payments", value: 18.6, color: "#10B981" },
  { name: "Overheads", value: 12.3, color: "#F59E0B" },
  { name: "Travel", value: 8.4, color: "#8B5CF6" },
  { name: "Technology", value: 4.2, color: "#EC4899" },
  { name: "Others", value: 2.4, color: "#94A3B8" },
]

export default function ExpensesPage() {
  const [expenseData, setExpenseData] = useState(defaultExpenseData)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/pnl")
      .then(r => r.json())
      .then(data => {
        if (data.expensesByCategory && data.expensesByCategory.length > 0) {
          const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#94A3B8"]
          const mapped = data.expensesByCategory.map((e: any, i: number) => ({
            name: e.category,
            value: Number(e.total) / 1_000_000,
            color: colors[i % colors.length],
          }))
          if (mapped.length > 0) setExpenseData(mapped)
        }
      })
      .catch(() => {})
  }, [])

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)

  const handleExport = () => {
    const rows = expenseData.map(item => ({
      Category: item.name,
      "Amount (₹M)": item.value,
      "Share %": ((item.value / totalExpenses) * 100).toFixed(0),
    }))
    downloadCSV(rows, "expenses_report")
    toast("Expenses data exported successfully", "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        description="Monitor and manage all expense categories"
        actions={<Button variant="outline" onClick={handleExport}>Export</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Expenses" value="₹91.1M" change={12.3} icon={Wallet} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
        <KPICard title="Direct Costs" value="₹72.4M" change={11.2} icon={CreditCard} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Indirect Costs" value="₹18.7M" change={15.4} icon={TrendingDown} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
        <KPICard title="Over Budget Items" value="3" change={0} trend="flat" icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Expense Breakdown" description="By category">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ₹${value}M`}>
                  {expenseData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Expense Categories">
          <div className="space-y-4">
            {expenseData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-sm flex-1">{item.name}</span>
                <span className="text-sm font-semibold">₹{item.value}M</span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {((item.value / totalExpenses) * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
