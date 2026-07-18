from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatMessage(BaseModel):
    message: str


@router.get("/recommendations")
def get_recommendations():
    return [
        {"id": 1, "title": "3 Projects at Risk", "description": "Projects Phoenix, Orion, and Zenith have margins below 15%.", "impact": "high", "action": "reallocate_resources"},
        {"id": 2, "title": "Bench Resource Opportunity", "description": "12 bench employees can be allocated. Potential saving: ₹1.2M/month.", "impact": "medium", "action": "allocate_bench"},
        {"id": 3, "title": "Pricing Optimization", "description": "2 accounts are underpriced by 4.6%.", "impact": "medium", "action": "adjust_pricing"},
    ]


@router.get("/predictions")
def get_predictions():
    return {
        "q3_revenue": {"predicted": 142500000, "confidence": 87},
        "net_margin": {"predicted": 16.2, "confidence": 82},
        "projects_at_risk": {"predicted": 6, "confidence": 75},
        "bench_size_aug": {"predicted": 45, "confidence": 79},
    }


@router.get("/anomalies")
def get_anomalies():
    return [
        {"type": "cost_spike", "description": "Travel expenses increased 23% this quarter", "severity": "medium", "detected_at": "2025-07-15"},
        {"type": "margin_drop", "description": "Project Phoenix margin fell from 15% to 8.2%", "severity": "high", "detected_at": "2025-07-17"},
    ]


@router.post("/chat")
def chat(msg: ChatMessage):
    return {
        "response": f"Based on the data, I can provide insights on: {msg.message}. Your overall revenue is ₹125.8M with 18.5% YoY growth. Key areas of concern include Project Phoenix (8.2% margin) and Project Orion (budget exceeded by 12.3%).",
        "suggestions": ["Show APAC project margins", "Forecast Q3 revenue", "Cost saving opportunities"],
    }
