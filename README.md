# 🚀 Full-Stack Todo Web Application  

![Status](https://img.shields.io/badge/Status-Phase%20II%20Complete-success?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Database](https://img.shields.io/badge/Database-PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![Auth](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![ORM](https://img.shields.io/badge/ORM-SQLModel-red?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Monorepo-blueviolet?style=for-the-badge)

---

## 🌐 Live Demo

🔗 **Frontend:**  
https://full-stack-todo-green.vercel.app  

🔗 **Backend API:**  

(https://huggingface.co/spaces/SomanAmir/todo_app)
---

## 🎥 Demo Preview

> Replace this with your demo GIF (record using ScreenToGif or Loom)

```html
<img src="demo.gif" width="100%" />
```

---

# 🧠 Project Overview

This project transforms a basic console Todo application into a secure, scalable, multi-user full-stack web platform using a modern spec-driven development workflow.

Built using:

- ⚡ Next.js (App Router)
- 🚀 FastAPI
- 🧩 SQLModel ORM
- ☁ Neon Serverless PostgreSQL
- 🔐 JWT Authentication (Better Auth)
- 🏗 Monorepo Architecture

---

# ✨ Core Features

### 🔐 Authentication
- User Signup & Signin
- JWT token issuance
- Secure API access with Bearer token

### 📋 Task Management
- Create Task
- View Tasks
- Update Task
- Delete Task
- Toggle Completion
- User-specific task isolation

### 🛡 Security
- Stateless JWT verification
- Shared secret validation
- Ownership enforced on every query
- 401 Unauthorized for invalid tokens

---

# 📡 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/{user_id}/tasks | List tasks |
| POST | /api/{user_id}/tasks | Create task |
| GET | /api/{user_id}/tasks/{id} | Get task |
| PUT | /api/{user_id}/tasks/{id} | Update task |
| DELETE | /api/{user_id}/tasks/{id} | Delete task |
| PATCH | /api/{user_id}/tasks/{id}/complete | Toggle completion |

All endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 🏗 Architecture

```
Client (Next.js)
        ↓
JWT Token (Authorization Header)
        ↓
FastAPI Backend
        ↓
SQLModel ORM
        ↓
Neon PostgreSQL Database
```

---

# 🗂 Monorepo Structure

```
hackathon-todo/
│
├── .spec-kit/
├── specs/
│   ├── features/
│   ├── api/
│   ├── database/
│   └── ui/
│
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Local Development

### Clone Repo
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Backend
```bash
cd backend
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

### Frontend
```
BETTER_AUTH_SECRET=your_secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend
```
DATABASE_URL=your_neon_postgres_url
BETTER_AUTH_SECRET=your_secret
```

---

# 📚 What I Learned

- Designing secure REST APIs
- JWT verification across services
- Monorepo organization for full-stack systems
- Spec-driven engineering
- AI-assisted development workflow

---

# 🚀 Phase Roadmap

- ✅ Phase I – Console App
- ✅ Phase II – Full-Stack Web App
- 🔜 Phase III – AI Chatbot Integration

---

# 👨‍💻 Author

**Muhammad Soman**  
Software Engineering Student  
Full-Stack Developer  

---

⭐ If you like this project, please consider giving it a star!
