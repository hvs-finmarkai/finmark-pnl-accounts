"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DollarSign,
  TrendingUp,
  Target,
  FolderKanban,
  AlertTriangle,
  BarChart3,
  Brain,
  Plus,
  FileText,
  Users,
  MessageSquare,
  ChevronDown,
} from "lucide-react"
import { KPICard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/shared/chart-card"
import { StatusPill } from "@/components/shared/status-pill"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Jan", current: 95, previous: 82 },
  { month: "Feb", current: 102, previous: 88 },
  { month: "Mar", current: 110, previous: 95 },
  { month: "Apr", current: 118, previous: 100 },
  { month: "May", current: 125.8, previous: 108 },
  { month: "Jun", current: 132, previous: 112 },
]

const geographyData = [
  { name: "North America", value: 45, color: "#3B82F6" },
  { name: "Europe", value: 25, color: "#10B981" },
  { name: "APAC", value: 20, color: "#F59E0B" },
  { name: "Africa", value: 10, color: "#8B5CF6" },
]

const budgetData = [
  { name: "Revenue", budget: 150, actual: 125.8 },
  { name: "Direct Costs", budget: 80, actual: 72.4 },
  { name: "Indirect Costs", budget: 20, actual: 18.7 },
  { name: "Net Profit", budget: 16, actual: 18.6 },
]

const topProjects = [
  { name: "Project Apollo", margin: 42.8, status: "on-track" as const },
  { name: "Project Phoenix", margin: 38.2, status: "on-track" as const },
  { name: "Project Atlas", margin: 34.1, status: "on-track" as const },
  { name: "Project Zenith", margin: 22.6, status: "at-risk" as const },
  { name: "Project Orion", margin: 18.3, status: "at-risk" as const },
]

const pnlSummary = [
  { particular: "Revenue", actual: 125.8, budget: 110.2, variance: 15.6, variancePercent: 14.16 },
  { particular: "Direct Costs", actual: 72.4, budget: 65.1, variance: 7.3, variancePercent: 11.21 },
  { particular: "Gross Profit", actual: 53.4, budget: 45.1, variance: 8.3, variancePercent: 18.40 },
  { particular: "Indirect Costs", actual: 18.7, budget: 16.2, variance: 2.5, variancePercent: 15.43 },
  { particular: "Net Profit", actual: 18.6, budget: 14.2, variance: 4.4, variancePercent: 30.98 },
]

const profitabilityData = [
  { name: "TechCorp Inc.", margin: 28.5 },
  { name: "Global Solutions", margin: 31.2 },
  { name: "InnovateX", margin: 26.7 },
  { name: "HealthPlus", margin: 23.1 },
  { name: "FidServe Global", margin: 19.7 },
  { name: "EduMind", margin: 18.3 },
]

const alerts = [
  { title: "Project Phoenix margin dropped below 10%", detail: "Current margin: 8.2%", time: "5m ago", type: "danger" },
  { title: "Budget exceeded in Project Orion", detail: "Exceeded by: ₹980,000 (12.3%)", time: "15m ago", type: "warning" },
  { title: "High overtime in Project Apollo", detail: "Overtime cost: ₹620,000", time: "1h ago", type: "warning" },
  { title: "New comment on ERP Implementation", detail: "By Pooja Nair", time: "2h ago", type: "info" },
  { title: "Data sync completed successfully", detail: "All systems are up to date", time: "3h ago", type: "success" },
]

const aiInsights = [
  { text: "3 projects (Phoenix, Orion, Zenith) are at risk. Reallocation recommended.", action: "View Projects", href: "/projects/risks" },
  { text: "Consider re-allocating 12 bench resources. Potential saving: ₹1.2M/month.", action: "View Resources", href: "/workforce/bench" },
  { text: "Increase pricing for 2 accounts. Potential margin improvement: 4.6%.", action: "View Accounts", href: "/clients/profitability" },
]

