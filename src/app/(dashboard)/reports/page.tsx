"use client"

import { useState } from "react"
import { FileText, Download, Clock, Plus, Search, X } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusPill } from "@/components/shared/status-pill"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/shared/toast-provider"
import { downloadCSV } from "@/lib/download"

const defaultReports = [
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
  const [reports, setReports] = useState(defaultReports)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "", format: "PDF", schedule: "On Demand" })
  const { toast } = useToast()

  function handleCreateReport(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name) {
      toast("Please enter a report name", "error")
      return
    }
    const newReport = {
      id: String(Date.now()),
      name: formData.name,
      description: formData.description || "Custom report",
      format: formData.format,
      schedule: formData.schedule,
      lastGenerated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "ready",
    }
    setReports([newReport, ...reports])
    setShowForm(false)
    setFormData({ name: "", description: "", format: "PDF", schedule: "On Demand" })
    toast("Report created successfully", "success")
  }

  function handleDownload(report: typeof reports[0]) {
    const reportData = [
      { Report: report.name, Description: report.description, Format: report.format, Schedule: report.schedule, LastGenerated: report.lastGenerated, Status: report.status },
    ]
    downloadCSV(reportData, report.name.toLowerCase().replace(/\s+/g, "_"))
    toast(`${report.name} downloaded`, "success")
  }

  function handleRegenerate(report: typeof reports[0]) {
    setReports(reports.map(r =>
      r.id === report.id
        ? { ...r, lastGenerated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }
        : r
    ))
    toast(`${report.name} regenerated`, "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate, schedule, and export financial reports"
        actions={<Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />New Report</Button>}
      />

      {showForm && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Create New Report</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
            </div>
            <form onSubmit={handleCreateReport} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                placeholder="Report Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
              </select>
              <select
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="On Demand">On Demand</option>
                <option value="Scheduled">Scheduled</option>
              </select>
              <div className="md:col-span-2 lg:col-span-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Create Report</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

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
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${reportIcons[report.format] || reportIcons.PDF}`}>
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
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownload(report)}>
                      <Download className="h-3.5 w-3.5 mr-1" />Download
                    </Button>
                    <Button size="sm" className="flex-1" onClick={() => handleRegenerate(report)}>Regenerate</Button>
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
