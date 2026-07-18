"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/shared/toast-provider"

export default function BenchPage() {
  const [data, setData] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/workforce?status=bench").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const benchEmployees = data.employees.filter((e: any) => e.status === "bench")

  return (
    <div className="space-y-6">
      <PageHeader title="Bench" description={`${benchEmployees.length} employees currently on bench`} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {benchEmployees.map((e: any) => (
          <Card key={e.id}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-sm font-bold text-amber-600">
                  {e.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-medium text-sm">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span>{e.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Cost</span>
                  <span className="font-medium">₹{(e.salary / 1000).toFixed(0)}K</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Skills</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {e.skills?.split(",").map((s: string) => (
                      <span key={s} className="px-2 py-0.5 text-[10px] rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium">{s.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => toast("Allocation request sent", "success")}>Allocate to Project</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
