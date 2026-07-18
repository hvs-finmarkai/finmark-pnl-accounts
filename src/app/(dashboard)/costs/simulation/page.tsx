"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Play } from "lucide-react"

export default function SimulationPage() {
  const [data, setData] = useState<any>(null)
  const [factor, setFactor] = useState(1.1)
  const [simResult, setSimResult] = useState<any>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    fetch("/api/costs").then(r => r.json()).then(setData)
  }, [])

  async function runSimulation() {
    setRunning(true)
    const res = await fetch("/api/costs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "simulate", factor }),
    })
    const result = await res.json()
    setSimResult(result.simulated)
    setRunning(false)
  }

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Cost Simulation" description="Run what-if scenarios to optimize cost allocation" />

      <Card>
        <CardHeader><CardTitle>Simulation Parameters</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div>
              <label className="text-sm font-medium">Cost Adjustment Factor</label>
              <input
                type="number"
                step="0.05"
                value={factor}
                onChange={(e) => setFactor(parseFloat(e.target.value))}
                className="mt-1 h-10 w-32 rounded-lg border border-border bg-background px-3 text-sm"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                {factor > 1 ? `+${((factor - 1) * 100).toFixed(0)}% increase` : `${((1 - factor) * 100).toFixed(0)}% decrease`}
              </p>
            </div>
            <Button onClick={runSimulation} disabled={running}>
              <Play className="h-4 w-4 mr-2" />{running ? "Running..." : "Run Simulation"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {simResult && (
        <Card>
          <CardHeader><CardTitle>Simulation Results</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="py-3 text-left font-medium">Cost Center</th>
                    <th className="py-3 text-right font-medium">Current Cost</th>
                    <th className="py-3 text-right font-medium">Simulated Cost</th>
                    <th className="py-3 text-right font-medium">Difference</th>
                  </tr>
                </thead>
                <tbody>
                  {simResult.map((item: any) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{item.cost_center || item.costCenter}</td>
                      <td className="py-3 text-right">{formatCurrency(item.total_cost || item.totalCost)}</td>
                      <td className="py-3 text-right">{formatCurrency(item.simulated_cost)}</td>
                      <td className={`py-3 text-right font-medium ${item.savings < 0 ? "text-red-500" : "text-emerald-500"}`}>
                        {formatCurrency(Math.abs(item.savings))} {item.savings < 0 ? "↑" : "↓"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!simResult && (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-lg font-medium">No simulation run yet</p>
          <p className="text-sm">Adjust the parameters above and click Run Simulation</p>
        </div>
      )}
    </div>
  )
}
