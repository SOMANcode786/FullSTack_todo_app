# Todo Backend API

Production-ready FastAPI backend for Todo application with authentication and PostgreSQL database.

## Features
- JWT Authentication
- User-isolated task management
- PostgreSQL database with SQLModel
- RESTful API design
- Automatic API documentation

## Quick Start

### Local Development
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time

## API Documentation
- Swagger UI: `/docs`
- ReDoc: `/redoc`

## Deployment
See [DEPLOYMENT.md](../DEPLOYMENT.md) for deployment instructions.

## Tech Stack
- FastAPI
- SQLModel
- PostgreSQL (Neon)
- Pydantic
- Python 3.11+
