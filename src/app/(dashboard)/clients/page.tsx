"use client"

import { useState } from "react"
import { Search, Plus, Filter, MoreVertical } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const clients = [
  { id: "1", name: "TechCorp Inc.", geography: "North America", revenue: 25.6, margin: 28.5, status: "active" as const },
  { id: "2", name: "Global Solutions Ltd.", geography: "Europe", revenue: 18.7, margin: 31.2, status: "active" as const },
  { id: "3", name: "InnovateX", geography: "APAC", revenue: 15.2, margin: 26.7, status: "active" as const },
  { id: "4", name: "HealthPlus", geography: "North America", revenue: 12.3, margin: 23.1, status: "active" as const },
  { id: "5", name: "FidServe Global", geography: "Europe", revenue: 11.7, margin: 19.7, status: "at-risk" as const },
  { id: "6", name: "EduMind", geography: "APAC", revenue: 8.6, margin: 18.3, status: "at-risk" as const },
]

export default function ClientsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "at-risk">("all")

  const filteredClients = filter === "all" ? clients : clients.filter((c) => c.status === filter)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Manage client relationships and track profitability"
        actions={<Button><Plus className="h-4 w-4 mr-2" />New Client</Button>}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search clients..."
              className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />Filters
          </Button>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["all", "active", "at-risk"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === f ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "At Risk"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Client Name</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Geography</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Revenue (₹M)</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Margin</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xs font-bold text-brand-600">
                      {client.name.slice(0, 2)}
                    </div>
                    <span className="font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{client.geography}</td>
                <td className="py-3 px-4 text-right font-medium">₹{client.revenue}M</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Progress value={client.margin} max={50} className="w-16 h-1.5" />
                    <span className="font-medium w-12 text-right">{client.margin}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={client.status === "active" ? "on-track" : "at-risk"} label={client.status === "active" ? "Active" : "At Risk"} />
                </td>
                <td className="py-3 px-4 text-center">
                  <button className="p-1 rounded hover:bg-muted">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing 1 to {filteredClients.length} of {filteredClients.length} clients</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((p) => (
            <button key={p} className={`h-8 w-8 rounded-md text-xs font-medium ${p === 1 ? "bg-brand-500 text-white" : "hover:bg-muted"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
