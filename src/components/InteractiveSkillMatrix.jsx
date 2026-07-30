import React, { useState } from "react";
import { Code, Cpu, Database, Zap, CheckCircle2 } from "lucide-react";

export default function InteractiveSkillMatrix() {
  const [activeCategory, setActiveCategory] = useState("AI & RAG");

  const skillData = {
    "AI & RAG": [
      { name: "Python 3.12", level: "95%", exp: "3+ Years • Core Backend & AI" },
      { name: "RAG Architecture", level: "94%", exp: "Multi-lingual Vector Retrieval" },
      { name: "FAISS Vector DB", level: "92%", exp: "Dense Indexing & Cosine Search" },
      { name: "EvalMesh & Ragas", level: "90%", exp: "RAG Evaluation & Guardrails" },
      { name: "OpenAI & Gemini APIs", level: "95%", exp: "Structured Prompt Engineering" }
    ],
    "Full Stack Web": [
      { name: "React 19 & Vite", level: "92%", exp: "SPA Architecture & Hooks" },
      { name: "FastAPI Backend", level: "92%", exp: "Async REST & SSE Endpoints" },
      { name: "TypeScript", level: "90%", exp: "Strict Static Typing" },
      { name: "Tailwind CSS", level: "95%", exp: "Custom Glassmorphism Systems" },
      { name: "WebSockets & SSE", level: "88%", exp: "Realtime Telemetry Streaming" }
    ],
    "Robotics & Systems": [
      { name: "ROS 2 Humble", level: "88%", exp: "SLAM Navigation & Path Nodes" },
      { name: "OpenCV & YOLO v8", level: "86%", exp: "Real-time Edge Vision (30 FPS)" },
      { name: "SQLite3 Database", level: "92%", exp: "Relational Schema & Persistence" },
      { name: "Python Tkinter", level: "94%", exp: "Desktop CRUD Management Apps" },
      { name: "Raspberry Pi & Arduino", level: "90%", exp: "Sensor Fusion & PID Motor Control" }
    ]
  };

  const categories = ["AI & RAG", "Full Stack Web", "Robotics & Systems"];
  const currentSkills = skillData[activeCategory];

  return (
    <div className="skill-matrix-card">
      <div className="matrix-header">
        <div>
          <span className="matrix-eyebrow">Engineering Matrix</span>
          <h3>Interactive Technical Proficiency</h3>
        </div>

        <div className="matrix-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`matrix-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="matrix-skills-grid">
        {currentSkills.map((s) => (
          <div key={s.name} className="skill-bar-row">
            <div className="skill-bar-info">
              <span className="skill-name">{s.name}</span>
              <span className="skill-level">{s.level}</span>
            </div>
            <div className="skill-progress-track">
              <div className="skill-progress-fill" style={{ width: s.level }}></div>
            </div>
            <span className="skill-exp">{s.exp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
