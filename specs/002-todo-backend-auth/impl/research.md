# Research Document: Secure Authenticated Todo Backend

**Feature**: 002-todo-backend-auth
**Created**: 2026-02-06
**Status**: Complete

## RT-001: Better Auth JWT Integration

### Decision: Use python-jose for JWT validation
- **Rationale**: Better Auth generates standard JWT tokens that can be decoded and verified using python-jose library in Python, which is a popular and well-maintained library for JWT operations.

### Alternatives Considered:
- PyJWT: Similar functionality, but python-jose has additional security features
- Custom implementation: Would be unsafe and non-standard
- Authlib: More complex for simple JWT validation needs

### Implementation Details:
- Use RS256 algorithm to match Better Auth default
- Verify issuer and audience claims if present
- Validate token expiration (exp) and issue time (iat)
- Extract user information from token payload

### Code Pattern:
```python
from jose import jwt, JWTError
import os

def verify_jwt_token(token: str):
    try:
        payload = jwt.decode(
            token,
            os.getenv("BETTER_AUTH_SECRET"),
            algorithms=["RS256"],
            audience="your-app-audience",
            issuer="your-better-auth-url"
        )
        return payload
    except JWTError:
        return None
```

## RT-002: Neon PostgreSQL Optimization

### Decision: Use composite indexes for user isolation
- **Rationale**: For optimal performance of user-specific queries, composite indexes on (user_id, created_at) and (user_id, completed) will provide efficient filtering and sorting capabilities.

### Index Strategy:
- Primary: `idx_tasks_user_id` on tasks table for user isolation
- Composite: `idx_tasks_user_completed` for filtering by user and completion status
- Performance: `idx_tasks_user_created` for chronological ordering by user

### Implementation Details:
```sql
-- User isolation index
CREATE INDEX idx_tasks_user_id ON tasks(user_id);

-- Common filter combinations
CREATE INDEX idx_tasks_user_completed ON tasks(user_id, completed);

-- Chronological queries
CREATE INDEX idx_tasks_user_created ON tasks(user_id, created_at);
```

## RT-003: FastAPI Security Patterns

### Decision: Use Dependency Injection with Security Scopes
- **Rationale**: FastAPI's dependency injection system allows for clean authentication middleware implementation that can be applied to specific routes or globally.

### Implementation Pattern:
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    user_data = verify_jwt_token(token)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    return user_data
```

## DR-001: SQLModel Relationships

### Decision: Use explicit foreign key relationships with proper constraints
- **Rationale**: SQLModel supports SQLAlchemy's relationship system, which provides clean, type-safe relationships with proper constraint enforcement.

### Implementation Pattern:
```python
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid
from datetime import datetime

class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(unique=True, nullable=False)
    name: str

    tasks: List["Task"] = Relationship(back_populates="user")

class Task(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", nullable=False)
    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(max_length=1000)
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: User = Relationship(back_populates="tasks")
```

## DR-002: Pydantic Validation

### Decision: Use Pydantic models with field constraints
- **Rationale**: Pydantic provides excellent validation capabilities that integrate seamlessly with FastAPI for request/response validation.

### Implementation Patterns:
```python
from pydantic import BaseModel, validator
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

    @validator('title')
    def validate_title_length(cls, v):
        if len(v) < 1 or len(v) > 200:
            raise ValueError('Title must be between 1 and 200 characters')
        return v

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    @validator('title')
    def validate_title_length(cls, v):
        if v is not None and (len(v) < 1 or len(v) > 200):
            raise ValueError('Title must be between 1 and 200 characters')
        return v
```

## IR-001: Cross-Service Authentication

### Decision: Token passed via Authorization header with Bearer scheme
- **Rationale**: This is the standard approach for JWT token transmission and is widely supported across different services and clients.

### Flow:
1. Frontend receives JWT from Better Auth after login
2. Frontend stores JWT securely (HTTP-only cookie or secure storage)
3. Frontend includes `Authorization: Bearer {token}` in API requests
4. Backend validates JWT and extracts user identity
5. Backend enforces user isolation based on JWT claims

## IR-002: Error Handling Strategy

### Decision: Consistent JSON error responses with HTTP status codes
- **Rationale**: Provides clear, structured error information that clients can easily parse and handle appropriately.

### Error Response Format:
```json
{
  "detail": "Human-readable error message",
  "error_code": "MACHINE_READABLE_ERROR_CODE",
  "timestamp": "ISO 8601 timestamp"
}
```

### Status Code Mapping:
- 401 Unauthorized: Missing or invalid JWT token
- 403 Forbidden: Valid token but insufficient permissions (e.g., accessing other user's data)
- 404 Not Found: Resource doesn't exist or user doesn't have access
- 422 Unprocessable Entity: Validation errors in request data
- 500 Internal Server Error: Unexpected server errors

## Resolved Unknowns

All previously identified unknowns have been resolved:

1. **JWT Token Decoding**: Using python-jose library with proper validation
2. **Database Indexing**: Comprehensive index strategy for optimal performance
3. **Security Patterns**: FastAPI dependency injection with security scopes
4. **Relationships**: Proper SQLModel relationship definitions
5. **Validation**: Pydantic models with field constraints
6. **Authentication Flow**: Standard Bearer token approach
7. **Error Handling**: Structured JSON responses with appropriate status codes