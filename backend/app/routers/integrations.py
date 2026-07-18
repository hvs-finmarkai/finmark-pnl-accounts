from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_integrations():
    return [
        {"id": 1, "name": "Salesforce CRM", "category": "CRM", "status": "connected", "last_sync": "5 min ago", "records": 12450, "errors": 0},
        {"id": 2, "name": "SAP S/4HANA", "category": "ERP", "status": "connected", "last_sync": "15 min ago", "records": 8920, "errors": 0},
        {"id": 3, "name": "BambooHR", "category": "HRMS", "status": "connected", "last_sync": "30 min ago", "records": 586, "errors": 2},
        {"id": 4, "name": "Jira Software", "category": "Project Management", "status": "connected", "last_sync": "10 min ago", "records": 3420, "errors": 0},
        {"id": 5, "name": "Tally Prime", "category": "Accounting", "status": "connected", "last_sync": "15 min ago", "records": 15680, "errors": 0},
    ]


@router.post("/{integration_id}/sync")
def trigger_sync(integration_id: int):
    return {"message": "Sync initiated", "integration_id": integration_id, "status": "syncing"}


@router.get("/{integration_id}/logs")
def get_sync_logs(integration_id: int):
    return [
        {"timestamp": "2025-07-18T10:00:00Z", "action": "sync", "records": 150, "status": "success"},
        {"timestamp": "2025-07-18T09:00:00Z", "action": "sync", "records": 120, "status": "success"},
    ]
