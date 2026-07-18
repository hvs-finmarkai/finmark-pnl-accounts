"use client"

import { useEffect, useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/shared/chart-card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function SkillsPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/workforce").then(r => r.json()).then(setData)
  }, [])

  if (!data) return <div className="p-8 text-center text-muted-foreground">Loading...</div>

  return (
    <div className="space-y-6">
      <PageHeader title="Skills Matrix" description="Skill distribution across the workforce" />

      <ChartCard title="Skill Distribution" description="Number of employees per skill">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.skills.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data.skills.map((s: any) => (
          <div key={s.name} className="rounded-lg border border-border p-3 text-center">
            <p className="text-sm font-medium">{s.name}</p>
            <p className="text-2xl font-bold text-brand-500">{s.count}</p>
            <p className="text-xs text-muted-foreground">employees</p>
          </div>
        ))}
      </div>
    </div>
  )
}
