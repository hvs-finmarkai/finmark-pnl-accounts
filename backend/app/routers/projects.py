from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


class ProjectCreate(BaseModel):
    name: str
    client_id: int
    manager_id: int
    budget: float
    start_date: str
    end_date: str


@router.get("/")
def get_projects():
    return [
        {"id": 1, "name": "Website Redesign", "client": "TechCorp Inc.", "status": "in_progress", "budget": 2400000, "revenue": 1800000, "margin": 32, "progress": 65},
        {"id": 2, "name": "ERP Implementation", "client": "HealthPlus", "status": "in_progress", "budget": 5600000, "revenue": 4200000, "margin": 28, "progress": 40},
        {"id": 3, "name": "API Integration", "client": "TechCorp Inc.", "status": "completed", "budget": 1200000, "revenue": 1100000, "margin": 35, "progress": 100},
        {"id": 4, "name": "Cloud Migration", "client": "Global Solutions", "status": "at_risk", "budget": 3800000, "revenue": 2100000, "margin": 15, "progress": 55},
    ]


@router.get("/{project_id}")
def get_project(project_id: int):
    return {"id": project_id, "name": "Website Redesign", "client": "TechCorp Inc.", "manager": "Arjun Mehta", "status": "in_progress", "budget": 2400000, "revenue": 1800000, "margin": 32, "progress": 65, "resources": 8}


@router.post("/")
def create_project(project: ProjectCreate):
    return {"id": 5, "message": "Project created successfully", **project.model_dump()}


@router.get("/{project_id}/financials")
def get_project_financials(project_id: int):
    return {"project_id": project_id, "budget": 2400000, "spent": 1632000, "remaining": 768000, "revenue": 1800000, "profit": 168000, "burn_rate": 272000}
