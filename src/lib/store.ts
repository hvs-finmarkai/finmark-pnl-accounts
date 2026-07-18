import { create } from "zustand"

interface AppState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  theme: "light" | "dark"
  currentOrg: string
  dateRange: { from: string; to: string }
  user: {
    name: string
    role: string
    avatar: string
    email: string
  }
  notifications: number
  toggleSidebar: () => void
  toggleCollapse: () => void
  setTheme: (theme: "light" | "dark") => void
  setOrg: (org: string) => void
  setDateRange: (range: { from: string; to: string }) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  theme: "dark",
  currentOrg: "Denave India Pvt. Ltd.",
  dateRange: { from: "2025-05-01", to: "2025-05-31" },
  user: {
    name: "Arjun Mehta",
    role: "CFO",
    avatar: "/avatar.png",
    email: "arjun@denave.com",
  },
  notifications: 12,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setTheme: (theme) => set({ theme }),
  setOrg: (currentOrg) => set({ currentOrg }),
  setDateRange: (dateRange) => set({ dateRange }),
}))
