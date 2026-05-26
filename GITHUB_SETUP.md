# GitHub Setup & Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and login
2. Click "New" button to create a new repository
3. Name it: `ai-chatbot`
4. Description: "Full-stack AI Chatbot with ChatGPT-like UI"
5. Choose public/private
6. Click "Create repository"

## Step 2: Push Your Code to GitHub

```bash
cd path/to/ai-chatbot

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Chatbot application"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy Frontend (Vercel)

### 3a. Create Vercel Account
1. Go to [vercel.com](https://vercel.com/signup)
2. Sign up with GitHub
3. Authorize Vercel to access your GitHub repositories

### 3b. Deploy Project
1. Click "New Project"
2. Select your `ai-chatbot` repository
3. Framework: **Vite**
4. Build Command: `cd frontend && npm install && npm run build`
5. Output Directory: `frontend/dist`
6. Install Command: `npm install`
7. Under "Environment Variables", add:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-api.herokuapp.com` (or your backend URL)
8. Click "Deploy"
9. Your app is now live at the Vercel domain!

### 3c. Set Custom Domain (Optional)
1. In Vercel dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as shown in Vercel

## Step 4: Deploy Backend (Render)

### 4a. Create Render Account
1. Go to [render.com](https://render.com/signup)
2. Sign up with GitHub
3. Authorize Render

### 4b. Deploy Backend Service
1. Click "New +" → "Web Service"
2. Select your `ai-chatbot` repository
3. Configure:
   - **Name**: `ai-chatbot-backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port 8000`
4. Click "Create Web Service"
5. Wait for deployment
6. Get your API URL (e.g., `https://ai-chatbot-backend.onrender.com`)

### 4c. Update Frontend API URL
1. Go to Vercel project settings
2. Go to Environment Variables
3. Update `VITE_API_URL` to your Render API URL
4. Vercel will auto-redeploy with the new URL

## Step 5: Enable GitHub Actions (CI/CD)

Your workflows are already set up! They will:
- Auto-deploy frontend on push to main
- Auto-deploy backend on changes to backend folder

### To enable automatic deploys:

1. **For Vercel:**
   - Already connected via GitHub account
   - Auto-deploys on push

2. **For Render:**
   - In Render dashboard, go to your service
   - Go to Settings → Notifications
   - Enable GitHub Deployment Notifications

## Step 6: GitHub Secrets Setup

Add these secrets to your GitHub repository for CI/CD:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click "New repository secret"
3. Add:

```
VERCEL_TOKEN = Your Vercel token (from vercel.com/account/tokens)
VERCEL_ORG_ID = Your Vercel organization ID
VERCEL_PROJECT_ID = Your project ID (from .vercel/project.json)
VITE_API_URL = Your backend API URL
RENDER_SERVICE_ID = Your Render service ID
RENDER_API_KEY = Your Render API key (from dashboard)
```

## Step 7: Update Frontend Configuration

Update `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## Step 8: CORS Configuration (Backend)

Your backend already handles CORS! The `CORSMiddleware` in `backend/main.py` allows all origins:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

For production, replace `"*"` with your Vercel domain:
```python
allow_origins=["https://yourdomain.vercel.app"],
```

## Step 9: Test Deployment

1. Open your Vercel URL in browser
2. Test sending a message
3. Check browser console (F12) for any errors
4. Check backend at `https://your-backend-url/docs`

## Step 10: Monitor & Logs

**Vercel Logs:**
- Dashboard → Select project → Deployments → Click latest → View logs

**Render Logs:**
- Dashboard → Select service → Logs tab

## Updating Your App

### To update after making changes:

```bash
# Make changes to your code

git add .
git commit -m "Add new feature"
git push origin main
```

Both Vercel and Render will automatically redeploy!

## Troubleshooting

### Frontend won't connect to backend
- Check CORS is enabled on backend
- Verify `VITE_API_URL` environment variable is correct
- Check browser console for actual error message

### Backend not responding
- Verify Render service is running (check Logs)
- Check if model is still loading (first deployment takes time)
- Test endpoint: `https://your-backend-url/docs`

### Deployment stuck
- Check workflow logs on GitHub: Actions tab
- Check service logs on Vercel/Render
- Restart service in provider dashboard

## Useful Links

- Vercel Documentation: https://vercel.com/docs
- Render Documentation: https://render.com/docs
- GitHub Actions: https://docs.github.com/en/actions
- Vite Guide: https://vitejs.dev/guide/
- FastAPI: https://fastapi.tiangolo.com/

---

**Your app is now deployed! 🚀**
