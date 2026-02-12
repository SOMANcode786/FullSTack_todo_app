"""Custom validation utilities for the Todo Backend API."""

from typing import Optional
from uuid import UUID
from fastapi import HTTPException, status


def validate_user_authorization(jwt_user_id: str, url_user_id: str) -> None:
    """
    Validate that the user_id in the URL matches the user_id from the JWT token.

    Args:
        jwt_user_id: User ID extracted from JWT token
        url_user_id: User ID from the URL path parameter

    Raises:
        HTTPException: If user IDs don't match (403 Forbidden)
    """
    if jwt_user_id != url_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this user's resources"
        )


def validate_task_ownership(task_user_id: UUID, jwt_user_id: str) -> None:
    """
    Validate that the task belongs to the authenticated user.

    Args:
        task_user_id: User ID associated with the task
        jwt_user_id: User ID extracted from JWT token

    Raises:
        HTTPException: If user doesn't own the task (403 Forbidden)
    """
    if str(task_user_id) != jwt_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this task"
        )


def validate_uuid_format(uuid_string: str, field_name: str = "ID") -> UUID:
    """
    Validate that a string is a valid UUID format.

    Args:
        uuid_string: String to validate as UUID
        field_name: Name of the field for error messages

    Returns:
        UUID object if valid

    Raises:
        HTTPException: If string is not a valid UUID (422 Unprocessable Entity)
    """
    try:
        return UUID(uuid_string)
    except (ValueError, AttributeError):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid {field_name} format. Must be a valid UUID."
        )
