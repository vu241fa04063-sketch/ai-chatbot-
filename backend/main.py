from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading GPT-2 model...")
generator = pipeline(
    "text-generation",
    model="gpt2"
)
print("Model loaded successfully!")

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Backend Running", "status": "healthy"}

@app.post("/chat")
def chat(data: ChatRequest):
    try:
        result = generator(
            data.message,
            max_length=100,
            num_return_sequences=1,
            temperature=0.7,
            top_p=0.9
        )
        return {
            "response": result[0]["generated_text"],
            "status": "success"
        }
    except Exception as e:
        return {
            "response": f"Error: {str(e)}",
            "status": "error"
        }

@app.get("/docs", tags=["Documentation"])
def docs():
    """API documentation"""
    return {"docs_url": "/docs", "redoc_url": "/redoc"}