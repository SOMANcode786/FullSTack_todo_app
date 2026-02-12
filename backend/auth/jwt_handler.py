"""JWT token handler for Better Auth integration."""

from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt as pyjwt
from fastapi import HTTPException, status, Request
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import settings


def decode_better_auth_token(token: str) -> dict:
    """
    Decode a Better Auth JWT token.

    Args:
        token: The JWT token to decode

    Returns:
        Decoded token payload as dictionary

    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith("Bearer "):
            token = token[7:]

        print(f"[DEBUG] Attempting to decode token: {token[:50]}...")
        print(f"[DEBUG] Using secret key: {settings.JWT_SECRET_KEY[:10]}...")
        print(f"[DEBUG] Using algorithm: {settings.JWT_ALGORITHM}")

        # Decode the token using the secret key WITHOUT verifying expiration first
        payload = pyjwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
            options={"verify_exp": False}  # Temporarily disable exp verification to see the payload
        )

        print(f"[DEBUG] Token decoded successfully. Payload: {payload}")

        # Check if token is expired manually
        exp = payload.get("exp")
        if exp:
            exp_datetime = datetime.fromtimestamp(exp, tz=timezone.utc)
            current_datetime = datetime.now(timezone.utc)
            print(f"[DEBUG] Token expiration: {exp_datetime} (timestamp: {exp})")
            print(f"[DEBUG] Current time: {current_datetime} (timestamp: {int(current_datetime.timestamp())})")
            print(f"[DEBUG] Time difference: {(exp_datetime - current_datetime).total_seconds()} seconds")

            if exp_datetime < current_datetime:
                print(f"[DEBUG] Token is EXPIRED")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Token has expired"
                )
            else:
                print(f"[DEBUG] Token is VALID")

        return payload

    except pyjwt.ExpiredSignatureError as e:
        print(f"[DEBUG] Token expired: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except pyjwt.InvalidTokenError as e:
        print(f"[DEBUG] Invalid token: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )


async def get_current_user_id(request: Request) -> str:
    """
    Extract the current user ID from the request's Authorization header.

    Args:
        request: The FastAPI request object

    Returns:
        User ID from the JWT token

    Raises:
        HTTPException: If no valid token is provided
    """
    authorization = request.headers.get("Authorization")

    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is required"
        )

    try:
        user_payload = decode_better_auth_token(authorization)
        user_id = user_payload.get("userId") or user_payload.get("sub")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: no user ID found"
            )

        return user_id
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create an access token (used for testing/development purposes).

    Args:
        data: Data to encode in the token
        expires_delta: Token expiration time delta

    Returns:
        Encoded JWT token string
    """
    to_encode = data.copy()

    # Use timezone-aware datetime
    now = datetime.now(timezone.utc)

    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    # Convert to timestamp
    to_encode.update({"exp": int(expire.timestamp())})

    print(f"[DEBUG] Creating token with expiration: {expire} (timestamp: {int(expire.timestamp())})")
    print(f"[DEBUG] Current time: {now} (timestamp: {int(now.timestamp())})")

    encoded_jwt = pyjwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    print(f"[DEBUG] Created token (first 50 chars): {encoded_jwt[:50]}")

    return encoded_jwt