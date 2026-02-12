# 🚀 Deployment Guide - Todo Application

## Prerequisites
- GitHub account
- Vercel account (for frontend)
- Railway/Render account (for backend)
- Your Neon PostgreSQL database is already set up ✅

---

## 📦 Backend Deployment (Railway - Recommended)

### Step 1: Prepare Your Code

1. **Initialize Git Repository** (if not already done)
```bash
cd backend
git init
git add .
git commit -m "Initial commit"
```

2. **Create GitHub Repository**
- Go to https://github.com/new
- Create a new repository (e.g., "todo-backend")
- Don't initialize with README

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/todo-backend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Railway

1. **Sign up for Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `todo-backend` repository

3. **Configure Environment Variables**
   Click on your service → Variables → Add these:
   ```
   DATABASE_URL=your_neon_database_url
   NEON_DATABASE_URL=your_neon_database_url
   JWT_SECRET_KEY=your-secret-key-change-in-production
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   BETTER_AUTH_SECRET=your-better-auth-secret
   APP_NAME=Todo Backend API
   DEBUG=false
   ```

4. **Deploy**
   - Railway will automatically detect Python and deploy
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

---

## 🌐 Frontend Deployment (Vercel - Recommended)

### Step 1: Prepare Frontend

1. **Update API URL**
   Create/update `.env.local` in frontend directory:
   ```bash
   cd ../frontend
   ```

2. **Create `.env.local`**
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.railway.app
   ```

3. **Initialize Git**
```bash
git init
git add .
git commit -m "Initial commit"
```

4. **Create GitHub Repository**
- Go to https://github.com/new
- Create repository (e.g., "todo-frontend")
- Push code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/todo-frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Sign up for Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your `todo-frontend` repository

3. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variable**
   - Add `NEXT_PUBLIC_API_BASE_URL` with your Railway backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Your app will be live at `https://your-app.vercel.app`

---

## 🔧 Alternative: Deploy Backend on Render

### Step 1: Create Render Account
- Go to https://render.com
- Sign up with GitHub

### Step 2: Create Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: todo-backend
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 3: Add Environment Variables
Same as Railway (see above)

### Step 4: Deploy
- Click "Create Web Service"
- Copy your backend URL

---

## 🔐 Security Checklist

Before going live:

- [ ] Change `JWT_SECRET_KEY` to a strong random string
- [ ] Change `BETTER_AUTH_SECRET` to a strong random string
- [ ] Set `DEBUG=false` in production
- [ ] Update CORS settings in `main.py` to only allow your frontend domain
- [ ] Enable HTTPS (automatic on Railway/Vercel)
- [ ] Review database connection string security

---

## 🧪 Testing Your Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.railway.app/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Test Frontend**
   - Visit your Vercel URL
   - Try signup/login
   - Create a task
   - Verify everything works

---

## 📝 Update CORS for Production

Edit `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",  # Your production frontend
        "http://localhost:3000"  # Keep for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push to trigger redeployment.

---

## 🔄 Continuous Deployment

Both Railway and Vercel support automatic deployments:
- Push to `main` branch → Automatic deployment
- No manual steps needed after initial setup

---

## 💡 Quick Deploy Commands

**Backend:**
```bash
cd backend
git add .
git commit -m "Update backend"
git push origin main
```

**Frontend:**
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push origin main
```

---

## 🆘 Troubleshooting

### Backend Issues
- **500 Error**: Check Railway logs for errors
- **Database Connection**: Verify DATABASE_URL is correct
- **CORS Error**: Update allowed origins in main.py

### Frontend Issues
- **API Connection Failed**: Check NEXT_PUBLIC_API_BASE_URL
- **Build Failed**: Check for TypeScript/ESLint errors locally first
- **Environment Variables**: Make sure they're set in Vercel dashboard

---

## 📊 Monitoring

**Railway:**
- View logs: Project → Service → Logs
- Monitor usage: Project → Usage

**Vercel:**
- View deployments: Project → Deployments
- Check analytics: Project → Analytics

---

## 🎉 You're Live!

Your Todo app is now deployed and accessible worldwide!

**Backend**: https://your-backend.railway.app
**Frontend**: https://your-app.vercel.app

Share your app and enjoy! 🚀
