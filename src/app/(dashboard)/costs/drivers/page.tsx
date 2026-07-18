"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { ChartCard } from "@/components/shared/chart-card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export default function DriversPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/costs").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  const driverMap: Record<string, { count: number; totalCost: number }> = {}
  data.allocations?.forEach((a: any) => {
    const driver = a.driver
    if (!driverMap[driver]) driverMap[driver] = { count: 0, totalCost: 0 }
    driverMap[driver].count++
    driverMap[driver].totalCost += a.total_cost || a.totalCost || 0
  })

  const drivers = Object.entries(driverMap).map(([name, d]) => ({ name, ...d }))
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]

  return (
    <div className="space-y-6">
      <PageHeader title="Cost Drivers" description="Allocation drivers used to distribute shared costs" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Allocation by Driver">
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={drivers} cx="50%" cy="50%" outerRadius={100} dataKey="totalCost" label={({ name }) => name}>
                  {drivers.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Driver Summary</h3>
            <div className="space-y-4">
              {drivers.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                    <div>
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">Used by {d.count} rule{d.count > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">₹{(d.totalCost / 100000).toFixed(1)}L</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
