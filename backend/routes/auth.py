"""Authentication routes for user signup and login."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from pydantic import BaseModel
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from db import get_session
from models import User
from auth.jwt_handler import create_access_token
from datetime import timedelta
from config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])


class SignupRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    email: str


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def signup(
    signup_data: SignupRequest,
    session: Session = Depends(get_session)
):
    """
    Register a new user.

    For development/demo purposes, this accepts any email/password.
    In production, this would hash passwords and validate properly.
    """
    # Check if user already exists
    statement = select(User).where(User.email == signup_data.email)
    existing_user = session.exec(statement).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user (in production, hash the password!)
    from uuid import uuid4
    from datetime import datetime

    user = User(
        id=uuid4(),
        email=signup_data.email,
        hashed_password=signup_data.password,  # In production: hash this!
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    # Create access token
    access_token = create_access_token(
        data={"sub": str(user.id), "userId": str(user.id), "email": user.email},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=str(user.id),
        email=user.email
    )


@router.post("/login", response_model=AuthResponse)
async def login(
    login_data: LoginRequest,
    session: Session = Depends(get_session)
):
    """
    Authenticate a user and return a JWT token.

    For development/demo purposes, this accepts any registered email.
    In production, this would verify hashed passwords.
    """
    # Find user by email
    statement = select(User).where(User.email == login_data.email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # In production, verify hashed password here
    # For demo, we just check if password matches (not secure!)
    if user.hashed_password != login_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Create access token
    access_token = create_access_token(
        data={"sub": str(user.id), "userId": str(user.id), "email": user.email},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=str(user.id),
        email=user.email
    )
