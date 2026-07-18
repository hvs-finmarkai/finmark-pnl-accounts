"use client"

import { useEffect, useState } from "react"
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle, Clock } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/shared/toast-provider"
import { cn } from "@/lib/utils"

const typeConfig: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  approval: { icon: CheckCircle2, color: "text-brand-500", bg: "bg-brand-50 dark:bg-brand-900/30" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/30" },
  alert: { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30" },
  info: { icon: Info, color: "text-slate-500", bg: "bg-slate-50 dark:bg-slate-800/50" },
  success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<any[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => { loadNotifications() }, [])

  function loadNotifications() {
    fetch("/api/notifications").then(r => r.json()).then(d => setNotifications(d.notifications || []))
  }

  async function markAllRead() {
    await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markAllRead: true }) })
    toast("All notifications marked as read")
    loadNotifications()
  }

  async function markOneRead(id: number) {
    await fetch("/api/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    loadNotifications()
  }

  const filtered = filter === "all" ? notifications :
    filter === "unread" ? notifications.filter(n => !n.isRead && !n.is_read) :
    notifications.filter(n => n.type === filter)

  const tabs = ["all", "unread", "approval", "warning", "success"]
  const tabLabels: Record<string, string> = { all: "All", unread: "Unread", approval: "Approvals", warning: "Alerts", success: "System" }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated on approvals, alerts, and system events"
        actions={<Button variant="outline" onClick={markAllRead}>Mark All Read</Button>}
      />

      <div className="flex gap-1 rounded-lg bg-muted p-1 w-fit">
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {tabLabels[t]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((notif: any) => {
          const config = typeConfig[notif.type] || typeConfig.info
          const Icon = config.icon
          const isRead = notif.isRead || notif.is_read
          return (
            <div
              key={notif.id}
              onClick={() => !isRead && markOneRead(notif.id)}
              className={cn(
                "flex items-start gap-4 rounded-xl border border-border p-4 transition-colors cursor-pointer hover:bg-muted/30",
                !isRead && "bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800"
              )}
            >
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn("text-sm", !isRead ? "font-semibold" : "font-medium")}>{notif.title}</p>
                  {!isRead && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Clock className="h-3 w-3" />
                <span>{new Date(notif.createdAt || notif.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
