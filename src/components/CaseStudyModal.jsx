import { useEffect } from "react";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { CASE_STUDIES } from "../data/caseStudies";

export default function CaseStudyModal({ caseStudyId, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && caseStudyId) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [caseStudyId, onClose]);

  if (!caseStudyId || !CASE_STUDIES[caseStudyId]) return null;

  const data = CASE_STUDIES[caseStudyId];

  return (
    <div className="casestudy-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={data.title}>
      <div className="casestudy-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="casestudy-header">
          <div>
            <span className="casestudy-category">{data.category}</span>
            <h2>{data.title}</h2>
          </div>
          <button onClick={onClose} className="casestudy-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="casestudy-body">
          <p className="casestudy-tagline">{data.tagline}</p>

          {/* Metrics Grid */}
          <div className="casestudy-metrics-grid">
            {data.metrics.map((m, idx) => (
              <div key={idx} className="metric-box">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Problem & Solution */}
          <div className="casestudy-section">
            <h3>Problem Statement</h3>
            <p>{data.problem}</p>
          </div>

          <div className="casestudy-section">
            <h3>Engineered Solution</h3>
            <p>{data.solution}</p>
          </div>

          {/* System Architecture Diagram */}
          <div className="casestudy-section">
            <h3>System Architecture & Data Flow</h3>
            <div className="diagram-box">
              <pre>{data.architecture}</pre>
            </div>
          </div>

          {/* Features List */}
          <div className="casestudy-section">
            <h3>Key Technical Features</h3>
            <ul className="features-list">
              {data.features.map((feat, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="feat-icon" aria-hidden="true" /> {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div className="casestudy-section">
            <h3>Technologies & Stack</h3>
            <div className="tech-badge-cloud">
              {data.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="casestudy-footer">
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <FaGithub size={16} aria-hidden="true" /> View Code on GitHub
          </a>
          <a
            href={data.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ExternalLink size={16} aria-hidden="true" /> Live Application Demo
          </a>
        </div>
      </div>
    </div>
  );
}
