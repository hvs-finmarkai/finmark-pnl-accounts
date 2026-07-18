"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { formatCurrency } from "@/lib/utils"

export default function ProjectFinancialsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(setProjects)
  }, [])

  if (!projects.length) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Project Financials" description="Revenue, costs, and margins per project" />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Project</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Client</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Budget</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Revenue</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Expenses</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Profit</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Margin</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p: any) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{p.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{p.client_name}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(p.budget)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(p.revenue)}</td>
                <td className="py-3 px-4 text-right text-red-500">{formatCurrency(p.expenses)}</td>
                <td className="py-3 px-4 text-right text-emerald-500">{formatCurrency(p.revenue - p.expenses)}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`font-medium ${parseFloat(p.margin) >= 20 ? "text-emerald-500" : parseFloat(p.margin) >= 10 ? "text-amber-500" : "text-red-500"}`}>
                    {p.margin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
