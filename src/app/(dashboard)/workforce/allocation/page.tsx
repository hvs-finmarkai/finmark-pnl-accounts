"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"

export default function AllocationPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/workforce").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Allocation" description="Department and project-wise resource allocation" />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Headcount</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Avg Utilization</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Monthly Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.byDepartment.map((d: any) => (
              <tr key={d.department} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{d.department}</td>
                <td className="py-3 px-4 text-right">{d.count}</td>
                <td className="py-3 px-4 text-right">{d.avg_util?.toFixed(0) || 0}%</td>
                <td className="py-3 px-4 text-right">₹{(d.total_salary / 1000).toFixed(0)}K</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
