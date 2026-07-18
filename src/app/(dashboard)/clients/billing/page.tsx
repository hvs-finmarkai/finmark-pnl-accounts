"use client"

import { useEffect, useState } from "react"
import { DollarSign, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { PageHeader } from "@/components/shared/page-header"
import { StatusPill } from "@/components/shared/status-pill"
import { formatCurrency } from "@/lib/utils"

export default function BillingPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/invoices").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const { invoices, totals } = data

  return (
    <div className="space-y-6">
      <PageHeader title="Billing & Invoices" description="Track invoices, payments, and outstanding amounts" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Invoiced" value={formatCurrency(totals?.total || 0)} change={12.5} icon={DollarSign} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Collected" value={formatCurrency(totals?.paid || 0)} change={8.2} icon={CheckCircle2} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Pending" value={formatCurrency(totals?.pending || 0)} change={-3.1} trend="down" icon={Clock} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
        <KPICard title="Overdue" value={formatCurrency(totals?.overdue || 0)} change={5.0} icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Invoice #</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Client</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Project</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Amount</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Due Date</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.map((inv: any) => (
              <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium font-mono text-xs">{inv.invoice_number}</td>
                <td className="py-3 px-4">{inv.client_name}</td>
                <td className="py-3 px-4 text-muted-foreground">{inv.project_name || "-"}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(inv.amount)}</td>
                <td className="py-3 px-4 text-muted-foreground">{inv.due_date}</td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={inv.status === "paid" ? "completed" : inv.status === "overdue" ? "at-risk" : "pending"} label={inv.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
