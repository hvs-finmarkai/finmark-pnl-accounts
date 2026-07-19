"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Configure organization and platform settings" />

      <Tabs defaultValue="organization">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="workflows">Workflow Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Organization Name</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" defaultValue="Finmark.ai" />
                </div>
                <div>
                  <label className="text-sm font-medium">Industry</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" defaultValue="IT Services" />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" defaultValue="India" />
                </div>
                <div>
                  <label className="text-sm font-medium">Fiscal Year Start</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" defaultValue="April" />
                </div>
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" defaultValue="INR (₹)" />
                </div>
                <div>
                  <label className="text-sm font-medium">Time Zone</label>
                  <input className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm" defaultValue="UTC+5:30 (Asia/Kolkata)" />
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium">Logo</label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-xl">
                    D
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <p className="text-lg font-medium">Users & Roles Management</p>
            <p className="text-sm">Configure user roles, team structures, and access levels</p>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <p className="text-lg font-medium">Permission Settings</p>
            <p className="text-sm">Fine-grained access control policies</p>
          </div>
        </TabsContent>

        <TabsContent value="workflows">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <p className="text-lg font-medium">Workflow Configuration</p>
            <p className="text-sm">Default workflow rules, approval chains, and automation settings</p>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <p className="text-lg font-medium">Integration Settings</p>
            <p className="text-sm">API keys, webhook URLs, and sync configurations</p>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <p className="text-lg font-medium">Notification Preferences</p>
            <p className="text-sm">Email, push, and in-app notification rules</p>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <p className="text-lg font-medium">Security Settings</p>
            <p className="text-sm">SSO, MFA, password policies, and data encryption</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
