"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { formatCurrency } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { useToast } from "@/components/shared/toast-provider"

export default function ContractsPage() {
  const [data, setData] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", client_name: "", value: "", type: "fixed", start_date: "", end_date: "" })
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/contracts").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.client_name || !formData.value) {
      toast("Please fill all required fields", "error")
      return
    }
    const newContract = {
      id: Date.now(),
      name: formData.name,
      client_name: formData.client_name,
      value: parseFloat(formData.value),
      type: formData.type,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: "active",
    }
    setData({ ...data, contracts: [newContract, ...(data.contracts || [])] })
    setShowForm(false)
    setFormData({ name: "", client_name: "", value: "", type: "fixed", start_date: "", end_date: "" })
    toast("Contract created successfully", "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contracts"
        description={`Total active contract value: ${formatCurrency(data.totalActiveValue)}`}
        actions={<Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />New Contract</Button>}
      />

      {showForm && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Create New Contract</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                placeholder="Contract Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Client Name *"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Value *"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="fixed">Fixed</option>
                <option value="t&m">T&M</option>
                <option value="retainer">Retainer</option>
              </select>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Create Contract</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Contract Name</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Client</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Value</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Type</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Period</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.contracts?.map((c: any) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{c.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{c.client_name}</td>
                <td className="py-3 px-4 text-right font-medium">{formatCurrency(c.value)}</td>
                <td className="py-3 px-4"><span className="capitalize">{c.type}</span></td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{c.start_date} to {c.end_date}</td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={c.status === "active" ? "active" : "inactive"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
