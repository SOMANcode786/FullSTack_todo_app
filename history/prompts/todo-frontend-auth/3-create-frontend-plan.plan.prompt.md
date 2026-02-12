---
id: 3
title: Create Frontend Plan
stage: plan
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-frontend-auth
branch: 001-todo-frontend-auth
user: user
command: /sp.plan
labels: [plan, frontend, architecture, authentication]
links:
  spec: specs/001-todo-frontend-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-todo-frontend-auth/plan.md
  - specs/001-todo-frontend-auth/research.md
  - specs/001-todo-frontend-auth/data-model.md
  - specs/001-todo-frontend-auth/quickstart.md
  - specs/001-todo-frontend-auth/contracts/api.yaml
tests:
---

## Prompt

/sp.plan

Create:
- Frontend architecture sketch
- Section and folder structure
- Research approach
- Quality validation strategy

Decisions needing documentation:
- List important frontend decisions
- Include options considered and tradeoffs

Testing strategy:
- Validation checks based on frontend acceptance criteria

---

## Scope
Frontend ONLY

Backend, database, and auth verification logic are out of scope.
Frontend must integrate with existing API and Better Auth as defined in specs.

---

## Technical Details

- Use research-concurrent approach (research while planning, not all upfront)
- Follow APA citation style from Constitution when referencing external concepts
- Organize plan by phases:
  Research → Foundation → Analysis → Synthesis

---

## Phase 1: Research

### Objectives
- Understand UI/UX requirements from specs
- Understand authentication flow using Better Auth + JWT
- Understand API contracts and required headers

### Inputs
- @specs/overview.md
- @specs/ui/pages.md
- @specs/ui/components.md
- @specs/features/task-crud.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md
- /frontend/CLAUDE.md

### Research Questions
- Which pages require authentication?
- Which components must be Client Components?
- How JWT is accessed from Better Auth session?
- How API client should be structured for reuse?

---

## Phase 2: Foundation

### Architecture Sketch (Frontend)

- Next.js App Router
- Route-based layouts
- Auth-aware routing
- Centralized API client
- Reusable UI components

High-level flow:
User → Next.js UI → API Client → FastAPI Backend
JWT attached automatically via Better Auth session

### Folder Structure Plan

- /app
  - /login
  - /signup
  - /tasks
  - /tasks/new
  - /tasks/[id]
- /components
  - TaskCard
  - TaskForm
  - Navbar
  - ProtectedRoute
- /lib
  - api.ts
  - auth.ts
- /styles (if needed)

### Foundational Decisions

Decision 1: API Calls
- Option A: Direct fetch in components
- Option B: Central API client (chosen)
Tradeoff: Slight abstraction cost vs consistency and maintainability

Decision 2: Auth Handling
- Option A: Manual token storage
- Option B: Better Auth session-based JWT access (chosen)
Tradeoff: Less control vs higher security and simplicity

---

## Phase 3: Analysis

### Page-by-Page Responsibility Analysis

- /login, /signup
  - Public access
  - Better Auth integration
- /tasks
  - Auth required
  - Fetch and display user tasks
- /tasks/new
  - Auth required
  - Task creation form
- /tasks/[id]
  - Auth required
  - View, update, delete task

### Component Analysis
- Which components are reusable
- Which require client-side interactivity
- Which can remain server components

### Error & State Handling
- Loading states
- Empty task states
- API error feedback
- Auth expiration handling

---

## Phase 4: Synthesis

### Final Frontend Plan Output

- Clear page implementation order
- Component reuse strategy
- API integration pattern
- Auth protection strategy

### Quality Validation

Frontend is valid if:
- All required pages exist
- Auth redirects work correctly
- JWT is attached to every API request
- UI matches specs
- No backend logic exists in frontend

---

## Testing Strategy

### Acceptance-Based Validation

- Can unauthenticated user access protected routes? (Must fail)
- Can authenticated user see only their tasks?
- Do API requests include Authorization header?
- Do CRUD actions update UI correctly?
- Does UI remain responsive on mobile?

---

## Deliverable

A complete, documented frontend implementation plan ready for `/sp.task` breakdown and `/sp.implement` execution.

## Response snapshot

# Implementation Plan: Todo Frontend with Authentication

**Branch**: `001-todo-frontend-auth` | **Date**: 2026-02-06 | **Spec**: [specs/001-todo-frontend-auth/spec.md](specs/001-todo-frontend-auth/spec.md)
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement the complete frontend for a multi-user Todo web application using Next.js App Router. The frontend will integrate with Better Auth for user authentication and communicate with a FastAPI backend using JWT tokens. The application will provide full Task CRUD UI with responsive design and production-ready quality.

## Technical Context

**Language/Version**: TypeScript with Next.js 16+
**Primary Dependencies**: Next.js (App Router), Better Auth, Tailwind CSS, React
**Storage**: Browser storage for JWT tokens and session management
**Testing**: Jest/React Testing Library for component/unit testing
**Target Platform**: Web browsers (responsive design)
**Project Type**: Web application
**Performance Goals**: Pages load in under 2 seconds, API calls complete in under 1 second
**Constraints**: Responsive design from 320px to 1920px, <200ms p95 for user interactions
**Scale/Scope**: Single tenant per user, up to 1000 tasks per user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Specification-Driven Development**: All implementation will follow the documented spec requirements
- **Full-Stack Architecture**: Frontend will be independent from backend, communicating only via REST API
- **Security-First Approach**: Authentication through Better Auth with JWT, all API calls secured with authorization headers
- **Responsive & Accessible Frontend**: Mobile-first responsive design with proper accessibility considerations

## Project Structure

### Documentation (this feature)
```text
specs/001-todo-frontend-auth/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
```text
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── tasks/
│       ├── page.tsx
│       ├── new/
│       │   └── page.tsx
│       └── [id]/
│           └── page.tsx
├── components/
│   ├── TaskCard/
│   │   └── TaskCard.tsx
│   ├── TaskForm/
│   │   └── TaskForm.tsx
│   ├── Navbar/
│   │   └── Navbar.tsx
│   ├── ProtectedRoute/
│   │   └── ProtectedRoute.tsx
│   └── ui/
│       ├── Button/
│       ├── Input/
│       └── Card/
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── types.ts
├── styles/
│   └── globals.css
└── middleware.ts
```

**Structure Decision**: Single web application frontend using Next.js App Router structure. All frontend code is contained within the frontend directory with proper separation of concerns between pages, components, and utility functions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple nested routing | Required for proper task views | Flat routing would not support individual task pages |
| Client Components | Required for interactivity | Server Components alone cannot handle dynamic UI |

## Outcome

- ✅ Impact: Created comprehensive frontend implementation plan with architecture decisions and research
- 🧪 Tests: N/A (planning phase)
- 📁 Files: Created plan.md, research.md, data-model.md, quickstart.md, and contracts/api.yaml
- 🔁 Next prompts: Proceed to task breakdown with /sp.tasks
- 🧠 Reflection: Plan covers all frontend requirements with proper authentication and API integration strategy

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Break plan into actionable tasks with /sp.tasks