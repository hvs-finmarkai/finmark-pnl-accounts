# Finmark.ai PnL Accounts - Project Summary

## Live URLs
- Production: https://finmark-pnl-accounts.vercel.app
- GitHub: https://github.com/hvs-finmarkai/finmark-pnl-accounts
- Login: arjun@denave.com / admin123

## Tech Stack
- Next.js 14 (App Router + API Routes)
- TypeScript + TailwindCSS
- PostgreSQL (Neon - free serverless)
- Prisma ORM (v5.17)
- Groq LLM (Llama 3.1 - free)
- Zustand (state), Recharts (charts)
- JWT Auth (bcryptjs + jsonwebtoken)
- Vercel (hosting - free)

## Database
- Provider: Neon PostgreSQL (free tier)
- Host: ep-broad-mountain-au56w7py.c-10.us-east-1.aws.neon.tech
- Database: neondb
- Tables: 15 (users, organizations, clients, projects, employees, transactions, budgets, contracts, invoices, cost_allocations, notifications, workflows, reports, integrations, audit_logs)

## Vercel Environment Variables
- DATABASE_URL (Neon pooled connection)
- DIRECT_URL (Neon direct connection)
- JWT_SECRET
- GROQ_API_KEY

## Project Location
C:\Users\LENOVO\Desktop\finmark.pnl acounts

## Architecture
- src/app/(dashboard)/ - All authenticated pages
- src/app/api/ - API routes
- src/components/ - UI components (ui/, shared/, layout/)
- src/ai/ - AI module (providers/groq.ts, tools/financial.ts, service.ts)
- src/lib/ - Utilities (prisma.ts, store.ts, utils.ts, auth.ts, db.ts)
- prisma/ - Schema + seed script
- docs/services/ - Prisma service layer (ready for full migration)

## All Pages (40+)
- /login
- /dashboard
- /pnl (overview, profit-loss, budget, revenue, expenses, forecast, variance)
- /clients (all, contracts, billing, profitability)
- /projects (all, timeline, financials, resources, risks)
- /workforce (employees, utilization, bench, allocation, skills, hiring)
- /costs (overview, rules, drivers, simulation, approvals)
- /workflows
- /reports (all, board-deck, exports, scheduled)
- /ai (recommendations, anomalies, predictions, chat)
- /integrations
- /notifications
- /admin (overview, users)
- /settings

## Key Features Working
- JWT Authentication (login/logout/protected routes)
- Dark/Light theme toggle (persisted, full app responds including sidebar)
- Global search (queries DB for clients, projects, employees)
- Date range picker
- Notifications (real from DB, mark-as-read)
- User management (create/delete users, new users can login)
- AI Chat (real LLM - queries PostgreSQL + Groq Llama 3.1)
- AI Anomaly Detection (from live DB data)
- P&L Calculations (real transaction aggregations)
- Cost Allocation with approve/simulate
- All data from PostgreSQL via Prisma

## AI Architecture
User Question -> /api/ai/chat -> Intent Detection -> Financial Tools (query PostgreSQL) -> Groq LLM (Llama 3.1) -> Response

AI Tools (src/ai/tools/financial.ts):
- getRevenueData()
- getExpenseData()
- getMarginData()
- getClientProfitability()
- getWorkforceMetrics()
- getBudgetVariance()
- getProjectRisks()

## Git Commits
1. Initial commit: Finmark.ai PnL Accounts Enterprise Platform
2. feat: add authentication, database, working API routes, all sub-pages functional
3. fix: add vercel.json to force Next.js framework detection
4. feat: add all missing sub-pages, Prisma schema, service layer, seed script
5. feat: connect Neon PostgreSQL, migrate all API routes to Prisma ORM
6. feat: add user management page with create user, fix logout double-click
7. fix: remove demo credentials from login, change label to Username
8. feat: build real AI module with LLM, financial tools, intent routing
9. fix: make user menu in sidebar functional with Settings and Sign Out
10. fix: dark/light theme toggle now works correctly
11. fix: sidebar fully responds to theme toggle
12. feat: add delete user functionality
13. fix: delete user now handles foreign key constraints
