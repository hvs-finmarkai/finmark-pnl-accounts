"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function BoardDeckPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/dashboard").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader
        title="Board Deck"
        description="Executive summary for board presentation"
        actions={<Button><Download className="h-4 w-4 mr-2" />Export PDF</Button>}
      />

      <Card>
        <CardHeader><CardTitle>Executive Summary - May 2025</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-brand-50 dark:bg-brand-900/20">
              <p className="text-3xl font-bold text-brand-600">{formatCurrency(data.kpis.revenue)}</p>
              <p className="text-sm text-muted-foreground mt-1">Total Revenue</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
              <p className="text-3xl font-bold text-emerald-600">{data.kpis.grossMargin}%</p>
              <p className="text-sm text-muted-foreground mt-1">Gross Margin</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-violet-50 dark:bg-violet-900/20">
              <p className="text-3xl font-bold text-violet-600">{data.kpis.activeProjects}</p>
              <p className="text-sm text-muted-foreground mt-1">Active Projects</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
              <p className="text-3xl font-bold text-amber-600">{data.kpis.atRiskProjects}</p>
              <p className="text-sm text-muted-foreground mt-1">At Risk Projects</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Key Highlights</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">●</span> Revenue grew 18.5% YoY, exceeding budget by 14.1%</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">●</span> Gross margin improved to {data.kpis.grossMargin}%</li>
              <li className="flex items-start gap-2"><span className="text-amber-500 mt-0.5">●</span> {data.kpis.atRiskProjects} projects flagged as at-risk requiring attention</li>
              <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">●</span> Employee utilization at healthy levels, bench reduced</li>
              <li className="flex items-start gap-2"><span className="text-brand-500 mt-0.5">●</span> Q3 forecast projects ₹142.5M revenue (+13.3%)</li>
            </ul>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Top Clients by Revenue</h4>
            <div className="space-y-2">
              {data.topClients?.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-center justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="font-medium">{formatCurrency(c.revenue || c.contractValue)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
