"use client"

import { Link2, RefreshCw, Settings, AlertCircle } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusPill } from "@/components/shared/status-pill"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const integrations = [
  { id: "1", name: "Salesforce CRM", category: "CRM", status: "connected" as const, lastSync: "5 min ago", records: 12450, errors: 0 },
  { id: "2", name: "SAP S/4HANA", category: "ERP", status: "connected" as const, lastSync: "15 min ago", records: 8920, errors: 0 },
  { id: "3", name: "BambooHR", category: "HRMS", status: "connected" as const, lastSync: "30 min ago", records: 586, errors: 2 },
  { id: "4", name: "Jira Software", category: "Project Mgmt", status: "connected" as const, lastSync: "10 min ago", records: 3420, errors: 0 },
  { id: "5", name: "Tally Prime", category: "Accounting", status: "connected" as const, lastSync: "15 min ago", records: 15680, errors: 0 },
  { id: "6", name: "Azure AD", category: "SSO", status: "connected" as const, lastSync: "2 hours ago", records: 590, errors: 0 },
  { id: "7", name: "Power BI", category: "Analytics", status: "disconnected" as const, lastSync: "3 days ago", records: 0, errors: 5 },
  { id: "8", name: "Slack", category: "Communication", status: "connected" as const, lastSync: "1 min ago", records: 0, errors: 0 },
]

const categoryColors: Record<string, string> = {
  CRM: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  ERP: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  HRMS: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  "Project Mgmt": "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  Accounting: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  SSO: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  Analytics: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  Communication: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
}

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect and manage external systems and data sources"
        actions={<Button><Link2 className="h-4 w-4 mr-2" />Add Integration</Button>}
      />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${categoryColors[integration.category] || "bg-muted"}`}>
                      {integration.name.slice(0, 2)}
                    </div>
                    <StatusPill status={integration.status} />
                  </div>
                  <h3 className="font-semibold text-sm mb-0.5">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{integration.category}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Sync</span>
                      <span className="font-medium">{integration.lastSync}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Records</span>
                      <span className="font-medium">{integration.records.toLocaleString()}</span>
                    </div>
                    {integration.errors > 0 && (
                      <div className="flex justify-between text-red-500">
                        <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3" />Errors</span>
                        <span className="font-medium">{integration.errors}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4 pt-3 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="h-3 w-3 mr-1" />Sync
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected">
          <div className="py-12 text-center text-muted-foreground">
            <Link2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Connected Integrations</p>
            <p className="text-sm">View and manage active connections</p>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <div className="py-12 text-center text-muted-foreground">
            <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Sync Logs</p>
            <p className="text-sm">View detailed synchronization history and error logs</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
