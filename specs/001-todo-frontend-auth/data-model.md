# Data Model: Todo Frontend with Authentication

## Entity Definitions

### User
Represents a registered user with authentication credentials and session management

**Attributes**:
- id: string (unique identifier)
- email: string (email address for login)
- createdAt: Date (account creation timestamp)
- updatedAt: Date (last modification timestamp)

**Relationships**:
- Has many: tasks (one user owns multiple tasks)

**Validation**:
- Email must be valid email format
- Email must be unique

### Task
Represents a todo item with properties like title, description, completion status, and ownership tied to a user

**Attributes**:
- id: string (unique identifier)
- title: string (task title, required)
- description: string (optional task details)
- completed: boolean (completion status, default: false)
- userId: string (foreign key to user)
- createdAt: Date (task creation timestamp)
- updatedAt: Date (last modification timestamp)

**Relationships**:
- Belongs to: user (task owned by single user)

**State Transitions**:
- pending → completed (when user marks task complete)
- completed → pending (when user unmarks task)

**Validation**:
- Title must not be empty
- userId must correspond to existing user
- completed must be boolean

## API Contract Requirements

### User Authentication Endpoints
- POST `/api/auth/signup` - User registration
- POST `/api/auth/signin` - User login
- POST `/api/auth/signout` - User logout

### Task CRUD Endpoints
- GET `/api/{user_id}/tasks` - Retrieve user's tasks
- POST `/api/{user_id}/tasks` - Create new task for user
- GET `/api/{user_id}/tasks/{id}` - Retrieve specific task
- PUT `/api/{user_id}/tasks/{id}` - Update task details
- DELETE `/api/{user_id}/tasks/{id}` - Delete task
- PATCH `/api/{user_id}/tasks/{id}/complete` - Toggle completion status

### Authentication Headers
- All endpoints require `Authorization: Bearer <token>` header
- JWT token obtained from Better Auth session

## Frontend Data Flow

### Authentication Flow
1. User enters credentials on login/signup form
2. Better Auth handles authentication
3. Session is established with JWT token
4. JWT is automatically included in API requests

### Task Management Flow
1. User navigates to tasks page
2. Frontend requests user's tasks from `/api/{user_id}/tasks`
3. JWT is attached to request
4. Backend validates user identity and returns user's tasks
5. Tasks are displayed in UI
6. User modifies task (create/update/delete/complete)
7. Frontend sends request to corresponding API endpoint
8. Backend validates user ownership and processes request

## Client-Side Validation
- Email format validation on signup/login
- Task title required validation on creation/update
- Form submission disabled during loading states
- Error messages displayed for validation failures