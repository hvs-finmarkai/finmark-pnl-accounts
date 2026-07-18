from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class WorkflowCreate(BaseModel):
    name: str
    description: str = ""
    nodes: List[dict] = []


@router.get("/")
def get_workflows():
    return [
        {"id": 1, "name": "Invoice Approval Workflow", "status": "active", "executions": 245, "last_run": "2025-07-18"},
        {"id": 2, "name": "Budget Revision", "status": "active", "executions": 38, "last_run": "2025-07-17"},
        {"id": 3, "name": "New Employee Onboarding", "status": "draft", "executions": 0, "last_run": None},
    ]


@router.post("/")
def create_workflow(workflow: WorkflowCreate):
    return {"id": 4, "message": "Workflow created", **workflow.model_dump()}


@router.post("/{workflow_id}/execute")
def execute_workflow(workflow_id: int):
    return {"execution_id": "exec_12345", "status": "running", "started_at": "2025-07-18T10:00:00Z"}


@router.get("/{workflow_id}/executions")
def get_executions(workflow_id: int):
    return [
        {"id": "exec_12345", "status": "completed", "duration": 4.2, "started_at": "2025-07-18T10:00:00Z"},
        {"id": "exec_12344", "status": "completed", "duration": 3.8, "started_at": "2025-07-17T14:00:00Z"},
    ]
