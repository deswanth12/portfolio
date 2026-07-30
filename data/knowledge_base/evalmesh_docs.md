# EvalMesh — AI Evaluation & RAG Benchmarking Framework

## Overview
EvalMesh is an automated evaluation, benchmarking, and guardrails framework designed by K Deswanth to measure LLM accuracy, RAG retrieval precision, hallucination rates, latency, and prompt regression testing across AI models.

## Key Features & Capabilities
- **RAG & Retrieval Evaluation**: Evaluates vector search relevance, context recall, context precision, and ground-truth faithfulness for RAG pipelines.
- **Hallucination & Guardrails Detection**: Real-time evaluation metrics to detect ungrounded model outputs and enforce safety guardrails.
- **Prompt Regression Testing**: Automated test suites for evaluating prompt changes across multiple model providers (OpenAI, Gemini, Groq, Ollama).
- **Latency & Throughput Metrics**: Tracks token generation speed, time-to-first-token (TTFT), and API latency across LLM endpoints.
- **Visual Benchmark Dashboard**: Interactive dashboard for visualizing evaluation scores, radar charts, and comparative performance metrics.

## Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Recharts / Chart.js for metric visualization.
- **Backend API**: Python FastAPI, Asynchronous evaluation runner.
- **Evaluation Engine**: Ragas, PyTest, NumPy, Pandas, Scikit-Learn, OpenAI / Gemini APIs.
- **Database & Storage**: SQLite / PostgreSQL for storing evaluation runs and benchmark history.

## Impact & Use Case
EvalMesh ensures AI applications and RAG systems deliver verifiable accuracy, zero hallucinations, and consistent response quality before deploying to production.
