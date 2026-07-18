from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_cost_allocation():
    return {
        "total_shared": 18600000,
        "allocated": 17950000,
        "unallocated": 650000,
        "rules": [
            {"id": 1, "name": "IT Infrastructure", "driver": "Headcount", "allocated": 4200000, "total": 4800000, "status": "approved"},
            {"id": 2, "name": "Office Space", "driver": "Square Footage", "allocated": 3100000, "total": 3500000, "status": "approved"},
            {"id": 3, "name": "HR Services", "driver": "Headcount", "allocated": 2800000, "total": 2800000, "status": "approved"},
            {"id": 4, "name": "Management Fee", "driver": "Revenue %", "allocated": 5500000, "total": 6000000, "status": "pending"},
        ],
    }


@router.get("/drivers")
def get_drivers():
    return [
        {"id": 1, "name": "Headcount", "type": "proportional", "used_by": 4},
        {"id": 2, "name": "Revenue %", "type": "percentage", "used_by": 2},
        {"id": 3, "name": "Square Footage", "type": "proportional", "used_by": 1},
        {"id": 4, "name": "Direct Hours", "type": "actual", "used_by": 3},
    ]


@router.post("/simulate")
def simulate_allocation(scenario: dict):
    return {"message": "Simulation completed", "result": {"total_allocated": 18200000, "savings": 400000, "impact": "Reduces unallocated by 62%"}}
