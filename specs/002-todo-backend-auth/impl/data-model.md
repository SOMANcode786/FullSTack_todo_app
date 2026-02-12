# Data Model: Secure Authenticated Todo Backend

**Feature**: 002-todo-backend-auth
**Created**: 2026-02-06
**Status**: Complete

## Entity Definitions

### User Entity

**Description**: Represents an authenticated user account with basic identifying information.

**Fields**:
- `id`: UUID (Primary Key)
  - Type: UUID, auto-generated
  - Constraints: Primary key, not nullable, unique
  - Purpose: Unique identifier for each user
- `email`: String
  - Type: VARCHAR(255)
  - Constraints: Unique, not nullable
  - Purpose: User's email address for login and identification
- `name`: String
  - Type: VARCHAR(255)
  - Constraints: Not nullable
  - Purpose: User's display name

**Relationships**:
- One-to-many with Task entity via `tasks` relationship

**Validation Rules**:
- Email format validation
- Name minimum length requirement

### Task Entity

**Description**: Represents a todo item with title, description, completion status, and ownership information.

**Fields**:
- `id`: UUID (Primary Key)
  - Type: UUID, auto-generated
  - Constraints: Primary key, not nullable, unique
  - Purpose: Unique identifier for each task
- `user_id`: UUID (Foreign Key)
  - Type: UUID
  - Constraints: Foreign key to User.id, not nullable
  - Purpose: Links task to owning user
- `title`: String
  - Type: VARCHAR(200)
  - Constraints: Not nullable, length 1-200 characters
  - Purpose: Brief description of the task
- `description`: Text (Optional)
  - Type: TEXT
  - Constraints: Max length 1000 characters, nullable
  - Purpose: Detailed description of the task
- `completed`: Boolean
  - Type: BOOLEAN
  - Constraints: Default false, not nullable
  - Purpose: Tracks whether task is completed
- `created_at`: DateTime
  - Type: TIMESTAMP
  - Constraints: Not nullable, default now()
  - Purpose: Timestamp when task was created
- `updated_at`: DateTime
  - Type: TIMESTAMP
  - Constraints: Not nullable, default now()
  - Purpose: Timestamp when task was last updated

**Relationships**:
- Many-to-one with User entity via `user` relationship
- User has many Tasks

**Validation Rules**:
- Title length: 1-200 characters
- Description length: max 1000 characters
- Completed must be boolean value
- user_id must reference valid User

## State Transitions

### Task State Transitions

- **Initial State**: New task created with `completed = false`
- **Completion**: Task updated with `completed = true`
- **Reversion**: Completed task updated with `completed = false`

**Transition Rules**:
- Only task owner (user with matching user_id) can modify task state
- All modifications update the `updated_at` timestamp

## Database Schema

### Tables

#### users table
```
users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

#### tasks table
```
tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)
```

### Indexes

#### Primary Indexes
- `users_pkey` on users(id) - Primary key index
- `tasks_pkey` on tasks(id) - Primary key index

#### Foreign Key Indexes
- `tasks_user_id_idx` on tasks(user_id) - For user-specific queries

#### Performance Indexes
- `tasks_user_completed_idx` on (tasks.user_id, tasks.completed) - For filtered user queries
- `tasks_user_created_idx` on (tasks.user_id, tasks.created_at) - For chronological user queries

## Data Integrity Constraints

### Referential Integrity
- FOREIGN KEY constraint on tasks.user_id REFERENCES users.id
- ON DELETE CASCADE: When a user is deleted, their tasks are also deleted

### Validation Constraints
- tasks.title length: Check constraint ensuring 1-200 characters
- tasks.description length: Check constraint ensuring max 1000 characters

## Access Control Rules

### Ownership-Based Access
- Users can only create tasks for their own account
- Users can only read tasks associated with their account
- Users can only update tasks associated with their account
- Users can only delete tasks associated with their account

### Query Filtering
- All database queries must include WHERE clause filtering by user_id
- No direct access to tasks without user_id qualification

## Audit Trail

### Timestamp Tracking
- `created_at`: Automatically set when record is created
- `updated_at`: Automatically updated when record is modified
- Both fields are managed by the database/model layer, not application code

## Data Lifecycle

### Creation
1. User authenticates and gets validated JWT token
2. Task is created with user_id from JWT claims
3. created_at and updated_at are set automatically

### Modification
1. User must be authenticated and authorized
2. System validates user_id in JWT matches task's user_id
3. updated_at is updated automatically

### Deletion
1. User must be authenticated and authorized
2. System validates user_id in JWT matches task's user_id
3. Cascade delete handled by database foreign key constraint