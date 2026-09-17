import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Copy, Check } from "lucide-react";
import { findSmartRecoveryMatch } from "../utils/smartRecovery.js";

/**
 * NotFoundPage — "Workshop Misfiled" (REF-404)
 * 
 * An authentic archive catalog artifact indicating a misfiled or missing reference
 * in Deswanth's Workshop index.
 */
export default function NotFoundPage({
  path = window.location.pathname,
  onNavigateHome,
  onNavigateProjects,
  onOpenCaseStudy
}) {
  const [copied, setCopied] = useState(false);
  const recoveryMatch = findSmartRecoveryMatch(path);

  useEffect(() => {
    document.title = "REF-404: Misfiled // Deswanth's Workshop";
    window.scrollTo(0, 0);
  }, []);

  const handleCopyPath = () => {
    navigator.clipboard.writeText(path).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const handleSmartRecovery = (projectId) => {
    if (onOpenCaseStudy) {
      onOpenCaseStudy(projectId);
    } else if (onNavigateProjects) {
      onNavigateProjects();
    } else if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <div className="workshop-root misfiled-page">
      {/* Masthead Header */}
      <header className="workshop-header">
        <div className="header-container">
          <div className="brand-group">
            <button
              onClick={onNavigateHome}
              className="brand-title brand-btn-reset"
              aria-label="Return to Deswanth's Workshop Home"
            >
              DESWANTH<span className="brand-accent-dot">.</span>
            </button>
            <span className="brand-badge">STUDIO // TIRUPATI, IN</span>
          </div>

          <div className="header-actions">
            <span className="misfiled-status-tag">STATUS // 404 NOT FOUND</span>
          </div>
        </div>
      </header>

      <main className="misfiled-main" id="main-content">
        <div className="misfiled-container">
          
          {/* Eyebrow & Reference Tag */}
          <div className="misfiled-eyebrow-row">
            <span className="misfiled-tag">[ DESWANTH'S WORKSHOP ]</span>
            <span className="misfiled-ref-badge">
              <span className="ref-plus" aria-hidden="true">+</span> REF-404
            </span>
          </div>

          {/* Structural Headline */}
          <div className="misfiled-title-block">
            <h1 className="misfiled-headline">MISFILED.</h1>
            <p className="misfiled-sub">
              This reference doesn't exist in the current workshop index.
            </p>
          </div>

          {/* Technical Reference Card (Authentic Metadata, Zero Fake Telemetry) */}
          <div className="misfiled-meta-card">
            <div className="meta-card-header">
              <span>CATALOG RECORD SPECIFICATION</span>
              <span className="meta-card-badge">INDEX REF: 404</span>
            </div>

            <div className="meta-grid">
              <div className="meta-row">
                <span className="meta-label">REQUESTED PATH</span>
                <div className="meta-path-wrap">
                  <samp className="meta-path-val" title={path}>{path}</samp>
                  <button
                    onClick={handleCopyPath}
                    className="meta-copy-btn"
                    title="Copy path to clipboard"
                    aria-label="Copy requested path"
                  >
                    {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                    <span>{copied ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
              </div>

              <div className="meta-row-split">
                <div className="meta-col">
                  <span className="meta-label">STATUS</span>
                  <data className="meta-data-val">404 / NOT FOUND</data>
                </div>

                <div className="meta-col">
                  <span className="meta-label">ARCHIVE</span>
                  <data className="meta-data-val">WORKSHOP INDEX</data>
                </div>

                <div className="meta-col">
                  <span className="meta-label">DISPOSITION</span>
                  <data className="meta-data-val text-accent">MISFILED RECORD</data>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Recovery Match (Only rendered when a high-confidence project match is found) */}
          {recoveryMatch && (
            <div className="misfiled-recovery-card" role="region" aria-label="Smart Recovery Suggestion">
              <div className="recovery-lead">
                <span className="recovery-tag">SMART ARCHIVE RECOVERY</span>
                <p className="recovery-text">
                  Did you mean to inspect <strong>{recoveryMatch.title}</strong>?
                </p>
              </div>

              <button
                onClick={() => handleSmartRecovery(recoveryMatch.id)}
                className="btn btn-primary recovery-btn"
                aria-label={`Inspect ${recoveryMatch.title} case study`}
              >
                <span>INSPECT REF-{recoveryMatch.number} // {recoveryMatch.title.toUpperCase()}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Workshop Archive Trace (Subtle catalog indicator showing the missing reference slot) */}
          <div className="misfiled-archive-trace" aria-hidden="true">
            <span className="trace-label">VERIFIED WORKSHOP REPOSITORY:</span>
            <div className="trace-slots">
              <span className="trace-item">01 // JANAI</span>
              <span className="trace-sep">•</span>
              <span className="trace-item">02 // ZEUS</span>
              <span className="trace-sep">•</span>
              <span className="trace-item">03 // SAGIRO</span>
              <span className="trace-sep">•</span>
              <span className="trace-item">04 // EVALMESH</span>
              <span className="trace-sep">•</span>
              <span className="trace-item">05 // SECURITY</span>
              <span className="trace-sep">•</span>
              <span className="trace-item">06 // STUDENT-DB</span>
              <span className="trace-sep">•</span>
              <span className="trace-item trace-missing">[ REF-404 // ? ]</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="misfiled-actions" aria-label="Recovery navigation">
            <button
              onClick={onNavigateHome}
              className="btn btn-primary btn-large"
              aria-label="Return to workshop overview"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>RETURN TO WORKSHOP</span>
            </button>

            <button
              onClick={onNavigateProjects}
              className="btn btn-secondary btn-large"
              aria-label="View documented projects"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </nav>

          {/* Quiet Documentation Footnote */}
          <div className="misfiled-footnote">
            <span className="footnote-code">// archive lookup returned no match</span>
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="workshop-footer">
        <div className="footer-container">
          <div className="footer-left">
            <strong>DESWANTH.DEV</strong>
            <span>SOFTWARE • PRODUCTS • SYSTEMS • EXPERIMENTS</span>
          </div>
          <div className="footer-right">
            <span>© 2026 K. DESWANTH • WORKSHOP ARCHIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
