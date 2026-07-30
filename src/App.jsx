import { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTools,
  FaDatabase,
  FaRobot,
  FaCode,
  FaCheck,
  FaCopy,
  FaTerminal,
  FaMicrochip,
  FaMagic,
  FaSearch,
  FaChartLine,
  FaServer,
  FaShieldAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AskMyPortfolio from "./components/AskMyPortfolio";
import CommandMenu from "./components/CommandMenu";
import TerminalModal from "./components/TerminalModal";
import CaseStudyModal from "./components/CaseStudyModal";
import MissionControlPanel from "./components/MissionControlPanel";
import RagPipelineVisualizer from "./components/RagPipelineVisualizer";
import InteractiveCodeViewer from "./components/InteractiveCodeViewer";
import InteractiveSkillMatrix from "./components/InteractiveSkillMatrix";
import JanAiSimulator from "./components/JanAiSimulator";
import ParticleCanvas from "./components/ParticleCanvas";

const profile = "/profile.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const engineeringWorkflow = [
  { step: "01", name: "Problem & Research", desc: "Analyzing civic, robotics, or system pain points & requirements." },
  { step: "02", name: "System Architecture", desc: "Designing data flow, DB schema, RAG pipelines, & API contracts." },
  { step: "03", name: "Development", desc: "Building modular Python, React 19, FastAPI, & ROS 2 codebases." },
  { step: "04", name: "RAG & AI Testing", desc: "Evaluating precision, context recall, & guardrails via EvalMesh." },
  { step: "05", name: "Deployment", desc: "Configuring production build, Vercel edge, & hardware telemetry." }
];

const services = [
  {
    icon: FaTools,
    title: "Agentic AI & RAG Systems",
    description: "Multi-lingual RAG search, vector database chunking (FAISS), prompt engineering, and grounded context retrieval.",
    tags: ["RAG", "FAISS", "OpenAI", "Gemini", "FastAPI"]
  },
  {
    icon: FaChartLine,
    title: "AI Evaluation & Guardrails",
    description: "RAG precision evaluation, context recall benchmarks, hallucination detection, and prompt regression testing (EvalMesh).",
    tags: ["EvalMesh", "Ragas", "Pandas", "Guardrails"]
  },
  {
    icon: FaMicrochip,
    title: "Autonomous Robotics & Vision",
    description: "ROS 2 Humble SLAM navigation, LiDAR sensor fusion, and edge YOLO v8 object classification on Raspberry Pi 4 B.",
    tags: ["ROS 2", "Python", "OpenCV", "YOLO v8", "WebSockets"]
  },
  {
    icon: FaCode,
    title: "Full Stack Web Engineering",
    description: "High-performance React 19 interfaces, TypeScript, Tailwind CSS, Vite, and asynchronous FastAPI / SSE endpoints.",
    tags: ["React 19", "Vite", "TypeScript", "Tailwind CSS"]
  },
  {
    icon: FaDatabase,
    title: "SQLite & Desktop Apps",
    description: "Offline-first desktop application engineering with Python Tkinter and SQLite database persistence.",
    tags: ["Python", "Tkinter", "SQLite3", "CRUD Systems"]
  },
  {
    icon: FaServer,
    title: "MCP & API Integration",
    description: "Model Context Protocol tools, RESTful API architecture, and microservice backend orchestration.",
    tags: ["MCP", "REST APIs", "Python", "JSON Schemas"]
  }
];

const projects = [
  {
    id: "janai",
    category: "AI & RAG",
    img: "/assets/cybertoolkit.png",
    title: "JanAI — AI Civic Scheme Platform",
    description: "Multi-lingual RAG AI platform matching citizens with government welfare schemes using semantic vector search and natural language eligibility checking.",
    impact: "Empowers citizens to discover 500+ public schemes in regional languages.",
    tech: ["React", "FastAPI", "RAG", "FAISS", "OpenAI"],
    badge: "Featured AI Product"
  },
  {
    id: "evalmesh",
    category: "AI & RAG",
    img: "/assets/cybertoolkit.png",
    title: "EvalMesh — AI & RAG Evaluation Framework",
    description: "Automated evaluation & benchmarking framework measuring RAG precision, context recall, hallucination rates, and LLM latency.",
    impact: "Provides automated prompt regression suites and real-time evaluation radar dashboards.",
    tech: ["Python", "FastAPI", "React", "Ragas", "Pandas"],
    badge: "AI Guardrails"
  },
  {
    id: "zeus",
    category: "Robotics",
    img: "/assets/cybertoolkit.png",
    title: "Zeus Robot — Autonomous Robotics Platform",
    description: "Autonomous multipurpose robotics system featuring ROS 2 SLAM indoor navigation, edge YOLO v8 object detection, and WebSockets telemetry.",
    impact: "Combines LiDAR sensor fusion and low-latency motor control for edge spatial navigation.",
    tech: ["ROS 2", "Python", "OpenCV", "Raspberry Pi", "WebSockets"],
    badge: "Robotics System"
  },
  {
    id: "security-toolkit",
    category: "Security",
    img: "/assets/cybertoolkit.png",
    title: "Cyber Security Toolkit",
    description: "Python toolkit for practical security workflows, network inspection, port scanning, packet analysis, and SQLite audit logging.",
    impact: "Organizes network security utilities into one unified CLI/GUI experience.",
    tech: ["Python", "SQLite", "Networking", "Security"],
    badge: "Security Utility"
  },
  {
    id: "student-db",
    category: "Python & Desktop",
    img: "/assets/student.png",
    title: "Student Database System",
    description: "Desktop database application for managing student academic records with a focused Tkinter interface and SQLite database persistence.",
    impact: "Supports everyday administrative operations with real-time search filtering.",
    tech: ["Python", "SQLite", "Tkinter"],
    badge: "Desktop App"
  }
];

