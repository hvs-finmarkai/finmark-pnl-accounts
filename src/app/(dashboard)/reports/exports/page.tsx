"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Table2, Presentation } from "lucide-react"
import { useToast } from "@/components/shared/toast-provider"
import { downloadCSV } from "@/lib/download"

const exportOptions = [
  { id: "pnl-pdf", name: "P&L Statement", format: "PDF", icon: FileText, description: "Complete profit & loss statement" },
  { id: "clients-excel", name: "Client Data", format: "Excel", icon: Table2, description: "All client records with financials" },
  { id: "projects-excel", name: "Project Portfolio", format: "Excel", icon: Table2, description: "Project status, budgets, and timelines" },
  { id: "workforce-excel", name: "Workforce Report", format: "Excel", icon: Table2, description: "Employee utilization and allocation" },
  { id: "board-pptx", name: "Board Deck", format: "PowerPoint", icon: Presentation, description: "Executive presentation slides" },
  { id: "budget-pdf", name: "Budget vs Actual", format: "PDF", icon: FileText, description: "Variance analysis report" },
]

const sampleData: Record<string, Record<string, any>[]> = {
  "pnl-pdf": [
    { Category: "Revenue", Amount: "₹12.5M", Period: "Q2 2025" },
    { Category: "COGS", Amount: "₹7.2M", Period: "Q2 2025" },
    { Category: "Gross Profit", Amount: "₹5.3M", Period: "Q2 2025" },
    { Category: "Operating Expenses", Amount: "₹3.1M", Period: "Q2 2025" },
    { Category: "Net Profit", Amount: "₹2.2M", Period: "Q2 2025" },
  ],
  "clients-excel": [
    { Client: "TechCorp", Revenue: "₹3.2M", Projects: 4, Status: "Active" },
    { Client: "FinServe", Revenue: "₹2.8M", Projects: 3, Status: "Active" },
    { Client: "RetailMax", Revenue: "₹2.1M", Projects: 2, Status: "Active" },
    { Client: "HealthPlus", Revenue: "₹1.9M", Projects: 3, Status: "Active" },
    { Client: "EduTech", Revenue: "₹1.5M", Projects: 2, Status: "Active" },
  ],
  "projects-excel": [
    { Project: "Platform Redesign", Client: "TechCorp", Budget: "₹1.2M", Status: "On Track", Completion: "72%" },
    { Project: "Data Migration", Client: "FinServe", Budget: "₹800K", Status: "At Risk", Completion: "45%" },
    { Project: "Mobile App", Client: "RetailMax", Budget: "₹1.5M", Status: "On Track", Completion: "60%" },
    { Project: "Analytics Dashboard", Client: "HealthPlus", Budget: "₹600K", Status: "On Track", Completion: "85%" },
  ],
  "workforce-excel": [
    { Name: "Team A", Department: "Engineering", Headcount: 12, Utilization: "88%", MonthlyCost: "₹1.8M" },
    { Name: "Team B", Department: "Data", Headcount: 8, Utilization: "92%", MonthlyCost: "₹1.2M" },
    { Name: "Team C", Department: "Design", Headcount: 5, Utilization: "75%", MonthlyCost: "₹650K" },
    { Name: "Team D", Department: "DevOps", Headcount: 4, Utilization: "95%", MonthlyCost: "₹720K" },
  ],
  "board-pptx": [
    { Slide: "Revenue Overview", Content: "Q2 Revenue ₹12.5M (+18.5% YoY)", Notes: "Exceeded target" },
    { Slide: "Profitability", Content: "Gross Margin 42.4%", Notes: "Improved from 38.1%" },
    { Slide: "Growth", Content: "3 new clients onboarded", Notes: "Pipeline strong" },
    { Slide: "Risks", Content: "2 projects at risk", Notes: "Mitigation in progress" },
  ],
  "budget-pdf": [
    { Category: "Revenue", Budget: "₹11.0M", Actual: "₹12.5M", Variance: "+₹1.5M", VariancePct: "+13.6%" },
    { Category: "Salaries", Budget: "₹6.0M", Actual: "₹6.2M", Variance: "-₹200K", VariancePct: "-3.3%" },
    { Category: "Infrastructure", Budget: "₹1.2M", Actual: "₹1.0M", Variance: "+₹200K", VariancePct: "+16.7%" },
    { Category: "Marketing", Budget: "₹800K", Actual: "₹750K", Variance: "+₹50K", VariancePct: "+6.3%" },
  ],
}

export default function ExportsPage() {
  const [exporting, setExporting] = useState<string | null>(null)
  const { toast } = useToast()

  function handleExport(id: string, name: string) {
    setExporting(id)
    setTimeout(() => {
      const data = sampleData[id] || [{ Export: name, Status: "Generated", Date: new Date().toISOString() }]
      downloadCSV(data, name.toLowerCase().replace(/\s+/g, "_"))
      toast(`${name} exported successfully`, "success")
      setExporting(null)
    }, 500)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Exports" description="Download reports in various formats" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exportOptions.map((opt) => (
          <Card key={opt.id} className="hover:shadow-elevated transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/30">
                  <opt.icon className="h-5 w-5 text-brand-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{opt.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs font-medium text-muted-foreground">{opt.format}</span>
                    <Button size="sm" variant="outline" onClick={() => handleExport(opt.id, opt.name)} disabled={exporting === opt.id}>
                      <Download className="h-3.5 w-3.5 mr-1" />
                      {exporting === opt.id ? "Generating..." : "Export"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
