"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string
  change: number
  changeLabel?: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  trend?: "up" | "down" | "flat"
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = "text-brand-500",
  iconBg = "bg-brand-50 dark:bg-brand-900/30",
  trend,
}: KPICardProps) {
  const trendDirection = trend || (change > 0 ? "up" : change < 0 ? "down" : "flat")
  const TrendIcon = trendDirection === "up" ? TrendingUp : trendDirection === "down" ? TrendingDown : Minus

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated">
      <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", iconBg)}>
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground truncate">{title}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <TrendIcon className={cn(
            "h-3.5 w-3.5",
            trendDirection === "up" && "text-emerald-500",
            trendDirection === "down" && "text-red-500",
            trendDirection === "flat" && "text-muted-foreground"
          )} />
          <span className={cn(
            "text-xs font-medium",
            trendDirection === "up" && "text-emerald-500",
            trendDirection === "down" && "text-red-500",
            trendDirection === "flat" && "text-muted-foreground"
          )}>
            {change > 0 ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </div>
    </div>
  )
}
