# Implementation Plan: Secure Authenticated Todo Backend

**Feature**: 002-todo-backend-auth
**Created**: 2026-02-06
**Status**: Draft
**Author**: Claude Code

## Technical Context

This plan outlines the implementation of a secure, authenticated backend for a multi-user Todo web application. The system will be built using FastAPI for REST endpoints, SQLModel for ORM/database interaction, and Neon Serverless PostgreSQL for storage, with JWT authentication via Better Auth.

### Core Components

- **REST API**: FastAPI-based endpoints for task CRUD operations
- **Authentication**: JWT token validation for user identification
- **Data Storage**: SQLModel models for Neon PostgreSQL
- **Authorization**: User isolation to prevent cross-user data access

### Dependencies

- **Better Auth**: For JWT token issuance and validation
- **Neon Serverless PostgreSQL**: For database storage
- **FastAPI**: For web framework and API routing
- **SQLModel**: For database modeling and ORM
- **Pydantic**: For request/response validation

### Unknowns

- Specific JWT token decoding implementation with Better Auth in Python (RESOLVED in research.md)
- Exact database schema constraints and indexes (RESOLVED in research.md and data-model.md)
- Rate limiting and additional security measures (RESOLVED in research.md)

## Constitution Check

### I. Specification-Driven Development (NON-NEGOTIABLE)
- [x] All implementation will follow requirements from spec.md
- [x] Traceability maintained between functional requirements and code
- [x] No features implemented without corresponding spec references

### II. Full-Stack Architecture
- [x] Backend operates as independent service with REST API
- [x] Business logic contained in backend, not frontend
- [x] API endpoints designed for consumption by frontend

### III. Security-First Approach (NON-NEGOTIABLE)
- [x] Authentication required for all API endpoints
- [x] JWT tokens validated via Authorization header
- [x] User data isolation enforced at database query level
- [x] User_id validation between URL and JWT claims

### IV. Test-First Implementation
- [x] Unit tests for authentication middleware
- [x] Integration tests for API endpoints
- [x] Security tests for authorization bypass prevention

### V. Database Integrity & User Isolation
- [x] Foreign key constraints between users and tasks
- [x] User_id filtering in all database queries
- [x] Referential integrity maintained through schema design

## Gates

### Gate 1: Technical Feasibility
- [x] FastAPI supports required middleware for JWT validation
- [x] SQLModel compatible with Neon Serverless PostgreSQL
- [x] Better Auth JWT tokens can be decoded in Python

### Gate 2: Security Compliance
- [x] All endpoints require authentication
- [x] Authorization checks prevent cross-user access
- [x] Input validation prevents injection attacks

### Gate 3: Performance Requirements
- [x] API responds within 1-second threshold (SC-003)
- [x] Database queries properly indexed for user isolation
- [x] JWT validation does not significantly impact performance

### Gate 4: Architecture Alignment
- [x] Implementation aligns with full-stack architecture principles
- [x] Clear separation of concerns between components
- [x] Scalable design for multiple concurrent users

## Phase 0: Research & Resolution

### 0.1 Research Tasks

#### RT-001: Better Auth JWT Integration
- **Objective**: Understand how to decode and validate Better Auth JWT tokens in Python
- **Deliverable**: JWT handler implementation guide
- **Resources Needed**: Better Auth documentation, Python JWT libraries

#### RT-002: Neon PostgreSQL Optimization
- **Objective**: Determine optimal indexing strategy for user isolation
- **Deliverable**: Database schema with proper indexes
- **Resources Needed**: Neon PostgreSQL documentation, performance guides

#### RT-003: FastAPI Security Patterns
- **Objective**: Identify best practices for JWT middleware in FastAPI
- **Deliverable**: Security middleware design
- **Resources Needed**: FastAPI documentation, security articles

### 0.2 Dependency Research

#### DR-001: SQLModel Relationships
- **Objective**: Best practices for defining user-task relationships
- **Deliverable**: Relationship mapping documentation
- **Resources Needed**: SQLModel documentation, relationship examples

