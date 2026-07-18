"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, Mail } from "lucide-react"

const scheduledReports = [
  { id: 1, name: "Board Summary", frequency: "Monthly", nextRun: "2025-08-01", recipients: 3, format: "PDF", enabled: true },
  { id: 2, name: "Budget vs Actual", frequency: "Weekly", nextRun: "2025-07-21", recipients: 5, format: "PDF", enabled: true },
  { id: 3, name: "Workforce Report", frequency: "Monthly", nextRun: "2025-08-01", recipients: 2, format: "Excel", enabled: true },
  { id: 4, name: "Cash Flow Report", frequency: "Daily", nextRun: "2025-07-19", recipients: 2, format: "PDF", enabled: false },
]

export default function ScheduledPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Scheduled Reports"
        description="Automated report generation and delivery"
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Schedule</Button>}
      />

      <div className="space-y-3">
        {scheduledReports.map((report) => (
          <Card key={report.id} className={!report.enabled ? "opacity-60" : ""}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`h-2 w-2 rounded-full ${report.enabled ? "bg-emerald-500" : "bg-slate-400"}`} />
                <div>
                  <p className="font-medium text-sm">{report.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{report.frequency}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Next: {report.nextRun}</span>
                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{report.recipients} recipients</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-muted">{report.format}</span>
                <Button variant="outline" size="sm">{report.enabled ? "Pause" : "Enable"}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
