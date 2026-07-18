"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

export default function ProfitLossPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/pnl").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const { summary } = data

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profit & Loss Statement"
        description="Detailed P&L breakdown for current fiscal period"
        actions={<Button variant="outline">Export PDF</Button>}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Statement of Profit & Loss</CardTitle>
            <span className="text-sm text-muted-foreground">Period: Jan 2025 - May 2025</span>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-3 text-left font-medium">Particulars</th>
                <th className="py-3 text-right font-medium">Amount (₹)</th>
                <th className="py-3 text-right font-medium">% of Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-brand-50/30 dark:bg-brand-900/10 font-semibold">
                <td className="py-3">Revenue</td>
                <td className="py-3 text-right">{formatCurrency(summary.revenue)}</td>
                <td className="py-3 text-right">100%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pl-4">Direct Costs</td>
                <td className="py-3 text-right text-red-500">({formatCurrency(summary.directCosts)})</td>
                <td className="py-3 text-right">{((summary.directCosts / summary.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="border-b bg-emerald-50/30 dark:bg-emerald-900/10 font-semibold">
                <td className="py-3">Gross Profit</td>
                <td className="py-3 text-right text-emerald-600">{formatCurrency(summary.grossProfit)}</td>
                <td className="py-3 text-right">{summary.grossMargin}%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pl-4">Indirect Costs</td>
                <td className="py-3 text-right text-red-500">({formatCurrency(summary.indirectCosts)})</td>
                <td className="py-3 text-right">{((summary.indirectCosts / summary.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="border-b font-semibold">
                <td className="py-3">Operating Profit (EBITDA)</td>
                <td className="py-3 text-right">{formatCurrency(summary.grossProfit - summary.indirectCosts)}</td>
                <td className="py-3 text-right">{(((summary.grossProfit - summary.indirectCosts) / summary.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pl-4">Depreciation & Amortization</td>
                <td className="py-3 text-right text-red-500">({formatCurrency(summary.revenue * 0.02)})</td>
                <td className="py-3 text-right">2.0%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pl-4">Interest</td>
                <td className="py-3 text-right text-red-500">({formatCurrency(summary.revenue * 0.01)})</td>
                <td className="py-3 text-right">1.0%</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pl-4">Tax Provision (25%)</td>
                <td className="py-3 text-right text-red-500">({formatCurrency(summary.netProfit * 0.25)})</td>
                <td className="py-3 text-right">{((summary.netProfit * 0.25 / summary.revenue) * 100).toFixed(1)}%</td>
              </tr>
              <tr className="bg-emerald-50/50 dark:bg-emerald-900/20 font-bold text-lg">
                <td className="py-4">Net Profit</td>
                <td className="py-4 text-right text-emerald-600">{formatCurrency(summary.netProfit)}</td>
                <td className="py-4 text-right">{summary.netMargin}%</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
