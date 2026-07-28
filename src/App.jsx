import { useState } from "react";
import {
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaProjectDiagram,
  FaShieldAlt,
  FaTools,
  FaDatabase,
  FaRobot,
  FaCode,
  FaCheck,
  FaCopy,
  FaTerminal,
  FaMicrochip,
  FaMagic,
  FaLayerGroup
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AskMyPortfolio from "./components/AskMyPortfolio";

const profile = "/profile.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const capabilities = [
  {
    icon: FaTools,
    title: "AI & RAG Engineering",
    description:
      "Builds intelligent Retrieval-Augmented Generation applications with vector databases, custom chunking pipelines, embeddings, and context-aware LLMs.",
    stack: ["RAG", "FAISS", "OpenAI / Gemini", "FastAPI"],
  },
  {
    icon: FaMicrochip,
    title: "Autonomous Robotics & Vision",
    description:
      "Engineers ROS 2 robotics platforms with SLAM mapping, edge AI object detection using OpenCV & YOLO, and WebSockets live telemetry.",
    stack: ["ROS 2", "Python", "OpenCV", "Raspberry Pi"],
  },
  {
    icon: FaCode,
    title: "Full Stack Web Apps",
    description:
      "Crafts modern, responsive web interfaces with React, Vite, Tailwind CSS, Framer Motion, and high-performance REST / SSE APIs.",
    stack: ["React 19", "Vite", "Tailwind CSS", "REST / SSE"],
  },
  {
    icon: FaDatabase,
    title: "Desktop Systems & Databases",
    description:
      "Architects reliable local database workflows, desktop applications (Tkinter), and SQLite schema designs for CRUD record management.",
    stack: ["Python", "SQLite", "Tkinter", "CRUD Logic"],
  },
];

const projects = [
  {
    id: "janai",
    category: "AI & RAG",
    img: "/assets/cybertoolkit.png", // fallback image
    title: "JanAI — AI Civic Scheme Platform",
    description:
      "Multi-lingual RAG AI platform that automatically matches citizens with government welfare schemes using semantic vector search and natural language eligibility checking.",
    impact:
      "Empowers citizens to discover and navigate 500+ public schemes in regional languages without administrative complexity.",
    tech: ["React", "FastAPI", "RAG", "Vector DB", "OpenAI"],
    link: "https://github.com/deswanth12",
    badge: "Featured AI Project"
  },
  {
    id: "zeus",
    category: "Robotics",
    img: "/assets/cybertoolkit.png",
    title: "Zeus Robot — Autonomous Robotics",
    description:
      "Autonomous multipurpose robotics platform featuring SLAM indoor navigation, real-time edge AI object detection with YOLO & OpenCV, and WebSockets telemetry.",
    impact:
      "Combines ROS 2, LiDAR sensor fusion, and low-latency motor control for real-time edge spatial navigation.",
    tech: ["ROS 2", "Python", "OpenCV", "Raspberry Pi", "WebSockets"],
    link: "https://github.com/deswanth12",
    badge: "Robotics System"
  },
  {
    id: "security-toolkit",
    category: "Security",
    img: "/assets/cybertoolkit.png",
    title: "Cyber Security Toolkit",
    description:
      "A Python toolkit for practical security workflows, network inspection, port scanning, packet analysis, and local data audit handling.",
    impact:
      "Organizes multiple security & networking utilities into one unified CLI/GUI experience.",
    tech: ["Python", "SQLite", "Networking", "Security"],
    link: "https://github.com/deswanth12/Cyber-Security-Toolkit",
  },
  {
    id: "student-db",
    category: "Python & Desktop",
    img: "/assets/student.png",
    title: "Student Database System",
    description:
      "Desktop database app for managing student academic records with a focused Tkinter interface and SQLite persistence.",
    impact:
      "Supports everyday record operations with fast real-time search filtering.",
    tech: ["Python", "SQLite", "Tkinter"],
    link: "https://github.com/deswanth12/studentdatabase",
  },
  {
    id: "staff-db",
    category: "Python & Desktop",
    img: "/assets/staff.png",
    title: "Staff Management System",
    description:
      "Staff record management tool focused on quick entry, lookup, department assignment, and local data persistence.",
    impact:
      "Turns staff information into an editable, searchable desktop workflow.",
    tech: ["Python", "SQLite", "Tkinter"],
    link: "https://github.com/deswanth12/staffdatamanagement",
  },
  {
    id: "library-db",
    category: "Python & Desktop",
    img: "/assets/library.png",
    title: "Library Management System",
    description:
      "Library data app for organizing book records, borrower transaction history, and fine calculations.",
    impact:
      "Keeps library catalog records structured for automated issue/return tracking.",
    tech: ["Python", "SQLite", "Tkinter"],
    link: "https://github.com/deswanth12/Library-data-management-system",
  },
];

