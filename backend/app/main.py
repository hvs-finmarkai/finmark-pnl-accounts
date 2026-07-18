from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import auth, users, clients, projects, pnl, workforce, costs, reports, workflows, integrations, ai

app = FastAPI(
    title="Finmark.ai PnL Platform API",
    description="Enterprise P&L Automation Platform Backend",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(clients.router, prefix="/api/clients", tags=["Clients"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(pnl.router, prefix="/api/pnl", tags=["P&L"])
app.include_router(workforce.router, prefix="/api/workforce", tags=["Workforce"])
app.include_router(costs.router, prefix="/api/costs", tags=["Cost Allocation"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(workflows.router, prefix="/api/workflows", tags=["Workflows"])
app.include_router(integrations.router, prefix="/api/integrations", tags=["Integrations"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}
