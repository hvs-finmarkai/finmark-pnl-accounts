"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function UtilizationPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/workforce").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Utilization" description={`Average utilization: ${data.summary.avgUtilization}%`} />

      <ChartCard title="Utilization by Department">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="department" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" unit="%" />
              <Tooltip />
              <Bar dataKey="avg_util" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Avg Utilization %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Employee</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Project</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Utilization</th>
            </tr>
          </thead>
          <tbody>
            {data.employees.filter((e: any) => e.status === "active").map((e: any) => (
              <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{e.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{e.department}</td>
                <td className="py-3 px-4">{e.project_name || "-"}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Progress value={e.utilization} className="w-20 h-1.5" color={e.utilization > 90 ? "bg-red-500" : e.utilization > 70 ? "bg-brand-500" : "bg-amber-500"} />
                    <span className="text-xs font-medium w-8">{e.utilization}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
