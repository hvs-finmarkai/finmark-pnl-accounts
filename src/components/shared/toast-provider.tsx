"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, X } from "lucide-react"

interface Toast {
  id: number
  message: string
  type: "success" | "error" | "info"
}

const ToastContext = createContext<{ toast: (message: string, type?: "success" | "error" | "info") => void }>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map(t => (
          <div key={t.id} className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-elevated animate-in slide-in-from-right",
            t.type === "success" && "bg-emerald-500 text-white",
            t.type === "error" && "bg-red-500 text-white",
            t.type === "info" && "bg-brand-500 text-white"
          )}>
            <CheckCircle2 className="h-4 w-4" />
            {t.message}
            <button onClick={() => setToasts(prev => prev.filter(p => p.id !== t.id))}><X className="h-3 w-3" /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
