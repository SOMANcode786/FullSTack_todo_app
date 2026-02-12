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
