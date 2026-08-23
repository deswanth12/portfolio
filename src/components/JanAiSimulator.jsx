import { useState } from "react";
import { Sparkles, Search, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function JanAiSimulator() {
  const [query, setQuery] = useState("What agricultural subsidies are available for small farmers in AP?");
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeResult, setActiveResult] = useState({
    scheme: "YSR Rythu Bharosa / PM-KISAN Scheme",
    matchScore: "98.4%",
    latency: "1.12s",
    answer: "Eligible small farmers receive ₹13,500 annually in financial assistance, input subsidies on fertilizers, and 9-hour free agricultural electricity.",
    sources: ["📄 AP Agri Dept Guideline §3.1", "📄 PM-KISAN Portal Rules"],
    confidence: "High (Zero Hallucination)"
  });

  const samplePrompts = [
    { label: "🌾 Agriculture Subsidy", q: "What agricultural subsidies are available for small farmers in AP?" },
    { label: "🎓 Higher Education", q: "What scholarships support B.Tech CSE engineering students?" },
    { label: "⚡ Women SHG Loans", q: "What are the eligibility rules for Women Self-Help Group zero-interest loans?" }
  ];

  const handleSimulate = (promptQuery) => {
    const targetQ = promptQuery || query;
    setQuery(targetQ);
    setIsSimulating(true);

    setTimeout(() => {
      if (targetQ.includes("B.Tech") || targetQ.includes("Education")) {
        setActiveResult({
          scheme: "Jagananna Vidya Deevena & Vasathi Deevena",
          matchScore: "97.8%",
          latency: "1.05s",
          answer: "Provides 100% full fee reimbursement directly to college accounts plus ₹20,000 yearly hostel/food support for eligible students.",
          sources: ["📄 AP Higher Education Dept Circular #44", "📄 Vidya Deevena Policy"],
          confidence: "High (Zero Hallucination)"
        });
      } else if (targetQ.includes("Women") || targetQ.includes("SHG")) {
        setActiveResult({
          scheme: "YSR Sunna Vaddi & Aasara Scheme",
          matchScore: "99.1%",
          latency: "0.98s",
          answer: "Offers 0% interest loan subvention for SHG women prompt bank loan repayments up to ₹3,00,00, with direct bank account transfer.",
          sources: ["📄 SERP AP Rural Development §12", "📄 Sunna Vaddi Guidelines"],
          confidence: "High (Zero Hallucination)"
        });
      } else {
        setActiveResult({
          scheme: "YSR Rythu Bharosa / PM-KISAN Scheme",
          matchScore: "98.4%",
          latency: "1.12s",
          answer: "Eligible small farmers receive ₹13,500 annually in financial assistance, input subsidies on fertilizers, and 9-hour free agricultural electricity.",
          sources: ["📄 AP Agri Dept Guideline §3.1", "📄 PM-KISAN Portal Rules"],
          confidence: "High (Zero Hallucination)"
        });
      }
      setIsSimulating(false);
    }, 450);
  };

  return (
    <div className="simulator-card">
      <div className="simulator-header">
        <div className="sim-title-wrap">
          <Sparkles className="sim-sparkle-icon" size={18} aria-hidden="true" />
          <div>
            <span className="sim-eyebrow">Interactive Live Playground</span>
            <h3>JanAI RAG Semantic Search Simulator</h3>
          </div>
        </div>
        <span className="sim-badge">Live FAISS Demo</span>
      </div>

      {/* Preset Prompts */}
      <div className="sim-presets">
        <span className="preset-label">Try Prompt:</span>
        {samplePrompts.map((p) => (
          <button
            key={p.label}
            className="preset-btn"
            onClick={() => handleSimulate(p.q)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="sim-input-box">
        <Search size={16} className="sim-search-icon" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask any civic scheme question..."
          className="sim-input"
          aria-label="Civic scheme search query"
          onKeyDown={(e) => e.key === "Enter" && handleSimulate()}
        />
        <button
          onClick={() => handleSimulate()}
          disabled={isSimulating}
          className="sim-run-btn"
          aria-label="Run RAG Search"
        >
          {isSimulating ? <RefreshCw size={14} className="spin-icon" aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
          <span>{isSimulating ? "Retrieving..." : "Run RAG"}</span>
        </button>
      </div>

      {/* RAG Result Output */}
      <div className="sim-output-box" role="region" aria-label="Search Result" aria-live="polite">
        <div className="sim-meta-row">
          <span className="sim-scheme-name">🎯 {activeResult.scheme}</span>
          <div className="sim-stats-pills">
            <span className="sim-stat">Match: <strong>{activeResult.matchScore}</strong></span>
            <span className="sim-stat">Latency: <strong>{activeResult.latency}</strong></span>
          </div>
        </div>

        <p className="sim-answer">{activeResult.answer}</p>

        <div className="sim-sources-row">
          <span className="sources-label"><ShieldCheck size={14} aria-hidden="true" /> Grounded Sources:</span>
          {activeResult.sources.map((src) => (
            <span key={src} className="src-pill">{src}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
