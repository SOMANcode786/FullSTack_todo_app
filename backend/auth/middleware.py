"""Authentication middleware for the Todo Backend API."""

from fastapi import Request, HTTPException, status
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from auth.jwt_handler import decode_better_auth_token


async def auth_middleware(request: Request, call_next):
    """
    Middleware to handle authentication for protected routes.

    This middleware checks for a valid JWT token in the Authorization header
    for all routes that require authentication.
    """
    # Define routes that don't require authentication
    public_routes = [
        "/",
        "/docs",
        "/redoc",
        "/openapi.json",
    ]

    # Skip auth for public routes
    if request.url.path in public_routes:
        return await call_next(request)

    # Check for auth token in Authorization header
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is required"
        )

    try:
        # Validate the token - if invalid, this will raise an exception
        decode_better_auth_token(auth_header)

        # If we get here, token is valid, continue with request
        response = await call_next(request)
        return response

    except HTTPException:
        # Re-raise HTTP exceptions from token validation
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )