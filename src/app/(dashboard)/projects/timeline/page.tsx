"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { StatusPill } from "@/components/shared/status-pill"
import { Progress } from "@/components/ui/progress"

export default function TimelinePage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(setProjects)
  }, [])

  if (!projects.length) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Project Timeline" description="Visual timeline of all active projects" />

      <div className="space-y-4">
        {projects.map((p: any) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.client_name} • {p.manager_name}</p>
              </div>
              <StatusPill status={p.status} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.start_date}</span>
                <span>{p.progress}%</span>
                <span>{p.end_date}</span>
              </div>
              <Progress value={p.progress} color={p.status === "at-risk" ? "bg-red-500" : p.status === "completed" ? "bg-emerald-500" : "bg-brand-500"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
