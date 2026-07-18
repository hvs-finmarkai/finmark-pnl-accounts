"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, TrendingUp, DollarSign } from "lucide-react"

const anomalies = [
  { id: 1, severity: "high", title: "Cloud Migration margin dropped to 8.2%", description: "Project margin has fallen below the 10% threshold. Direct costs increased 23% in the last month due to unplanned vendor expenses.", detected: "2 hours ago", category: "Margin Drop", icon: TrendingDown },
  { id: 2, severity: "medium", title: "Travel expenses spike +23% this quarter", description: "Travel category exceeded budget by ₹2.4M. Primary drivers: Client visits for ERP project and unplanned site surveys.", detected: "1 day ago", category: "Cost Spike", icon: DollarSign },
  { id: 3, severity: "medium", title: "Invoice payment delayed - FidServe Global", description: "INV-2025-015 is 8 days overdue (₹950,000). Client has history of 15-day average delay. Escalation recommended.", detected: "3 days ago", category: "Payment Delay", icon: AlertTriangle },
  { id: 4, severity: "low", title: "Bench utilization trending up", description: "2 new bench additions this month. Current bench cost: ₹280,000/month. Skill match found for Mobile App Dev project.", detected: "5 days ago", category: "Resource", icon: TrendingUp },
]

const severityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50" },
  medium: { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50" },
  low: { color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50" },
}

export default function AnomaliesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Anomaly Detection" description="AI-detected anomalies in financial patterns and operations" />

      <div className="space-y-4">
        {anomalies.map((anomaly) => {
          const config = severityConfig[anomaly.severity]
          return (
            <Card key={anomaly.id} className={`border ${config.bg}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg}`}>
                    <anomaly.icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{anomaly.title}</h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        anomaly.severity === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" :
                        anomaly.severity === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                      }`}>{anomaly.severity}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      <span>Category: {anomaly.category}</span>
                      <span>Detected: {anomaly.detected}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
