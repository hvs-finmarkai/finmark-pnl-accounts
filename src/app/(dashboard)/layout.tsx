"use client"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { AppShell } from "@/components/layout/app-shell"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { setTheme, setUser, theme } = useAppStore()

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const t = savedTheme || "dark"
    setTheme(t)
    document.documentElement.classList.toggle("dark", t === "dark")

    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)) } catch {}
    }
  }, [setTheme, setUser])

  return <AppShell>{children}</AppShell>
}
