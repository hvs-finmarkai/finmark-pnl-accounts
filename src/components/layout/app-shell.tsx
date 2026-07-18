"use client"

import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { Breadcrumbs } from "./breadcrumbs"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopNav />
      <main className={cn(
        "min-h-[calc(100vh-4rem)] transition-all duration-300 p-6",
        sidebarCollapsed ? "ml-[70px]" : "ml-[260px]"
      )}>
        <Breadcrumbs className="mb-4" />
        {children}
      </main>
    </div>
  )
}
