---
id: 2
title: Create Todo Frontend Spec
stage: spec
date: 2026-02-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: todo-frontend-auth
branch: 001-todo-frontend-auth
user: user
command: /sp.specify
labels: [spec, frontend, authentication, todo]
links:
  spec: specs/001-todo-frontend-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-todo-frontend-auth/spec.md
  - specs/001-todo-frontend-auth/checklists/requirements.md
tests:
---

## Prompt

/sp.specify

You are working in a Spec-Kit Plus monorepo using Claude Code.

## Scope
Frontend ONLY – Phase II Todo Full-Stack Web Application

Backend and database already exist or will be implemented later.
Do NOT implement backend or database logic.

---

## Objective

Implement the complete frontend for a multi-user Todo web application using Next.js App Router, following the provided specifications exactly.

Frontend must:
- Support authentication via Better Auth
- Communicate with FastAPI backend using JWT
- Provide full Task CRUD UI
- Be responsive and production-ready

---

## Rules (Very Important)

- Follow Spec-Kit workflow strictly
- Read specs before implementing
- Do NOT invent features
- Do NOT hardcode backend logic
- Do NOT bypass authentication
- All API calls must include JWT
- Use only frontend-related agents and skills

---

## Agents & Skills to Use

### Frontend Agent
Responsible for:
- Pages, layouts, routing
- UI structure
- API integration
- Auth-aware UI behavior

### Frontend Skill
Used for:
- Components
- Styling
- Responsive layouts
- State handling

---

## Specifications to Follow (Mandatory)

Read and reference these specs before implementation:

- @specs/overview.md
- @specs/ui/pages.md
- @specs/ui/components.md
- @specs/features/task-crud.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md
- /frontend/CLAUDE.md

---

## Frontend Tech Stack

- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth (frontend only)
- Fetch / API client abstraction

---

## Required Pages

Implement the following pages using App Router:

### Public Pages
- `/login`
- `/signup`

### Protected Pages (Require Auth)
- `/tasks` – list tasks
- `/tasks/new` – create task
- `/tasks/[id]` – view/update task

Unauthenticated users must be redirected to `/login`.

---

## Authentication Rules (Frontend)

- Use Better Auth for signup/signin
- Enable JWT issuance in Better Auth
- Store JWT securely (Better Auth session)
- Attach JWT token to ALL API requests:

Authorization: Bearer <token>

- Handle token expiration gracefully
- Logout must clear auth state

---

## API Integration Rules

- Backend base URL from environment variable
- API calls must match:
  @specs/api/rest-endpoints.md
- Never trust frontend-only validation
- Show loading, error, and empty states

---

## UI & UX Requirements

- Responsive (mobile-first)
- Clean and minimal UI
- Clear task status (completed / pending)
- Buttons for:
  - Create task
  - Edit task
  - Delete task
  - Toggle complete
- Feedback on actions (success/error)

---

## Component Rules

- Use reusable components
- Follow `/components` structure
- No inline styles
- Tailwind CSS only
- Use Server Components by default
- Client Components only when required

---

## State Management

- Minimal local state
- Auth state comes from Better Auth
- Task data fetched from backend
- No global state unless necessary

---

## Deliverables

Frontend is complete when:

- User can signup and login
- Authenticated user can:
  - Create task
  - View own tasks
  - Update task
  - Delete task
  - Mark task complete
- JWT is sent with every API request
- UI is responsive and clean
- No backend or DB code touched

---

## Completion Criteria

Frontend implementation is considered DONE when:
- All UI specs are implemented
- Auth flow works end-to-end (frontend side)
- API integration matches specs
- Code follows frontend CLAUDE.md rules

## Response snapshot

# Feature Specification: Todo Frontend with Authentication

**Feature Branch**: `001-todo-frontend-auth`
**Created**: 2026-02-06
**Status**: Draft
**Input**: User description: "Implement the complete frontend for a multi-user Todo web application using Next.js App Router, following the provided specifications exactly. Frontend must support authentication via Better Auth, communicate with FastAPI backend using JWT, provide full Task CRUD UI, and be responsive and production-ready."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Registration and Login (Priority: P1)

