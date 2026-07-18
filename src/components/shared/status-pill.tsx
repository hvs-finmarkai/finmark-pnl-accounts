import { cn } from "@/lib/utils"

type StatusType = "active" | "inactive" | "on-track" | "at-risk" | "completed" | "pending" | "connected" | "disconnected" | "error" | "planning" | "in-progress" | "on-hold" | "bench"

const statusConfig: Record<StatusType, { dot: string; text: string; bg: string }> = {
  active: { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  "on-track": { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  completed: { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  connected: { dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
  "in-progress": { dot: "bg-brand-500", text: "text-brand-700 dark:text-brand-400", bg: "bg-brand-50 dark:bg-brand-900/20" },
  planning: { dot: "bg-violet-500", text: "text-violet-700 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20" },
  pending: { dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
  "on-hold": { dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
  "at-risk": { dot: "bg-red-500", text: "text-red-700 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
  error: { dot: "bg-red-500", text: "text-red-700 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
  inactive: { dot: "bg-slate-400", text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-800/40" },
  disconnected: { dot: "bg-slate-400", text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-800/40" },
  bench: { dot: "bg-orange-500", text: "text-orange-700 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" },
}

interface StatusPillProps {
  status: StatusType
  label?: string
  className?: string
}

export function StatusPill({ status, label, className }: StatusPillProps) {
  const config = statusConfig[status] || statusConfig.inactive
  const displayLabel = label || status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", config.bg, config.text, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {displayLabel}
    </span>
  )
}
