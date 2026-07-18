"use client"

import { useState } from "react"
import { Search, Plus, Filter, Calendar } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { Progress } from "@/components/ui/progress"

const projects = [
  { id: "1", name: "Website Redesign", client: "TechCorp Inc.", manager: "Arjun Mehta", status: "in-progress" as const, budget: 2.4, revenue: 1.8, margin: 32, progress: 65, startDate: "Jan 2025", endDate: "Jul 2025" },
  { id: "2", name: "ERP Implementation", client: "HealthPlus", manager: "Pooja Nair", status: "in-progress" as const, budget: 5.6, revenue: 4.2, margin: 28, progress: 40, startDate: "Feb 2025", endDate: "Dec 2025" },
  { id: "3", name: "API Integration", client: "TechCorp Inc.", manager: "Rohan Singh", status: "completed" as const, budget: 1.2, revenue: 1.1, margin: 35, progress: 100, startDate: "Oct 2024", endDate: "Mar 2025" },
  { id: "4", name: "Cloud Migration", client: "Global Solutions", manager: "Sneha Iyer", status: "at-risk" as const, budget: 3.8, revenue: 2.1, margin: 15, progress: 55, startDate: "Mar 2025", endDate: "Sep 2025" },
  { id: "5", name: "Data Migration", client: "EduMind", manager: "Vikram Dev", status: "planning" as const, budget: 1.5, revenue: 0, margin: 0, progress: 10, startDate: "Jun 2025", endDate: "Nov 2025" },
  { id: "6", name: "Support Project", client: "FidServe Global", manager: "Arjun Mehta", status: "at-risk" as const, budget: 0.8, revenue: 0.5, margin: 12, progress: 70, startDate: "Dec 2024", endDate: "Jun 2025" },
]

const tabs = ["All", "Active", "Planning", "In Progress", "Completed", "At Risk"]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter((p) => p.status === activeTab.toLowerCase().replace(" ", "-"))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Track project financials, timelines, and resource allocation"
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Project</Button>}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search projects..." className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filters</Button>
        </div>
        <div className="flex gap-1 overflow-x-auto rounded-lg bg-muted p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeTab === tab ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div key={project.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{project.name}</h3>
                <p className="text-xs text-muted-foreground">{project.client}</p>
              </div>
              <StatusPill status={project.status} />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-center">
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-sm font-semibold">₹{project.budget}M</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-sm font-semibold">₹{project.revenue}M</p>
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
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              <span>{project.manager}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
