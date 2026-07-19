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
} from "react-icons/fa";
import { motion } from "framer-motion";

const profile = "/profile.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const capabilities = [
  {
    icon: FaTools,
    title: "Application Engineering",
    description:
      "Builds complete desktop and web applications with clear flows, maintainable UI, and practical user-facing features.",
    stack: ["React", "Python", "Tkinter", "Vite"],
  },
  {
    icon: FaDatabase,
    title: "Data-Backed Systems",
    description:
      "Designs local database workflows for create, search, update, and record-management use cases.",
    stack: ["SQLite", "CRUD", "Validation", "Reporting"],
  },
  {
    icon: FaShieldAlt,
    title: "Security Tooling",
    description:
      "Explores cybersecurity concepts through hands-on utilities for networking, analysis, and defensive learning.",
    stack: ["Networking", "Python", "Security", "Automation"],
  },
  {
    icon: FaProjectDiagram,
    title: "Product Thinking",
    description:
      "Focuses on useful scope, readable interfaces, and project structure that can keep improving over time.",
    stack: ["UX", "Architecture", "Documentation", "Delivery"],
  },
];

const projects = [
  {
    img: "/assets/cybertoolkit.png",
    title: "Cyber Security Toolkit",
    description:
      "A Python toolkit for practical security workflows, networking utilities, and local data handling.",
    impact:
      "Organizes multiple security utilities into one toolkit-style experience.",
    tech: ["Python", "SQLite", "Networking", "Security"],
    link: "https://github.com/deswanth12/Cyber-Security-Toolkit",
  },
  {
    img: "/assets/student.png",
    title: "Student Database System",
    description:
      "Desktop database app for managing student records with a simple Tkinter interface.",
    impact:
      "Supports everyday record operations with a focused local database flow.",
    tech: ["Python", "SQLite", "Tkinter"],
    link: "https://github.com/deswanth12/studentdatabase",
  },
  {
    img: "/assets/staff.png",
    title: "Staff Management System",
    description:
      "Staff record management tool focused on quick entry, lookup, and local persistence.",
    impact:
      "Turns staff information into an editable, searchable desktop workflow.",
    tech: ["Python", "SQLite", "Tkinter"],
    link: "https://github.com/deswanth12/staffdatamanagement",
  },
  {
    img: "/assets/library.png",
    title: "Library Management System",
    description:
      "Library data app for organizing book records and common management operations.",
    impact:
      "Keeps library records structured for easier management and retrieval.",
    tech: ["Python", "SQLite", "Tkinter"],
    link: "https://github.com/deswanth12/Library-data-management-system",
  },
];

const stats = [
  ["4", "complete project case studies"],
  ["Python + React", "primary build stack"],
  ["Security + CRUD", "hands-on product domains"],
];

export default function App() {
  return (
    <div className="site-shell">
      <nav className="nav" aria-label="Primary navigation">
        <div className="container nav-inner">
          <a className="logo" href="#home" aria-label="Deswanth portfolio home">
            Deswanth.dev
          </a>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="container hero">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="eyebrow">Full Stack Developer / Python Builder</p>

            <h1 className="title">
              I turn practical problems into polished, working software.
            </h1>

            <p className="desc">
              Portfolio of Python desktop systems, React interfaces, database
              workflows, and cybersecurity utilities built with a focus on
              clarity, reliability, and real-world use.
            </p>

            <div className="hero-actions" aria-label="Portfolio actions">
              <a href="#projects" className="btn btn-primary">
                View Work
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
            <img src={profile} alt="Deswanth" />
            <div className="profile-card">
              <strong>Engineering focus</strong>
              <span>
                Practical apps, clean UI, database logic, and security-minded
                tooling.
              </span>
            </div>
          </motion.aside>
        </section>

        <section id="about" className="section">
          <div className="container section-grid">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show">
              <p className="eyebrow">About</p>
              <h2>Clean execution from interface to persistence.</h2>
            </motion.div>

            <motion.div
              className="section-copy"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>
                I build software that solves visible problems: managing records,
                shaping usable interfaces, and packaging technical workflows
                into tools people can operate without friction.
              </p>
              <p>
                My current portfolio shows strength in Python application
                development, SQLite-backed systems, React UI, and applied
                cybersecurity learning.
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

        <section id="skills" className="section muted-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Capabilities</p>
              <h2>How I approach building software.</h2>
            </div>

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
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Projects</p>
              <h2>Selected project case studies.</h2>
            </div>

            <div className="project-grid">
              {projects.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="card-img">
                    <img src={project.img} alt={`${project.title} preview`} />
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
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-card">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Let us build something useful.</h2>
              <p>
                Reach out for web apps, Python desktop tools, database-backed
                systems, or security-focused utilities.
              </p>
            </div>

            <div className="contact-links">
              <a href="mailto:kdeswanth@gmail.com">
                <FaEnvelope aria-hidden="true" />
                kdeswanth@gmail.com
              </a>
              <a href="tel:+918374646073">
                <FaPhoneAlt aria-hidden="true" />
                8374646073
              </a>
              <span>
                <FaMapMarkerAlt aria-hidden="true" />
                India
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Copyright 2026 Deswanth. All rights reserved.</span>
      </footer>

      <details
        className="pet-companion"
        aria-label="Portfolio quick assistant"
      >
        <summary className="pet-toggle" aria-label="Open quick actions">
          <span className="pet-bubble">Need a shortcut?</span>
          <span className="pet" aria-hidden="true">
            <span className="pet-ear pet-ear-left" />
            <span className="pet-ear pet-ear-right" />
            <span className="pet-face">
              <span className="pet-eye pet-eye-left" />
              <span className="pet-eye pet-eye-right" />
              <span className="pet-nose" />
            </span>
            <span className="pet-tail" />
          </span>
        </summary>

        <div className="pet-menu">
          <strong>Quick paths</strong>
          <a href="#projects">
            <FaExternalLinkAlt aria-hidden="true" />
            View projects
          </a>
          <a href="#contact">
            <FaEnvelope aria-hidden="true" />
            Contact me
          </a>
          <a href="/Deswanth_CV.pdf" download>
            <FaDownload aria-hidden="true" />
            Download CV
          </a>
        </div>
      </details>
    </div>
  );
}
