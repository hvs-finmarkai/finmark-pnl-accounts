from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class UserRole(str, enum.Enum):
    admin = "admin"
    manager = "manager"
    analyst = "analyst"
    viewer = "viewer"


class ProjectStatus(str, enum.Enum):
    planning = "planning"
    in_progress = "in_progress"
    completed = "completed"
    on_hold = "on_hold"
    at_risk = "at_risk"


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.viewer)
    department = Column(String(100))
    avatar_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    industry = Column(String(100))
    country = Column(String(100))
    currency = Column(String(10), default="INR")
    fiscal_year_start = Column(String(10), default="April")
    logo_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    industry = Column(String(100))
    region = Column(String(100))
    revenue = Column(Float, default=0)
    profit = Column(Float, default=0)
    margin = Column(Float, default=0)
    status = Column(String(50), default="active")
    health_score = Column(Float, default=100)
    contract_value = Column(Float, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    projects = relationship("Project", back_populates="client")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    client_id = Column(Integer, ForeignKey("clients.id"))
    manager_id = Column(Integer, ForeignKey("users.id"))
    status = Column(SQLEnum(ProjectStatus), default=ProjectStatus.planning)
    priority = Column(String(50), default="medium")
    budget = Column(Float, default=0)
    revenue = Column(Float, default=0)
    margin = Column(Float, default=0)
    progress = Column(Integer, default=0)
    start_date = Column(DateTime(timezone=True))
    end_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    client = relationship("Client", back_populates="projects")


class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    department = Column(String(100))
    role = Column(String(100))
    utilization = Column(Float, default=0)
    allocation = Column(Float, default=0)
    salary = Column(Float, default=0)
    cost = Column(Float, default=0)
    status = Column(String(50), default="active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime(timezone=True), nullable=False)
    description = Column(String(500))
    category = Column(String(100))
    type = Column(String(50))
    amount = Column(Float, nullable=False)
    client_id = Column(Integer, ForeignKey("clients.id"))
    project_id = Column(Integer, ForeignKey("projects.id"))
    status = Column(String(50), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CostAllocation(Base):
    __tablename__ = "cost_allocations"
    id = Column(Integer, primary_key=True, index=True)
    cost_center = Column(String(255), nullable=False)
    total_cost = Column(Float, default=0)
    allocated_cost = Column(Float, default=0)
    driver = Column(String(100))
    rule = Column(String(255))
    status = Column(String(50), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Workflow(Base):
    __tablename__ = "workflows"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    nodes = Column(Text)
    status = Column(String(50), default="draft")
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(100))
    format = Column(String(50))
    schedule = Column(String(50), default="on_demand")
    last_generated = Column(DateTime(timezone=True))
    status = Column(String(50), default="ready")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Integration(Base):
    __tablename__ = "integrations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(100))
    status = Column(String(50), default="disconnected")
    config = Column(Text)
    last_sync = Column(DateTime(timezone=True))
    records_synced = Column(Integer, default=0)
    errors = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String(50))
    title = Column(String(255), nullable=False)
    message = Column(Text)
    read = Column(Boolean, default=False)
    action_url = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
