# Quickstart Guide: Todo Frontend with Authentication

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Access to the backend API (FastAPI server)

### Environment Configuration
Create a `.env.local` file in the frontend root:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
BETTER_AUTH_SECRET=your-secret-key
```

### Installation Steps
1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Visit `http://localhost:3000` in your browser

## Key Architecture Components

### Directory Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   └── tasks/              # Task management pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and API client
│   ├── api.ts             # API client with JWT handling
│   └── auth.ts            # Authentication utilities
└── middleware.ts          # Route protection middleware
```

### Core Files to Implement

#### 1. API Client (`lib/api.ts`)
- Initialize with base URL from environment
- Automatically attach JWT from Better Auth session
- Handle error responses consistently
- Include loading states

#### 2. Authentication Wrapper (`components/ProtectedRoute/ProtectedRoute.tsx`)
- Check for valid session
- Redirect unauthenticated users to login
- Display loading state during auth check

#### 3. Page Implementations
- `/login/page.tsx` - Login form with Better Auth integration
- `/signup/page.tsx` - Signup form with Better Auth integration
- `/tasks/page.tsx` - Task listing with API integration
- `/tasks/new/page.tsx` - Task creation form
- `/tasks/[id]/page.tsx` - Task viewing/editing

## Development Workflow

### Page Development Order
1. Implement authentication pages (`/login`, `/signup`)
2. Create protected route component
3. Implement task listing page (`/tasks`)
4. Create task form component
5. Implement task creation page (`/tasks/new`)
6. Implement individual task page (`/tasks/[id]`)
7. Add complete/delete functionality

### Testing Endpoints
Each page should connect to the corresponding API endpoint:
- GET `/api/{user_id}/tasks` → `/tasks` page
- POST `/api/{user_id}/tasks` ← `/tasks/new` page
- GET `/api/{user_id}/tasks/{id}` → `/tasks/[id]` page
- PUT `/api/{user_id}/tasks/{id}` ← `/tasks/[id]` page
- DELETE `/api/{user_id}/tasks/{id}` ← `/tasks/[id]` page
- PATCH `/api/{user_id}/tasks/{id}/complete` ← Task toggle

## Important Considerations

### Authentication Flow
- Use Better Auth's `useSession` hook for client-side session checking
- Use `getServerSession` for server-side rendering with auth check
- Always attach `Authorization: Bearer <token>` header to API requests
- Handle token expiration gracefully

### Error Handling
- Display loading states during API calls
- Show error messages for failed requests
- Implement proper form validation
- Handle network errors gracefully

### Responsive Design
- Use Tailwind CSS responsive classes
- Test layouts on various screen sizes
- Ensure touch targets are accessible on mobile
- Maintain readability across devices

## Running Tests
```bash
npm test
# or for watch mode
npm run test:watch
```

## Building for Production
```bash
npm run build
npm run start
```