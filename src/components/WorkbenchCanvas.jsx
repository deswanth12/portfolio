import { useState } from "react";
import { Cpu, Terminal, Radio, Shield, Database, ArrowUpRight } from "lucide-react";

const ARTIFACTS = [
  {
    id: "zeus-spec",
    tag: "SPEC // ZEUS-02",
    title: "Zeus ROS 2 & LiDAR Architecture",
    category: "AUTONOMOUS HARDWARE",
    icon: Radio,
    specs: ["ROS 2 Humble", "RPLIDAR S2 (360°)", "Raspberry Pi 4 B", "Cartographer SLAM"],
    notes: "2D occupancy grid mapping executed locally on Ubuntu 22.04 LTS via 360° laser sweep triangulation, synchronized with wheel encoder odometry.",
    targetSection: "project-zeus",
    cta: "Examine Zeus Case Study"
  },
  {
    id: "janai-blueprint",
    tag: "BLUEPRINT // JANAI-01",
    title: "FAISS Semantic Retrieval Pipeline",
    category: "AI & VECTOR SEARCH",
    icon: Terminal,
    specs: ["FAISS Cosine Matrix", "FastAPI Asynchronous", "Grounded Context", "Regional Embeddings"],
    notes: "Direct vector chunking over official welfare circulars. Strict context boundaries refuse speculative prompts, driving deterministic source citation.",
    targetSection: "project-janai",
    cta: "Examine JanAI Case Study"
  },
  {
    id: "sagiro-ledger",
    tag: "LEDGER // SAGIRO-03",
    title: "Offline-First Transaction Engine",
    category: "LOCAL-FIRST MOBILE",
    icon: Database,
    specs: ["Android Native", "Room ORM / SQLite", "Deterministic Balance", "Zero SDK Trackers"],
    notes: "Every read and write transaction touches local SQLite synchronously. Cryptographic local backups with zero outbound network calls.",
    targetSection: "project-sagiro",
    cta: "Examine Sagiro Case Study"
  },
  {
    id: "evalmesh-bench",
    tag: "BENCHMARK // EVALMESH-04",
    title: "Ragas Guardrail Regression Rig",
    category: "EVALUATION HARNESS",
    icon: Shield,
    specs: ["Ragas Framework", "Context Precision", "Faithfulness Scoring", "Latency Telemetry"],
    notes: "Automated regression testing runs QA verification sets across prompt revisions, isolating retrieval precision from LLM generation errors.",
    targetSection: "project-evalmesh",
    cta: "Examine EvalMesh Case Study"
  },
  {
    id: "hardware-breadboard",
    tag: "DEV-RIG // LAB-HARDWARE",
    title: "ESP32 & IMU Sensor Fusion Module",
    category: "EMBEDDED SYSTEMS",
    icon: Cpu,
    specs: ["ESP32-WROOM-32", "MPU-6050 6-DOF IMU", "Differential PID", "UART Bridge"],
    notes: "Closed-loop motor velocity control running dedicated PID loops, passing serial odometry packets to the ROS 2 executor.",
    targetSection: "lab",
    cta: "Explore Lab Experiments"
  }
];

export default function WorkbenchCanvas({ onOpenCaseStudy }) {
  const [activeArtifact, setActiveArtifact] = useState(ARTIFACTS[0].id);

  const handleScrollTo = (targetId, artifactId) => {
    if (artifactId === "zeus-spec" && onOpenCaseStudy) {
      onOpenCaseStudy("zeus");
      return;
    }
    if (artifactId === "janai-blueprint" && onOpenCaseStudy) {
      onOpenCaseStudy("janai");
      return;
    }
    if (artifactId === "sagiro-ledger" && onOpenCaseStudy) {
      onOpenCaseStudy("sagiro");
      return;
    }
    if (artifactId === "evalmesh-bench" && onOpenCaseStudy) {
      onOpenCaseStudy("evalmesh");
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="workbench-container">
      <div className="workbench-grid">
        {ARTIFACTS.map((item) => {
          const Icon = item.icon;
          const isActive = activeArtifact === item.id;

          return (
            <article
              key={item.id}
              className={`workbench-specimen ${isActive ? "active" : ""}`}
              onMouseEnter={() => setActiveArtifact(item.id)}
              onClick={() => handleScrollTo(item.targetSection, item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleScrollTo(item.targetSection, item.id);
                }
              }}
              aria-label={`${item.title} artifact card`}
            >
              <div className="specimen-top">
                <span className="specimen-tag">{item.tag}</span>
                <span className="specimen-category">{item.category}</span>
              </div>

              <div className="specimen-body">
                <div className="specimen-icon-wrap">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className="specimen-title">{item.title}</h3>
                <p className="specimen-notes">{item.notes}</p>
              </div>

              <div className="specimen-specs">
                {item.specs.map((spec) => (
                  <span key={spec} className="spec-token">{spec}</span>
                ))}
              </div>

              <div className="specimen-footer">
                <span className="specimen-action">
                  {item.cta} <ArrowUpRight size={13} aria-hidden="true" />
                </span>
                <span className="specimen-corner-mark">+</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
