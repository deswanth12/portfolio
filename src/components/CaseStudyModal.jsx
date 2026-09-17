import { useEffect } from "react";
import { X, ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div
      className="casestudy-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${data.title} Case Study`}
    >
      <div className="casestudy-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <header className="casestudy-header">
          <div>
            <div className="casestudy-meta-row">
              <span className="casestudy-num">{data.number}</span>
              <span className="casestudy-cat">{data.category}</span>
              <span className="casestudy-year">// {data.year}</span>
            </div>
            <h2 className="casestudy-main-title">{data.title}</h2>
            <p className="casestudy-subtitle">{data.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="casestudy-close-btn"
            aria-label="Close case study dialog"
          >
            <span className="close-label">CLOSE</span>
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="casestudy-body">
          <p className="casestudy-tagline">{data.tagline}</p>

          {/* Genuine Technical Attributes */}
          <div className="casestudy-metrics-grid">
            {data.metrics.map((m, idx) => (
              <div key={idx} className="metric-box">
                <span className="metric-label">{m.label}</span>
                <strong className="metric-val">{m.value}</strong>
              </div>
            ))}
          </div>

          {/* Problem Statement */}
          <section className="casestudy-section">
            <h3 className="section-subhead">01 / The Problem</h3>
            <p className="section-text">{data.problem}</p>
          </section>

          {/* Engineered Solution */}
          <section className="casestudy-section">
            <h3 className="section-subhead">02 / What Was Built</h3>
            <p className="section-text">{data.solution}</p>
          </section>

          {/* System Architecture Diagram */}
          <section className="casestudy-section">
            <h3 className="section-subhead">03 / System Architecture & Data Flow</h3>
            <div className="diagram-box">
              <pre><code>{data.architecture}</code></pre>
            </div>
          </section>

          {/* Technical Decisions */}
          {data.decisions && data.decisions.length > 0 && (
            <section className="casestudy-section">
              <h3 className="section-subhead">04 / Important Engineering Decisions</h3>
              <ul className="decisions-list">
                {data.decisions.map((dec, idx) => (
                  <li key={idx} className="decision-item">
                    <ArrowRight size={14} className="decision-arrow" aria-hidden="true" />
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Key Features */}
          <section className="casestudy-section">
            <h3 className="section-subhead">05 / Core Capabilities</h3>
            <ul className="features-list">
              {data.features.map((feat, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={15} className="feat-icon" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technologies */}
          <section className="casestudy-section">
            <h3 className="section-subhead">06 / Technologies</h3>
            <div className="tech-badge-cloud">
              {data.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <footer className="casestudy-footer">
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <FaGithub size={15} aria-hidden="true" /> View Source on GitHub
          </a>
          {data.demo && (
            <a
              href={data.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <ExternalLink size={15} aria-hidden="true" /> Live Demo / Repository
            </a>
          )}
        </footer>
      </div>
    </div>
  );
}
