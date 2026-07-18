"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FolderKanban,
  UserCog,
  PieChart,
  Workflow,
  FileText,
  Brain,
  Link2,
  Bell,
  Shield,
  Settings,
  ChevronDown,
  ChevronLeft,
  Sun,
  Moon,
  LogOut,
  LucideIcon,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  children?: { label: string; href: string }[]
}

const navigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "P&L Management",
    href: "/pnl",
    icon: TrendingUp,
    children: [
      { label: "Overview", href: "/pnl" },
      { label: "Profit & Loss", href: "/pnl/profit-loss" },
      { label: "Budget vs Actual", href: "/pnl/budget" },
      { label: "Revenue", href: "/pnl/revenue" },
      { label: "Expenses", href: "/pnl/expenses" },
      { label: "Forecast", href: "/pnl/forecast" },
      { label: "Variance Analysis", href: "/pnl/variance" },
    ],
  },
  {
    label: "Clients",
    href: "/clients",
    icon: Users,
    children: [
      { label: "All Clients", href: "/clients" },
      { label: "Contracts", href: "/clients/contracts" },
      { label: "Billing", href: "/clients/billing" },
      { label: "Profitability", href: "/clients/profitability" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Timeline", href: "/projects/timeline" },
      { label: "Financials", href: "/projects/financials" },
      { label: "Resources", href: "/projects/resources" },
      { label: "Risks", href: "/projects/risks" },
    ],
  },
  {
    label: "Workforce",
    href: "/workforce",
    icon: UserCog,
    children: [
      { label: "Employees", href: "/workforce" },
      { label: "Utilization", href: "/workforce/utilization" },
      { label: "Bench", href: "/workforce/bench" },
      { label: "Allocation", href: "/workforce/allocation" },
      { label: "Skills", href: "/workforce/skills" },
      { label: "Hiring", href: "/workforce/hiring" },
    ],
  },
  {
    label: "Cost Allocation",
    href: "/costs",
    icon: PieChart,
    children: [
      { label: "Shared Costs", href: "/costs" },
      { label: "Allocation Rules", href: "/costs/rules" },
      { label: "Drivers", href: "/costs/drivers" },
      { label: "Simulation", href: "/costs/simulation" },
      { label: "Approvals", href: "/costs/approvals" },
    ],
  },
  { label: "Workflow Builder", href: "/workflows", icon: Workflow },
  {
    label: "Reports & Analytics",
    href: "/reports",
    icon: FileText,
    children: [
      { label: "All Reports", href: "/reports" },
      { label: "Board Deck", href: "/reports/board-deck" },
      { label: "Exports", href: "/reports/exports" },
      { label: "Scheduled", href: "/reports/scheduled" },
    ],
  },
  {
    label: "AI Insights",
    href: "/ai",
    icon: Brain,
    children: [
      { label: "Recommendations", href: "/ai" },
      { label: "Anomalies", href: "/ai/anomalies" },
      { label: "Predictions", href: "/ai/predictions" },
      { label: "Chat", href: "/ai/chat" },
    ],
  },
  { label: "Integrations", href: "/integrations", icon: Link2 },
]

const bottomNavigation: NavItem[] = [
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Administration", href: "/admin", icon: Shield },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleCollapse, theme, setTheme, notifications } = useAppStore()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  function toggleExpand(label: string) {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-navy-950 text-white transition-all duration-300",
      sidebarCollapsed ? "w-[70px]" : "w-[260px]"
    )}>
      <div className="flex h-16 items-center gap-3 px-4 border-b border-white/10">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate">P&L AutoTrack Suite</p>
            <p className="text-[10px] text-slate-400 truncate">Real-time P&L Automation Platform</p>
          </div>
        )}
        <button onClick={toggleCollapse} className="ml-auto rounded-md p-1 hover:bg-white/10 transition-colors">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const active = isActive(item.href)
            const expanded = expandedItems.includes(item.label)
            const hasChildren = item.children && item.children.length > 0

            return (
              <div key={item.label}>
                <div className="relative">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active ? "bg-brand-500/20 text-brand-400" : "text-slate-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", expanded && "rotate-180")} />
                        </>
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active ? "bg-brand-500 text-white shadow-sm" : "text-slate-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                      {item.label === "Notifications" && !sidebarCollapsed && notifications > 0 && (
                        <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold text-white">
                          {notifications}
                        </span>
                      )}
                    </Link>
                  )}
                </div>

                {hasChildren && expanded && !sidebarCollapsed && (
                  <div className="ml-5 mt-0.5 space-y-0.5 border-l border-white/10 pl-4">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                          pathname === child.href ? "text-brand-400 bg-brand-500/10" : "text-slate-400 hover:text-white"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 px-2 py-3 space-y-0.5">
        {bottomNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href) ? "bg-brand-500/20 text-brand-400" : "text-slate-300 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{item.label}</span>}
            {item.label === "Notifications" && notifications > 0 && (
              <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-bold">
                {notifications}
              </span>
            )}
          </Link>
        ))}

        {!sidebarCollapsed && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === "dark" ? "Light" : "Dark"}</span>
            </button>
          </div>
        )}

        {!sidebarCollapsed && (
          <SidebarUserMenu />
        )}
      </div>
    </aside>
  )
}

function SidebarUserMenu() {
  const { user, logout } = useAppStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const displayName = user?.name || "Arjun Mehta"
  const displayRole = user?.role || "CFO"
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase()

  return (
    <div ref={ref} className="relative mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5 transition-colors"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
          {initials}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-white truncate">{displayName}</p>
          <p className="text-[11px] text-slate-400 capitalize">{displayRole}</p>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute bottom-full left-2 right-2 mb-1 rounded-lg border border-white/10 bg-navy-900 py-1 shadow-lg">
          <Link href="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link href="/admin/users" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <UserCog className="h-4 w-4" />
            Manage Users
          </Link>
          <div className="my-1 border-t border-white/10" />
          <button onClick={logout} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
