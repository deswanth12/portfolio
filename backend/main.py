import asyncio
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Optional
try:
    from backend.rag_engine import RAGEngine
except ImportError:
    from rag_engine import RAGEngine

app = FastAPI(
    title="Ask My Portfolio RAG API",
    description="Backend RAG service for K Deswanth's Portfolio Chatbot",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Engine
rag_engine = RAGEngine()

class ChatRequest(BaseModel):
    query: str
    history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    retrieved_chunks_count: int

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Ask My Portfolio RAG API",
        "indexed_chunks": len(rag_engine.chunks),
        "is_indexed": rag_engine.is_indexed
    }

@app.post("/api/index")
def trigger_indexing():
    rag_engine.build_index()
    return {
        "status": "success",
        "message": f"Successfully re-indexed {len(rag_engine.chunks)} chunks."
    }

@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    result = rag_engine.generate_rag_response(request.query)
    return result

@app.post("/api/chat/stream")
async def chat_stream_endpoint(request: ChatRequest):
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
        
    result = rag_engine.generate_rag_response(request.query)
    full_answer = result["answer"]
    sources = result["sources"]

    async def event_generator():
        # First send sources metadata event
        meta_event = {
            "type": "meta",
            "sources": sources,
            "chunks_count": result["retrieved_chunks_count"]
        }
        yield f"data: {json.dumps(meta_event)}\n\n"
        await asyncio.sleep(0.05)

        # Stream answer tokens/words
        words = full_answer.split(" ")
        for i, word in enumerate(words):
            chunk_event = {
                "type": "token",
                "token": word + (" " if i < len(words) - 1 else "")
            }
            yield f"data: {json.dumps(chunk_event)}\n\n"
            await asyncio.sleep(0.03)

        # Final done event
        done_event = {"type": "done"}
        yield f"data: {json.dumps(done_event)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
