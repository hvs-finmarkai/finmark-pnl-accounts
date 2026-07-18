"use client"

import { useEffect, useState } from "react"
import { Users, UserCheck, Clock, UserX } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { useToast } from "@/components/shared/toast-provider"
import { downloadCSV } from "@/lib/download"

export default function WorkforcePage() {
  const [data, setData] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/workforce").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const utilizationData = [
    { name: "Billable", value: data.summary.active - data.summary.bench, color: "#3B82F6" },
    { name: "Non-Billable", value: Math.round(data.summary.active * 0.15), color: "#F59E0B" },
    { name: "Bench", value: data.summary.bench, color: "#EF4444" },
  ]

  const activeEmployees = data.employees.filter((e: any) => e.status === "active")
  const benchEmployees = data.employees.filter((e: any) => e.status === "bench")

  function handleExport() {
    const exportData = data.employees.map((e: any) => ({
      Name: e.name,
      Role: e.role,
      Department: e.department,
      Status: e.status,
      Project: e.project_name || "",
      Utilization: `${e.utilization}%`,
      Salary: e.salary,
    }))
    downloadCSV(exportData, "workforce_report")
    toast("Workforce report exported", "success")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Workforce" description="Monitor employee utilization, allocation, and capacity" actions={<Button onClick={handleExport}>Export Report</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Employees" value={String(data.summary.total)} change={4.2} icon={Users} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Billable Employees" value={String(data.summary.active)} change={3.1} icon={UserCheck} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Bench Employees" value={String(data.summary.bench)} change={-8.2} trend="down" icon={UserX} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
        <KPICard title="Avg Utilization" value={`${data.summary.avgUtilization}%`} change={2.4} icon={Clock} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="bench">Bench</TabsTrigger>
          <TabsTrigger value="overtime">Overtime</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <ChartCard title="Workforce Distribution">
              <div className="h-[250px] flex items-center">
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Pie data={utilizationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                      {utilizationData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {utilizationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-lg font-bold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Utilization by Department">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.byDepartment}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="department" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" unit="%" />
                    <Tooltip />
                    <Bar dataKey="avg_util" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Avg Utilization %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="allocation">
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
                  <th className="py-3 px-4 text-right font-medium text-muted-foreground">Headcount</th>
                  <th className="py-3 px-4 text-right font-medium text-muted-foreground">Avg Utilization</th>
                  <th className="py-3 px-4 text-right font-medium text-muted-foreground">Monthly Cost</th>
                </tr>
              </thead>
              <tbody>
                {data.byDepartment.map((d: any) => (
                  <tr key={d.department} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{d.department}</td>
                    <td className="py-3 px-4 text-right">{d.count}</td>
                    <td className="py-3 px-4 text-right">{d.avg_util?.toFixed(0) || 0}%</td>
                    <td className="py-3 px-4 text-right">₹{(d.total_salary / 1000).toFixed(0)}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="utilization">
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Employee</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Role</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Project</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {activeEmployees.map((e: any) => (
                  <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{e.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{e.role}</td>
                    <td className="py-3 px-4">{e.project_name || "-"}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={e.utilization} className="w-20 h-1.5" color={e.utilization > 90 ? "bg-red-500" : e.utilization > 70 ? "bg-brand-500" : "bg-amber-500"} />
                        <span className="text-xs font-medium w-8">{e.utilization}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="bench">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchEmployees.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <UserX className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No employees on bench</p>
              </div>
            ) : (
              benchEmployees.map((e: any) => (
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
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="overtime">
          <div className="mt-4">
            <Card>
              <CardHeader><CardTitle>Overtime Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">1,245</p>
                    <p className="text-sm text-muted-foreground">Total Overtime Hours</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">₹6.2L</p>
                    <p className="text-sm text-muted-foreground">Overtime Cost</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-sm text-muted-foreground">Employees with OT</p>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Employee</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Department</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">Hours</th>
                        <th className="py-3 px-4 text-right font-medium text-muted-foreground">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeEmployees.filter((e: any) => e.utilization > 85).map((e: any) => (
                        <tr key={e.id} className="border-b last:border-0">
                          <td className="py-3 px-4 font-medium">{e.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{e.department}</td>
                          <td className="py-3 px-4 text-right">{Math.round((e.utilization - 80) * 4)}h</td>
                          <td className="py-3 px-4 text-right">₹{Math.round((e.utilization - 80) * 4 * (e.salary / 160))}K</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