As a new user, I want to sign up for the todo application so that I can start managing my tasks.

**Why this priority**: Without authentication, users cannot access the core functionality of the application.

**Independent Test**: Can be fully tested by navigating to the signup page, creating an account, and verifying the user can login.

**Acceptance Scenarios**:

1. **Given** user is on the signup page, **When** user enters valid email and password and clicks signup, **Then** user is registered and redirected to login page
2. **Given** user has an account, **When** user enters correct credentials on login page, **Then** user is authenticated and redirected to tasks page

---

### User Story 2 - View and Manage Tasks (Priority: P1)

As an authenticated user, I want to create, view, edit, and delete my tasks so that I can organize my work effectively.

**Why this priority**: This is the core functionality of the todo application that users expect.

**Independent Test**: Can be fully tested by logging in and performing all CRUD operations on tasks.

**Acceptance Scenarios**:

1. **Given** user is logged in, **When** user navigates to tasks page, **Then** user sees their list of tasks
2. **Given** user is on tasks page, **When** user creates a new task, **Then** task appears in their task list
3. **Given** user has existing tasks, **When** user marks a task as complete, **Then** task is updated in the system
4. **Given** user has existing tasks, **When** user deletes a task, **Then** task is removed from their task list

---

### User Story 3 - Secure Session Management (Priority: P2)

As a user, I want my authentication state to be properly managed so that I remain logged in during my work session and am protected from unauthorized access.

**Why this priority**: Essential for security and good user experience to maintain sessions appropriately.

**Independent Test**: Can be fully tested by logging in, navigating between pages, and ensuring authentication is maintained or appropriately expired.

**Acceptance Scenarios**:

1. **Given** user is logged in, **When** user navigates to protected pages, **Then** user can access them without re-authenticating
2. **Given** user's JWT token expires, **When** user makes an API request, **Then** user is redirected to login page
3. **Given** user wants to logout, **When** user clicks logout button, **Then** authentication state is cleared and user is redirected to login page

---

### Edge Cases

- What happens when user tries to access protected pages without authentication?
- How does system handle network errors during API calls?
- What occurs when user's JWT token becomes invalid mid-session?
- How does the system behave when multiple tabs are open simultaneously?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide signup and login pages using Better Auth for user authentication
- **FR-002**: System MUST securely store JWT tokens obtained from Better Auth for API authentication
- **FR-003**: Users MUST be able to create new tasks through the `/tasks/new` page
- **FR-004**: System MUST display all tasks belonging to the authenticated user on the `/tasks` page
- **FR-005**: Users MUST be able to update task details on the `/tasks/[id]` page
- **FR-006**: Users MUST be able to delete tasks from the system
- **FR-007**: System MUST allow users to toggle task completion status
- **FR-008**: System MUST redirect unauthenticated users to login page when accessing protected routes
- **FR-009**: System MUST include JWT tokens in the Authorization header for all backend API calls
- **FR-010**: System MUST handle loading states during API operations
- **FR-011**: System MUST display appropriate error messages when API operations fail
- **FR-012**: System MUST have responsive design that works on mobile, tablet, and desktop devices

### Key Entities

- **User**: Represents a registered user with authentication credentials and session management
- **Task**: Represents a todo item with properties like title, description, completion status, and ownership tied to a user

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can register for an account in under 2 minutes
- **SC-002**: Authenticated users can create a new task in under 30 seconds
- **SC-003**: Task CRUD operations complete within 2 seconds on average
- **SC-004**: 95% of users can successfully authenticate without support intervention
- **SC-005**: 100% of users are redirected to login page when accessing protected content without authentication
- **SC-006**: The application maintains responsive design across screen sizes from 320px to 1920px width

## Outcome

- ✅ Impact: Created comprehensive frontend specification for todo application with authentication requirements
- 🧪 Tests: N/A (specification phase)
- 📁 Files: Created spec.md and requirements checklist in specs/001-todo-frontend-auth/
- 🔁 Next prompts: Proceed to planning phase with /sp.plan
- 🧠 Reflection: Specification covers all required functionality from user perspective with clear acceptance criteria

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin planning phase based on specification