"""Task routes for CRUD operations on todo tasks."""

from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlmodel import Session, select
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_session
from models import Task, User
from schemas.task_schemas import TaskCreate, TaskRead, TaskUpdate
from auth.jwt_handler import get_current_user_id
from utils.validators import validate_user_authorization, validate_task_ownership, validate_uuid_format

router = APIRouter(prefix="/api", tags=["tasks"])


@router.get("/{user_id}/tasks", response_model=List[TaskRead])
async def get_user_tasks(
    user_id: str,
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Get all tasks for a specific user.

    Requires authentication and validates that the authenticated user
    matches the user_id in the URL.
    """
    # Get authenticated user ID from JWT
    jwt_user_id = await get_current_user_id(request)

    # Validate authorization
    validate_user_authorization(jwt_user_id, user_id)

    # Validate UUID format
    user_uuid = validate_uuid_format(user_id, "user_id")

    # Query tasks for the user
    statement = select(Task).where(Task.user_id == user_uuid)
    tasks = session.exec(statement).all()

    return tasks


@router.post("/{user_id}/tasks", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Create a new task for a specific user.

    Requires authentication and validates that the authenticated user
    matches the user_id in the URL.
    """
    # Get authenticated user ID from JWT
    jwt_user_id = await get_current_user_id(request)

    # Validate authorization
    validate_user_authorization(jwt_user_id, user_id)

    # Validate UUID format
    user_uuid = validate_uuid_format(user_id, "user_id")

    # Check if user exists
    user = session.get(User, user_uuid)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    # Create new task
    from uuid import uuid4
    from datetime import datetime

    task = Task(
        id=uuid4(),
        user_id=user_uuid,
        title=task_data.title,
        description=task_data.description,
        completed=False,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.get("/{user_id}/tasks/{task_id}", response_model=TaskRead)
async def get_task(
    user_id: str,
    task_id: str,
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Get a specific task by ID.

    Requires authentication and validates that the authenticated user
    owns the task.
    """
    # Get authenticated user ID from JWT
    jwt_user_id = await get_current_user_id(request)

    # Validate authorization
    validate_user_authorization(jwt_user_id, user_id)

    # Validate UUID formats
    task_uuid = validate_uuid_format(task_id, "task_id")

    # Get task
    task = session.get(Task, task_uuid)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Validate task ownership
    validate_task_ownership(task.user_id, jwt_user_id)

    return task


@router.put("/{user_id}/tasks/{task_id}", response_model=TaskRead)
async def update_task(
    user_id: str,
    task_id: str,
    task_data: TaskUpdate,
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Update a specific task.

    Requires authentication and validates that the authenticated user
    owns the task.
    """
    # Get authenticated user ID from JWT
    jwt_user_id = await get_current_user_id(request)

    # Validate authorization
    validate_user_authorization(jwt_user_id, user_id)

    # Validate UUID formats
    task_uuid = validate_uuid_format(task_id, "task_id")

    # Get task
    task = session.get(Task, task_uuid)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Validate task ownership
    validate_task_ownership(task.user_id, jwt_user_id)

    # Update task fields
    if task_data.title is not None:
        task.title = task_data.title
    if task_data.description is not None:
        task.description = task_data.description
    if task_data.completed is not None:
        task.completed = task_data.completed

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    task_id: str,
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Delete a specific task.

    Requires authentication and validates that the authenticated user
    owns the task.
    """
    # Get authenticated user ID from JWT
    jwt_user_id = await get_current_user_id(request)

    # Validate authorization
    validate_user_authorization(jwt_user_id, user_id)

    # Validate UUID formats
    task_uuid = validate_uuid_format(task_id, "task_id")

    # Get task
    task = session.get(Task, task_uuid)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Validate task ownership
    validate_task_ownership(task.user_id, jwt_user_id)

    # Delete task
    session.delete(task)
    session.commit()

    return None


@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
async def toggle_task_completion(
    user_id: str,
    task_id: str,
    request: Request,
    session: Session = Depends(get_session)
):
    """
    Toggle the completion status of a task.

    Requires authentication and validates that the authenticated user
    owns the task.
    """
    # Get authenticated user ID from JWT
    jwt_user_id = await get_current_user_id(request)

    # Validate authorization
    validate_user_authorization(jwt_user_id, user_id)

    # Validate UUID formats
    task_uuid = validate_uuid_format(task_id, "task_id")

    # Get task
    task = session.get(Task, task_uuid)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Validate task ownership
    validate_task_ownership(task.user_id, jwt_user_id)

    # Toggle completion status
    task.completed = not task.completed

    session.add(task)
    session.commit()
    session.refresh(task)

    return task
