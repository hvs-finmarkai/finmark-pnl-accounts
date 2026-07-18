"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { formatCurrency } from "@/lib/utils"
import { Plus } from "lucide-react"

export default function AllocationRulesPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/costs").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader
        title="Allocation Rules"
        description="Define how shared costs are distributed across departments and projects"
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Rule</Button>}
      />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Cost Center</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Driver</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Rule</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Total Cost</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Allocated</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allocations?.map((a: any) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{a.cost_center || a.costCenter}</td>
                <td className="py-3 px-4 text-muted-foreground">{a.driver}</td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{a.rule}</td>
                <td className="py-3 px-4">{a.department}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(a.total_cost || a.totalCost)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(a.allocated_cost || a.allocatedCost)}</td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={a.status === "approved" ? "active" : "pending"} label={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
