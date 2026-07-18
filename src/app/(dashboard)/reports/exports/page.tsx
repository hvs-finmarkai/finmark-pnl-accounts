"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Table2, Presentation } from "lucide-react"

const exportOptions = [
  { id: "pnl-pdf", name: "P&L Statement", format: "PDF", icon: FileText, description: "Complete profit & loss statement" },
  { id: "clients-excel", name: "Client Data", format: "Excel", icon: Table2, description: "All client records with financials" },
  { id: "projects-excel", name: "Project Portfolio", format: "Excel", icon: Table2, description: "Project status, budgets, and timelines" },
  { id: "workforce-excel", name: "Workforce Report", format: "Excel", icon: Table2, description: "Employee utilization and allocation" },
  { id: "board-pptx", name: "Board Deck", format: "PowerPoint", icon: Presentation, description: "Executive presentation slides" },
  { id: "budget-pdf", name: "Budget vs Actual", format: "PDF", icon: FileText, description: "Variance analysis report" },
]

export default function ExportsPage() {
  const [exporting, setExporting] = useState<string | null>(null)

  function handleExport(id: string) {
    setExporting(id)
    setTimeout(() => {
      setExporting(null)
      alert("Export ready! In production, this would download the file.")
    }, 1500)
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
                    <Button size="sm" variant="outline" onClick={() => handleExport(opt.id)} disabled={exporting === opt.id}>
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
