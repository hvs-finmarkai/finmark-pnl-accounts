# Finmark.ai - Enterprise P&L Automation Platform

Real-time Project P&L Automation Platform - Track revenue, manage costs, allocate resources, and analyze profitability across clients, projects and geographies.

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Recharts
- Zustand (state management)
- Lucide React (icons)

### Backend
- FastAPI
- SQLAlchemy + Alembic
- PostgreSQL
- Redis + Celery
- JWT Authentication

### Infrastructure
- Docker + Docker Compose
- PostgreSQL 16
- Redis 7

## Getting Started

### Frontend

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

API docs at http://localhost:8000/docs

### Docker (Full Stack)

```bash
docker-compose up --build
```

## Project Structure

```
finmark.pnl acounts/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── pnl/
│   │   │   ├── clients/
│   │   │   ├── projects/
│   │   │   ├── workforce/
│   │   │   ├── costs/
│   │   │   ├── workflows/
│   │   │   ├── reports/
│   │   │   ├── ai/
│   │   │   ├── integrations/
│   │   │   ├── notifications/
│   │   │   ├── admin/
│   │   │   └── settings/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/           (design system primitives)
│   │   ├── shared/       (reusable business components)
│   │   └── layout/       (sidebar, nav, breadcrumbs)
│   ├── lib/
│   │   ├── utils.ts
│   │   └── store.ts
│   └── types/
│       └── index.ts
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── routers/
│   │       ├── auth.py
│   │       ├── users.py
│   │       ├── clients.py
│   │       ├── projects.py
│   │       ├── pnl.py
│   │       ├── workforce.py
│   │       ├── costs.py
│   │       ├── reports.py
│   │       ├── workflows.py
│   │       ├── integrations.py
│   │       └── ai.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Modules

| Module | Description |
|--------|------------|
| Dashboard | CEO/CFO home with KPIs, charts, alerts, AI summary |
| P&L Management | Revenue, expenses, budget vs actual, forecasts |
| Clients | Client profiles, contracts, profitability tracking |
| Projects | Project financials, timelines, resource allocation |
| Workforce | Employee utilization, bench, allocation, skills |
| Cost Allocation | Shared cost allocation with rules and simulation |
| Workflow Builder | Visual no-code workflow automation |
| Reports | Automated report generation and scheduling |
| AI Insights | Predictions, recommendations, anomaly detection |
| Integrations | CRM, ERP, HRMS, and third-party connectors |
| Notifications | Real-time alerts, approvals, and system events |
| Administration | Users, roles, permissions, audit logs |
| Settings | Organization, security, branding configuration |

## API Endpoints

- `POST /api/auth/login` - Authentication
- `GET /api/pnl/overview` - P&L summary
- `GET /api/pnl/statement` - Full P&L statement
- `GET /api/clients` - List clients
- `GET /api/projects` - List projects
- `GET /api/workforce` - Workforce overview
- `GET /api/costs` - Cost allocation data
- `GET /api/reports` - Available reports
- `GET /api/workflows` - Workflow list
- `GET /api/integrations` - Integration status
- `GET /api/ai/recommendations` - AI recommendations
- `POST /api/ai/chat` - AI chat interface
