"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const labelMap: Record<string, string> = {
  dashboard: "Dashboard",
  pnl: "P&L Management",
  "profit-loss": "Profit & Loss",
  budget: "Budget vs Actual",
  revenue: "Revenue",
  expenses: "Expenses",
  forecast: "Forecast",
  variance: "Variance Analysis",
  clients: "Clients",
  contracts: "Contracts",
  billing: "Billing",
  profitability: "Profitability",
  projects: "Projects",
  timeline: "Timeline",
  financials: "Financials",
  resources: "Resources",
  risks: "Risks",
  workforce: "Workforce",
  utilization: "Utilization",
  bench: "Bench",
  allocation: "Allocation",
  skills: "Skills",
  hiring: "Hiring",
  costs: "Cost Allocation",
  rules: "Rules",
  drivers: "Drivers",
  simulation: "Simulation",
  approvals: "Approvals",
  workflows: "Workflow Builder",
  reports: "Reports",
  "board-deck": "Board Deck",
  exports: "Exports",
  scheduled: "Scheduled",
  ai: "AI Insights",
  anomalies: "Anomalies",
  predictions: "Predictions",
  chat: "Chat",
  integrations: "Integrations",
  notifications: "Notifications",
  admin: "Administration",
  settings: "Settings",
}

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav className={cn("flex items-center gap-1.5 text-sm", className)}>
      <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1
        const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <div key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
