import { create } from "zustand"

interface AppState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  theme: "light" | "dark"
  currentOrg: string
  dateRange: { from: string; to: string }
  user: { name: string; role: string; email: string } | null
  notifications: number
  searchQuery: string
  searchResults: any[]
  searchOpen: boolean
  toggleSidebar: () => void
  toggleCollapse: () => void
  setTheme: (theme: "light" | "dark") => void
  setOrg: (org: string) => void
  setDateRange: (range: { from: string; to: string }) => void
  setUser: (user: { name: string; role: string; email: string } | null) => void
  setNotifications: (count: number) => void
  setSearchQuery: (query: string) => void
  setSearchResults: (results: any[]) => void
  setSearchOpen: (open: boolean) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  theme: "dark",
  currentOrg: "Finmark.ai",
  dateRange: { from: "2025-01-01", to: "2025-05-31" },
  user: null,
  notifications: 0,
  searchQuery: "",
  searchResults: [],
  searchOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      localStorage.setItem("theme", theme)
    }
    set({ theme })
  },
  setOrg: (currentOrg) => set({ currentOrg }),
  setDateRange: (dateRange) => set({ dateRange }),
  setUser: (user) => set({ user }),
  setNotifications: (notifications) => set({ notifications }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      fetch("/api/auth/logout", { method: "POST" }).finally(() => {
        window.location.href = "/login"
      })
    }
    set({ user: null })
  },
}))
