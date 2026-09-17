import { useState, useEffect, useRef, lazy, Suspense } from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  Terminal as TerminalIcon,
  Search,
  Download,
  Mail
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CASE_STUDIES } from "./data/caseStudies";

import WorkbenchCanvas from "./components/WorkbenchCanvas";
import ProjectIndexTracker from "./components/ProjectIndexTracker";
import SoundEffects from "./components/SoundEffects";
import JannuLauncher from "./components/JannuLauncher";

import ZeusVisualizer from "./components/ZeusVisualizer";
import JanAiSimulator from "./components/JanAiSimulator";
import InteractiveCodeViewer from "./components/InteractiveCodeViewer";

// Modals lazy-loaded for zero initial bundle overhead
const CaseStudyModal = lazy(() => import("./components/CaseStudyModal"));
const AskMyPortfolio = lazy(() => import("./components/AskMyPortfolio"));
const CommandMenu = lazy(() => import("./components/CommandMenu"));
const TerminalModal = lazy(() => import("./components/TerminalModal"));

const profileImg = "/profile.jpeg";

const PROJECT_LIST = [
  {
    ...CASE_STUDIES.janai,
    domId: "project-janai",
    visualType: "architecture",
    image: "/assets/cybertoolkit.png"
  },
  {
    ...CASE_STUDIES.zeus,
    domId: "project-zeus",
    visualType: "hardware",
    image: "/assets/cybertoolkit.png"
  },
  {
    ...CASE_STUDIES.sagiro,
    domId: "project-sagiro",
    visualType: "mobile",
    image: "/assets/cybertoolkit.png"
  },
  {
    ...CASE_STUDIES.evalmesh,
    domId: "project-evalmesh",
    visualType: "benchmark",
    image: "/assets/cybertoolkit.png"
  },
  {
    ...CASE_STUDIES["security-toolkit"],
    domId: "project-security",
    visualType: "terminal",
    image: "/assets/cybertoolkit.png"
  },
  {
    ...CASE_STUDIES["student-db"],
    domId: "project-student-db",
    visualType: "desktop",
    image: "/assets/student.png"
  }
];

const TIMELINE_ENTRIES = [
  {
    year: "2026",
    title: "Autonomous Robotics & Production RAG",
    summary: "Built JanAI for citizen welfare discovery, Sagiro offline-first finance ledger, Zeus ROS 2 SLAM robotics platform, and EvalMesh AI evaluation suites."
  },
  {
    year: "2025",
    title: "Full-Stack Web & Systems Engineering",
    summary: "Focused on high-performance React applications, asynchronous FastAPI microservices, network security tooling, and edge IoT computing."
  },
  {
    year: "2024",
    title: "Diploma Projects & Desktop Database Systems",
    summary: "Constructed offline desktop applications using Python Tkinter and SQLite. Studied Android architecture and computational structures."
  },
  {
    year: "2023",
    title: "Foundations & Code Craft",
    summary: "Wrote first production scripts in Python, explored algorithms, computational mathematics, and Linux environments."
  }
];

const SKILL_DISCIPLINES = [
  {
    category: "BUILD",
    tagline: "Application layers & client interfaces",
    items: ["React 19", "JavaScript (ES6+)", "Python", "FastAPI", "Android (Kotlin)", "Tailwind CSS", "Vite"]
  },
  {
    category: "SYSTEMS",
    tagline: "Data architecture & transport contracts",
    items: ["SQLite3", "Room ORM", "FAISS Vector Index", "REST APIs", "WebSockets", "Local-First Ledgers"]
  },
  {
    category: "AI & RETRIEVAL",
    tagline: "Grounded context & evaluation suites",
    items: ["RAG Pipelines", "LLM Integration", "Ragas Benchmarks", "Prompt Engineering", "Cosine Similarity"]
  },
  {
    category: "HARDWARE",
    tagline: "Robotics, physical compute & sensors",
    items: ["ROS 2 Humble", "Raspberry Pi 4 B", "RPLIDAR S2 360°", "ESP32", "OpenCV", "PID Motor Control"]
  }
];

