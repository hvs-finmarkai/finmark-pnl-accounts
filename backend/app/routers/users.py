from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    department: str
    status: str


@router.get("/")
def get_users():
    return [
        {"id": 1, "name": "Arjun Mehta", "email": "arjun@denave.com", "role": "CFO", "department": "Finance", "status": "active"},
        {"id": 2, "name": "Pooja Nair", "email": "pooja@denave.com", "role": "Business Analyst", "department": "Operations", "status": "active"},
        {"id": 3, "name": "Rohan Singh", "email": "rohan@denave.com", "role": "Project Manager", "department": "Delivery", "status": "active"},
    ]


@router.get("/{user_id}")
def get_user(user_id: int):
    return {"id": user_id, "name": "Arjun Mehta", "email": "arjun@denave.com", "role": "CFO", "department": "Finance"}
