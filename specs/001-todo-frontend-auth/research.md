# Research: Todo Frontend with Authentication

## Research Questions & Findings

### 1. Authentication Flow with Better Auth + JWT

**Question**: How does Better Auth handle JWT tokens and session management?

**Findings**:
- Better Auth provides session management out-of-box
- JWT tokens can be accessed via `useSession` hook or server-side via `getServerSession`
- Token is automatically included in requests when using Better Auth's client methods
- For custom API calls, we need to extract the token from session and attach it manually

**Decision**: Use Better Auth's session system for JWT access and create an API client that automatically attaches the token to requests.

### 2. Pages Requiring Authentication

**Question**: Which pages require authentication?

**Findings** (from spec):
- Public pages: `/login`, `/signup`
- Protected pages: `/tasks`, `/tasks/new`, `/tasks/[id]`
- Unauthenticated users must be redirected to `/login`

**Decision**: Implement a ProtectedRoute component and middleware to handle authentication checking and redirects.

### 3. Client Components Requirements

**Question**: Which components require client-side interactivity?

**Findings**:
- Task toggling (complete/incomplete) requires client interaction before API call
- Form handling requires client state
- Loading states for API operations
- Error feedback displays
- Navigation events

**Decision**:
- Server Components: Layouts, static task lists, basic page structures
- Client Components: Interactive forms, task toggle buttons, loading indicators, navigation handlers

### 4. API Client Structure

**Question**: How should the API client be structured for reuse?

**Findings**:
- Centralized API client reduces duplication
- Automatic JWT attachment simplifies implementation
- Consistent error handling across the application
- Type safety improves developer experience

**Decision**: Create a centralized API client in `lib/api.ts` that automatically retrieves JWT from Better Auth session and attaches it to requests.

## Technology Decisions & Rationale

### Decision: Next.js App Router
- **Chosen**: Next.js App Router with file-based routing
- **Rationale**: Modern Next.js routing system, server components by default, built-in optimization
- **Alternatives considered**: Pages router - rejected in favor of newer App Router features

### Decision: Component Architecture
- **Chosen**: Server components by default, Client components only when required
- **Rationale**: Better performance, reduced bundle size, improved SEO
- **Alternatives considered**: Client components throughout - rejected for performance reasons

### Decision: State Management
- **Chosen**: Minimal local state, rely on Next.js data fetching and Better Auth for session
- **Rationale**: Reduces complexity, leverages Next.js caching and data fetching
- **Alternatives considered**: Global state management (Redux/Zustand) - rejected for simplicity

### Decision: Styling Approach
- **Chosen**: Tailwind CSS with utility-first approach
- **Rationale**: Consistent design, responsive by default, rapid development
- **Alternatives considered**: Styled-components/CSS Modules - rejected for consistency with Next.js ecosystem

### Decision: Error Handling
- **Chosen**: Next.js error boundaries with custom error components
- **Rationale**: Handles errors gracefully, maintains user experience
- **Alternatives considered**: Inline error handling - rejected for maintainability

## API Integration Patterns

### JWT Token Attachment
```typescript
// Extract token from Better Auth session and attach to API requests
const token = session.data?.user?.token || session.data?.token;
headers.Authorization = `Bearer ${token}`;
```

### Protected Route Implementation
- Higher-order component approach
- Middleware for server-side redirect
- Client-side session checking for immediate feedback

### Task CRUD Operations
- Follow REST API patterns defined in spec
- Consistent error handling
- Optimistic UI updates where appropriate
- Loading state management