const CRAFT_STEPS = [
  { num: "01", name: "Research", desc: "Identify systemic failure points, user friction, and real physical constraints." },
  { num: "02", name: "Understand", desc: "Formulate data flow models, invariants, and local persistence boundaries." },
  { num: "03", name: "Design", desc: "Architect deterministic APIs, component trees, and tactile interfaces." },
  { num: "04", name: "Build", desc: "Write clean, modular, typed code in Python, React, Kotlin, and ROS 2." },
  { num: "05", name: "Measure", desc: "Benchmark retrieval precision, sensor latency, and SQLite query speed." },
  { num: "06", name: "Iterate", desc: "Eliminate silent failure modes, tighten boundaries, and remove slop." },
  { num: "07", name: "Ship", desc: "Deploy production code, physical firmware, and verify end-to-end execution." }
];

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [isRagOpen, setIsRagOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [labTab, setLabTab] = useState("zeus"); // 'zeus' | 'rag' | 'code'
  const launcherRef = useRef(null);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for command menu)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
      if (e.key === "`" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="workshop-root">
      {/* Floating Project Index Tracker */}
      <ProjectIndexTracker />

      {/* Subtle Persistent Workshop RAG Launcher */}
      <JannuLauncher
        onOpen={() => setIsRagOpen(true)}
        launcherRef={launcherRef}
      />

      {/* Workshop Masthead Navigation */}
      <header className="workshop-header">
        <div className="header-container">
          <div className="brand-group">
            <a href="#home" className="brand-title" aria-label="Deswanth's Workshop Home">
              DESWANTH<span className="brand-accent-dot">.</span>
            </a>
            <span className="brand-badge">STUDIO // TIRUPATI, IN</span>
          </div>

          <nav className="workshop-nav" aria-label="Primary Workshop Navigation">
            <a href="#work" className="nav-item">01 WORK</a>
            <a href="#workbench" className="nav-item">02 WORKBENCH</a>
            <a href="#lab" className="nav-item">03 LAB</a>
            <a href="#timeline" className="nav-item">04 TIMELINE</a>
            <a href="#about" className="nav-item">05 ABOUT</a>
            <a href="#contact" className="nav-item">06 CONTACT</a>
          </nav>

          <div className="header-actions">
            {/* Subtle mechanical sound toggle (Default OFF) */}
            <SoundEffects />

            {/* Quick Command Palette Trigger */}
            <button
              onClick={() => setIsCmdOpen(true)}
              className="cmd-trigger-btn"
              title="Open Command Palette (Ctrl+K)"
              aria-label="Open command palette"
            >
              <Search size={13} aria-hidden="true" />
              <span className="cmd-label">SEARCH</span>
              <kbd className="cmd-kbd">⌘K</kbd>
            </button>

            {/* Subtle Jannu AI Drawer Trigger */}
            <button
              onClick={() => setIsRagOpen(true)}
              className="jannu-trigger-btn"
              title="Query Jannu RAG Assistant"
              aria-label="Open Jannu RAG Assistant"
            >
              <span>ASK JANNU</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* =================================================================
            1. THE OPENING (Hero)
            ================================================================= */}
        <section id="home" className="opening-section" aria-label="Introduction">
          <div className="opening-container">
            <div className="opening-meta-top">
              <span className="opening-tag">[ DESWANTH'S WORKSHOP ]</span>
              <span className="opening-subtag">PERSONAL STUDIO & ENGINEERING LAB</span>
            </div>

            <div className="opening-hero-block">
              <h1 className="hero-name">DESWANTH</h1>
              <div className="hero-statement">
                <p className="hero-headline">I BUILD THINGS.</p>
                <div className="hero-disciplines">
                  <span>Software.</span>
                  <span>Products.</span>
                  <span>Systems.</span>
                  <span>Experiments.</span>
                </div>
              </div>
            </div>

            <p className="hero-philosophy">
              A personal atelier operating at the intersection of full-stack software, autonomous robotics hardware, and local-first architecture. Building things that work outside a tutorial.
            </p>

            <div className="hero-actions">
              <button
                onClick={() => scrollToSection("workbench")}
                className="btn btn-primary"
              >
                ENTER WORKSHOP <ArrowDown size={14} aria-hidden="true" />
              </button>

              <button
                onClick={() => scrollToSection("work")}
                className="btn btn-secondary"
              >
                VIEW WORK <ArrowRight size={14} aria-hidden="true" />
              </button>

              <button
                onClick={() => setIsTerminalOpen(true)}
                className="btn btn-secondary terminal-trigger"
                title="Open developer terminal"
              >
                <TerminalIcon size={14} aria-hidden="true" />
                <span>deswanth --help</span>
              </button>
            </div>

            <div className="opening-footer-note">
              <span>DIGITAL WORKSHOP</span>
              <span className="divider">•</span>
              <span>EST. 2023</span>
              <span className="divider">•</span>
              <span>LOCAL // TIRUPATI, ANDHRA PRADESH</span>
            </div>
          </div>
        </section>

        {/* =================================================================
            2. FEATURED WORKS (Editorial Case Studies — The Centerpiece)
            ================================================================= */}
        <section id="work" className="works-section" aria-label="Featured Works">
          <div className="works-header-container">
            <div className="section-label-wrap">
              <span className="section-num">01</span>
              <span className="section-slug">FEATURED WORKS</span>
            </div>
            <h2 className="section-main-heading">Selected Products & Systems.</h2>
            <p className="section-description">
              In-depth case studies of engineered systems. Real architecture, genuine technical trade-offs, and verified codebases.
            </p>
          </div>

          <div className="projects-editorial-list">
            {PROJECT_LIST.map((project, idx) => (
              <article
                key={project.id}
                id={project.domId}
                className={`project-editorial-row ${idx < 3 ? "lead-project" : "standard-project"}`}
                data-cursor="project"
                onClick={() => setActiveCaseStudy(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCaseStudy(project.id);
                  }
                }}
                aria-label={`View ${project.title} case study`}
              >
                <div className="project-left">
                  <div className="project-index-row">
                    <span className="project-num">{project.number}</span>
                    <span className="project-cat">{project.category}</span>
                    <span className="project-year">// {project.year}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>

                  <div className="project-brief-block">
                    <div className="brief-label">THE PROBLEM</div>
                    <p className="brief-text">{project.problem}</p>
                  </div>

                  <div className="project-brief-block">
                    <div className="brief-label">ARCHITECTURE</div>
                    <div className="arch-flow-summary">
                      {project.id === "janai" && "React 19 → FastAPI → FAISS Cosine Retrieval → LLM Inference → Grounded Sources"}
                      {project.id === "zeus" && "Sensors (LiDAR+IMU) → Raspberry Pi 4 (ROS 2) → SLAM Navigation → Edge YOLO"}
                      {project.id === "sagiro" && "Kotlin UI → Ledger Engine → Room ORM → Local SQLite → Zero Outbound Telemetry"}
                      {project.id === "evalmesh" && "RAG Output → Ragas Evaluator → Hallucination Validator → Benchmark Telemetry"}
                      {project.id === "security-toolkit" && "Raw Sockets → Multi-Threaded Port Scanner → SQLite Audit Logger"}
                      {project.id === "student-db" && "Tkinter GUI → Python DB Abstraction → SQLite3 Relational Engine"}
                    </div>
                  </div>

                  <div className="project-tech-tokens">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>

                  <div className="project-action-row">
                    <span className="open-study-link">
                      OPEN CASE STUDY <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>

                <div className="project-right">
                  <div className="project-spec-card">
                    <div className="spec-card-header">
                      <span>SPECIFICATION OVERVIEW</span>
                      <span className="spec-ref">REF-{project.number}</span>
                    </div>

                    <div className="spec-card-metrics">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="spec-item">
                          <span className="spec-key">{m.label}</span>
                          <span className="spec-val">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="spec-card-features">
                      <span className="spec-features-title">KEY TECHNICAL DECISIONS:</span>
                      <ul className="spec-features-list">
                        {project.decisions.slice(0, 2).map((dec, dIdx) => (
                          <li key={dIdx}>• {dec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="spec-card-footer">
                      <span className="spec-stamp">VERIFIED REPOSITORY ARTIFACT</span>
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================================
            3. THE WORKBENCH (Editorial Artifact Canvas)
            ================================================================= */}
        <section id="workbench" className="workbench-section" aria-label="The Workbench">
          <div className="section-header-container">
            <div className="section-label-wrap">
              <span className="section-num">02</span>
              <span className="section-slug">PHYSICAL & DIGITAL ARTIFACTS</span>
            </div>
            <h2 className="section-main-heading">The Workbench.</h2>
            <p className="section-description">
              A curated canvas of physical and software engineering artifacts. Technical drawings, hardware architecture, and local system ledgers.
            </p>
          </div>
          <WorkbenchCanvas onOpenCaseStudy={setActiveCaseStudy} />
        </section>

        {/* =================================================================
            4. THE LAB (Experimental Workbench & Live Telemetry)
            ================================================================= */}
        <section id="lab" className="lab-section" aria-label="The Engineering Lab">
          <div className="section-header-container">
            <div className="section-label-wrap">
              <span className="section-num">03</span>
              <span className="section-slug">EXPERIMENTAL LAB</span>
            </div>
            <h2 className="section-main-heading">Working Prototypes & Telemetry.</h2>
            <p className="section-description">
              Live functional systems. Interactive 360° LiDAR radar point-clouds, client-side RAG vector retrieval, and code architecture.
            </p>

            {/* Lab Mode Selector Tabs */}
            <div className="lab-tabs" role="tablist" aria-label="Lab modules">
              <button
                onClick={() => setLabTab("zeus")}
                className={`lab-tab ${labTab === "zeus" ? "active" : ""}`}
                role="tab"
                aria-selected={labTab === "zeus"}
              >
                01 // ZEUS 360° LIDAR RADAR (ROS 2)
              </button>
              <button
                onClick={() => setLabTab("rag")}
                className={`lab-tab ${labTab === "rag" ? "active" : ""}`}
                role="tab"
                aria-selected={labTab === "rag"}
              >
                02 // JANAI RAG SEMANTIC RETRIEVAL
              </button>
              <button
                onClick={() => setLabTab("code")}
                className={`lab-tab ${labTab === "code" ? "active" : ""}`}
                role="tab"
                aria-selected={labTab === "code"}
              >
                03 // ARCHITECTURE CODE INSPECTOR
              </button>
            </div>
          </div>

          <div className="lab-content-wrap">
            {labTab === "zeus" && (
              <div className="lab-panel">
                <ZeusVisualizer />
              </div>
            )}

            {labTab === "rag" && (
              <div className="lab-panel">
                <JanAiSimulator />
              </div>
            )}

            {labTab === "code" && (
              <div className="lab-panel">
                <InteractiveCodeViewer />
              </div>
            )}
          </div>
        </section>

        {/* =================================================================
            5. DEVELOPMENT TIMELINE (Personal Evolution Wall)
            ================================================================= */}
        <section id="timeline" className="timeline-section" aria-label="Development Timeline">
          <div className="section-header-container">
            <div className="section-label-wrap">
              <span className="section-num">04</span>
              <span className="section-slug">CHRONOLOGY</span>
            </div>
            <h2 className="section-main-heading">Development Timeline.</h2>
            <p className="section-description">
              A personal evolution of self-directed engineering, systems architecture, and physical hardware development.
            </p>
          </div>

          <div className="timeline-grid">
            {TIMELINE_ENTRIES.map((entry) => (
              <div key={entry.year} className="timeline-node">
                <div className="timeline-year-badge">{entry.year}</div>
                <div className="timeline-content">
                  <h3 className="timeline-entry-title">{entry.title}</h3>
                  <p className="timeline-entry-summary">{entry.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            6. ABOUT & NATURAL SKILLS (The Craftsman)
            ================================================================= */}
        <section id="about" className="about-section" aria-label="About Deswanth">
          <div className="section-header-container">
            <div className="section-label-wrap">
              <span className="section-num">05</span>
              <span className="section-slug">THE BUILDER</span>
            </div>
            <h2 className="section-main-heading">About Deswanth.</h2>
          </div>

          <div className="about-split-grid">
            <div className="about-narrative-col">
              <div className="narrative-lead">
                I'm Deswanth. I like building things that work outside a tutorial.
              </div>
              <p className="narrative-body">
                My work sits between full-stack software, autonomous robotics, and local-first architecture. I believe the most resilient software is built through hands-on measurement: designing schemas, inspecting serial telemetry packets, and evaluating LLM outputs with strict grounding.
              </p>
              <p className="narrative-body">
                Based in Tirupati, India. Currently focused on building production-ready RAG platforms, local-first Android mobile ledgers, and edge ROS 2 robotics navigation.
              </p>

              <div className="about-contact-chips">
                <a href="mailto:kdeswanth@gmail.com" className="contact-chip">
                  <Mail size={14} aria-hidden="true" /> kdeswanth@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/deswanth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip"
                >
                  <FaLinkedin size={14} aria-hidden="true" /> LinkedIn
                </a>
                <a
                  href="https://github.com/deswanth12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip"
                >
                  <FaGithub size={14} aria-hidden="true" /> GitHub
                </a>
                <a href="/Deswanth_CV.pdf" download className="contact-chip">
                  <Download size={14} aria-hidden="true" /> Download Curriculum Vitae
                </a>
              </div>
            </div>

            <div className="about-profile-col">
              <div className="profile-frame">
                <img
                  src={profileImg}
                  alt="Kuchi Deswanth"
                  className="profile-photo"
                  loading="lazy"
                  decoding="async"
                />
                <div className="profile-caption">
                  <span className="caption-name">KUCHI DESWANTH</span>
                  <span className="caption-sub">BUILDER // SOFTWARE • SYSTEMS • ROBOTICS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categorized Skills (Zero Fake Percentage Bars!) */}
          <div className="skills-editorial-grid">
            <div className="skills-heading-row">
              <span className="skills-section-tag">VERIFIED TECHNICAL DISCIPLINES</span>
            </div>

            <div className="disciplines-grid">
              {SKILL_DISCIPLINES.map((d) => (
                <div key={d.category} className="discipline-card">
                  <div className="discipline-head">
                    <h3 className="discipline-title">{d.category}</h3>
                    <span className="discipline-tagline">{d.tagline}</span>
                  </div>
                  <ul className="discipline-items">
                    {d.items.map((item) => (
                      <li key={item} className="discipline-item">
                        <span className="item-dash">—</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            7. ENGINEERING CRAFT (The Workflow)
            ================================================================= */}
        <section className="craft-section" aria-label="Engineering Methodology">
          <div className="section-header-container">
            <div className="section-label-wrap">
              <span className="section-num">06</span>
              <span className="section-slug">CRAFT & METHODOLOGY</span>
            </div>
            <h2 className="section-main-heading">How I Approach Building.</h2>
            <p className="section-description">
              A systematic engineering loop emphasizing problem decomposition, strict boundaries, and empirical measurement.
            </p>
          </div>

          <div className="craft-steps-track">
            {CRAFT_STEPS.map((step) => (
              <div key={step.num} className="craft-step-card">
                <span className="craft-step-num">{step.num}</span>
                <h3 className="craft-step-name">{step.name}</h3>
                <p className="craft-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================
            8. CONTACT & CLOSING
            ================================================================= */}
        <section id="contact" className="contact-closing-section" aria-label="Contact">
          <div className="closing-container">
            <div className="closing-manifesto">
              <span className="closing-tag">STATUS // OPEN FOR HIGH-IMPACT ROLES</span>
              <h2 className="closing-headline">KEEP BUILDING.</h2>
              <p className="closing-subheadline">
                Let's make something useful. Reach out directly for systems engineering, product development, or autonomous robotics collaborations.
              </p>
            </div>

            <div className="closing-actions">
              <a
                href="mailto:kdeswanth@gmail.com"
                className="btn btn-primary btn-large"
              >
                <Mail size={16} aria-hidden="true" /> kdeswanth@gmail.com
              </a>

              <a
                href="https://github.com/deswanth12"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-large"
              >
                <FaGithub size={16} aria-hidden="true" /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/deswanth"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-large"
              >
                <FaLinkedin size={16} aria-hidden="true" /> LinkedIn
              </a>

              <a
                href="/Deswanth_CV.pdf"
                download
                className="btn btn-secondary btn-large"
              >
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="workshop-footer">
        <div className="footer-container">
          <div className="footer-left">
            <strong>DESWANTH.DEV</strong>
            <span>SOFTWARE • PRODUCTS • SYSTEMS • EXPERIMENTS</span>
          </div>
          <div className="footer-right">
            <span>© 2026 K. DESWANTH • DESIGNED & ENGINEERED IN TIRUPATI, INDIA</span>
          </div>
        </div>
      </footer>

      {/* =================================================================
          LAZY-LOADED CASE STUDY & TOOL MODALS
          ================================================================= */}
      <Suspense fallback={null}>
        {activeCaseStudy && (
          <CaseStudyModal
            caseStudyId={activeCaseStudy}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}

        {isRagOpen && (
          <AskMyPortfolio
            isOpen={isRagOpen}
            onClose={() => setIsRagOpen(false)}
            onOpenCaseStudy={(id) => {
              setIsRagOpen(false);
              setActiveCaseStudy(id);
            }}
            triggerRef={launcherRef}
          />
        )}

        {isCmdOpen && (
          <CommandMenu
            isOpen={isCmdOpen}
            onClose={() => setIsCmdOpen(false)}
            onOpenJannu={() => setIsRagOpen(true)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenCaseStudy={(id) => {
              setIsCmdOpen(false);
              setActiveCaseStudy(id);
            }}
          />
        )}

        {isTerminalOpen && (
          <TerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onOpenJannu={() => setIsRagOpen(true)}
          />
        )}
      </Suspense>
    </div>
  );
}
