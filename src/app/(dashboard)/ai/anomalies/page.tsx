"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, DollarSign } from "lucide-react"

const iconMap: Record<string, any> = { "Margin Drop": TrendingDown, "Budget Overrun": DollarSign, "Payment Delay": AlertTriangle }
const severityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50" },
  medium: { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50" },
  low: { color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50" },
}

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/ai/anomalies").then(r => r.json()).then(d => { setAnomalies(d.anomalies || []); setLoading(false) })
  }, [])

  if (loading) return <div className="p-8 text-center text-muted-foreground">Scanning for anomalies...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Anomaly Detection" description={`${anomalies.length} anomalies detected from live data`} />

      {anomalies.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No anomalies detected</p>
          <p className="text-sm">All metrics are within normal thresholds</p>
        </div>
      ) : (
        <div className="space-y-4">
          {anomalies.map((anomaly, i) => {
            const config = severityConfig[anomaly.severity] || severityConfig.medium
            const Icon = iconMap[anomaly.category] || AlertTriangle
            return (
              <Card key={i} className={`border ${config.bg}`}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{anomaly.title}</h3>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          anomaly.severity === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" :
                          "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                        }`}>{anomaly.severity}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Category: {anomaly.category}</span>
                        <span>Detection: {anomaly.detected}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
