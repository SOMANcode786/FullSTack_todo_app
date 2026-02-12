"""Pydantic schemas for Task entity request/response validation."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, validator
from uuid import UUID


class TaskBase(BaseModel):
    """Base schema for Task with common fields."""
    title: str = Field(..., min_length=1, max_length=200, description="Task title (1-200 characters)")
    description: Optional[str] = Field(None, max_length=1000, description="Task description (max 1000 characters)")


class TaskCreate(TaskBase):
    """Schema for creating a new task."""

    @validator('title')
    def validate_title_length(cls, v):
        if not v or len(v.strip()) < 1:
            raise ValueError('Title cannot be empty')
        if len(v) > 200:
            raise ValueError('Title must be 200 characters or less')
        return v.strip()

    @validator('description')
    def validate_description_length(cls, v):
        if v and len(v) > 1000:
            raise ValueError('Description must be 1000 characters or less')
        return v


class TaskUpdate(BaseModel):
    """Schema for updating an existing task."""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    completed: Optional[bool] = None

    @validator('title')
    def validate_title_length(cls, v):
        if v is not None:
            if len(v.strip()) < 1:
                raise ValueError('Title cannot be empty')
            if len(v) > 200:
                raise ValueError('Title must be 200 characters or less')
            return v.strip()
        return v

    @validator('description')
    def validate_description_length(cls, v):
        if v is not None and len(v) > 1000:
            raise ValueError('Description must be 1000 characters or less')
        return v


class TaskRead(TaskBase):
    """Schema for reading a task (response)."""
    id: UUID
    user_id: UUID = Field(..., alias="userId")
    completed: bool
    created_at: datetime = Field(..., alias="createdAt")
    updated_at: datetime = Field(..., alias="updatedAt")

    class Config:
        from_attributes = True
        populate_by_name = True
        by_alias = True


class TaskComplete(BaseModel):
    """Schema for toggling task completion status."""
    completed: bool
