export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  department: string
  status: "active" | "inactive"
}

export interface Organization {
  id: string
  name: string
  industry: string
  country: string
  currency: string
  fiscalYearStart: string
  logo: string
}

export interface Client {
  id: string
  name: string
  logo: string
  industry: string
  region: string
  revenue: number
  profit: number
  margin: number
  status: "active" | "inactive" | "at-risk"
  healthScore: number
  contractValue: number
  projects: number
}

export interface Project {
  id: string
  name: string
  clientId: string
  clientName: string
  manager: string
  status: "planning" | "in-progress" | "completed" | "on-hold" | "at-risk"
  priority: "low" | "medium" | "high" | "critical"
  budget: number
  revenue: number
  margin: number
  startDate: string
  endDate: string
  progress: number
  resources: number
}

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  role: string
  avatar: string
  utilization: number
  allocation: number
  salary: number
  cost: number
  skills: string[]
  projects: string[]
  status: "active" | "bench" | "on-leave" | "notice"
}

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  type: "revenue" | "expense"
  amount: number
  client: string
  project: string
  status: "posted" | "pending" | "rejected"
}

export interface KPIData {
  id: string
  title: string
  value: string
  change: number
  trend: "up" | "down" | "flat"
  icon: string
  color: string
  prefix?: string
  suffix?: string
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

export interface Notification {
  id: string
  type: "alert" | "approval" | "info" | "warning" | "success"
  title: string
  message: string
  time: string
  read: boolean
  actionUrl?: string
}

export interface WorkflowNode {
  id: string
  type: "trigger" | "condition" | "action" | "approval" | "notification" | "delay" | "loop" | "api" | "end"
  label: string
  config: Record<string, unknown>
  position: { x: number; y: number }
  connections: string[]
}

export interface CostAllocation {
  id: string
  costCenter: string
  totalCost: number
  allocatedCost: number
  unallocatedCost: number
  driver: string
  rule: string
  status: "approved" | "pending" | "rejected"
}

export interface Report {
  id: string
  name: string
  type: "pnl" | "board-summary" | "client-profitability" | "workforce" | "budget" | "cash-flow"
  format: "pdf" | "excel" | "pptx"
  schedule: "on-demand" | "daily" | "weekly" | "monthly"
  lastGenerated: string
  status: "ready" | "generating" | "scheduled"
}

export interface BudgetItem {
  id: string
  category: string
  actual: number
  budget: number
  forecast: number
  variance: number
  variancePercent: number
}

export interface PnLRow {
  particular: string
  actual: number
  budget: number
  variance: number
  variancePercent: number
}

export interface Integration {
  id: string
  name: string
  logo: string
  category: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  records: number
  errors: number
}
