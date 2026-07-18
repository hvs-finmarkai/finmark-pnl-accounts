"use client"

import { useState } from "react"
import { Send, Brain } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestions = [
  "Show me projects with margin below 15%",
  "What are our top revenue clients?",
  "Forecast next quarter revenue",
  "Which departments are over budget?",
  "Cost optimization recommendations",
  "What is our current bench cost?",
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm Finmark AI — your financial analysis assistant. I have access to your live company data including revenue, expenses, projects, clients, and workforce metrics. Ask me anything about your business performance." },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSend(text?: string) {
    const message = text || input
    if (!message.trim() || loading) return

    setMessages(prev => [...prev, { role: "user", content: message }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: "assistant", content: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader title="AI Chat" description="Real-time financial analysis powered by LLM + live database" />

      <div className="flex flex-col h-[calc(100vh-14rem)] rounded-xl border border-border overflow-hidden bg-card">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${
                msg.role === "user" ? "bg-brand-500 text-white" : "bg-muted"
              }`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-brand-500" />
                    <span className="text-xs font-medium text-brand-500">Finmark AI</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-xl px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-brand-500 animate-pulse" />
                  <span className="text-muted-foreground">Analyzing your financial data...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask about revenue, margins, forecasts, risks..."
              className="flex-1 h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={loading}
            />
            <Button onClick={() => handleSend()} size="icon" disabled={loading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)} disabled={loading} className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors disabled:opacity-50">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
