"use client"

import { useState } from "react"
import { Send, Brain, User } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestions = [
  "Show me projects with margin below 15%",
  "What are our top revenue clients this quarter?",
  "Forecast Q3 revenue based on current trends",
  "Which departments are over budget?",
  "Recommend cost optimization strategies",
]

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI financial assistant. I can help you analyze P&L data, generate forecasts, identify risks, and recommend optimizations. What would you like to explore?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSend(text?: string) {
    const message = text || input
    if (!message.trim()) return

    setMessages(prev => [...prev, { role: "user", content: message }])
    setInput("")
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    let response = ""
    if (message.toLowerCase().includes("margin") || message.toLowerCase().includes("project")) {
      response = "Based on current data, 2 projects are below the 15% margin threshold:\n\n• **Cloud Migration** - 8.2% margin (at-risk, exceeded budget by ₹980K)\n• **Support Project** - 12.3% margin (FidServe Global, at-risk)\n\nRecommendation: Consider renegotiating the Cloud Migration scope or reallocating 2 bench resources to reduce vendor costs."
    } else if (message.toLowerCase().includes("revenue") || message.toLowerCase().includes("client")) {
      response = "Top 5 revenue clients for Q1-Q2 2025:\n\n1. **TechCorp Inc.** - ₹25.6M (North America)\n2. **Global Solutions** - ₹18.7M (Europe)\n3. **InnovateX** - ₹15.2M (APAC)\n4. **HealthPlus** - ₹12.3M (North America)\n5. **FidServe Global** - ₹11.7M (Europe, at-risk)\n\nTotal client revenue: ₹92.1M. Growth rate: 18.5% YoY."
    } else if (message.toLowerCase().includes("forecast") || message.toLowerCase().includes("q3")) {
      response = "Q3 2025 Revenue Forecast:\n\n• **Predicted Revenue**: ₹142.5M (confidence: 87%)\n• **Predicted Net Margin**: 16.2%\n• **Key Drivers**: Pipeline conversion (₹45M), recurring revenue (₹38M), new business (₹12M)\n\nRisk factors: Potential client churn (FidServe, EduMind) could reduce forecast by ₹8-10M."
    } else if (message.toLowerCase().includes("budget") || message.toLowerCase().includes("over")) {
      response = "Departments over budget in May 2025:\n\n• **Travel** - Over by ₹2.4M (40% above budget)\n• **Vendor Payments** - Over by ₹3.6M (24% above budget)\n• **Overheads** - Over by ₹2.3M (23% above budget)\n\nPayroll is the largest expense at ₹45.5M but only 10% over budget due to planned hiring."
    } else if (message.toLowerCase().includes("cost") || message.toLowerCase().includes("optim")) {
      response = "Cost Optimization Recommendations:\n\n1. **Bench Reallocation** - Allocate 2 bench employees to understaffed projects. Savings: ₹280K/month\n2. **Travel Policy** - Implement virtual-first meeting policy. Potential saving: ₹1.2M/quarter\n3. **Vendor Consolidation** - 3 overlapping vendor contracts identified. Savings: ₹800K/year\n4. **License Optimization** - 45 unused software licenses detected. Savings: ₹180K/month\n\nTotal potential annual savings: **₹8.2M**"
    } else {
      response = `I can help with that. Based on the current financial data, your overall position is strong with ₹125.8M revenue and 18.5% YoY growth. The main areas requiring attention are:\n\n1. 2 at-risk projects (Cloud Migration, Support Project)\n2. Travel expenses trending 23% above budget\n3. 2 clients at risk of churn (FidServe Global, EduMind)\n\nWould you like me to dive deeper into any of these areas?`
    }

    setMessages(prev => [...prev, { role: "assistant", content: response }])
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <PageHeader title="AI Chat" description="Natural language financial analysis" />

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
                  <span className="text-muted-foreground">Analyzing...</span>
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
            />
            <Button onClick={() => handleSend()} size="icon" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)} className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
