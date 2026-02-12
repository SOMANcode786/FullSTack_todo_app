# Quickstart Guide: Secure Authenticated Todo Backend

**Feature**: 002-todo-backend-auth
**Created**: 2026-02-06

## Prerequisites

- Python 3.9+
- Poetry or pip for dependency management
- Neon Serverless PostgreSQL database
- Better Auth configured for JWT generation

## Environment Setup

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Install Dependencies
Using Poetry:
```bash
poetry install
```

Or using pip:
```bash
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth
BETTER_AUTH_SECRET="your-better-auth-secret-key"

# Development
DEBUG=true
```

## Running the Application

### Development Mode
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode
```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Key Endpoints

Once running, the API will be available at `http://localhost:8000`:

- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get specific task
- `PUT /api/{user_id}/tasks/{id}` - Update task
- `DELETE /api/{user_id}/tasks/{id}` - Delete task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle completion status

## Authentication

All endpoints require JWT authentication in the form of:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

The JWT token must be obtained from Better Auth and must contain user identity information.

## Database Models

The application uses two main SQLModel entities:

### User Model
- id: UUID primary key
- email: Unique email address
- name: User's display name

### Task Model
- id: UUID primary key
- user_id: Foreign key to User
- title: Task title (1-200 chars)
- description: Optional description (max 1000 chars)
- completed: Boolean completion status
- created_at: Creation timestamp
- updated_at: Last update timestamp

## Configuration

### Main Settings Location
- `config.py`: Contains database URL, JWT secret, and other settings

### Database Connection
- `db.py`: Handles database connection and session management

### Authentication Settings
- `auth/jwt_handler.py`: JWT validation logic
- `auth/middleware.py`: Authentication middleware

## Running Tests

### Unit Tests
```bash
pytest tests/unit/
```

### Integration Tests
```bash
pytest tests/integration/
```

### All Tests
```bash
pytest
```

## Development Commands

### Database Migrations
```bash
# Run pending migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "migration message"
```

### Code Formatting
```bash
# Format code
black .

# Check linting
flake8 .
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Verify `DATABASE_URL` in environment variables
2. **JWT Validation Failed**: Ensure `BETTER_AUTH_SECRET` matches Better Auth configuration
3. **User Access Denied**: Verify JWT token contains correct user information and URL user_id matches JWT user_id
4. **Validation Errors**: Check request data matches API specification (title length, etc.)

### Logging
Application logs are available in the console during development. For production, configure logging in `config.py`.