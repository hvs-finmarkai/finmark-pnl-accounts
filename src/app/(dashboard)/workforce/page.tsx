"use client"

import { Users, UserCheck, Clock, UserX, TrendingUp, DollarSign } from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const utilizationData = [
  { name: "Billable", value: 78.4, color: "#3B82F6" },
  { name: "Non-Billable", value: 11.2, color: "#F59E0B" },
  { name: "Bench", value: 10.4, color: "#EF4444" },
]

const topEmployees = [
  { name: "Arun Sharma", role: "Developer", utilization: 95, project: "Project Apollo", cost: 410000 },
  { name: "Pooja Nair", role: "Business Analyst", utilization: 88, project: "ERP Implementation", cost: 360000 },
  { name: "Rohit Mehta", role: "UI/UX Designer", utilization: 85, project: "Mobile App Dev", cost: 320000 },
  { name: "Sneha Iyer", role: "Project Manager", utilization: 82, project: "Cloud Migration", cost: 410000 },
  { name: "Vikram Dev", role: "DevOps Engineer", utilization: 80, project: "Data Migration", cost: 380000 },
]

export default function WorkforcePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Workforce"
        description="Monitor employee utilization, allocation, and capacity"
        actions={<Button>Export Report</Button>}
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
          <TabsTrigger value="bench">Bench</TabsTrigger>
          <TabsTrigger value="overtime">Overtime</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard title="Total Employees" value="586" change={4.2} icon={Users} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
              <KPICard title="Billable Employees" value="459" change={3.1} icon={UserCheck} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
              <KPICard title="Bench Employees" value="61" change={-8.2} trend="down" icon={UserX} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
              <KPICard title="Overtime Hours" value="1,245" change={12.4} icon={Clock} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard title="Workforce Utilization">
                <div className="h-[250px] flex items-center">
                  <ResponsiveContainer width="50%" height="100%">
                    <PieChart>
                      <Pie data={utilizationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                        {utilizationData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
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
                          <p className="text-xl font-bold">{item.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ChartCard>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Utilized Employees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground pb-2 border-b">
                      <span>Employee</span>
                      <span>Role</span>
                      <span>Utilization</span>
                      <span>Allocation</span>
                      <span className="text-right">Cost (₹/M)</span>
                    </div>
                    {topEmployees.map((emp) => (
                      <div key={emp.name} className="grid grid-cols-5 items-center text-sm">
                        <span className="font-medium">{emp.name}</span>
                        <span className="text-muted-foreground text-xs">{emp.role}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={emp.utilization} className="w-12 h-1.5" />
                          <span className="text-xs">{emp.utilization}%</span>
                        </div>
                        <span className="text-xs">{emp.project}</span>
                        <span className="text-right">₹{(emp.cost / 1000).toFixed(0)}K</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="allocation">
          <div className="py-12 text-center text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Allocation View</p>
            <p className="text-sm">Detailed resource allocation matrix across projects</p>
          </div>
        </TabsContent>

        <TabsContent value="utilization">
          <div className="py-12 text-center text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Utilization Analytics</p>
            <p className="text-sm">Detailed utilization trends and department-wise breakdown</p>
          </div>
        </TabsContent>

        <TabsContent value="bench">
          <div className="py-12 text-center text-muted-foreground">
            <UserX className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Bench Management</p>
            <p className="text-sm">Track and manage bench employees with skill matching</p>
          </div>
        </TabsContent>

        <TabsContent value="overtime">
          <div className="py-12 text-center text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Overtime Tracking</p>
            <p className="text-sm">Monitor overtime hours and associated costs</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
