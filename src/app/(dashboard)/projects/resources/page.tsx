"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Progress } from "@/components/ui/progress"

export default function ResourcesPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/workforce").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const allocated = data.employees.filter((e: any) => e.project_name)

  return (
    <div className="space-y-6">
      <PageHeader title="Project Resources" description="Resource allocation across active projects" />

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Employee</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Role</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Project</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Utilization</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Skills</th>
            </tr>
          </thead>
          <tbody>
            {allocated.map((e: any) => (
              <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{e.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{e.role}</td>
                <td className="py-3 px-4">{e.project_name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Progress value={e.utilization} className="w-16 h-1.5" />
                    <span className="text-xs font-medium">{e.utilization}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {e.skills?.split(",").slice(0, 3).map((s: string) => (
                      <span key={s} className="px-1.5 py-0.5 text-[10px] rounded bg-muted font-medium">{s.trim()}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
