# 🤖 AI Chatbot - ChatGPT Style

A full-stack AI chatbot application with a modern ChatGPT-like interface. Built with React (Vite) for the frontend and FastAPI for the backend.

## Features

- 🎨 Modern ChatGPT-like dark UI with sidebar
- 💬 Real-time AI conversations using GPT-2
- 📱 Fully responsive design
- ⚡ Fast and lightweight (Vite + FastAPI)
- 🔄 Auto-scroll to latest messages
- 🎯 Example prompts for quick start

## Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3 (Dark Theme)

**Backend:**
- FastAPI
- Uvicorn
- Transformers (Hugging Face)
- PyTorch

## Getting Started Locally

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/ai-chatbot.git
cd ai-chatbot
```

2. **Install dependencies:**
```bash
npm run setup
```

3. **Start the application:**
```bash
npm run dev
```

This will start both the backend (http://localhost:8000) and frontend (http://localhost:5173).

### API Documentation
Visit `http://localhost:8000/docs` for interactive API documentation.

---

## Deployment

### Option 1: Deploy with Vercel (Recommended for Frontend)

**Frontend Deployment:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repository
4. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend API URL
6. Deploy!

### Option 2: Deploy with Render (For Backend)

**Backend Deployment:**

1. Create an account on [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port 8000`
   - Environment: Python 3.9
5. Add environment variables if needed
6. Deploy!

### Option 3: Deploy Both with Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add services:
   - **Frontend Service:**
     - Build Command: `cd frontend && npm install && npm run build`
     - Start Command: `npm run preview` or use Static Server
   - **Backend Service:**
     - Build Command: `cd backend && pip install -r requirements.txt`
     - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0`
5. Configure environment variables
6. Deploy!

### Option 4: Deploy with Docker (Any Cloud Provider)

**Create Dockerfile for Backend:**
```dockerfile
FROM python:3.9

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Create Dockerfile for Frontend:**
```dockerfile
FROM node:18 as build

WORKDIR /app

COPY frontend/package*.json .
RUN npm install
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Option 5: Deploy on GitHub Pages (Frontend Only)

1. Update `frontend/vite.config.js`:
```javascript
export default defineConfig({
  base: '/ai-chatbot/', // Replace with your repo name
  plugins: [react()],
})
```

2. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

3. Push to GitHub and the site will auto-deploy!

---

## Environment Variables

### Frontend (.env or during build)
```
VITE_API_URL=https://your-backend-api.com
```

### Backend (.env)
```
TRANSFORMERS_CACHE=/path/to/cache
```

---

## Scripts

```bash
# Setup everything
npm run setup

# Start development (frontend + backend)
npm run dev

# Build frontend for production
npm run build

# Preview production build
npm run preview

# Backend only
npm run backend

# Frontend only
npm run frontend
```

---

## Project Structure

```
ai-chatbot/
├── frontend/              # React Vite application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/              # FastAPI application
│   ├── main.py
│   └── requirements.txt
├── scripts/              # Setup scripts
├── deploy.py             # Deployment utility
└── README.md
```

---

## API Endpoints

### `GET /`
Health check endpoint
```json
{
  "message": "Backend Running",
  "status": "healthy"
}
```

### `POST /chat`
Send a message to the AI
```json
{
  "message": "Your message here"
}
```

Response:
```json
{
  "response": "AI generated response",
  "status": "success"
}
```

---

## Troubleshooting

**Port already in use:**
```bash
# Kill process on port 8000
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process
```

**CORS errors:**
- Backend already handles CORS. Check that API_URL in frontend matches backend URL.

**Model loading slow:**
- First run downloads GPT-2 model (~500MB). This is normal and happens only once.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

MIT License - feel free to use this project for personal or commercial use.

---

## Support

For issues and questions:
1. Check [GitHub Issues](https://github.com/YOUR_USERNAME/ai-chatbot/issues)
2. Create a new issue with details
3. Include environment info (OS, Node version, Python version)

---

## Quick Deploy Links

- **Vercel**: https://vercel.com/new
- **Render**: https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://www.heroku.com
- **PythonAnywhere**: https://www.pythonanywhere.com

---

**Made with ❤️ by AI Chatbot Team**
