---
id: 2
title: "todo-backend-auth-plan"
stage: plan
date_iso: "2026-02-06"
surface: "agent"
model: "Sonnet 4.5"
feature: "todo-backend-auth"
branch: "002-todo-backend-auth"
user: "user"
command: "/sp.plan Secure Todo Backend with FastAPI, SQLModel, JWT auth"
labels: ["planning", "backend", "authentication", "architecture"]
links:
  spec: "specs/002-todo-backend-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/002-todo-backend-auth/impl/plan.md"
  - "specs/002-todo-backend-auth/impl/research.md"
  - "specs/002-todo-backend-auth/impl/data-model.md"
  - "specs/002-todo-backend-auth/impl/contracts/openapi.yaml"
  - "specs/002-todo-backend-auth/impl/quickstart.md"
tests_yaml: []
---

# Prompt History Record

## User Input

```
/sp.plan

Create:
- Backend architecture sketch
- Section and folder structure
- Research approach
- Quality validation strategy

Decisions needing documentation:
- List important backend decisions
- Include options considered and tradeoffs

Testing strategy:
- Validation checks based on backend acceptance criteria

---

## Scope
Backend ONLY – FastAPI + SQLModel + JWT authentication

Frontend is out of scope. Focus on:
- REST API
- Database interaction
- Request/response validation
- User authentication and authorization

---

## Technical Details

- Use research-concurrent approach (research while planning, not all upfront)
- Follow APA citation style from Constitution for external references
- Organize plan by phases:
  Research → Foundation → Analysis → Synthesis

---

## Phase 1: Research

### Objectives
- Understand API requirements and endpoint structure (@specs/api/rest-endpoints.md)
- Understand task CRUD logic (@specs/features/task-crud.md)
- Understand user authentication flow via Better Auth (@specs/features/authentication.md)
- Review database schema (@specs/database/schema.md)
- Check backend CLAUDE.md for patterns and conventions

### Research Questions
- How JWT tokens are issued by Better Auth and verified in Python
- How to validate URL user_id matches JWT user
- Optimal SQLModel schema design for tasks
- Error handling strategy
- Indexing and query optimization in Neon PostgreSQL

---

## Phase 2: Foundation

### Backend Architecture Sketch

- FastAPI app entry: `main.py`
- Database models: `models.py` (SQLModel)
- Routes organized in `/routes/`:
  - tasks.py → CRUD endpoints
  - auth.py → JWT verification middleware (if needed)
- Database connection: `db.py`
- Middleware:
  - JWT verification
  - Request logging (optional)
- Environment variables:
  - `DATABASE_URL` → Neon PostgreSQL
  - `BETTER_AUTH_SECRET` → JWT secret
- Pydantic models for requests/responses
- JSON response format
- Error handling using FastAPI `HTTPException`

---

### Folder Structure Plan

- /backend
  - main.py
  - db.py
  - models.py
  - routes/
    - tasks.py
    - auth.py
  - schemas/
    - task_schema.py
    - user_schema.py
  - utils/
    - jwt_handler.py
    - validation.py

---

### Foundational Decisions

Decision 1: JWT Verification
- Option A: Decode token in every route
- Option B: Middleware to attach `current_user` (chosen)
Tradeoff: Slight complexity vs cleaner routes

Decision 2: Database Queries
- Option A: Raw SQL
- Option B: SQLModel ORM (chosen)
Tradeoff: Slight abstraction vs maintainability and safety

Decision 3: Error Handling
- Option A: Return generic 400/500
- Option B: Detailed structured JSON with HTTPException (chosen)
Tradeoff: More verbose vs better debugging

---

## Phase 3: Analysis

### Endpoint Responsibility Analysis

- GET /api/{user_id}/tasks → fetch all tasks for authenticated user
- POST /api/{user_id}/tasks → create task, validate fields
- GET /api/{user_id}/tasks/{id} → fetch single task, enforce ownership
- PUT /api/{user_id}/tasks/{id} → update task, enforce ownership
- DELETE /api/{user_id}/tasks/{id} → delete task, enforce ownership
- PATCH /api/{user_id}/tasks/{id}/complete → toggle completion

### Middleware & Auth Analysis

- JWT middleware attaches `current_user`
- Routes check `current_user.id == user_id`
- Unauthorized requests return 401
- Forbidden access returns 403

### Database Analysis

- Tasks table:
  - user_id foreign key
  - Index on user_id and completed
- SQLModel ensures schema compliance
- Query filters enforce user ownership

---

## Phase 4: Synthesis

### Final Backend Plan Output

- All REST endpoints implemented under `/api/`
- JWT middleware applied globally
- SQLModel models match database schema
- Pydantic models for validation
- Clear error handling
- API responses match spec
- Queries filter by authenticated user
- Environment variables for secrets and database

### Quality Validation

Backend is valid if:

- All endpoints exist and function correctly
- JWT enforces authentication on all endpoints
- Users cannot access other users' tasks
- Database schema matches spec
- CRUD operations persist in Neon PostgreSQL
- HTTP responses follow spec codes

---

## Testing Strategy

### Acceptance-Based Validation

- Unauthenticated requests → 401 Unauthorized
- Authenticated requests to another user → 403 Forbidden
- CRUD operations succeed and persist in database
- Task ownership enforced in every query
- Response schema validated against Pydantic models
- Middleware correctly decodes JWT and attaches user

---

## Deliverable

- A structured backend implementation plan
- Ready for `/sp.task` task breakdown and `/sp.implement` execution
- Fully aligned with Spec-Kit and CLAUDE.md
```

## Response Summary

Successfully completed the implementation plan for the secure authenticated Todo backend. The plan includes:

- Comprehensive technical context with research-based decisions
- Detailed architecture and data model design
- Complete API contract specifications
- Research document resolving all technical unknowns
- Quickstart guide for development setup
- Constitution compliance checks
- Implementation sequence and quality assurance plan

The plan follows a phased approach with Research, Foundation, Analysis, and Synthesis phases as requested. All unknowns identified in the technical context have been resolved through dedicated research efforts documented in the research.md file.

## Outcome

Created a complete implementation plan with the following artifacts:
- Implementation plan at specs/002-todo-backend-auth/impl/plan.md
- Research findings at specs/002-todo-backend-auth/impl/research.md
- Data model design at specs/002-todo-backend-auth/impl/data-model.md
- API contracts in specs/002-todo-backend-auth/impl/contracts/openapi.yaml
- Quickstart guide at specs/002-todo-backend-auth/impl/quickstart.md

All constitutional compliance checks have been satisfied, and the plan is ready for the next phase of task breakdown and implementation.

## Evaluation

The implementation plan comprehensively addresses all requirements from the feature specification, with proper security measures, user isolation, and API design. The research-based approach ensures that all technical challenges have been investigated and solutions planned. The plan is ready for conversion to specific implementation tasks.