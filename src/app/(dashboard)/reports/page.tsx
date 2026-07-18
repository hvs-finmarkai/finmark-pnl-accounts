"use client"

import { FileText, Download, Clock, Plus, Search } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusPill } from "@/components/shared/status-pill"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const reports = [
  { id: "1", name: "Board Summary", description: "Monthly executive summary", format: "PDF", schedule: "Scheduled", lastGenerated: "Jul 15, 2025", status: "ready" },
  { id: "2", name: "P&L Report", description: "Detailed P&L by project", format: "PDF", schedule: "On Demand", lastGenerated: "Jul 14, 2025", status: "ready" },
  { id: "3", name: "Client Profitability", description: "Client-wise profitability analysis", format: "Excel", schedule: "On Demand", lastGenerated: "Jul 12, 2025", status: "ready" },
  { id: "4", name: "Budget vs Actual", description: "Variance analysis report", format: "PDF", schedule: "Scheduled", lastGenerated: "Jul 10, 2025", status: "ready" },
  { id: "5", name: "Workforce Report", description: "Utilization & allocation", format: "Excel", schedule: "Scheduled", lastGenerated: "Jul 8, 2025", status: "ready" },
  { id: "6", name: "Cash Flow Report", description: "Cash flow analysis", format: "PDF", schedule: "On Demand", lastGenerated: "Jul 5, 2025", status: "ready" },
]

const reportIcons: Record<string, string> = {
  PDF: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  Excel: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule, and export financial reports"
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Report</Button>}
      />

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search reports..." className="h-9 w-56 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-elevated transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${reportIcons[report.format]}`}>
                      <FileText className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{report.format}</Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{report.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{report.lastGenerated}</span>
                    </div>
                    <span className="text-brand-500 font-medium">{report.schedule}</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3.5 w-3.5 mr-1" />Download
                    </Button>
                    <Button size="sm" className="flex-1">Regenerate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="py-12 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Favorite Reports</p>
            <p className="text-sm">Star reports to add them to favorites</p>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="py-12 text-center text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Scheduled Reports</p>
            <p className="text-sm">Reports scheduled for automatic generation</p>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="py-12 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Recent Reports</p>
            <p className="text-sm">Recently generated reports</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
