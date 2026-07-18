"use client"

import { Shield, Users, Key, Building2, Activity, Lock } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const adminModules = [
  { icon: Users, title: "Users & Roles", description: "Manage user accounts, roles, and permissions", count: "586 users", href: "/admin/users" },
  { icon: Building2, title: "Departments", description: "Configure organizational structure and teams", count: "12 departments", href: "/admin/departments" },
  { icon: Key, title: "Permissions", description: "Fine-grained access control and policies", count: "24 roles", href: "/admin/permissions" },
  { icon: Activity, title: "Audit Logs", description: "Track system activities and user actions", count: "Last 90 days", href: "/admin/audit" },
  { icon: Lock, title: "Security", description: "SSO, MFA, password policies, and compliance", count: "SSO Enabled", href: "/admin/security" },
  { icon: Shield, title: "API Keys", description: "Manage API keys and service accounts", count: "8 active keys", href: "/admin/api-keys" },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Administration"
        description="System configuration, users, roles, and security settings"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminModules.map((module) => (
          <Card key={module.title} className="hover:shadow-elevated transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                  <module.icon className="h-6 w-6 text-brand-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                  <span className="text-xs font-medium text-brand-500">{module.count}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
