# Finmark.ai - Enterprise P&L Automation Platform

Real-time Project P&L Automation Platform with working authentication, database, and all modules functional.

## Live Demo

https://finmark-pnl-accounts.vercel.app

Login: arjun@denave.com / admin123

## Tech Stack

- Next.js 14 (App Router + API Routes)
- TypeScript
- TailwindCSS
- Recharts
- Zustand (state management)
- JWT Authentication
- In-memory data store (serverless-compatible)

## Features

- Working login/logout with JWT auth
- Protected routes (middleware)
- Dark/Light theme toggle (persisted)
- Global search across clients, projects, employees
- Working date range picker
- Real-time notifications with mark-as-read
- Full CRUD API routes
- All 30+ pages functional with real data

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Modules

| Module | Pages |
|--------|-------|
| Dashboard | KPIs, charts, P&L summary, alerts, AI insights |
| P&L Management | Overview, Profit & Loss, Budget vs Actual, Revenue, Expenses, Forecast, Variance |
| Clients | All Clients, Contracts, Billing, Profitability |
| Projects | All Projects, Timeline, Financials, Resources, Risks |
| Workforce | Employees, Utilization, Bench, Allocation, Skills, Hiring |
| Cost Allocation | Rules, Drivers, Simulation, Approvals |
| Workflow Builder | Visual node-based workflow designer |
| Reports | Board Deck, Exports, Scheduled |
| AI Insights | Recommendations, Anomalies, Predictions, Chat |
| Integrations | Connected apps with sync status |
| Notifications | Real-time alerts with read/unread |
| Administration | Users, roles, security |
| Settings | Organization config |

## API Routes

- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- GET /api/dashboard
- GET /api/clients
- GET /api/projects
- GET /api/pnl
- GET /api/workforce
- GET /api/costs
- GET /api/contracts
- GET /api/invoices
- GET /api/notifications
- GET /api/search?q=term
