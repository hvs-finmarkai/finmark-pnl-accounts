import { generateResponse, AIMessage } from "@/ai/providers/groq"
import * as tools from "@/ai/tools/financial"

type Intent = "revenue" | "expenses" | "margin" | "clients" | "workforce" | "budget" | "risks" | "forecast" | "general"

function detectIntent(query: string): Intent[] {
  const lower = query.toLowerCase()
  const intents: Intent[] = []

  if (lower.match(/revenue|sales|income|invoic/)) intents.push("revenue")
  if (lower.match(/expense|cost|spend|payroll|vendor|travel/)) intents.push("expenses")
  if (lower.match(/margin|profit|loss|profitab/)) intents.push("margin")
  if (lower.match(/client|customer|account/)) intents.push("clients")
  if (lower.match(/employee|workforce|bench|util|hiring|resource|team/)) intents.push("workforce")
  if (lower.match(/budget|variance|over.?budget|under.?budget/)) intents.push("budget")
  if (lower.match(/risk|at.?risk|danger|concern|issue/)) intents.push("risks")
  if (lower.match(/forecast|predict|future|next|q[2-4]|quarter/)) intents.push("forecast")

  if (intents.length === 0) intents.push("general")
  return intents
}

async function gatherContext(intents: Intent[]): Promise<string> {
  const contextParts: string[] = []

  for (const intent of intents) {
    switch (intent) {
      case "revenue": {
        const data = await tools.getRevenueData()
        contextParts.push(`REVENUE DATA:\nTotal Revenue: ₹${(data.total / 10000000).toFixed(1)} Cr\nMonthly Trend: ${data.monthly.map((m: any) => `${m.month}: ₹${(Number(m.total) / 10000000).toFixed(1)}Cr`).join(", ")}`)
        break
      }
      case "expenses": {
        const data = await tools.getExpenseData()
        contextParts.push(`EXPENSE DATA:\nTotal Expenses: ₹${(data.total / 10000000).toFixed(1)} Cr\nBreakdown: ${data.byCategory.map(e => `${e.category}: ₹${((e.amount || 0) / 10000000).toFixed(1)}Cr`).join(", ")}`)
        break
      }
      case "margin": {
        const data = await tools.getMarginData()
        const atRisk = data.filter(p => p.isAtRisk)
        contextParts.push(`PROJECT MARGINS:\n${data.map(p => `${p.name} (${p.client}): ${p.margin}% margin, Status: ${p.status}`).join("\n")}\nAt-Risk Projects (margin < 15%): ${atRisk.length}`)
        break
      }
      case "clients": {
        const data = await tools.getClientProfitability()
        contextParts.push(`CLIENT PROFITABILITY:\n${data.map(c => `${c.name} (${c.region}): Revenue ₹${(c.revenue / 10000000).toFixed(1)}Cr, Margin: ${c.margin}%, Status: ${c.status}`).join("\n")}`)
        break
      }
      case "workforce": {
        const data = await tools.getWorkforceMetrics()
        contextParts.push(`WORKFORCE METRICS:\nTotal Employees: ${data.total}\nActive: ${data.active}, Bench: ${data.bench}\nAvg Utilization: ${data.avgUtilization}%\nMonthly Bench Cost: ₹${(data.monthlyBenchCost / 100000).toFixed(1)}L\nTotal Monthly Cost: ₹${(data.totalMonthlyCost / 100000).toFixed(1)}L`)
        break
      }
      case "budget": {
        const data = await tools.getBudgetVariance()
        contextParts.push(`BUDGET VARIANCE:\n${data.map(b => `${b.category} (${b.department}): Budget ₹${(b.budgeted / 10000000).toFixed(1)}Cr, Actual ₹${(b.actual / 10000000).toFixed(1)}Cr, Variance: ${b.variancePercent}% ${b.isOverBudget ? "OVER BUDGET" : "Under Budget"}`).join("\n")}`)
        break
      }
      case "risks": {
        const data = await tools.getProjectRisks()
        contextParts.push(`AT-RISK PROJECTS:\n${data.length > 0 ? data.map(p => `${p.name} (Client: ${p.client}, Manager: ${p.manager}): Budget ₹${(p.budget / 100000).toFixed(0)}L, Progress: ${p.progress}%, Deadline: ${p.deadline}`).join("\n") : "No at-risk projects currently."}`)
        break
      }
      case "forecast": {
        const revenue = await tools.getRevenueData()
        const monthly = revenue.monthly as any[]
        const lastThree = monthly.slice(-3)
        const avgGrowth = lastThree.length >= 2 ? ((Number(lastThree[lastThree.length - 1]?.total) - Number(lastThree[0]?.total)) / Number(lastThree[0]?.total) * 100) : 10
        contextParts.push(`FORECAST CONTEXT:\nCurrent Revenue: ₹${(revenue.total / 10000000).toFixed(1)}Cr\nRecent Monthly Trend: ${lastThree.map((m: any) => `${m.month}: ₹${(Number(m.total) / 10000000).toFixed(1)}Cr`).join(", ")}\nGrowth Rate: ~${avgGrowth.toFixed(1)}% over last 3 months`)
        break
      }
      default: {
        const rev = await tools.getRevenueData()
        const exp = await tools.getExpenseData()
        const wf = await tools.getWorkforceMetrics()
        contextParts.push(`COMPANY OVERVIEW:\nRevenue: ₹${(rev.total / 10000000).toFixed(1)}Cr\nExpenses: ₹${(exp.total / 10000000).toFixed(1)}Cr\nProfit: ₹${((rev.total - exp.total) / 10000000).toFixed(1)}Cr\nEmployees: ${wf.total} (${wf.bench} on bench)\nUtilization: ${wf.avgUtilization}%`)
      }
    }
  }

  return contextParts.join("\n\n")
}

const SYSTEM_PROMPT = `You are Finmark AI, a financial analysis assistant for an enterprise P&L automation platform. You have access to real-time company financial data.

Your role:
- Analyze financial data and provide actionable insights
- Answer questions about revenue, expenses, margins, projects, and workforce
- Identify risks and suggest optimizations
- Provide forecasts based on trends
- Be concise, data-driven, and use specific numbers from the context provided

Format guidelines:
- Use bullet points for lists
- Bold important numbers with **value**
- Keep responses focused and under 300 words
- Always cite specific data from the context
- If suggesting actions, be specific about expected impact`

export async function processQuery(userMessage: string): Promise<string> {
  const intents = detectIntent(userMessage)
  const context = await gatherContext(intents)

  const messages: AIMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `LIVE FINANCIAL DATA:\n${context}\n\nUSER QUESTION: ${userMessage}` },
  ]

  return generateResponse(messages)
}
