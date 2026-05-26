# Quick Start Guide

## 🚀 Deploy in 5 Minutes

### For GitHub & Vercel/Render Deployment:

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot.git
git push -u origin main
```

2. **Deploy Frontend (Vercel):**
   - Visit https://vercel.com/new
   - Import your GitHub repo
   - Select `frontend/` as root
   - Add `VITE_API_URL` env variable
   - Click Deploy!

3. **Deploy Backend (Render):**
   - Visit https://render.com
   - Create new Web Service
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && uvicorn main:app --host 0.0.0.0 --port 8000`
   - Deploy!

4. **Update Frontend API URL:**
   - In Vercel, update environment variable with Render API URL

**Done! Your app is live! 🎉**

---

## 📋 Local Development

```bash
# Install everything
npm run setup

# Start dev server (both frontend & backend)
npm run dev

# Open browser to http://localhost:5173
```

---

## 🎨 Features

✅ ChatGPT-like dark UI  
✅ Sidebar with chat history  
✅ Real-time AI responses  
✅ Responsive design  
✅ Auto-scroll to messages  
✅ Example prompts  
✅ Typing indicator  

---

## 📁 File Structure

```
ai-chatbot/
├── frontend/          # React + Vite UI
├── backend/           # FastAPI + GPT-2
├── scripts/           # Setup scripts
├── DEPLOYMENT.md      # Detailed deployment guide
├── GITHUB_SETUP.md    # GitHub & Vercel setup
└── README.md          # Full documentation
```

---

## 🔗 Important Links

- **Vercel Signup:** https://vercel.com/signup
- **Render Signup:** https://render.com/signup
- **GitHub:** https://github.com/new

---

## ⚠️ Notes

- Backend takes 1-2 min to load GPT-2 model on first run
- Frontend auto-deploys on push to GitHub
- Backend API docs: `/docs` endpoint

**Questions? Check GITHUB_SETUP.md or DEPLOYMENT.md**
