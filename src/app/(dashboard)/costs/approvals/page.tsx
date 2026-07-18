"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { CheckCircle2, X } from "lucide-react"

export default function ApprovalsPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/costs").then(r => r.json()).then(setData)
  }, [])

  async function handleApprove(id: number) {
    await fetch("/api/costs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve", id }),
    })
    fetch("/api/costs").then(r => r.json()).then(setData)
  }

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const pending = data.allocations?.filter((a: any) => a.status === "pending") || []
  const approved = data.allocations?.filter((a: any) => a.status === "approved") || []

  return (
    <div className="space-y-6">
      <PageHeader title="Approvals" description={`${pending.length} pending approval${pending.length !== 1 ? "s" : ""}`} />

      {pending.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pending</h3>
          {pending.map((a: any) => (
            <Card key={a.id} className="border-amber-200 dark:border-amber-800/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{a.cost_center || a.costCenter}</p>
                  <p className="text-sm text-muted-foreground">{a.rule} • {a.department} • Driver: {a.driver}</p>
                  <p className="text-sm mt-1">Amount: <span className="font-semibold">{formatCurrency(a.total_cost || a.totalCost)}</span></p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleApprove(a.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-1" />Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="h-4 w-4 mr-1" />Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pending.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50 text-emerald-500" />
          <p className="text-lg font-medium">All caught up!</p>
          <p className="text-sm">No pending approvals</p>
        </div>
      )}

      {approved.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Recently Approved</h3>
          {approved.slice(0, 5).map((a: any) => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="text-sm font-medium">{a.cost_center || a.costCenter}</p>
                <p className="text-xs text-muted-foreground">{a.department} • {a.driver}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{formatCurrency(a.allocated_cost || a.allocatedCost)}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Approved</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
