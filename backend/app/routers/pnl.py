from fastapi import APIRouter

router = APIRouter()


@router.get("/overview")
def get_pnl_overview():
    return {
        "revenue": 125800000,
        "expenses": 91100000,
        "gross_profit": 53400000,
        "net_profit": 18600000,
        "gross_margin": 42.4,
        "net_margin": 14.8,
        "budget_utilization": 82.5,
    }


@router.get("/statement")
def get_pnl_statement():
    return [
        {"particular": "Revenue", "actual": 125800000, "budget": 110200000, "variance": 15600000, "variance_percent": 14.16},
        {"particular": "Direct Costs", "actual": 72400000, "budget": 65100000, "variance": -7300000, "variance_percent": -11.21},
        {"particular": "Gross Profit", "actual": 53400000, "budget": 45100000, "variance": 8300000, "variance_percent": 18.40},
        {"particular": "Indirect Costs", "actual": 18700000, "budget": 16200000, "variance": -2500000, "variance_percent": -15.43},
        {"particular": "Net Profit", "actual": 18600000, "budget": 14200000, "variance": 4400000, "variance_percent": 30.98},
    ]


@router.get("/revenue")
def get_revenue():
    return {
        "total": 125800000,
        "by_source": [
            {"source": "Project Delivery", "amount": 85600000},
            {"source": "Consulting", "amount": 22400000},
            {"source": "Support", "amount": 12800000},
            {"source": "Training", "amount": 5000000},
        ],
        "trend": [
            {"month": "Jan", "amount": 95000000},
            {"month": "Feb", "amount": 102000000},
            {"month": "Mar", "amount": 110000000},
            {"month": "Apr", "amount": 118000000},
            {"month": "May", "amount": 125800000},
        ],
    }


@router.get("/expenses")
def get_expenses():
    return {
        "total": 91100000,
        "by_category": [
            {"category": "Payroll", "amount": 45200000},
            {"category": "Vendor Payments", "amount": 18600000},
            {"category": "Overheads", "amount": 12300000},
            {"category": "Travel", "amount": 8400000},
            {"category": "Technology", "amount": 4200000},
            {"category": "Others", "amount": 2400000},
        ],
    }


@router.get("/forecast")
def get_forecast():
    return {
        "q3_revenue": 142500000,
        "q3_profit": 21200000,
        "q3_margin": 14.9,
        "confidence": 87,
    }
