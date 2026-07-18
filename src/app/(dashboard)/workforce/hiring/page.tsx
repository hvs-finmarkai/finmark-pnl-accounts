"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { useToast } from "@/components/shared/toast-provider"

const defaultPositions = [
  { id: 1, title: "Senior React Developer", department: "Engineering", priority: "high", status: "interviewing", applicants: 12 },
  { id: 2, title: "Data Engineer", department: "Data", priority: "high", status: "sourcing", applicants: 5 },
  { id: 3, title: "Project Manager", department: "Delivery", priority: "medium", status: "open", applicants: 8 },
  { id: 4, title: "DevOps Engineer", department: "Engineering", priority: "medium", status: "interviewing", applicants: 6 },
  { id: 5, title: "Business Analyst", department: "Operations", priority: "low", status: "open", applicants: 15 },
]

export default function HiringPage() {
  const [positions, setPositions] = useState(defaultPositions)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", department: "", priority: "medium" })
  const { toast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.title || !formData.department) {
      toast("Please fill all required fields", "error")
      return
    }
    const newPosition = {
      id: Date.now(),
      title: formData.title,
      department: formData.department,
      priority: formData.priority,
      status: "open",
      applicants: 0,
    }
    setPositions([newPosition, ...positions])
    setShowForm(false)
    setFormData({ title: "", department: "", priority: "medium" })
    toast("Position created successfully", "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hiring"
        description="Open positions and recruitment pipeline"
        actions={<Button onClick={() => setShowForm(!showForm)}><Plus className="h-4 w-4 mr-2" />New Position</Button>}
      />

      {showForm && (
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Create New Position</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Position Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Department *"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div className="md:col-span-3 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit">Create Position</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Position</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Priority</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Applicants</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((pos) => (
              <tr key={pos.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="py-3 px-4 font-medium">{pos.title}</td>
                <td className="py-3 px-4 text-muted-foreground">{pos.department}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    pos.priority === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                    pos.priority === "medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}>{pos.priority}</span>
                </td>
                <td className="py-3 px-4 text-center capitalize">{pos.status}</td>
                <td className="py-3 px-4 text-right font-medium">{pos.applicants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
