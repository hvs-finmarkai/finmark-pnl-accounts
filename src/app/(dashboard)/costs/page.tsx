"use client"

import { DollarSign, PieChart as PieIcon, Settings, CheckCircle2 } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/shared/status-pill"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { useRouter } from "next/navigation"

const allocationByDept = [
  { name: "Engineering", value: 40, color: "#3B82F6" },
  { name: "Sales & Marketing", value: 25, color: "#10B981" },
  { name: "Operations", value: 15, color: "#F59E0B" },
  { name: "Finance", value: 10, color: "#8B5CF6" },
  { name: "HR", value: 5, color: "#EC4899" },
  { name: "Other", value: 5, color: "#94A3B8" },
]

const allocationRules = [
  { id: "1", name: "IT Infrastructure", driver: "Headcount", allocated: 4.2, total: 4.8, status: "approved" as const },
  { id: "2", name: "Office Space", driver: "Square Footage", allocated: 3.1, total: 3.5, status: "approved" as const },
  { id: "3", name: "HR Services", driver: "Headcount", allocated: 2.8, total: 2.8, status: "approved" as const },
  { id: "4", name: "Management Fee", driver: "Revenue %", allocated: 5.5, total: 6.0, status: "pending" as const },
  { id: "5", name: "Training Budget", driver: "Department", allocated: 1.2, total: 1.5, status: "pending" as const },
]

export default function CostAllocationPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cost Allocation"
        description="Manage shared cost allocation across departments and projects"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/costs/simulation")}>Run Simulation</Button>
            <Button onClick={() => router.push("/costs/rules")}>New Rule</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Shared Cost" value="₹18.6M" change={5.2} icon={DollarSign} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Allocated Cost" value="₹17.95M" change={3.1} icon={PieIcon} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Unallocated" value="₹650K" change={-18.2} trend="down" icon={Settings} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
        <KPICard title="Pending Approvals" value="3" change={0} trend="flat" icon={CheckCircle2} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
      </div>

      <Tabs defaultValue="rules">
        <TabsList>
          <TabsTrigger value="rules">Allocation Rules</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="simulation">Simulation</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Active Allocation Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground">
                          <th className="py-3 text-left font-medium">Cost Center</th>
                          <th className="py-3 text-left font-medium">Driver</th>
                          <th className="py-3 text-right font-medium">Allocated (₹M)</th>
                          <th className="py-3 text-right font-medium">Total (₹M)</th>
                          <th className="py-3 text-center font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allocationRules.map((rule) => (
                          <tr key={rule.id} className="border-b last:border-0">
                            <td className="py-3 font-medium">{rule.name}</td>
                            <td className="py-3 text-muted-foreground">{rule.driver}</td>
                            <td className="py-3 text-right">₹{rule.allocated}M</td>
                            <td className="py-3 text-right">₹{rule.total}M</td>
                            <td className="py-3 text-center">
                              <StatusPill status={rule.status === "approved" ? "on-track" : "pending"} label={rule.status === "approved" ? "Approved" : "Pending"} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <ChartCard title="Allocation by Department">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={allocationByDept} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                      {allocationByDept.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="drivers">
          <div className="py-12 text-center text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Cost Drivers</p>
            <p className="text-sm">Configure allocation drivers like headcount, revenue %, and custom metrics</p>
          </div>
        </TabsContent>

        <TabsContent value="simulation">
          <div className="py-12 text-center text-muted-foreground">
            <PieIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Cost Simulation</p>
            <p className="text-sm">Run what-if scenarios to optimize cost allocation</p>
          </div>
        </TabsContent>

        <TabsContent value="approvals">
          <div className="py-12 text-center text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Pending Approvals</p>
            <p className="text-sm">Review and approve cost allocation changes</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