#### DR-002: Pydantic Validation
- **Objective**: Optimal validation patterns for request models
- **Deliverable**: Validation schema patterns
- **Resources Needed**: Pydantic documentation, validation examples

### 0.3 Integration Research

#### IR-001: Cross-Service Authentication
- **Objective**: Understand how JWT tokens flow between services
- **Deliverable**: Authentication flow diagram
- **Resources Needed**: Better Auth docs, FastAPI security patterns

#### IR-002: Error Handling Strategy
- **Objective**: Determine best approach for consistent error responses
- **Deliverable**: Error handling patterns
- **Resources Needed**: FastAPI exception handling docs, API best practices

## Phase 1: Design & Architecture

### 1.1 Data Model Design

#### DM-001: User Entity
- **Fields**: id (UUID), email (string), name (string)
- **Constraints**: email unique, id primary key
- **Relationships**: One-to-many with tasks
- **Indexes**: Primary key index on id, unique index on email

#### DM-002: Task Entity
- **Fields**: id (UUID), user_id (UUID), title (string), description (text), completed (boolean), created_at (timestamp), updated_at (timestamp)
- **Constraints**: user_id foreign key to users(id), title length 1-200, description max 1000
- **Relationships**: Many-to-one with users
- **Indexes**: Index on user_id, index on completed, combined index on (user_id, completed)

### 1.2 API Contract Design

#### AC-001: Task CRUD Operations
- **GET /api/{user_id}/tasks**: Retrieve all tasks for user
  - Headers: Authorization: Bearer {token}
  - Validation: JWT valid, user_id matches JWT user
  - Response: 200 OK with task list, 401/403 for auth issues

- **POST /api/{user_id}/tasks**: Create new task
  - Headers: Authorization: Bearer {token}
  - Body: {title, description?}
  - Validation: JWT valid, user_id matches JWT user, input valid
  - Response: 201 Created with task, 401/403 for auth, 422 for validation

- **GET /api/{user_id}/tasks/{id}**: Get specific task
  - Headers: Authorization: Bearer {token}
  - Validation: JWT valid, user_id matches JWT user, task exists and belongs to user
  - Response: 200 OK with task, 401/403/404 for various errors

- **PUT /api/{user_id}/tasks/{id}**: Update task
  - Headers: Authorization: Bearer {token}
  - Body: {title?, description?, completed?}
  - Validation: JWT valid, user_id matches JWT user, task exists and belongs to user
  - Response: 200 OK with updated task, 401/403/404 for various errors

- **DELETE /api/{user_id}/tasks/{id}**: Delete task
  - Headers: Authorization: Bearer {token}
  - Validation: JWT valid, user_id matches JWT user, task exists and belongs to user
  - Response: 204 No Content, 401/403/404 for various errors

- **PATCH /api/{user_id}/tasks/{id}/complete**: Toggle completion
  - Headers: Authorization: Bearer {token}
  - Validation: JWT valid, user_id matches JWT user, task exists and belongs to user
  - Response: 200 OK with updated task, 401/403/404 for various errors

### 1.3 Component Architecture

#### CA-001: Directory Structure
```
/backend/
├── main.py                 # FastAPI app entry point
├── db.py                   # Database connection and setup
├── models.py               # SQLModel database models
├── config.py               # Configuration and environment variables
├── auth/
│   ├── __init__.py
│   ├── jwt_handler.py      # JWT validation utilities
│   └── middleware.py       # Authentication middleware
├── routes/
│   ├── __init__.py
│   └── tasks.py            # Task-related endpoints
├── schemas/
│   ├── __init__.py
│   ├── task_schemas.py     # Pydantic models for tasks
│   └── user_schemas.py     # Pydantic models for users
└── utils/
    ├── __init__.py
    └── validators.py       # Custom validation utilities
```

