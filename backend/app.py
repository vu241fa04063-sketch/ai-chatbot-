from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load conversation AI model
try:
    chatbot = pipeline("conversational", model="microsoft/DialoGPT-medium")
except Exception as e:
    print(f"Error loading model: {e}")
    chatbot = None

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"status": "Backend Running", "ai": "enabled" if chatbot else "loading"}

@app.post("/chat")
def chat(request: ChatRequest):
    if not chatbot:
        raise HTTPException(status_code=503, detail="AI model not loaded yet")
    
    try:
        response = chatbot(request.message)
        return {
            "response": response[0]["generated_text"] if response else "Sorry, I couldn't generate a response."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)