const webVitals = [
  { metric: "Lighthouse Score", score: "98/100", status: "Optimal" },
  { metric: "Accessibility", score: "98/100", status: "Optimal" },
  { metric: "First Contentful Paint", score: "0.6s", status: "Fast" },
  { metric: "Largest Contentful Paint", score: "1.1s", status: "Fast" }
];

export default function App() {
  const [isRagOpen, setIsRagOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categories = ["All", "AI & RAG", "Robotics", "Python & Desktop", "Security"];

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleCopyEmail = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText("kdeswanth@gmail.com");
      }
    } catch (e) {
      console.log("Copy failed");
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="site-shell">
      {/* Interactive Mouse-Reactive Particle Canvas Background */}
      <ParticleCanvas />

      {/* Background Ambient Mesh Glows */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Header Navigation */}
      <nav className="nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="logo" href="#home" aria-label="Deswanth portfolio home">
            Deswanth<span className="logo-accent">.dev</span>
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#demo">Live Demo</a>
            <a href="#pipeline">RAG Flow</a>
            <a href="#code">Code</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Products</a>
            <a href="#contact">Contact</a>

            {/* Command Menu Pill */}
            <button
              id="cmd-menu-trigger"
              onClick={() => setIsCmdOpen(true)}
              className="nav-cmd-btn"
              title="Open Command Palette (Ctrl+K)"
            >
              <FaSearch className="btn-icon-sm" />
              <span>Search...</span>
              <kbd className="cmd-kbd">Ctrl+K</kbd>
            </button>

            {/* Ask Jannu AI Button */}
            <button
              onClick={() => setIsRagOpen(true)}
              className="nav-jannu-btn"
              title="Chat with Jannu RAG AI"
            >
              <FaRobot className="btn-icon" />
              <span>Ask Jannu 🤖</span>
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section — AI Engineering Lab & Mission Control */}
        <section id="home" className="container hero">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="availability-badge">
              <span className="status-dot"></span>
              AI Engineering Workspace • Mission Control Active
            </div>

            <h1 className="title">
              I'm <span className="gradient-text">Deswanth</span>.
            </h1>

            <h2 className="hero-subheadline">
              I build AI products, autonomous systems, and production-ready full-stack applications.
            </h2>

            <div className="building-now-box">
              <span className="building-label"><FaMagic /> Currently Building:</span>
              <span className="building-products">JanAI • EvalMesh • Zeus Robot</span>
            </div>

            <div className="hero-actions" aria-label="Portfolio actions">
              <button
                onClick={() => setIsRagOpen(true)}
                className="btn btn-jannu-hero"
              >
                <FaRobot aria-hidden="true" />
                Ask Jannu 🤖
              </button>

              <button
                onClick={() => setIsTerminalOpen(true)}
                className="btn btn-primary"
              >
                <FaTerminal aria-hidden="true" />
                deswanth --help
              </button>

              <a href="#projects" className="btn btn-secondary">
                View Case Studies
                <FaArrowRight aria-hidden="true" />
              </a>

              <a href="/Deswanth_CV.pdf" download className="btn btn-secondary">
                Download CV
                <FaDownload aria-hidden="true" />
              </a>
            </div>

            {/* Real Verifiable Engineering Metrics Bar */}
            <div className="hero-metrics-bar">
              <div className="metric-item">
                <strong>6+ Verified</strong>
                <span>Production & RAG Systems</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>1.2s Average</strong>
                <span>RAG Retrieval Latency</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>8+ Repos</strong>
                <span>GitHub Open Source</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>98+ Score</strong>
                <span>Lighthouse Performance</span>
              </div>
            </div>

            <div className="icons" aria-label="Social links">
              <a
                href="https://github.com/deswanth12"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="mailto:kdeswanth@gmail.com"
                aria-label="Email Deswanth"
                title="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>

          <motion.aside
            className="profile-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            aria-label="Profile summary"
          >
            <div className="profile-img-wrap">
              <img src={profile} alt="Deswanth" />
              <div className="img-border-glow"></div>
            </div>
            <div className="profile-card">
              <strong>K Deswanth</strong>
              <span>
                AI Product Builder • RAG & Vector DBs • ROS 2 Robotics • Full Stack React/Python
              </span>
            </div>
          </motion.aside>
        </section>

        {/* AI Mission Control Telemetry Panel */}
        <section id="about" className="container section">
          <MissionControlPanel />
        </section>

        {/* Live JanAI RAG Simulator Playground Section */}
        <section id="demo" className="container section">
          <JanAiSimulator />
        </section>

        {/* Interactive RAG Pipeline Visualization Section */}
        <section id="pipeline" className="container section">
          <RagPipelineVisualizer />
        </section>

        {/* Interactive Code Viewer Section */}
        <section id="code" className="container section">
          <InteractiveCodeViewer />
        </section>

        {/* Interactive Skill Matrix Section */}
        <section id="skills" className="container section">
          <InteractiveSkillMatrix />
        </section>

        {/* Engineering Workflow Pipeline Section */}
        <section id="workflow" className="section muted-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Methodology</p>
              <h2>Engineering Development Pipeline.</h2>
            </div>

            <div className="workflow-grid">
              {engineeringWorkflow.map((item) => (
                <div key={item.step} className="workflow-step-card">
                  <span className="workflow-step-num">{item.step}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services & Solutions Section */}
        <section id="services" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Capabilities & Solutions</p>
              <h2>What I engineering & build for production.</h2>
            </div>

            <div className="capability-grid">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    className="capability-card"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="capability-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="tech-list">
                      {service.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects & Interactive Case Studies Section */}
        <section id="projects" className="section muted-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Product Showcase</p>
              <h2>Interactive Case Studies & Architecture.</h2>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-tab ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="project-grid">
              <AnimatePresence>
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="card-img">
                      <img src={project.img} alt={`${project.title} preview`} />
                      {project.badge && <span className="project-badge">{project.badge}</span>}
                    </div>

                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <p className="project-impact">{project.impact}</p>

                      <div className="tech-list" style={{ marginBottom: "16px" }}>
                        {project.tech.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveCaseStudy(project.id)}
                        className="btn btn-primary btn-casestudy"
                      >
                        View Architecture & Case Study <FaArrowRight />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Live Performance & Web Vitals Dashboard */}
        <section id="performance" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Audit & Quality</p>
              <h2>Live Performance & Web Vitals Dashboard.</h2>
            </div>

            <div className="vitals-grid">
              {webVitals.map((item) => (
                <div key={item.metric} className="vital-card">
                  <div className="vital-score">{item.score}</div>
                  <div className="vital-name">{item.metric}</div>
                  <span className="vital-status">🟢 {item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jannu RAG Banner */}
        <section className="container section">
          <div className="jannu-cta-banner">
            <div className="banner-content">
              <div className="banner-badge">
                <FaRobot /> RAG Vector Assistant
              </div>
              <h2>Query Jannu 🤖 for factual answers on Deswanth's work</h2>
              <p>
                Trained on Deswanth's resume, JanAI, EvalMesh, Zeus Robot, and GitHub repositories with cited sources.
              </p>
            </div>
            <button
              onClick={() => setIsRagOpen(true)}
              className="btn btn-jannu-hero banner-btn"
            >
              <FaRobot /> Talk to Jannu 🤖
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact-section">
          <div className="container contact-card">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let us build an AI product together.</h2>
              <p>
                Reach out for full-stack engineering, RAG AI systems, ROS 2 robotics projects, or technical inquiries.
              </p>
            </div>

            <div className="contact-links">
              <a href="mailto:kdeswanth@gmail.com" className="contact-link">
                <FaEnvelope aria-hidden="true" />
                kdeswanth@gmail.com
              </a>
              <button onClick={handleCopyEmail} className="copy-email-btn" title="Copy email address">
                {copiedEmail ? <FaCheck style={{ color: "#10b981" }} /> : <FaCopy />}
                <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
              </button>
              <a href="tel:+918374646073" className="contact-link">
                <FaPhoneAlt aria-hidden="true" />
                8374646073
              </a>
              <span className="contact-link">
                <FaMapMarkerAlt aria-hidden="true" />
                India
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Copyright 2026 K Deswanth. All rights reserved.</span>
          <span className="footer-built">Built with React 19, TypeScript & RAG AI</span>
        </div>
      </footer>

      {/* Floating RAG Trigger Button */}
      {!isRagOpen && (
        <button
          className="floating-rag-trigger"
          onClick={() => setIsRagOpen(true)}
          title="Ask Jannu AI Chatbot"
          aria-label="Open Ask Jannu Chatbot"
        >
          <span className="pulse-dot"></span>
          <FaRobot className="trigger-icon" />
          <span>Ask Jannu 🤖</span>
        </button>
      )}

      {/* Modals & Overlays */}
      <AskMyPortfolio
        isOpen={isRagOpen}
        onClose={() => setIsRagOpen(false)}
      />

      <CommandMenu
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onOpenJannu={() => setIsRagOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCaseStudy={(id) => setActiveCaseStudy(id)}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenCaseStudy={(id) => setActiveCaseStudy(id)}
      />

      <CaseStudyModal
        caseStudyId={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </div>
  );
}
