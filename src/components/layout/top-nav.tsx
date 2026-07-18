"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Bell, Filter, Calendar, Sun, Moon, LogOut, User, Settings } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TopNav() {
  const router = useRouter()
  const { user, notifications, sidebarCollapsed, theme, setTheme, setNotifications, searchQuery, setSearchQuery, searchResults, setSearchResults, searchOpen, setSearchOpen, dateRange, setDateRange, logout } = useAppStore()
  const searchRef = useRef<HTMLDivElement>(null)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  useEffect(() => {
    fetch("/api/notifications").then(r => r.json()).then(d => setNotifications(d.unreadCount || 0)).catch(() => {})
  }, [setNotifications])

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([])
      return
    }
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then(r => r.json())
        .then(d => setSearchResults(d.results || []))
        .catch(() => setSearchResults([]))
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchQuery, setSearchResults])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setSearchOpen])

  function handleSearchSelect(result: any) {
    setSearchOpen(false)
    setSearchQuery("")
    const routes: Record<string, string> = { client: "/clients", project: "/projects", employee: "/workforce", transaction: "/pnl" }
    router.push(routes[result.type] || "/dashboard")
  }

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 transition-all duration-300",
      sidebarCollapsed ? "ml-[70px]" : "ml-[260px]"
    )}>
      <div className="flex flex-1 items-center gap-4">
        <div ref={searchRef} className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clients, projects, employees..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true) }}
            onFocus={() => searchQuery.length >= 2 && setSearchOpen(true)}
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-border bg-card shadow-elevated z-50 max-h-80 overflow-y-auto">
              {searchResults.map((result: any, i: number) => (
                <button
                  key={i}
                  onClick={() => handleSearchSelect(result)}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{result.type}</span>
                  <div>
                    <p className="text-sm font-medium">{result.name}</p>
                    <p className="text-xs text-muted-foreground">{result.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {searchOpen && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-border bg-card shadow-elevated z-50 p-4 text-center text-sm text-muted-foreground">
              No results found for &quot;{searchQuery}&quot;
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setDatePickerOpen(!datePickerOpen)}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">{dateRange.from} to {dateRange.to}</span>
          </button>
          {datePickerOpen && (
            <div className="absolute right-0 top-full mt-1 rounded-lg border border-border bg-card p-4 shadow-elevated z-50 min-w-[280px]">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">From</label>
                  <input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} className="mt-1 h-8 w-full rounded-md border border-border bg-background px-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">To</label>
                  <input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} className="mt-1 h-8 w-full rounded-md border border-border bg-background px-2 text-sm" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setDateRange({ from: "2025-01-01", to: "2025-05-31" }); setDatePickerOpen(false) }} className="flex-1 h-7 rounded-md bg-muted text-xs font-medium hover:bg-muted/80">YTD</button>
                  <button onClick={() => { setDateRange({ from: "2025-04-01", to: "2025-05-31" }); setDatePickerOpen(false) }} className="flex-1 h-7 rounded-md bg-muted text-xs font-medium hover:bg-muted/80">Q2</button>
                  <button onClick={() => { setDateRange({ from: "2025-05-01", to: "2025-05-31" }); setDatePickerOpen(false) }} className="flex-1 h-7 rounded-md bg-muted text-xs font-medium hover:bg-muted/80">May</button>
                </div>
                <button onClick={() => setDatePickerOpen(false)} className="w-full h-8 rounded-md bg-brand-500 text-white text-xs font-medium">Apply</button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={() => router.push("/notifications")}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent transition-colors"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {notifications}
            </span>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent transition-colors">
            <Avatar fallback={user?.name || "U"} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-[11px] text-muted-foreground">{user?.role || ""}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <Settings className="h-4 w-4 mr-2" />Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
