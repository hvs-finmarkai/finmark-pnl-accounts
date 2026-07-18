"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, MessageSquare } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function AIInsightsPage() {
  const router = useRouter()
  const [anomalies, setAnomalies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/ai/anomalies").then(r => r.json()).then(d => { setAnomalies(d.anomalies || []); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const recommendations = [
    { title: `${anomalies.filter(a => a.category === "Margin Drop").length} Projects Below Margin Threshold`, description: "Projects with margins below 15% need attention. Consider resource reallocation or scope renegotiation.", impact: "High", action: () => router.push("/projects/risks") },
    { title: "Bench Resource Opportunity", description: "Bench employees can be allocated to understaffed projects. Check workforce bench for skill matching.", impact: "Medium", action: () => router.push("/workforce/bench") },
    { title: `${anomalies.filter(a => a.category === "Budget Overrun").length} Budget Overruns Detected`, description: "Some departments have exceeded budget allocation. Review variance analysis for details.", impact: "High", action: () => router.push("/pnl/variance") },
    { title: "Overdue Invoices", description: "Outstanding invoices need follow-up. Check billing page for details.", impact: "Medium", action: () => router.push("/clients/billing") },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Insights"
        description="AI-powered analytics, predictions, and recommendations from your live data"
        actions={<Button onClick={() => router.push("/ai/chat")}><MessageSquare className="h-4 w-4 mr-2" />Open AI Chat</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => router.push("/ai/chat")}>
          <CardContent className="p-5 text-center">
            <Brain className="h-8 w-8 text-brand-500 mx-auto mb-2" />
            <p className="font-semibold text-sm">AI Chat</p>
            <p className="text-xs text-muted-foreground">Ask anything about your financials</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => router.push("/ai/predictions")}>
          <CardContent className="p-5 text-center">
            <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-semibold text-sm">Predictions</p>
            <p className="text-xs text-muted-foreground">Revenue & margin forecasts</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => router.push("/ai/anomalies")}>
          <CardContent className="p-5 text-center">
            <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className="font-semibold text-sm">Anomalies</p>
            <p className="text-xs text-muted-foreground">{anomalies.length} detected from live data</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => router.push("/ai/chat")}>
          <CardContent className="p-5 text-center">
            <Lightbulb className="h-8 w-8 text-violet-500 mx-auto mb-2" />
            <p className="font-semibold text-sm">Recommendations</p>
            <p className="text-xs text-muted-foreground">Cost savings & optimizations</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Recommendations</h3>
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Analyzing your data...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                          rec.impact === "High" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        )}>{rec.impact}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                      <Button variant="outline" size="sm" onClick={rec.action}>View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Card className="bg-brand-50/50 dark:bg-brand-900/10 border-brand-200 dark:border-brand-800">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Talk to Finmark AI</h3>
            <p className="text-sm text-muted-foreground">Ask questions like &quot;What is our revenue?&quot;, &quot;Which projects are at risk?&quot;, &quot;Cost saving opportunities&quot;</p>
          </div>
          <Button onClick={() => router.push("/ai/chat")}>
            <MessageSquare className="h-4 w-4 mr-2" />Start Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
