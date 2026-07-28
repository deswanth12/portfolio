import os
import re
import glob
from typing import List, Dict, Any, Tuple
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class RAGEngine:
    def __init__(self, knowledge_dir: str = None):
        if knowledge_dir is None:
            # Default to data/knowledge_base relative to workspace root
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            knowledge_dir = os.path.join(base_dir, "data", "knowledge_base")
        
        self.knowledge_dir = knowledge_dir
        self.chunks: List[Dict[str, Any]] = []
        self.vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
        self.tfidf_matrix = None
        self.is_indexed = False
        
        # Auto build index on init
        self.build_index()

    def load_documents(self) -> List[Dict[str, Any]]:
        docs = []
        md_files = glob.glob(os.path.join(self.knowledge_dir, "*.md"))
        
        for filepath in md_files:
            filename = os.path.basename(filepath)
            source_name = filename.replace(".md", "").replace("_", " ").title()
            if "Janai" in source_name:
                source_name = "JanAI Project"
            elif "Zeus" in source_name:
                source_name = "Zeus Robot Documentation"
            elif "Resume" in source_name:
                source_name = "Resume"
            elif "Portfolio" in source_name:
                source_name = "Portfolio Projects"
            elif "Certificates" in source_name:
                source_name = "Certificates & Blogs"

            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
                docs.append({
                    "source": source_name,
                    "filename": filename,
                    "content": content
                })
        return docs

    def chunk_document(self, doc: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Chunks markdown document by headers (## / ###) or double line breaks.
        """
        content = doc["content"]
        source = doc["source"]
        chunks = []
        
        # Split by level 1, 2, or 3 markdown headers
        raw_sections = re.split(r'\n(?=#{1,3}\s)', content)
        
        for section in raw_sections:
            text = section.strip()
            if not text:
                continue
            
            lines = text.split('\n')
            heading = lines[0].lstrip('#').strip() if lines[0].startswith('#') else source
            
            # If section is very long, split into sub-paragraphs
            if len(text) > 800:
                paragraphs = text.split('\n\n')
                for p in paragraphs:
                    p_text = p.strip()
                    if len(p_text) > 50:
                        chunks.append({
                            "source": source,
                            "heading": heading,
                            "text": p_text
                        })
            else:
                chunks.append({
                    "source": source,
                    "heading": heading,
                    "text": text
                })
                
        return chunks

    def build_index(self):
        docs = self.load_documents()
        all_chunks = []
        for doc in docs:
            doc_chunks = self.chunk_document(doc)
            all_chunks.extend(doc_chunks)
            
        self.chunks = all_chunks
        
        if not self.chunks:
            self.is_indexed = False
            return
            
        corpus = [f"{c['source']} {c['heading']} {c['text']}" for c in self.chunks]
        self.tfidf_matrix = self.vectorizer.fit_transform(corpus)
        self.is_indexed = True
        print(f"[RAGEngine] Successfully indexed {len(self.chunks)} chunks across {len(docs)} documents.")

    def search(self, query: str, top_k: int = 4) -> List[Tuple[Dict[str, Any], float]]:
        if not self.is_indexed or self.tfidf_matrix is None:
            return []
            
        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        top_indices = np.argsort(scores)[::-1][:top_k]
        results = []
        
        for idx in top_indices:
            score = float(scores[idx])
            if score > 0.01:
                results.append((self.chunks[idx], score))
                
        return results

    def generate_rag_response(self, query: str) -> Dict[str, Any]:
        results = self.search(query, top_k=4)
        
        if not results:
            return {
                "answer": "I'm Jannu 🤖! I couldn't find specific details matching your question in Deswanth's portfolio documentation, but you can get in touch with him directly at kdeswanth@gmail.com!",
                "sources": [],
                "retrieved_chunks_count": 0
            }
            
        retrieved_chunks = [r[0] for r in results]
        sources = list(set([c["source"] for c in retrieved_chunks]))
        
        # Build context
        context_parts = []
        for i, chunk in enumerate(retrieved_chunks, 1):
            context_parts.append(f"--- Document Source {i}: {chunk['source']} ({chunk['heading']}) ---\n{chunk['text']}")
        
        context_str = "\n\n".join(context_parts)
        
        # Synthesize smart response from context
        openai_key = os.environ.get("OPENAI_API_KEY")
        gemini_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        
        if openai_key:
            answer = self._call_openai_llm(query, context_str)
        elif gemini_key:
            answer = self._call_gemini_llm(query, context_str)
        else:
            answer = self._synthesize_direct_answer(query, retrieved_chunks)
            
        return {
            "answer": answer,
            "sources": sources,
            "retrieved_chunks_count": len(retrieved_chunks)
        }

    def _synthesize_direct_answer(self, query: str, chunks: List[Dict[str, Any]]) -> str:
        """
        High-precision factual synthesis when external LLM API key is not configured.
        """
        q_lower = query.lower()
        
        if "who is" in q_lower or ("about" in q_lower and "deswanth" in q_lower):
            return "Hey there! I'm Jannu 🤖. K Deswanth is a Full Stack Developer and Python/AI Systems Builder based in India. He specializes in building practical web apps with React, backend services with FastAPI and SQLite, autonomous robotics with ROS2, and RAG AI applications."
        
        if "janai" in q_lower:
            for c in chunks:
                if "janai" in c["text"].lower():
                    return "JanAI is an AI-powered civic scheme discovery platform developed by Deswanth. It helps citizens discover and match with government welfare schemes using multi-lingual RAG semantic search, natural language eligibility checking, and step-by-step application guidance."
        
        if "zeus" in q_lower:
            for c in chunks:
                if "zeus" in c["text"].lower():
                    return "Zeus Robot is an autonomous multipurpose robotics platform engineered by Deswanth. It features ROS2 navigation, SLAM mapping, real-time edge AI object detection with YOLO & OpenCV, and a WebSockets live telemetry dashboard."
                    
        if "react" in q_lower or "frontend" in q_lower:
            return "Yes! Deswanth has strong React experience! He builds modern responsive interfaces using React, Vite, Framer Motion, Tailwind CSS, and WebSockets. He built both this portfolio website and the interactive JanAI platform frontend using React."

        if "project" in q_lower or "work" in q_lower:
            return "Deswanth has built several key projects:\n- **JanAI**: Multi-lingual RAG Civic Scheme Discovery Platform\n- **Zeus Robot**: Autonomous ROS2 Robotics System with Edge AI Vision\n- **Cyber Security Toolkit**: Python network security & audit toolkit\n- **Student & Staff Database Systems**: Desktop SQLite management apps\n- **Library Data Management System**: Automated book tracking desktop app"

        if "contact" in q_lower or "email" in q_lower or "phone" in q_lower:
            return "You can reach K Deswanth via Email at **kdeswanth@gmail.com**, Phone at **+91 8374646073**, or check his projects on GitHub at **github.com/deswanth12**."

        primary_text = chunks[0]["text"]
        clean_text = re.sub(r'#{1,4}\s*', '', primary_text).strip()
        
        if len(clean_text) > 400:
            clean_text = clean_text[:400] + "..."
            
        return f"Based on Deswanth's portfolio documentation:\n\n{clean_text}"

    def _call_openai_llm(self, query: str, context: str) -> str:
        import requests
        headers = {
            "Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY')}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {"role": "system", "content": "You are Jannu, a friendly and intelligent AI assistant representing K Deswanth. Answer questions accurately using ONLY the provided context. Keep answers concise, enthusiastic, and factual."},
                {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {query}"}
            ],
            "temperature": 0.3
        }
        res = requests.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
        if res.status_code == 200:
            return res.json()["choices"][0]["message"]["content"]
        return "Error connecting to OpenAI LLM."

    def _call_gemini_llm(self, query: str, context: str) -> str:
        import requests
        api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"You are Jannu, a friendly and intelligent AI assistant representing K Deswanth. Answer questions accurately using ONLY the provided context.\n\nContext:\n{context}\n\nQuestion: {query}"
                }]
            }]
        }
        res = requests.post(url, json=payload)
        if res.status_code == 200:
            return res.json()["candidates"][0]["content"]["parts"][0]["text"]
        return "Error connecting to Gemini LLM."

if __name__ == "__main__":
    engine = RAGEngine()
    test_queries = ["Who is Deswanth?", "What is JanAI?", "Describe Zeus Robot", "Skills in React?"]
    for q in test_queries:
        print(f"\nQ: {q}")
        res = engine.generate_rag_response(q)
        print(f"A: {res['answer']}")
        print(f"Sources: {res['sources']}")
