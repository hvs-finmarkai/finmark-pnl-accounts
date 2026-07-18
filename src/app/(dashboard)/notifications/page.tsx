"use client"

import { Bell, CheckCircle2, AlertTriangle, Info, XCircle, Clock } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const notifications = [
  { id: "1", type: "approval", title: "Invoice INV-04821 requires your approval", detail: "Amount: ₹5,240,180 - From: Bangalre Cement", time: "15m ago", read: false },
  { id: "2", type: "warning", title: "Project Apollo margin dropped below 10%", detail: "Current margin: 8.2%. Threshold: 10%", time: "1h ago", read: false },
  { id: "3", type: "warning", title: "Budget exceeded in Project Orion", detail: "Exceeded by: ₹980,000 (12.3%)", time: "2h ago", read: false },
  { id: "4", type: "info", title: "New comment on ERP Implementation", detail: "By Pooja Nair", time: "3h ago", read: true },
  { id: "5", type: "success", title: "Data sync completed successfully", detail: "All systems are up to date", time: "5h ago", read: true },
  { id: "6", type: "approval", title: "Budget revision request for Q3", detail: "Submitted by Finance Team", time: "1d ago", read: true },
  { id: "7", type: "alert", title: "Integration error: Power BI", detail: "Authentication token expired. Please reconnect.", time: "2d ago", read: true },
]

const typeConfig: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  approval: { icon: CheckCircle2, color: "text-brand-500", bg: "bg-brand-50 dark:bg-brand-900/30" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/30" },
  alert: { icon: XCircle, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/30" },
  info: { icon: Info, color: "text-slate-500", bg: "bg-slate-50 dark:bg-slate-800/50" },
  success: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated on approvals, alerts, and system events"
        actions={<Button variant="outline">Mark All Read</Button>}
      />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-2 mt-4">
            {notifications.map((notif) => {
              const config = typeConfig[notif.type] || typeConfig.info
              const Icon = config.icon
              return (
                <div
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-muted/30",
                    !notif.read && "bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800"
                  )}
                >
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={cn("text-sm font-medium", !notif.read && "font-semibold")}>{notif.title}</p>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.detail}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    <span>{notif.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-2 mt-4">
            {notifications.filter(n => !n.read).map((notif) => {
              const config = typeConfig[notif.type] || typeConfig.info
              const Icon = config.icon
              return (
                <div key={notif.id} className="flex items-start gap-4 rounded-xl border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10 p-4">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                    <Icon className={cn("h-4 w-4", config.color)} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="approvals">
          <div className="py-12 text-center text-muted-foreground">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Approval Notifications</p>
            <p className="text-sm">Pending approval requests</p>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="py-12 text-center text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Alert Notifications</p>
            <p className="text-sm">Critical alerts and warnings</p>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="py-12 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">System Notifications</p>
            <p className="text-sm">System updates and maintenance alerts</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
