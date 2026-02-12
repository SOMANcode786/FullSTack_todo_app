---
id: 1
title: Update Constitution
stage: constitution
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: 001-todo-app-fullstack
user: user
command: /sp.constitution
labels: [constitution, setup, governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
---

## Prompt

/sp.contition

You are working in a Spec-Kit Plus monorepo using Claude Code.

## Phase
Phase II: Todo Full-Stack Web Application

## Objective
Transform the existing console-based Todo application into a modern, multi-user full-stack web application with persistent storage.

All implementation must be driven by specifications.
No manual coding is allowed.

---

## Development Rules

- Follow Agentic Dev Stack workflow:
  Write spec → Generate plan → Break into tasks → Implement
- Always read and reference specs before implementation
- Use agents and skills according to CLAUDE.md rules
- Do not invent requirements not present in specs
- Update specs if conflicts or gaps are found

---

## Required Agents & Responsibilities

### Auth Agent
- Implement user signup and signin using Better Auth
- Configure Better Auth to issue JWT tokens
- Define JWT validation rules for backend
- Ensure secure auth flow between frontend and backend

### Backend Agent (FastAPI)
- Implement RESTful API endpoints under `/api`
- Validate requests and responses using Pydantic / SQLModel
- Integrate JWT authentication middleware
- Enforce user-level authorization on every endpoint
- Interact with database using SQLModel

### DB Agent
- Design and maintain database schema
- Create and update tables using SQLModel
- Ensure user-task relationship is enforced
- Optimize for Neon Serverless PostgreSQL

### Frontend Agent
- Build responsive UI using Next.js 16+ App Router
- Integrate Better Auth on frontend
- Attach JWT token to all API requests
- Implement pages and components from UI specs

---

## Specifications to Follow

### Core Specs
- @specs/overview.md
- @specs/features/task-crud.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md
- @specs/database/schema.md
- @specs/ui/pages.md
- @specs/ui/components.md

---

## API Requirements

Implement the following authenticated endpoints:

- GET    /api/{user_id}/tasks
- POST   /api/{user_id}/tasks
- GET    /api/{user_id}/tasks/{id}
- PUT    /api/{user_id}/tasks/{id}
- DELETE /api/{user_id}/tasks/{id}
- PATCH  /api/{user_id}/tasks/{id}/complete

### Security Rules
- All endpoints require a valid JWT token
- JWT must be passed via:
  Authorization: Bearer <token>
- Backend must extract user_id from JWT
- user_id in URL must match authenticated user
- Return 401 for missing/invalid token
- Return 403 for unauthorized access

---

## Authentication Flow (Mandatory)

1. User signs in via frontend (Better Auth)
2. Better Auth issues JWT token
3. Frontend attaches token to API requests
4. FastAPI verifies token using shared secret
5. Backend filters data by authenticated user_id
6. User can only access their own tasks

Shared secret must be read from:
- BETTER_AUTH_SECRET (environment variable)

---

## Database Rules

- Use Neon Serverless PostgreSQL
- Use SQLModel exclusively
- Tasks table must include user_id
- Enforce ownership in every query
- Never return data belonging to another user

---

## Frontend Rules

- Use Next.js App Router
- Use Server Components by default
- Client Components only when required
- API calls must go through a shared API client
- Handle loading, error, and auth states gracefully

---

## Deliverables

- Fully functional authenticated Todo web app
- REST API secured with JWT
- Persistent storage using Neon PostgreSQL
- Responsive frontend UI
- Specs remain source of truth

---

## Completion Criteria

Phase II is complete when:
- All CRUD operations work for authenticated users
- Users only see their own tasks
- JWT authentication is enforced everywhere
- Frontend and backend operate securely and independently

## Response snapshot

<!-- SYNC IMPACT REPORT:
Version change: N/A -> 1.0.0
Modified principles: N/A (new constitution)
Added sections: All principles and sections
Removed sections: None
Templates requiring updates: .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md ✅ updated
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Specification-Driven Development (NON-NEGOTIABLE)
All implementation must be driven by specifications; no manual coding is allowed without corresponding spec references. Every feature, endpoint, and functionality must originate from documented requirements in the official specs directory (@specs/). This ensures traceability, testability, and prevents scope creep.

### II. Full-Stack Architecture
Frontend (Next.js 16+ App Router) and Backend (FastAPI) must operate as independent, loosely coupled services connected via RESTful API. Frontend components use Server Components by default with Client Components only when required for interactivity. Backend handles all business logic and data persistence.

### III. Security-First Approach (NON-NEGOTIABLE)
Authentication and authorization must be implemented at every layer using Better Auth and JWT tokens. All API endpoints require valid JWT tokens passed via Authorization: Bearer <token> header. User data isolation is mandatory: each user can only access their own resources via user_id validation in both URL and JWT claims.

### IV. Test-First Implementation
All features must follow TDD approach: Tests written → Requirements validated → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. Both unit and integration tests required for API endpoints, authentication flows, and database operations.

### V. Database Integrity & User Isolation
Neon Serverless PostgreSQL with SQLModel must enforce user-task relationships through foreign key constraints. Every query must include user_id filtering to prevent unauthorized cross-user data access. Data consistency and referential integrity maintained through proper schema design.

### VI. Responsive & Accessible Frontend
UI must provide consistent experience across devices using responsive design principles. Loading, error, and authentication states must be handled gracefully. All components follow accessibility standards to ensure inclusive user experience.

## Technical Standards

Authentication Flow:
- User signs in via frontend (Better Auth)
- Better Auth issues JWT token
- Frontend attaches token to API requests
- FastAPI verifies token using shared secret from BETTER_AUTH_SECRET
- Backend filters data by authenticated user_id
- User can only access their own tasks

Database Rules:
- Use Neon Serverless PostgreSQL exclusively
- Use SQLModel for all database interactions
- Tasks table must include user_id for ownership tracking
- Enforce ownership in every query operation
- Never return data belonging to another user

Frontend Rules:
- Use Next.js App Router with file-based routing
- Server Components preferred over Client Components
- API calls must go through a shared API client library
- Proper error handling and user feedback mechanisms
- Support for authenticated and unauthenticated user states

API Requirements:
- Secure all endpoints with JWT authentication
- Implement CRUD operations: GET/POST/PUT/PATCH/DELETE for tasks
- Validate user_id in URL matches authenticated user from JWT
- Return appropriate HTTP status codes (401, 403, 200, etc.)

## Development Workflow

Spec-Driven Implementation:
- Follow Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement
- Always read and reference specs before implementation
- Use designated agents (Auth, Backend, DB, Frontend) according to their responsibilities
- Do not invent requirements not present in specs
- Update specs if conflicts or gaps are found during implementation

Quality Assurance:
- All code must pass linting and formatting checks
- Comprehensive test coverage required for all new features
- Code reviews mandatory for all pull requests
- Performance benchmarks maintained for critical operations

## Governance

This constitution supersedes all other development practices and serves as the ultimate authority for technical decisions. All implementation work must comply with these principles. Amendments require formal documentation, team approval, and migration planning. All pull requests and code reviews must verify constitutional compliance. Use the spec-first methodology for all development activities.

**Version**: 1.0.0 | **Ratified**: 2026-02-06 | **Last Amended**: 2026-02-06

## Outcome

- ✅ Impact: Updated project constitution with comprehensive principles for full-stack todo application development
- 🧪 Tests: N/A
- 📁 Files: Updated .specify/memory/constitution.md with version 1.0.0 constitution
- 🔁 Next prompts: Continue with spec development following constitution guidelines
- 🧠 Reflection: Constitution now properly defines security-first approach, spec-driven development, and full-stack architecture requirements

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin spec development based on constitution