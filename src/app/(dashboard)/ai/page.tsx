"use client"

import { useState } from "react"
import { Brain, Send, TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const recommendations = [
  { title: "3 Projects at Risk", description: "Projects Phoenix, Orion, and Zenith have margins below 15%. Consider resource reallocation.", impact: "High", action: "View Details" },
  { title: "Bench Resource Opportunity", description: "12 bench employees can be allocated to understaffed projects. Potential saving: ₹1.2M/month.", impact: "Medium", action: "View Resources" },
  { title: "Pricing Optimization", description: "2 client accounts are underpriced by 4.6% based on market benchmarks.", impact: "Medium", action: "View Accounts" },
  { title: "Cost Reduction", description: "Travel expenses increased by 23% this quarter. Consider virtual meeting alternatives.", impact: "Low", action: "View Expenses" },
]

const predictions = [
  { metric: "Q3 Revenue", predicted: "₹142.5M", confidence: 87, trend: "up" },
  { metric: "Net Margin", predicted: "16.2%", confidence: 82, trend: "up" },
  { metric: "Projects at Risk", predicted: "6", confidence: 75, trend: "up" },
  { metric: "Bench Size (Aug)", predicted: "45", confidence: 79, trend: "down" },
]

const chatHistory = [
  { role: "assistant", content: "Hello! I'm your AI financial assistant. I can help you analyze P&L data, generate forecasts, identify risks, and recommend optimizations. What would you like to explore?" },
]

export default function AIInsightsPage() {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState(chatHistory)

  function handleSend() {
    if (!message.trim()) return
    setChat([...chat, { role: "user", content: message }, { role: "assistant", content: "Based on the current data, I can see that your overall revenue is trending upward at 18.5% YoY growth. The main areas of concern are Project Phoenix (margin: 8.2%) and Project Orion (budget exceeded by 12.3%). Would you like me to dive deeper into either of these?" }])
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Insights"
        description="AI-powered analytics, predictions, and recommendations"
      />

      <Tabs defaultValue="recommendations">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {recommendations.map((rec, i) => (
              <Card key={i} className="hover:shadow-elevated transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/30">
                      <Lightbulb className="h-5 w-5 text-brand-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm">{rec.title}</h3>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          rec.impact === "High" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                          rec.impact === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        )}>
                          {rec.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                      <Button variant="outline" size="sm">{rec.action}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anomalies">
          <div className="py-12 text-center text-muted-foreground mt-4">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Anomaly Detection</p>
            <p className="text-sm">AI-detected anomalies in financial patterns and operational metrics</p>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {predictions.map((pred, i) => (
              <Card key={i}>
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-2">{pred.metric}</p>
                  <p className="text-2xl font-bold mb-2">{pred.predicted}</p>
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className={cn("h-4 w-4", pred.trend === "up" ? "text-emerald-500" : "text-red-500")} />
                    <span className="text-xs text-muted-foreground">Confidence: {pred.confidence}%</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-brand-500" style={{ width: `${pred.confidence}%` }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Margin Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground">Forecast chart will render with actual time-series data</p>
                  <p className="text-xs text-muted-foreground mt-1">Predicted margin: 24.6% (+2.1% vs current)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat">
          <Card className="mt-4">
            <CardContent className="p-0">
              <div className="h-[500px] flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chat.map((msg, i) => (
                    <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                      <div className={cn(
                        "max-w-[70%] rounded-xl px-4 py-3 text-sm",
                        msg.role === "user"
                          ? "bg-brand-500 text-white"
                          : "bg-muted"
                      )}>
                        {msg.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="h-4 w-4 text-brand-500" />
                            <span className="text-xs font-medium text-brand-500">AI Assistant</span>
                          </div>
                        )}
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Ask about revenue, margins, forecasts, risks..."
                      className="flex-1 h-10 rounded-lg border border-border bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button onClick={handleSend} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground">Show APAC projects with margin below 15%</button>
                    <button className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground">Forecast Q3 revenue</button>
                    <button className="text-xs px-2 py-1 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground">Cost saving opportunities</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
