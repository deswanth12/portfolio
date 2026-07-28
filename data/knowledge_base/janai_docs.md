# JanAI — AI-Powered Civic Scheme Discovery Platform

## Overview
JanAI is an intelligent, multi-lingual AI-powered platform designed to empower citizens by automatically discovering, matching, and explaining government schemes, public benefits, and social assistance programs tailored to their specific demographic and socio-economic profile.

## Key Features & Capabilities
- **Intelligent Eligibility Matching**: Uses semantic vector search and rule-based AI reasoning to match citizen profiles with over 500+ central and state government schemes.
- **Multilingual Support**: Supports natural language querying in English, Hindi, Telugu, and other regional languages using localized LLM prompts and embeddings.
- **Document Guidance**: Provides step-by-step application walkthroughs, required document checklists, and nearest administrative office locators.
- **RAG Architecture**: Built with Retrieval-Augmented Generation to ensure all scheme details, eligibility criteria, and application links are strictly factual and cited directly from official government portals without hallucinations.

## Technology Stack
- **Frontend**: React.js, Tailwind CSS, Web Speech API for voice interactions.
- **Backend API**: Python FastAPI, Asynchronous task queues with Celery.
- **AI & RAG Engine**: LangChain / LlamaIndex, OpenAI GPT-4o / Gemini models, SentenceTransformers.
- **Vector Database**: Pinecone / FAISS for fast similarity indexing of scheme guidelines.
- **Data Ingestion**: Automated web scraping and PDF parsing pipeline for government gazettes and welfare portals.

## Impact & Vision
JanAI bridges the information asymmetry between citizens and public welfare programs, making government benefits accessible to non-technical users and rural communities through simple voice and chat interfaces.
