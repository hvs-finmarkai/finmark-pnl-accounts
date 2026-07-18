"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { formatCurrency } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { useToast } from "@/components/shared/toast-provider"

export default function AllocationRulesPage() {
  const [data, setData] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ cost_center: "", driver: "Headcount", department: "", total_cost: "" })
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/costs").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.cost_center || !formData.department || !formData.total_cost) {
      toast("Please fill all required fields", "error")
      return
    }
    const newRule = {
      id: Date.now(),
      cost_center: formData.cost_center,
      driver: formData.driver,
      rule: `${formData.driver}-based allocation`,
      department: formData.department,
      total_cost: parseFloat(formData.total_cost),
      allocated_cost: 0,
      status: "pending",
    }
    setData({ ...data, allocations: [newRule, ...(data.allocations || [])] })
    setShowForm(false)
    setFormData({ cost_center: "", driver: "Headcount", department: "", total_cost: "" })
    toast("Allocation rule created successfully", "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Allocation Rules"
        description="Define how shared costs are distributed across departments and projects"
        actions={<Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />New Rule</Button>}
      />

      {showForm && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Create New Allocation Rule</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                placeholder="Cost Center *"
                value={formData.cost_center}
                onChange={(e) => setFormData({ ...formData, cost_center: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={formData.driver}
                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Headcount">Headcount</option>
                <option value="Revenue %">Revenue %</option>
                <option value="Square Footage">Square Footage</option>
                <option value="Department">Department</option>
              </select>
              <input
                placeholder="Department *"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Total Cost *"
                type="number"
                value={formData.total_cost}
                onChange={(e) => setFormData({ ...formData, total_cost: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="md:col-span-2 lg:col-span-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Create Rule</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Cost Center</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Driver</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Rule</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Total Cost</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Allocated</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.allocations?.map((a: any) => (
              <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{a.cost_center || a.costCenter}</td>
                <td className="py-3 px-4 text-muted-foreground">{a.driver}</td>
                <td className="py-3 px-4 text-muted-foreground text-xs">{a.rule}</td>
                <td className="py-3 px-4">{a.department}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(a.total_cost || a.totalCost)}</td>
                <td className="py-3 px-4 text-right">{formatCurrency(a.allocated_cost || a.allocatedCost)}</td>
                <td className="py-3 px-4 text-center">
                  <StatusPill status={a.status === "approved" ? "active" : "pending"} label={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
