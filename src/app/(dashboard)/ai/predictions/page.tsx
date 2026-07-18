"use client"

import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { ChartCard } from "@/components/shared/chart-card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const predictions = [
  { metric: "Q3 Revenue", predicted: "₹142.5M", confidence: 87, trend: "up", change: "+13.3%" },
  { metric: "Net Margin (Aug)", predicted: "16.2%", confidence: 82, trend: "up", change: "+1.4pp" },
  { metric: "Projects at Risk (Q3)", predicted: "6", confidence: 75, trend: "up", change: "+2" },
  { metric: "Bench Size (Aug)", predicted: "45 employees", confidence: 79, trend: "down", change: "-16" },
  { metric: "Client Churn Risk", predicted: "2 clients", confidence: 72, trend: "up", change: "FidServe, EduMind" },
  { metric: "Hiring Need (Q3)", predicted: "8 positions", confidence: 84, trend: "up", change: "Engineering focus" },
]

const forecastChart = [
  { month: "Jan", actual: 95, forecast: null },
  { month: "Feb", actual: 102, forecast: null },
  { month: "Mar", actual: 110, forecast: null },
  { month: "Apr", actual: 118, forecast: null },
  { month: "May", actual: 125.8, forecast: 125.8 },
  { month: "Jun", actual: null, forecast: 132 },
  { month: "Jul", actual: null, forecast: 138 },
  { month: "Aug", actual: null, forecast: 142.5 },
  { month: "Sep", actual: null, forecast: 148 },
]

export default function PredictionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Predictions" description="AI-powered forecasts based on historical trends and current patterns" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predictions.map((p, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{p.metric}</p>
              <p className="text-2xl font-bold mt-1">{p.predicted}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  {p.trend === "up" ? <TrendingUp className="h-4 w-4 text-emerald-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span className="text-xs font-medium">{p.change}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${p.confidence}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{p.confidence}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ChartCard title="Revenue Forecast" description="Actual vs AI-predicted revenue trajectory (₹M)">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastChart}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual" dot={{ r: 4 }} connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Forecast" dot={{ r: 4 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  )
}
