---
id: 1
title: "todo-backend-auth-spec"
stage: spec
date_iso: "2026-02-06"
surface: "agent"
model: "Sonnet 4.5"
feature: "todo-backend-auth"
branch: "002-todo-backend-auth"
user: "user"
command: "/sp.specify Secure authenticated Todo backend with FastAPI, SQLModel, JWT auth"
labels: ["specification", "backend", "authentication", "todo"]
links:
  spec: "specs/002-todo-backend-auth/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/002-todo-backend-auth/spec.md"
  - "specs/002-todo-backend-auth/checklists/requirements.md"
tests_yaml: []
---

# Prompt History Record

## User Input

```
/sp.specify

You are working in a Spec-Kit Plus monorepo using Claude Code.

## Scope
Backend ONLY – Phase II Todo Full-Stack Web Application

Frontend and UI implementation are out of scope. Focus exclusively on REST API, database integration, authentication, and business logic.

---

## Objective

Implement a secure, authenticated FastAPI backend for a multi-user Todo web application using:

- FastAPI for REST endpoints
- SQLModel for ORM/database interaction
- Neon Serverless PostgreSQL for storage
- JWT authentication via Better Auth
- Spec-Kit driven approach (no manual coding)

---

## Rules (Critical)

- Follow specifications strictly
- Implement all backend endpoints as defined in @specs/api/rest-endpoints.md
- Validate every request using Pydantic / SQLModel
- Integrate JWT authentication middleware
- Enforce user-level authorization
- Never return data from other users
- Use environment variables for secrets (BETTER_AUTH_SECRET) and database (DATABASE_URL)
- Do NOT implement frontend or UI logic

---

## Agents & Skills to Use

### Backend Agent
Responsible for:
- REST API route design
- Request/response validation
- JWT authentication integration
- Database CRUD operations
- User-level data enforcement

### Backend Skill
Used for:
- Generating API routes
- Handling requests and responses
- Connecting to the database
- Query filtering by authenticated user
- Error handling

### Database Agent / Skill
- Maintain SQLModel schemas for tasks and users
- Ensure user_id foreign key relationships
- Enforce referential integrity and indexing
- Apply migrations when schema changes occur

---

## Specifications to Follow (Mandatory)

- @specs/overview.md
- @specs/features/task-crud.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md
- @specs/database/schema.md
- /backend/CLAUDE.md

---

## REST API Endpoints (All Authenticated)

- GET    /api/{user_id}/tasks → List all tasks for authenticated user
- POST   /api/{user_id}/tasks → Create new task
- GET    /api/{user_id}/tasks/{id} → Task details
- PUT    /api/{user_id}/tasks/{id} → Update task
- DELETE /api/{user_id}/tasks/{id} → Delete task
- PATCH  /api/{user_id}/tasks/{id}/complete → Toggle completion

### API Rules

- All endpoints must require JWT token
- JWT token passed via header: `Authorization: Bearer <token>`
- Validate token and decode user ID
- Ensure URL user_id matches authenticated user_id
- Return appropriate HTTP status codes:
  - 401 Unauthorized → missing/invalid token
  - 403 Forbidden → user mismatch
  - 422 Unprocessable Entity → validation error

---

## Authentication Rules

- Use JWT plugin from Better Auth
- Verify JWT signature using shared secret (BETTER_AUTH_SECRET)
- Decode user info from token for user-level filtering
- Do not rely on frontend for authentication validation

---

## Database Rules

- Use SQLModel models for all tables
- Users table managed by Better Auth (id, email, name)
- Tasks table (id, user_id, title, description, completed, timestamps)
- Apply indexes on user_id and completed fields
- Ensure foreign key integrity (tasks.user_id → users.id)
- Queries must filter tasks by authenticated user_id

---

## Request/Response Validation

- Use Pydantic models for request bodies
- Validate:
  - Title length (1–200)
  - Description max length (1000)
  - Completed boolean
- Return structured JSON responses
- Handle errors with FastAPI HTTPException

---

## Deliverables

Backend implementation is complete when:

- All REST endpoints exist and follow spec
- JWT authentication enforces user-level access
- Database CRUD operations work correctly
- API responses match Pydantic models
- Tasks are filtered per user
- Code follows backend CLAUDE.md and Spec-Kit rules

---

## Completion Criteria

Backend is considered DONE when:

- Authenticated users can create, read, update, delete, and complete tasks
- Users cannot access or modify other users' tasks
- JWT is required and verified on all endpoints
- Database schema matches @specs/database/schema.md
- Error handling is consistent and according to spec
```

## Response Summary

Created a comprehensive specification for a secure authenticated Todo backend feature with the following key elements:

- User scenarios covering task creation, viewing, updating, and deletion with authentication
- Functional requirements focusing on authentication, data isolation, and CRUD operations
- Technology-agnostic success criteria with measurable outcomes
- Clear edge cases and error handling requirements
- Business-focused language without implementation details

The specification follows the template structure and has been validated against the quality checklist to ensure it's ready for the planning phase.

## Outcome

Successfully created feature specification at `specs/002-todo-backend-auth/spec.md` with supporting checklist at `specs/002-todo-backend-auth/checklists/requirements.md`. The specification is ready for planning and implementation.

## Evaluation

The specification addresses the core requirements of the authenticated Todo backend, emphasizing user authentication, data isolation, and security while maintaining focus on user value rather than technical implementation details.