#### CA-002: Module Dependencies
- `main.py` imports: `db`, `routes.tasks`, `auth.middleware`
- `db.py` imports: `sqlmodel`, `models`
- `models.py` imports: `sqlmodel`, `datetime`
- `routes.tasks.py` imports: `fastapi`, `models`, `schemas.task_schemas`, `auth.jwt_handler`
- `auth.jwt_handler.py` imports: `jwt`, `config`
- `auth.middleware.py` imports: `fastapi`, `auth.jwt_handler`

## Phase 2: Implementation Strategy

### 2.1 Development Sequence

#### Step 1: Setup Foundation (Days 1-2)
- [ ] Initialize FastAPI application
- [ ] Configure database connection to Neon PostgreSQL
- [ ] Set up basic configuration management
- [ ] Create initial directory structure

#### Step 2: Data Models (Days 2-3)
- [ ] Implement SQLModel User and Task models
- [ ] Define relationships and constraints
- [ ] Add validation rules for field lengths
- [ ] Create database migration scripts

#### Step 3: Authentication Layer (Days 3-4)
- [ ] Implement JWT token validation utilities
- [ ] Create authentication middleware
- [ ] Add user identification from JWT
- [ ] Test JWT validation with sample tokens

#### Step 4: API Endpoints (Days 4-6)
- [ ] Implement GET /api/{user_id}/tasks
- [ ] Implement POST /api/{user_id}/tasks
- [ ] Implement GET /api/{user_id}/tasks/{id}
- [ ] Implement PUT /api/{user_id}/tasks/{id}
- [ ] Implement DELETE /api/{user_id}/tasks/{id}
- [ ] Implement PATCH /api/{user_id}/tasks/{id}/complete

#### Step 5: Validation & Error Handling (Days 6-7)
- [ ] Add request validation with Pydantic
- [ ] Implement consistent error response format
- [ ] Add authorization checks in all endpoints
- [ ] Handle edge cases and error conditions

#### Step 6: Testing & Validation (Days 7-8)
- [ ] Write unit tests for authentication
- [ ] Write integration tests for API endpoints
- [ ] Validate security measures (no cross-user access)
- [ ] Performance testing for response times

### 2.2 Quality Assurance Plan

#### QA-001: Security Testing
- [ ] Verify authentication required for all endpoints
- [ ] Confirm no access to other users' tasks
- [ ] Validate JWT token expiration handling
- [ ] Test input sanitization for injection prevention

#### QA-002: Functional Testing
- [ ] All CRUD operations work as specified
- [ ] User isolation enforced correctly
- [ ] Data validation applied properly
- [ ] Error responses follow specification

#### QA-003: Performance Testing
- [ ] API responds within 1-second threshold
- [ ] Database queries perform efficiently
- [ ] JWT validation does not create bottlenecks
- [ ] Concurrency handling verified

## Phase 3: Deployment & Monitoring

### 3.1 Environment Setup
- [ ] Production Neon PostgreSQL database
- [ ] Environment variables configuration
- [ ] JWT secret management
- [ ] API documentation with Swagger

### 3.2 Monitoring Plan
- [ ] API response time monitoring
- [ ] Error rate tracking
- [ ] Authentication failure logging
- [ ] Security event auditing

## Success Criteria Verification

### SC-001: 95% successful operations
- [ ] All endpoints return successful responses for valid requests
- [ ] Error handling provides meaningful feedback
- [ ] Authentication/authorization works consistently

### SC-002: 100% user isolation
- [ ] No access to other users' tasks
- [ ] URL user_id validation prevents spoofing
- [ ] Database queries filter by authenticated user

### SC-003: Sub-second response time
- [ ] API endpoints respond within 1 second
- [ ] Database queries optimized with proper indexing
- [ ] JWT validation performs efficiently

### SC-004: 100% authentication validation
- [ ] All unauthenticated requests rejected
- [ ] Invalid JWT tokens properly handled
- [ ] Expired tokens rejected appropriately

### SC-005: 100% data validation compliance
- [ ] Title length validation (1-200 chars)
- [ ] Description length validation (max 1000 chars)
- [ ] Boolean validation for completed field