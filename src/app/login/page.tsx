"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
        return
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/dashboard")
      router.refresh()
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">P&L AutoTrack Suite</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back! Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-modal border border-border">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arjun@denave.com"
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Demo credentials: arjun@denave.com / admin123</p>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          © 2025 Finmark.ai. All rights reserved.
        </p>
      </div>
    </div>
  )
}
