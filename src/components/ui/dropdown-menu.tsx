"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextValue>({
  open: false,
  setOpen: () => {},
})

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

function DropdownMenuTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = React.useContext(DropdownContext)
  return (
    <button className={className} onClick={() => setOpen(!open)} {...props}>
      {children}
    </button>
  )
}

function DropdownMenuContent({ children, className, align = "end" }: { children: React.ReactNode; className?: string; align?: "start" | "end" }) {
  const { open } = React.useContext(DropdownContext)
  if (!open) return null
  return (
    <div className={cn(
      "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border bg-card p-1 shadow-elevated animate-in fade-in-0 zoom-in-95",
      align === "end" ? "right-0" : "left-0",
      className
    )}>
      {children}
    </div>
  )
}

function DropdownMenuItem({ children, className, onClick, ...props }: React.HTMLAttributes<HTMLButtonElement> & { onClick?: () => void }) {
  const { setOpen } = React.useContext(DropdownContext)
  return (
    <button
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} />
}

function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props} />
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel }
