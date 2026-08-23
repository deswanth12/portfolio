import { useState } from "react";
import { MessageSquare, Layers, Binary, Search, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function RagPipelineVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "1. Multilingual Query",
      icon: MessageSquare,
      desc: "User inputs query in natural English or regional language via text or Web Speech API.",
      detail: "Input: 'Am I eligible for agricultural loan subsidy in Andhra Pradesh?'"
    },
    {
      id: 1,
      title: "2. Query Normalizer",
      icon: Layers,
      desc: "Normalizes language tags, removes stop words, and formats search tokens.",
      detail: "Output: Tokenized vector query parameters [agriculture, loan, subsidy, AP]"
    },
    {
      id: 2,
      title: "3. Vector Embedding",
      icon: Binary,
      desc: "Generates high-dimensional vector embeddings for dense semantic matching.",
      detail: "1536-dimensional vector representation produced via embedding model."
    },
    {
      id: 3,
      title: "4. FAISS Semantic Search",
      icon: Search,
      desc: "Cosine distance matrix search across 500+ pre-indexed official scheme documents.",
      detail: "Top-K = 3 relevant scheme policy chunks retrieved in < 120ms."
    },
    {
      id: 4,
      title: "5. Grounded Context",
      icon: ShieldCheck,
      desc: "Applies strict context boundary prompt to prevent LLM hallucinations.",
      detail: "EvalMesh Guardrail Verification: Context Precision 96%, Zero Ungrounded Statements."
    },
    {
      id: 5,
      title: "6. Answer + Source Citation",
      icon: CheckCircle2,
      desc: "Produces verified answer with official scheme source links & document checklist.",
      detail: "Final Output + Cited Source Badges: [📄 Rythu Bharosa Scheme Policy Guideline §4.2]"
    }
  ];

  return (
    <div className="rag-visualizer-card">
      <div className="rag-vis-header">
        <div>
          <span className="eyebrow-vis">Interactive Architecture</span>
          <h3>JanAI & EvalMesh — RAG Pipeline Flow</h3>
        </div>
        <span className="vis-badge">RAG Latency: 1.2s</span>
      </div>

      {/* Steps Track */}
      <div className="rag-vis-steps-track" role="tablist" aria-label="RAG Architecture Steps">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStep;

          return (
            <button
              key={step.id}
              role="tab"
              aria-selected={isActive}
              className={`rag-vis-step-btn ${isActive ? "active" : ""}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className="vis-icon-wrap">
                <Icon size={16} aria-hidden="true" />
              </div>
              <span className="vis-step-title">{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Interactive Detail Card */}
      <div className="rag-vis-detail-box" role="tabpanel">
        <div className="detail-step-header">
          <h4>{steps[activeStep].title}</h4>
          <span className="step-counter">Step {activeStep + 1} of 6</span>
        </div>
        <p className="detail-desc">{steps[activeStep].desc}</p>
        <div className="detail-code-box">
          <code>{steps[activeStep].detail}</code>
        </div>
      </div>
    </div>
  );
}
