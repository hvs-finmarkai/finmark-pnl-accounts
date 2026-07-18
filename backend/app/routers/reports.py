from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_reports():
    return [
        {"id": 1, "name": "Board Summary", "type": "board_summary", "format": "pdf", "schedule": "monthly", "last_generated": "2025-07-15", "status": "ready"},
        {"id": 2, "name": "P&L Report", "type": "pnl", "format": "pdf", "schedule": "on_demand", "last_generated": "2025-07-14", "status": "ready"},
        {"id": 3, "name": "Client Profitability", "type": "client_profitability", "format": "excel", "schedule": "on_demand", "last_generated": "2025-07-12", "status": "ready"},
        {"id": 4, "name": "Budget vs Actual", "type": "budget", "format": "pdf", "schedule": "weekly", "last_generated": "2025-07-10", "status": "ready"},
        {"id": 5, "name": "Workforce Report", "type": "workforce", "format": "excel", "schedule": "monthly", "last_generated": "2025-07-08", "status": "ready"},
    ]


@router.post("/generate")
def generate_report(report_type: str):
    return {"message": f"Report generation started for {report_type}", "status": "generating"}


@router.get("/{report_id}/download")
def download_report(report_id: int):
    return {"message": "Download link generated", "url": f"/files/reports/{report_id}.pdf"}
