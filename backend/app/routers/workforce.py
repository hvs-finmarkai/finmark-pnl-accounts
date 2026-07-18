from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_workforce_overview():
    return {
        "total_employees": 586,
        "billable": 459,
        "non_billable": 66,
        "bench": 61,
        "utilization_rate": 78.4,
        "overtime_hours": 1245,
        "avg_cost_per_employee": 85000,
    }


@router.get("/employees")
def get_employees():
    return [
        {"id": 1, "name": "Arun Sharma", "role": "Developer", "department": "Engineering", "utilization": 95, "status": "active"},
        {"id": 2, "name": "Pooja Nair", "role": "Business Analyst", "department": "Operations", "utilization": 88, "status": "active"},
        {"id": 3, "name": "Rohit Mehta", "role": "UI/UX Designer", "department": "Design", "utilization": 85, "status": "active"},
        {"id": 4, "name": "Sneha Iyer", "role": "Project Manager", "department": "Delivery", "utilization": 82, "status": "active"},
        {"id": 5, "name": "Vikram Dev", "role": "DevOps Engineer", "department": "Engineering", "utilization": 80, "status": "active"},
    ]


@router.get("/bench")
def get_bench():
    return [
        {"id": 10, "name": "Amit Kumar", "role": "Frontend Developer", "skills": ["React", "Next.js"], "bench_days": 15},
        {"id": 11, "name": "Priya Sharma", "role": "Data Analyst", "skills": ["Python", "SQL"], "bench_days": 8},
    ]


@router.get("/utilization")
def get_utilization():
    return {
        "overall": 78.4,
        "by_department": [
            {"department": "Engineering", "utilization": 85.2},
            {"department": "Design", "utilization": 72.1},
            {"department": "Operations", "utilization": 81.5},
            {"department": "Delivery", "utilization": 78.9},
        ],
    }
