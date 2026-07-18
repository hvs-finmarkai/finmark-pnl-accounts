"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

export default function VariancePage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/pnl").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const varianceData = data.statement?.map((row: any) => ({
    name: row.particular,
    variance: (row.variance / 1000000).toFixed(1),
    percent: parseFloat(row.variancePercent),
  })) || []

  return (
    <div className="space-y-6">
      <PageHeader title="Variance Analysis" description="Compare actual performance against budgets and identify deviations" />

      <ChartCard title="Variance by Category" description="Actual vs Budget difference (₹M)">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={varianceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
              <Bar dataKey="variance" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Variance (₹M)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <Card>
        <CardHeader><CardTitle>Detailed Variance Breakdown</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-3 text-left font-medium">Category</th>
                <th className="py-3 text-right font-medium">Actual (₹M)</th>
                <th className="py-3 text-right font-medium">Budget (₹M)</th>
                <th className="py-3 text-right font-medium">Variance (₹M)</th>
                <th className="py-3 text-right font-medium">Variance %</th>
                <th className="py-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.statement?.map((row: any) => (
                <tr key={row.particular} className="border-b last:border-0">
                  <td className="py-3 font-medium">{row.particular}</td>
                  <td className="py-3 text-right">₹{(row.actual / 1000000).toFixed(1)}M</td>
                  <td className="py-3 text-right">₹{(row.budget / 1000000).toFixed(1)}M</td>
                  <td className={`py-3 text-right font-medium ${row.variance >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {row.variance >= 0 ? "+" : ""}₹{(row.variance / 1000000).toFixed(1)}M
                  </td>
                  <td className={`py-3 text-right font-medium ${parseFloat(row.variancePercent) >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {parseFloat(row.variancePercent) >= 0 ? "+" : ""}{row.variancePercent}%
                  </td>
                  <td className="py-3 text-right">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      Math.abs(parseFloat(row.variancePercent)) < 5 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                      Math.abs(parseFloat(row.variancePercent)) < 15 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {Math.abs(parseFloat(row.variancePercent)) < 5 ? "On Track" : Math.abs(parseFloat(row.variancePercent)) < 15 ? "Monitor" : "Action Needed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
