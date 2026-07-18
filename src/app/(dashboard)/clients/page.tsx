"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Filter, MoreVertical, X } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/shared/toast-provider"
import { formatCurrency } from "@/lib/utils"

export default function ClientsPage() {
  const { toast } = useToast()
  const [clients, setClients] = useState<any[]>([])
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", industry: "", region: "", contract_value: "" })

  useEffect(() => {
    loadClients()
  }, [filter, search])

  function loadClients() {
    const params = new URLSearchParams()
    if (filter !== "all") params.set("status", filter)
    if (search) params.set("search", search)
    fetch(`/api/clients?${params}`).then(r => r.json()).then(setClients)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, contract_value: parseFloat(form.contract_value) || 0 }),
    })
    if (res.ok) {
      toast("Client created successfully")
      setShowForm(false)
      setForm({ name: "", industry: "", region: "", contract_value: "" })
      loadClients()
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Manage client relationships and track profitability"
        actions={<Button onClick={() => setShowForm(!showForm)}>{showForm ? <><X className="h-4 w-4 mr-2" />Cancel</> : <><Plus className="h-4 w-4 mr-2" />New Client</>}</Button>}
      />

      {showForm && (
        <Card>
          <CardHeader><CardTitle>Add New Client</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Client Name *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" required />
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" placeholder="Technology, Finance..." />
              </div>
              <div>
                <label className="text-sm font-medium">Region</label>
                <input value={form.region} onChange={e => setForm({ ...form, region: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" placeholder="North America, APAC..." />
              </div>
              <div>
                <label className="text-sm font-medium">Contract Value</label>
                <input type="number" value={form.contract_value} onChange={e => setForm({ ...form, contract_value: e.target.value })} className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" placeholder="0" />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <Button type="submit">Create Client</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {["all", "active", "at_risk"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === f ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
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
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Industry</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Region</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Revenue</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Margin</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client: any) => (
              <tr key={client.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-xs font-bold text-brand-600">
                      {client.name.slice(0, 2)}
                    </div>
                    <span className="font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{client.industry || "-"}</td>
                <td className="py-3 px-4 text-muted-foreground">{client.region || "-"}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(client.revenue)}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Progress value={parseFloat(client.margin)} max={50} className="w-16 h-1.5" />
                    <span className="font-medium w-12 text-right">{client.margin}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={client.status === "active" ? "active" : "at-risk"} />
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No clients found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
