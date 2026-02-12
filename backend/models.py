"""Database models for the Todo Backend API using SQLModel."""

from datetime import datetime
from typing import Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4
import enum

if TYPE_CHECKING:
    from .schemas.task_schemas import TaskRead, TaskCreate, TaskUpdate


class User(SQLModel, table=True):
    """User model representing an authenticated user account."""

    __tablename__ = "users"  # Explicitly set table name to plural

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, nullable=False, max_length=255)
    name: Optional[str] = Field(default=None, max_length=255)
    hashed_password: str = Field(nullable=False, max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to tasks
    tasks: list["Task"] = Relationship(back_populates="user", sa_relationship_kwargs={"cascade": "all, delete-orphan"})


class TaskStatus(str, enum.Enum):
    """Enum for task status if needed in the future."""
    ACTIVE = "active"
    COMPLETED = "completed"


class Task(SQLModel, table=True):
    """Task model representing a todo item with ownership information."""

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="users.id", nullable=False)  # References the explicit users table name
    title: str = Field(nullable=False, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False, nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationship to user
    user: User = Relationship(back_populates="tasks")