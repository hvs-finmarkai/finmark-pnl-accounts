"use client"

import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { StatusPill } from "@/components/shared/status-pill"

export default function RisksPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/projects?status=at-risk").then(r => r.json()).then(setProjects)
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader title="Project Risks" description="Projects flagged as at-risk requiring immediate attention" />

      {projects.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No at-risk projects found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p: any) => (
            <Card key={p.id} className="border-red-200 dark:border-red-800/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.client_name}</p>
                  </div>
                  <StatusPill status="at-risk" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Margin</span>
                    <span className="font-medium text-red-500">{p.margin}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{p.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manager</span>
                    <span>{p.manager_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline</span>
                    <span>{p.end_date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
