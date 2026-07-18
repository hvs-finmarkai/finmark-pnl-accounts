"use client"

import { useState } from "react"
import {
  Workflow,
  Zap,
  GitBranch,
  CheckCircle2,
  Bell,
  Timer,
  Database,
  Mail,
  Brain,
  Play,
  Save,
  Upload,
  Plus,
  Minus,
  RotateCcw,
  RotateCw,
  Maximize2,
} from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const nodeTypes = [
  { type: "trigger", label: "Trigger", icon: Zap, color: "bg-amber-500" },
  { type: "condition", label: "Condition", icon: GitBranch, color: "bg-violet-500" },
  { type: "approval", label: "Approval", icon: CheckCircle2, color: "bg-emerald-500" },
  { type: "notification", label: "Notification", icon: Bell, color: "bg-brand-500" },
  { type: "delay", label: "Delay", icon: Timer, color: "bg-orange-500" },
  { type: "database", label: "Database", icon: Database, color: "bg-cyan-500" },
  { type: "email", label: "Email/SMS", icon: Mail, color: "bg-pink-500" },
  { type: "ai", label: "AI Action", icon: Brain, color: "bg-indigo-500" },
]

const sampleFlow = [
  { id: "1", type: "trigger", label: "Invoice Uploaded", x: 400, y: 80 },
  { id: "2", type: "condition", label: "Amount > ₹5L", x: 400, y: 180 },
  { id: "3", type: "approval", label: "Manager Approval", x: 400, y: 280 },
  { id: "4", type: "notification", label: "Notify Finance", x: 400, y: 380 },
  { id: "5", type: "database", label: "Update ERP", x: 400, y: 480 },
]

export default function WorkflowBuilderPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <PageHeader
        title="Workflow Builder"
        description="Design automated workflows with drag-and-drop nodes"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Save className="h-4 w-4 mr-1" />Save</Button>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" />Publish</Button>
            <Button size="sm"><Play className="h-4 w-4 mr-1" />Test Run</Button>
          </div>
        }
      />

      <div className="flex h-[calc(100vh-14rem)] rounded-xl border border-border overflow-hidden">
        <div className="w-56 border-r border-border bg-card p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Nodes</p>
          <div className="space-y-2">
            {nodeTypes.map((node) => (
              <div
                key={node.type}
                draggable
                className="flex items-center gap-3 rounded-lg border border-border p-3 cursor-grab hover:bg-muted/50 transition-colors active:cursor-grabbing"
              >
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white", node.color)}>
                  <node.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{node.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative bg-[radial-gradient(circle,hsl(var(--border))_1px,transparent_1px)] bg-[length:20px_20px]">
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-card rounded-lg border border-border p-1">
            <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted">
              <Plus className="h-3.5 w-3.5" />
            </button>
            <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted">
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
            <div className="w-px h-5 bg-border mx-1" />
            <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted">
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button className="h-7 w-7 flex items-center justify-center rounded hover:bg-muted">
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {sampleFlow.slice(0, -1).map((node, i) => (
              <line
                key={i}
                x1={node.x}
                y1={node.y + 30}
                x2={sampleFlow[i + 1].x}
                y2={sampleFlow[i + 1].y - 10}
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
            ))}
          </svg>

          {sampleFlow.map((node) => {
            const nodeType = nodeTypes.find((n) => n.type === node.type)
            return (
              <div
                key={node.id}
                className={cn(
                  "absolute flex items-center gap-3 rounded-xl border-2 bg-card px-4 py-3 shadow-card cursor-pointer transition-all hover:shadow-elevated",
                  selectedNode === node.id ? "border-brand-500 ring-2 ring-brand-500/20" : "border-border"
                )}
                style={{ left: node.x - 90, top: node.y - 20 }}
                onClick={() => setSelectedNode(node.id)}
              >
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white shrink-0", nodeType?.color)}>
                  {nodeType && <nodeType.icon className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{nodeType?.label}</p>
                  <p className="text-sm font-medium">{node.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="w-64 border-l border-border bg-card p-4 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Properties</p>
          {selectedNode ? (
            <div className="space-y-4">
              {(() => {
                const node = sampleFlow.find((n) => n.id === selectedNode)
                return (
                  <>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Node Name</label>
                      <input className="mt-1 h-8 w-full rounded-md border border-border bg-background px-2 text-sm" defaultValue={node?.label} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Type</label>
                      <p className="mt-1 text-sm font-medium capitalize">{node?.type}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Retry on Failure</label>
                      <div className="mt-1 flex items-center gap-2">
                        <input type="checkbox" className="rounded border-border" defaultChecked />
                        <span className="text-xs">Enabled (3 retries)</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Error Handling</label>
                      <select className="mt-1 h-8 w-full rounded-md border border-border bg-background px-2 text-sm">
                        <option>Continue</option>
                        <option>Stop</option>
                        <option>Retry</option>
                      </select>
                    </div>
                  </>
                )
              })()}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Select a node to view properties</p>
          )}
        </div>
      </div>
    </div>
  )
}