const techStack = [
  { name: "Python", category: "Backend & AI" },
  { name: "React 19", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "ROS 2", category: "Robotics" },
  { name: "RAG & Vector DB", category: "AI & ML" },
  { name: "SQLite", category: "Database" },
  { name: "OpenCV & YOLO", category: "AI Vision" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Git / GitHub", category: "Tools" }
];

const stats = [
  ["6+", "Production & RAG Projects"],
  ["Python + React", "Primary Stack"],
  ["AI & Robotics", "Engineering Specializations"],
];

export default function App() {
  const [isRagOpen, setIsRagOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categories = ["All", "AI & RAG", "Robotics", "Python & Desktop", "Security"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kdeswanth@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="site-shell">
      {/* Background Animated Gradient Mesh Glows */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Navigation */}
      <nav className="nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="logo" href="#home" aria-label="Deswanth portfolio home">
            Deswanth<span className="logo-accent">.dev</span>
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
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
        {/* Hero Section */}
        <section id="home" className="container hero">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <div className="availability-badge">
              <span className="status-dot"></span>
              Full Stack Developer & AI Engineer
            </div>

            <h1 className="title">
              I build <span className="gradient-text">RAG AI Systems</span>, autonomous robotics & polished web apps.
            </h1>

            <p className="desc">
              Full Stack Portfolio featuring Retrieval-Augmented Generation (RAG) platforms, ROS 2 autonomous robotics, Python desktop systems, and responsive React interfaces.
            </p>

            <div className="hero-actions" aria-label="Portfolio actions">
              <button
                onClick={() => setIsRagOpen(true)}
                className="btn btn-jannu-hero"
              >
                <FaRobot aria-hidden="true" />
                Ask Jannu 🤖
              </button>

              <a href="#projects" className="btn btn-primary">
                View Projects
                <FaArrowRight aria-hidden="true" />
              </a>

              <a href="/Deswanth_CV.pdf" download className="btn btn-secondary">
                Download CV
                <FaDownload aria-hidden="true" />
              </a>
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
                Building practical AI, ROS 2 robotics, clean React UI, and SQLite systems.
              </span>
            </div>
          </motion.aside>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container section-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show">
              <p className="eyebrow">About</p>
              <h2>End-to-end engineering from interface to vector database.</h2>
            </motion.div>

            <motion.div
              className="section-copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>
                I build software that solves real-world problems: matching citizens with government welfare through multi-lingual RAG search (JanAI), orchestrating autonomous robotics with ROS 2 & computer vision (Zeus Robot), and engineering efficient desktop database tools in Python & SQLite.
              </p>
              <p>
                My focus spans RAG architectures, vector database indexing, edge AI vision, modern React frontends, and security-minded application engineering.
              </p>

              <div className="stats">
                {stats.map(([value, label]) => (
                  <div className="stat" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills & Capabilities Section */}
        <section id="skills" className="section muted-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Capabilities & Tech Stack</p>
              <h2>How I engineer software solutions.</h2>
            </div>

            {/* Capability Cards */}
            <div className="capability-grid">
              {capabilities.map((capability, i) => {
                const Icon = capability.icon;

                return (
                  <motion.div
                    key={capability.title}
                    className="capability-card"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="capability-icon">
                      <Icon aria-hidden="true" />
                    </div>

                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>

                    <div className="tech-list">
                      {capability.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tech Stack Cloud */}
            <div className="tech-stack-cloud">
              <span className="cloud-title"><FaLayerGroup /> Technologies & Tools:</span>
              <div className="cloud-pills">
                {techStack.map((tech) => (
                  <span key={tech.name} className="cloud-pill">
                    <span className="pill-dot"></span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Featured Work</p>
              <h2>Selected project case studies.</h2>
            </div>

            {/* Category Filter Tabs */}
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

            {/* Project Grid */}
            <motion.div className="project-grid" layout>
              <AnimatePresence>
                {filteredProjects.map((project, i) => (
                  <motion.a
                    layout
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="card-img">
                      <img src={project.img} alt={`${project.title} preview`} />
                      {project.badge && <span className="project-badge">{project.badge}</span>}
                      <span className="open-project" aria-hidden="true">
                        <FaExternalLinkAlt />
                      </span>
                    </div>

                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <p className="project-impact">{project.impact}</p>

                      <div className="tech-list">
                        {project.tech.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Interactive Jannu Banner */}
        <section className="container section">
          <div className="jannu-cta-banner">
            <div className="banner-content">
              <div className="banner-badge">
                <FaRobot /> AI Powered Portfolio
              </div>
              <h2>Have questions about Deswanth's experience?</h2>
              <p>
                Ask Jannu 🤖 — a Retrieval-Augmented Generation (RAG) assistant trained on Deswanth's resume, projects, ROS 2 documentation, and GitHub repositories.
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
              <h2>Let us build something useful.</h2>
              <p>
                Reach out for full-stack web apps, RAG AI implementations, ROS 2 robotics projects, or Python desktop systems.
              </p>
            </div>

            <div className="contact-links">
              <a href="mailto:kdeswanth@gmail.com" className="contact-link">
                <FaEnvelope aria-hidden="true" />
                kdeswanth@gmail.com
              </a>
              <button onClick={handleCopyEmail} className="copy-email-btn" title="Copy email address">
                {copiedEmail ? <FaCheck style={{ color: "#10b981" }} /> : <FaCopy />}
                <span>{copiedEmail ? "Copied!" : "Copy"}</span>
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
          <span className="footer-built">Built with React, Vite & RAG AI</span>
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

      {/* RAG Chatbot Modal */}
      <AskMyPortfolio
        isOpen={isRagOpen}
        onClose={() => setIsRagOpen(false)}
      />
    </div>
  );
}