function QuickActions() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <Button onClick={() => setOpen(!open)}>
        <Plus className="h-4 w-4 mr-2" />Quick Actions<ChevronDown className="h-4 w-4 ml-2" />
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-elevated z-50 py-1">
          <Link href="/clients" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
            <Users className="h-4 w-4 text-muted-foreground" />Add New Client
          </Link>
          <Link href="/projects" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
            <FolderKanban className="h-4 w-4 text-muted-foreground" />Create Project
          </Link>
          <Link href="/reports/exports" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
            <FileText className="h-4 w-4 text-muted-foreground" />Generate Report
          </Link>
          <Link href="/ai/chat" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />Ask AI
          </Link>
          <Link href="/admin/users" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors">
            <Plus className="h-4 w-4 text-muted-foreground" />Add User
          </Link>
        </div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Arjun!"
        actions={<QuickActions />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Total Revenue" value="₹125.8M" change={18.5} icon={DollarSign} iconColor="text-brand-500" iconBg="bg-brand-50 dark:bg-brand-900/30" />
        <KPICard title="Gross Margin" value="32.6%" change={2.6} icon={TrendingUp} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Net Profit" value="₹18.6M" change={15.7} icon={Target} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-900/30" />
        <KPICard title="Active Projects" value="128" change={10} icon={FolderKanban} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-900/30" />
        <KPICard title="At Risk Projects" value="14" change={-3} trend="down" icon={AlertTriangle} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/30" />
        <KPICard title="Revenue at Risk" value="₹9.2M" change={-12.4} trend="down" icon={BarChart3} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/30" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <ChartCard title="Revenue Trend" className="lg:col-span-4">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#3B82F6" strokeWidth={2} dot={false} name="2025" />
                <Line type="monotone" dataKey="previous" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" dot={false} name="2024" opacity={0.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue by Geography" className="lg:col-span-4">
          <div className="h-[220px] flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={geographyData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {geographyData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {geographyData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Top Projects by Margin</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground pb-2 border-b">
                <span>Project</span>
                <span className="text-right">Margin %</span>
                <span className="text-right">Status</span>
              </div>
              {topProjects.map((p) => (
                <div key={p.name} className="grid grid-cols-3 items-center text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-right">{p.margin}%</span>
                  <div className="flex justify-end">
                    <StatusPill status={p.status} />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/projects" className="w-full mt-4 text-sm text-brand-500 hover:text-brand-600 font-medium block text-center">
              View All Projects
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">P&L Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground pb-2 border-b">
                <span>Particulars</span>
                <span className="text-right">Actual (₹M)</span>
                <span className="text-right">Budget (₹M)</span>
                <span className="text-right">Variance</span>
                <span className="text-right">Variance %</span>
              </div>
              {pnlSummary.map((row) => (
                <div key={row.particular} className="grid grid-cols-5 items-center text-sm py-1">
                  <span className="font-medium">{row.particular}</span>
                  <span className="text-right">{row.actual}</span>
                  <span className="text-right">{row.budget}</span>
                  <span className="text-right text-emerald-500">+{row.variance}</span>
                  <span className="text-right text-emerald-500">+{row.variancePercent}%</span>
                </div>
              ))}
            </div>
            <Link href="/pnl/profit-loss" className="w-full mt-4 text-sm text-brand-500 hover:text-brand-600 font-medium block text-center">
              View Full P&L Statement
            </Link>
          </CardContent>
        </Card>

        <ChartCard title="Profitability by Client" className="lg:col-span-4">
          <div className="space-y-3">
            {profitabilityData.map((client) => (
              <div key={client.name} className="flex items-center gap-3">
                <span className="text-sm w-32 truncate">{client.name}</span>
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${client.margin * 2.5}%` }} />
                </div>
                <span className="text-sm font-medium w-12 text-right">{client.margin}%</span>
              </div>
            ))}
            <Link href="/clients" className="w-full mt-2 text-sm text-brand-500 hover:text-brand-600 font-medium block text-center">
              View All Clients
            </Link>
          </div>
        </ChartCard>

        <ChartCard title="Budget vs Actual" className="lg:col-span-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Budget (₹M)" />
                <Bar dataKey="actual" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Actual (₹M)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">My Tasks & Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Link href="/notifications" className="px-3 py-1 text-xs font-medium rounded-md bg-brand-500 text-white">Approvals (5)</Link>
              <Link href="/notifications" className="px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted">Tasks (8)</Link>
              <Link href="/notifications" className="px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted">Information (3)</Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Invoice #INV-04821 approval</p>
                  <p className="text-xs text-muted-foreground">Vendor: Bangalre Cement</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">₹5,240,180</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
                  <Target className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Budget revision for Project Orion</p>
                  <p className="text-xs text-muted-foreground">Requested by: Rohan Singh</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold">₹980,000</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </div>
            <Link href="/notifications" className="w-full mt-4 text-sm text-brand-500 hover:text-brand-600 font-medium block text-center">
              View All Tasks
            </Link>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Link href="/ai" className="px-3 py-1 text-xs font-medium rounded-md bg-brand-500 text-white">Recommendations</Link>
              <Link href="/ai/anomalies" className="px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted">Anomalies</Link>
              <Link href="/ai/predictions" className="px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:bg-muted">Predictions</Link>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
                    <Brain className="h-4 w-4 text-brand-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{insight.text}</p>
                    <Link href={insight.href} className="text-xs text-brand-500 font-medium mt-1 inline-block">{insight.action}</Link>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/ai" className="w-full mt-4 text-sm text-brand-500 hover:text-brand-600 font-medium block text-center">
              Go to AI Insights
            </Link>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Alerts</CardTitle>
                <Link href="/notifications" className="text-xs text-brand-500 font-medium">View All</Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.slice(0, 3).map((alert, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${
                      alert.type === "danger" ? "bg-red-500" :
                      alert.type === "warning" ? "bg-amber-500" :
                      alert.type === "success" ? "bg-emerald-500" : "bg-brand-500"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{alert.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cash Flow Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operating Cash Flow</span>
                  <span className="font-medium text-emerald-500">₹20.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investing Cash Flow</span>
                  <span className="font-medium text-red-500">(₹8.2M)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Financing Cash Flow</span>
                  <span className="font-medium text-red-500">(₹6.1M)</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-medium">Net Cash Flow</span>
                  <span className="font-bold text-emerald-500">₹6.1M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
