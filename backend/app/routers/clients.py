from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class ClientCreate(BaseModel):
    name: str
    industry: str
    region: str
    contract_value: float = 0


@router.get("/")
def get_clients():
    return [
        {"id": 1, "name": "TechCorp Inc.", "industry": "Technology", "region": "North America", "revenue": 25600000, "margin": 28.5, "status": "active"},
        {"id": 2, "name": "Global Solutions Ltd.", "industry": "Consulting", "region": "Europe", "revenue": 18700000, "margin": 31.2, "status": "active"},
        {"id": 3, "name": "InnovateX", "industry": "Technology", "region": "APAC", "revenue": 15200000, "margin": 26.7, "status": "active"},
        {"id": 4, "name": "HealthPlus", "industry": "Healthcare", "region": "North America", "revenue": 12300000, "margin": 23.1, "status": "active"},
        {"id": 5, "name": "FidServe Global", "industry": "Finance", "region": "Europe", "revenue": 11700000, "margin": 19.7, "status": "at-risk"},
    ]


@router.get("/{client_id}")
def get_client(client_id: int):
    return {"id": client_id, "name": "TechCorp Inc.", "industry": "Technology", "region": "North America", "revenue": 25600000, "margin": 28.5, "status": "active", "projects": 5, "health_score": 92}


@router.post("/")
def create_client(client: ClientCreate):
    return {"id": 6, "message": "Client created successfully", **client.model_dump()}


@router.get("/{client_id}/profitability")
def get_client_profitability(client_id: int):
    return {"client_id": client_id, "revenue": 25600000, "costs": 18300000, "profit": 7300000, "margin": 28.5, "trend": [{"month": "Jan", "margin": 25.2}, {"month": "Feb", "margin": 26.8}, {"month": "Mar", "margin": 27.5}, {"month": "Apr", "margin": 28.1}, {"month": "May", "margin": 28.5}]}
