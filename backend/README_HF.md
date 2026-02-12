---
title: Todo Backend API
emoji: 📝
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
license: mit
---

# Todo Backend API

A secure FastAPI backend for a multi-user Todo application with authentication.

## Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- ✅ CRUD operations for tasks
- 🗄️ PostgreSQL database support
- 📚 Auto-generated API documentation

## API Endpoints

- `GET /` - Health check
- `GET /health` - Detailed health status
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /tasks` - Get all tasks (authenticated)
- `POST /tasks` - Create task (authenticated)
- `PUT /tasks/{id}` - Update task (authenticated)
- `DELETE /tasks/{id}` - Delete task (authenticated)

## Documentation

Once deployed, visit:
- `/docs` - Swagger UI
- `/redoc` - ReDoc documentation

## Environment Variables

Configure these in Hugging Face Spaces settings:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `JWT_ALGORITHM` - JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time (default: 30)

## Tech Stack

- FastAPI
- SQLModel
- PostgreSQL
- JWT Authentication
- Uvicorn
