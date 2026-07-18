"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Calendar, X } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/shared/toast-provider"
import { formatCurrency } from "@/lib/utils"

const tabs = ["all", "in_progress", "planning", "completed", "at_risk"]
const tabLabels: Record<string, string> = { all: "All", in_progress: "In Progress", planning: "Planning", completed: "Completed", at_risk: "At Risk" }

export default function ProjectsPage() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", client_id: "1", budget: "", start_date: "", end_date: "", description: "" })

  useEffect(() => {
    loadProjects()
  }, [activeTab, search])

  function loadProjects() {
    const params = new URLSearchParams()
    if (activeTab !== "all") params.set("status", activeTab)
    if (search) params.set("search", search)
    fetch(`/api/projects?${params}`).then(r => r.json()).then(setProjects)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, client_id: parseInt(form.client_id), manager_id: 1, budget: parseFloat(form.budget) || 0 }),
    })
    if (res.ok) {
      toast("Project created successfully")
      setShowForm(false)
      setForm({ name: "", client_id: "1", budget: "", start_date: "", end_date: "", description: "" })
      loadProjects()
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Track project financials, timelines, and resource allocation"
        actions={<Button onClick={() => setShowForm(!showForm)}>{showForm ? <><X className="h-4 w-4 mr-2" />Cancel</> : <><Plus className="h-4 w-4 mr-2" />New Project</>}</Button>}
      />

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Create New Project</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Project Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" required />
              </div>
              <div>
                <label className="text-sm font-medium">Budget (₹)</label>
                <input type="number" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium">End Date</label>
                <input type="date" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" />
              </div>
              <div className="lg:col-span-3"><Button type="submit">Create Project</Button></div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === tab ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project: any) => (
          <div key={project.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{project.name}</h3>
                <p className="text-xs text-muted-foreground">{project.client_name}</p>
              </div>
              <StatusPill status={project.status.replace("_", "-")} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-sm font-semibold">{formatCurrency(project.budget)}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-sm font-semibold">{formatCurrency(project.revenue)}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">Margin</p>
                <p className="text-sm font-semibold">{project.margin}%</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{project.start_date?.split("T")[0]} - {project.end_date?.split("T")[0]}</span>
              </div>
              <span>{project.manager_name}</span>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">No projects found for this filter</div>
        )}
      </div>
    </div>
  )
}
