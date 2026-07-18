"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { formatCurrency } from "@/lib/utils"
import { Plus } from "lucide-react"

export default function ContractsPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/contracts").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contracts"
        description={`Total active contract value: ${formatCurrency(data.totalActiveValue)}`}
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Contract</Button>}
      />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Contract Name</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Client</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Value</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Type</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Period</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.contracts?.map((c: any) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{c.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{c.client_name}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(c.value)}</td>
                <td className="py-3 px-4"><span className="capitalize">{c.type}</span></td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{c.start_date} to {c.end_date}</td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={c.status === "active" ? "active" : "inactive"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
