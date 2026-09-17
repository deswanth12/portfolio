/**
 * CANONICAL VERIFIED KNOWLEDGE GRAPH FOR JANNU RAG
 * 
 * Strictly verified against existing repository documentation:
 * - data/knowledge_base/portfolio_projects.md
 * - data/knowledge_base/janai_docs.md
 * - data/knowledge_base/zeus_robot_docs.md
 * - data/knowledge_base/evalmesh_docs.md
 * - data/knowledge_base/deswanth_resume.md
 * - data/knowledge_base/certificates_blogs.md
 * 
 * Verification Gate:
 * Only facts marked as VERIFIED or SUPPORTED_BY_DOCS may be presented
 * as Deswanth-specific facts. Unsupported absolute buzzwords (e.g. "100% private",
 * "sub-10ms", "zero latency", "fully autonomous") are prohibited.
 */

export const PERSON = {
  name: "Kuchi Deswanth",
  shortName: "Deswanth",
  role: "Full Stack Developer / Python & AI Systems Builder",
  location: "Tirupati, Andhra Pradesh, India",
  country: "India",
  email: "kdeswanth@gmail.com",
  phone: "+91 8374646073",
  github: "https://github.com/deswanth12",
  portfolio: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/",
  linkedin: "https://www.linkedin.com/in/deswanth",
  summary:
    "Deswanth is a systems builder and software engineer based in Tirupati, India. His work spans full-stack software, autonomous robotics hardware, RAG evaluation frameworks, and local-first architecture.",
  disciplines: [
    "AI Systems & Retrieval-Augmented Generation (RAG)",
    "Autonomous Robotics & Edge Vision (ROS 2, OpenCV, SLAM)",
    "Local-First Architecture & Mobile Ledgers (Kotlin, Android, SQLite)",
    "Full-Stack Web Engineering (React, FastAPI, Python)",
    "Desktop Database Engineering (Python Tkinter, SQLite3)"
  ],
  education: "Bachelor's Degree in Computer Science / Information Technology",
  certifications: [
    "Full-Stack Web Development with React & Node.js",
    "Python Application Engineering & Database Design",
    "Cybersecurity Fundamentals & Network Defense"
  ]
};

export const PROJECTS = {
  janai: {
    id: "janai",
    number: "01",
    title: "JanAI",
    subtitle: "AI Civic Scheme Discovery Platform",
    year: "2026",
    category: "AI Systems & Semantic Retrieval",
    tagline: "Multilingual RAG platform matching citizens with government welfare schemes using semantic vector search.",
    summary:
      "JanAI is an AI-powered civic platform that helps citizens discover and understand government welfare schemes based on their demographic and socioeconomic profile.",
    summarySimple:
      "JanAI is a web app that helps citizens easily find government welfare programs they qualify for, using natural language search in regional languages.",
    summaryDeep:
      "JanAI utilizes a Retrieval-Augmented Generation (RAG) pipeline built with FastAPI and React. Welfare guidelines and circulars are vectorized and indexed with FAISS/Pinecone for semantic similarity matching. Regional queries are processed with multilingual prompt grounding, and answers are paired with official gazette source citations to prevent hallucinations.",
    problem:
      "Government welfare schemes in India are distributed across hundreds of fragmented state portals and bureaucratic PDF circulars, making eligibility hard to discover for non-technical citizens.",
    solution:
      "Engineered an offline-indexed RAG platform that vectorizes scheme guidelines into a FAISS index, offering natural-language eligibility verification with source-grounded citations.",
    targetAudience:
      "Citizens, rural applicants, and community workers seeking to discover and understand government welfare eligibility in regional languages.",
    techStack: ["React", "FastAPI", "Python", "FAISS", "Pinecone", "OpenAI / Gemini", "Web Speech API", "Tailwind CSS"],
    features: [
      "Semantic eligibility matching across central and state welfare programs",
      "Multilingual support (English, Hindi, Telugu, and regional languages)",
      "Source citations linked to official scheme circulars",
      "Step-by-step document guidance and required checklist generation",
      "Voice query input support via Web Speech API"
    ],
    limitations: "JanAI is an informational discovery tool and does not process legal applications or disburse government benefits directly.",
    github: "https://github.com/deswanth12",
    caseStudyId: "janai"
  },

  zeus: {
    id: "zeus",
    number: "02",
    title: "Zeus Robot",
    subtitle: "Autonomous Robotics & SLAM Platform",
    year: "2026",
    category: "Autonomous Systems & Edge AI",
    tagline: "Multipurpose indoor robotics system integrating ROS 2 SLAM navigation, 360° LiDAR, and edge computer vision.",
    summary:
      "Zeus is an autonomous mobile robotics platform built by Deswanth, combining ROS 2 Humble on a Raspberry Pi 4 B with LiDAR SLAM mapping, edge computer vision, and closed-loop motor control.",
    summarySimple:
      "Zeus is a physical wheeled robot built by Deswanth. It uses a laser sensor (LiDAR) and cameras to map indoor rooms, avoid obstacles, and navigate automatically.",
    summaryDeep:
      "Zeus operates on a two-tier compute architecture. A Raspberry Pi 4 B running Ubuntu and ROS 2 Humble orchestrates high-level nodes: Cartographer 2D SLAM, Nav2 path planning, and edge YOLO object detection. Low-level motor PWM velocity control with optical encoder feedback is delegated to an Arduino Mega / ESP32 over a serial UART bridge. A lightweight WebSocket server streams real-time LiDAR scan points to a browser-based telemetry canvas.",
    problem:
      "Indoor autonomous mobile robots often suffer from high compute latencies and fragile localization without costly cloud offloading.",
    solution:
      "Built a self-contained mobile robot running ROS 2 on an edge Raspberry Pi 4 B, fusing RPLIDAR 360° laser scans, IMU data, and wheel odometry for local mapping.",
    targetAudience:
      "Robotics engineers and researchers exploring autonomous 2D SLAM mapping, ROS 2 distributed nodes, and edge vision on embedded hardware.",
    hardware: [
      "Raspberry Pi 4 B (High-level compute, ROS 2, and vision)",
      "Arduino Mega / ESP32 (Low-level motor control and PWM)",
      "RPLIDAR S2 (360° laser distance scanner)",
      "MPU-6050 IMU (Inertial Measurement Unit for orientation)",
      "Hall-effect wheel encoders (Odometry calculation)",
      "Differential drive chassis with DC geared motors"
    ],
    software: [
      "ROS 2 Humble Hawksbill on Ubuntu 22.04 LTS",
      "Cartographer SLAM (2D occupancy grid mapping)",
      "Nav2 navigation stack for path planning and waypoint navigation",
      "Python, OpenCV, and YOLO v8 for edge vision object detection",
      "WebSockets telemetry bridge for real-time browser radar display"
    ],
    techStack: ["ROS 2 Humble", "Python", "OpenCV", "YOLO v8", "Raspberry Pi 4 B", "Arduino Mega", "ESP32", "WebSockets"],
    limitations: "Zeus is an engineering development and research prototype designed for indoor environments; it is not a commercial consumer product.",
    github: "https://github.com/deswanth12",
    caseStudyId: "zeus"
  },

  sagiro: {
    id: "sagiro",
    number: "03",
    title: "Sagiro",
    subtitle: "Personal Finance & Ledger Application",
    year: "2025",
    category: "Mobile Architecture & Systems",
    tagline: "Offline-first personal expense tracker engineered with local-first persistence and zero external trackers.",
    summary:
      "Sagiro is an offline-first personal finance application for Android, built natively in Kotlin using Room ORM and local SQLite with no third-party tracking SDKs.",
    summarySimple:
      "Sagiro is an Android money tracker that works completely offline. It saves all your data on your phone in a local database, with no cloud tracking or ads.",
    summaryDeep:
      "Sagiro is architected around local-first data principles. Every financial transaction is processed synchronously against local SQLite through Room DAOs. It maintains an immutable transaction ledger to calculate running balances deterministically, supports local JSON/CSV backup exports, and includes zero third-party advertising or analytics SDKs to protect user financial privacy.",
    problem:
      "Many modern finance apps monetize user transaction habits through tracking SDKs, require constant cloud connectivity, and break in offline environments.",
    solution:
      "Engineered an offline-first Android ledger using Kotlin and Room ORM, storing all transactions locally on device with exportable encrypted backups.",
    targetAudience:
      "Individuals seeking privacy-first, offline personal expense tracking without cloud tracking, third-party SDKs, or account requirements.",
    techStack: ["Android Native", "Kotlin", "SQLite", "Room DB", "Jetpack Compose", "Coroutines"],
    features: [
      "Local-first synchronous SQLite transaction storage",
      "Deterministic balance delta ledger",
      "Expense velocity tracking and budget alerts",
      "Local encrypted JSON and CSV export/import backup functionality",
      "Zero advertising, analytics, or third-party tracking SDKs"
    ],
    limitations: "Sagiro does not sync with remote banking APIs or multi-device cloud accounts by design, prioritizing local device privacy.",
    github: "https://github.com/deswanth12",
    caseStudyId: "sagiro"
  },

  evalmesh: {
    id: "evalmesh",
    number: "04",
    title: "EvalMesh",
    subtitle: "AI & RAG Evaluation Framework",
    year: "2025",
    category: "AI Evaluation & Guardrails",
    tagline: "Automated benchmarking suite measuring RAG precision, context recall, and hallucination rates.",
    summary:
      "EvalMesh is an automated testing and benchmarking framework designed by Deswanth to measure RAG retrieval precision, context recall, and faithfulness across LLM prompt revisions.",
    summarySimple:
      "EvalMesh is a testing tool that checks whether AI search (RAG) systems are accurate, giving truthful answers and avoiding hallucinations before going live.",
    summaryDeep:
      "EvalMesh separates the evaluation of retrieval systems from generation models. It uses the Ragas framework with Python and FastAPI to run automated regression test suites against curated QA datasets. It tracks context precision (whether retrieved chunks are relevant), context recall (whether necessary facts were found), faithfulness (whether LLM statements are backed by retrieved context), and time-to-first-token (TTFT) latency.",
    problem:
      "Deploying RAG pipelines without continuous automated testing leads to undetected hallucinations and context dilution as underlying document collections grow.",
    solution:
      "Engineered an evaluation harness combining Ragas metrics, prompt regression suites, and SQLite benchmark storage with a visual comparison dashboard.",
    targetAudience:
      "AI engineers, RAG developers, and researchers benchmarking context recall, precision, and hallucination rates across retrieval pipelines.",
    techStack: ["Python", "FastAPI", "React", "Ragas", "Pandas", "Scikit-Learn", "SQLite"],
    features: [
      "Context precision and context recall evaluation for vector search",
      "Faithfulness and hallucination rate scoring",
      "Prompt regression test runner across LLM versions",
      "Latency and time-to-first-token (TTFT) benchmark telemetry",
      "Radar chart comparison visualizer in React"
    ],
    limitations: "EvalMesh is an evaluation and benchmarking harness for development, not a production consumer chatbot.",
    github: "https://github.com/deswanth12",
    caseStudyId: "evalmesh"
  },

  "security-toolkit": {
    id: "security-toolkit",
    number: "05",
    title: "Cyber Security Toolkit",
    subtitle: "Network Inspection & Audit Utility",
    year: "2025",
    category: "Network Security & Tooling",
    tagline: "Python security utility for network inspection, multi-threaded port scanning, and audit logging.",
    summary:
      "Cyber Security Toolkit is a Python package built by Deswanth for network inspection, multi-threaded TCP/UDP port scanning, packet header inspection, and local SQLite audit logging.",
    summarySimple:
      "It is a Python tool for inspecting local network connections, scanning open ports, and logging security events to a local database.",
    summaryDeep:
      "Built with Python's raw socket and threading libraries, the toolkit conducts concurrent port scanning across subnet ranges. It performs banner grabbing to identify listening services and logs timestamped security scan events into a local SQLite database for chronological audit analysis.",
    problem:
      "Developers and security students often need lightweight, scriptable utilities to inspect local network traffic and audit open ports without configuring heavyweight enterprise monitoring suites.",
    solution:
      "Developed a focused Python utility using raw socket programming, multi-threaded workers, and SQLite logging with both CLI and Tkinter GUI interfaces.",
    targetAudience:
      "Network administrators and security students looking for a lightweight, scriptable utility to audit open ports and inspect subnet packets locally.",
    techStack: ["Python", "SQLite", "Socket Programming", "Networking", "Tkinter"],
    features: [
      "Multi-threaded TCP/UDP port scanner with banner grabbing",
      "Packet header inspection and socket connection analyzer",
      "Persistent SQLite security event audit database",
      "Dual CLI terminal and Tkinter desktop GUI interfaces"
    ],
    limitations: "Designed for authorized local network analysis, testing, and educational security workflows.",
    github: "https://github.com/deswanth12/Cyber-Security-Toolkit",
    caseStudyId: "security-toolkit"
  },

  "student-db": {
    id: "student-db",
    number: "06",
    title: "Student Database System",
    subtitle: "Desktop Records Management System",
    year: "2024",
    category: "Desktop Systems & Persistence",
    tagline: "Desktop database application for managing student academic records with SQLite persistence.",
    summary:
      "Student Database System is a desktop records management application developed with Python, Tkinter GUI, and SQLite3, featuring instant search filtering, input validation, and CSV export.",
    summarySimple:
      "A desktop application built with Python and SQLite to manage student records, contact info, and registration data completely offline.",
    summaryDeep:
      "The application implements parameterized SQL queries over an embedded SQLite3 engine. The Tkinter GUI layer provides real-time search filtering across student names and roll numbers, in-memory input validation to prevent constraint violations, and fast CSV export for report generation. Deswanth also built related desktop systems for Staff Management and Library Data Management using the same architecture.",
    problem:
      "School and departmental administrative workflows need lightweight, dependable offline tools for managing student records without complex database server setups.",
    solution:
      "Built a self-contained desktop application with Python and Tkinter providing validated CRUD operations against an embedded SQLite database.",
    targetAudience:
      "Academic departments and administrators needing dependable, zero-setup offline database management for student records and courses.",
    techStack: ["Python", "SQLite3", "Tkinter GUI", "CRUD Architecture"],
    features: [
      "Real-time search filtering across student names, roll numbers, and departments",
      "In-memory input validation preventing database constraint errors",
      "Instant CSV report export",
      "Self-contained zero-configuration local desktop deployment"
    ],
    limitations: "Single-user local desktop application; not designed for distributed multi-tenant cloud operations.",
    github: "https://github.com/deswanth12/studentdatabase",
    caseStudyId: "student-db"
  }
};

export const FACTS = [
  // JanAI Facts
  {
    fact_id: "janai-001",
    entity: "janai",
    topic: "purpose",
    statement: "JanAI is an AI-powered civic platform designed to help citizens discover and understand government welfare schemes.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/janai_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "janai-002",
    entity: "janai",
    topic: "vector_search",
    statement: "JanAI indexes welfare scheme guidelines into a FAISS / Pinecone vector database for semantic similarity search.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/janai_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "janai-003",
    entity: "janai",
    topic: "multilingual",
    statement: "JanAI supports multilingual natural language querying in English, Hindi, Telugu, and other regional languages.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/janai_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "janai-004",
    entity: "janai",
    topic: "citations",
    statement: "JanAI uses Retrieval-Augmented Generation (RAG) to cite official scheme circulars and prevent hallucinations.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/janai_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "janai-005",
    entity: "janai",
    topic: "voice",
    statement: "JanAI supports voice query input via the browser Web Speech API.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "data/knowledge_base/janai_docs.md",
    last_verified: "2026-09-17"
  },

  // Zeus Facts
  {
    fact_id: "zeus-001",
    entity: "zeus",
    topic: "purpose",
    statement: "Zeus Robot is an autonomous multipurpose mobile robotics system built by Deswanth.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-002",
    entity: "zeus",
    topic: "compute",
    statement: "Zeus uses a Raspberry Pi 4 B for high-level compute, ROS 2 orchestration, and computer vision.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-003",
    entity: "zeus",
    topic: "motor_control",
    statement: "Zeus offloads low-level motor control and PWM velocity loops to an Arduino Mega / ESP32 microcontroller.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-004",
    entity: "zeus",
    topic: "ros2",
    statement: "Zeus runs ROS 2 (Humble Hawksbill) on Ubuntu 22.04 LTS.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-005",
    entity: "zeus",
    topic: "slam",
    statement: "Zeus implements Cartographer 2D SLAM for indoor occupancy mapping and path navigation.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-006",
    entity: "zeus",
    topic: "lidar",
    statement: "Zeus incorporates an RPLIDAR 360° laser scanner for real-time obstacle avoidance and distance measurement.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-007",
    entity: "zeus",
    topic: "vision",
    statement: "Zeus integrates OpenCV and YOLO v8 for edge object detection and spatial tracking.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "zeus-008",
    entity: "zeus",
    topic: "telemetry",
    statement: "Zeus features a WebSockets telemetry bridge streaming live radar point data to a browser canvas.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/zeus_robot_docs.md",
    last_verified: "2026-09-17"
  },

  // Sagiro Facts
  {
    fact_id: "sagiro-001",
    entity: "sagiro",
    topic: "purpose",
    statement: "Sagiro is an offline-first personal finance management application built natively for Android.",
    verification_status: "VERIFIED",
    source: "src/data/caseStudies.js",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "sagiro-002",
    entity: "sagiro",
    topic: "persistence",
    statement: "Sagiro persists all financial transactions locally on device using Kotlin, Room ORM, and SQLite.",
    verification_status: "VERIFIED",
    source: "src/data/caseStudies.js",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "sagiro-003",
    entity: "sagiro",
    topic: "privacy",
    statement: "Sagiro is designed for local data handling with zero third-party advertising or analytics tracking SDKs.",
    verification_status: "VERIFIED",
    source: "src/data/caseStudies.js",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "sagiro-004",
    entity: "sagiro",
    topic: "backup",
    statement: "Sagiro supports local encrypted export and import backup functionality in JSON and CSV formats.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "src/data/caseStudies.js",
    last_verified: "2026-09-17"
  },

  // EvalMesh Facts
  {
    fact_id: "evalmesh-001",
    entity: "evalmesh",
    topic: "purpose",
    statement: "EvalMesh is an automated AI evaluation and RAG benchmarking framework engineered by Deswanth.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/evalmesh_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "evalmesh-002",
    entity: "evalmesh",
    topic: "metrics",
    statement: "EvalMesh measures RAG context precision, context recall, faithfulness scoring, and hallucination rates.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/evalmesh_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "evalmesh-003",
    entity: "evalmesh",
    topic: "ragas",
    statement: "EvalMesh integrates the Ragas evaluation framework with Python and FastAPI for regression testing.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/evalmesh_docs.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "evalmesh-004",
    entity: "evalmesh",
    topic: "latency",
    statement: "EvalMesh tracks time-to-first-token (TTFT) and throughput latency benchmarks across LLM endpoints.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "data/knowledge_base/evalmesh_docs.md",
    last_verified: "2026-09-17"
  },

  // Security Toolkit Facts
  {
    fact_id: "security-001",
    entity: "security-toolkit",
    topic: "purpose",
    statement: "Cyber Security Toolkit is a modular Python package for network analysis, port scanning, and audit logging.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "security-002",
    entity: "security-toolkit",
    topic: "features",
    statement: "The toolkit implements multi-threaded port auditing with raw socket programming and SQLite audit logging.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "security-003",
    entity: "security-toolkit",
    topic: "repo",
    statement: "Cyber Security Toolkit is open-source at https://github.com/deswanth12/Cyber-Security-Toolkit.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },

  // Student Database Facts
  {
    fact_id: "student-001",
    entity: "student-db",
    topic: "purpose",
    statement: "Student Database System is a desktop CRUD application built with Python Tkinter and SQLite3.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "student-002",
    entity: "student-db",
    topic: "features",
    statement: "It provides instant search filtering, parameterized SQL input validation, and CSV record exports.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "student-003",
    entity: "student-db",
    topic: "desktop_suite",
    statement: "Deswanth built a related suite of desktop tools including Staff Management and Library Data Management.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },

  // Cross-Cutting & Systems Facts
  {
    fact_id: "cross-sqlite-001",
    entity: "sqlite",
    topic: "sqlite_usage",
    statement: "Deswanth has used SQLite across multiple systems: Sagiro (Room ORM), Cyber Security Toolkit (audit log), and desktop database applications (Python Tkinter).",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/portfolio_projects.md",
    last_verified: "2026-09-17"
  },
  {
    fact_id: "cross-python-001",
    entity: "python",
    topic: "python_usage",
    statement: "Python is used across JanAI (FastAPI), Zeus (ROS 2 nodes and vision), EvalMesh (Ragas runner), Cyber Security Toolkit, and desktop database tools.",
    verification_status: "VERIFIED",
    source: "data/knowledge_base/deswanth_resume.md",
    last_verified: "2026-09-17"
  }
];

export const DECISIONS = [
  {
    decision_id: "dec-faiss-001",
    entity: "janai",
    question: "Why use local FAISS instead of remote cloud vector databases?",
    rationale:
      "Deswanth chose a local FAISS vector index for JanAI to perform fast semantic similarity searches directly on the server without recurring cloud database costs or network round-trip overhead.",
    alternative_considered: "Pinecone / cloud-hosted vector SaaS",
    tradeoff: "Requires local index persistence and memory management, but delivers predictable local retrieval without external API subscription dependencies.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "src/data/caseStudies.js"
  },
  {
    decision_id: "dec-ros2-001",
    entity: "zeus",
    question: "Why use ROS 2 Humble instead of ROS 1?",
    rationale:
      "Selected ROS 2 Humble for native DDS (Data Distribution Service) publish/subscribe communication, better multi-node support, and active long-term support (LTS) on Ubuntu 22.04.",
    alternative_considered: "ROS 1 Noetic",
    tradeoff: "Steeper configuration complexity than ROS 1, but provides modern middleware suited for distributed robot architectures.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "src/data/caseStudies.js"
  },
  {
    decision_id: "dec-zeus-hardware-split-001",
    entity: "zeus",
    question: "Why offload motor control from the Raspberry Pi to an Arduino/ESP32?",
    rationale:
      "Delegated low-level closed-loop PID motor velocity control to a dedicated microcontroller (Arduino/ESP32) over UART to keep the Raspberry Pi 4 CPU available for compute-heavy Cartographer SLAM and YOLO vision tasks.",
    alternative_considered: "Direct GPIO motor PWM from Raspberry Pi",
    tradeoff: "Adds hardware wiring and microcontroller firmware complexity, but ensures reliable real-time motor pulsing without CPU contention.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "src/data/caseStudies.js"
  },
  {
    decision_id: "dec-sagiro-offline-001",
    entity: "sagiro",
    question: "Why design Sagiro as an offline-first mobile ledger?",
    rationale:
      "Designed Sagiro as offline-first using Room ORM and local SQLite to prioritize user privacy, eliminate reliance on cellular connectivity, and avoid third-party analytics SDKs that track spending habits.",
    alternative_considered: "Cloud-synced backend database with Firebase/Supabase",
    tradeoff: "Lacks automatic cross-device cloud synchronization, but ensures complete user financial data privacy and instant responsiveness.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "src/data/caseStudies.js"
  },
  {
    decision_id: "dec-evalmesh-dual-metric-001",
    entity: "evalmesh",
    question: "Why use dual-metric evaluation in EvalMesh?",
    rationale:
      "Separates retrieval precision (did the vector search return relevant document chunks?) from generator faithfulness (did the LLM invent statements not found in context?), isolating retrieval bugs from LLM hallucination bugs.",
    alternative_considered: "Single end-to-end blackbox accuracy scoring",
    tradeoff: "Requires computing separate embeddings and ground-truth references, but pinpoints exactly where a RAG pipeline fails.",
    verification_status: "SUPPORTED_BY_DOCS",
    source: "src/data/caseStudies.js"
  }
];

export const RELATIONSHIPS = [
  // Technology mappings
  { subject: "sqlite", relation: "used_in", object: "sagiro", note: "Local-first persistence via Room ORM" },
  { subject: "sqlite", relation: "used_in", object: "security-toolkit", note: "Chronological audit logging" },
  { subject: "sqlite", relation: "used_in", object: "student-db", note: "Parameterized relational desktop persistence" },
  { subject: "python", relation: "used_in", object: "janai", note: "FastAPI backend" },
  { subject: "python", relation: "used_in", object: "zeus", note: "ROS 2 nodes, OpenCV, and YOLO vision" },
  { subject: "python", relation: "used_in", object: "evalmesh", note: "Ragas evaluation harness" },
  { subject: "python", relation: "used_in", object: "security-toolkit", note: "Socket programming and scanner" },
  { subject: "python", relation: "used_in", object: "student-db", note: "Tkinter desktop GUI and SQLite" },
  { subject: "react", relation: "used_in", object: "janai", note: "Frontend user interface" },
  { subject: "react", relation: "used_in", object: "evalmesh", note: "Benchmark dashboard" },
  { subject: "react", relation: "used_in", object: "zeus", note: "WebSockets radar visualizer" },
  { subject: "ros 2", relation: "used_in", object: "zeus", note: "Robot Operating System Humble" },
  { subject: "faiss", relation: "used_in", object: "janai", note: "Semantic vector search index" },
  { subject: "kotlin", relation: "used_in", object: "sagiro", note: "Android native mobile development" },

  // Domain groupings
  { subject: "ai_systems", relation: "includes", object: "janai" },
  { subject: "ai_systems", relation: "includes", object: "evalmesh" },
  { subject: "robotics", relation: "includes", object: "zeus" },
  { subject: "local_first", relation: "includes", object: "sagiro" },
  { subject: "security", relation: "includes", object: "security-toolkit" },
  { subject: "desktop_apps", relation: "includes", object: "student-db" }
];

export const GENERAL_TECH = {
  sqlite:
    "SQLite is a lightweight, self-contained, serverless SQL database engine. Because it writes directly to disk files without network overhead, it is widely used for embedded devices, desktop tools, and local-first mobile apps.",
  "ros 2":
    "ROS 2 (Robot Operating System 2) is an open-source robotics middleware framework. It provides standardized messaging, node orchestration, hardware drivers, and real-time DDS publish/subscribe networking for building robot applications.",
  faiss:
    "FAISS (Facebook AI Similarity Search) is an open-source library developed by Meta for efficient vector similarity search and clustering of dense vector embeddings, capable of searching millions of vectors in memory.",
  rag:
    "RAG (Retrieval-Augmented Generation) is an AI architecture that enhances LLM generation by retrieving relevant reference documents from a knowledge base (such as a vector database) and feeding them into the prompt to provide grounded, factual responses.",
  kotlin:
    "Kotlin is a modern, statically typed cross-platform programming language designed for interoperability with Java, officially recommended by Google for Android development.",
  "room orm":
    "Room is Google's official persistence library for Android that provides an abstraction layer over SQLite, allowing compile-time SQL verification and clean data access objects (DAOs).",
  python:
    "Python is a versatile, high-level programming language widely used across web backends, artificial intelligence, robotics, data engineering, and desktop automation.",
  slam:
    "SLAM (Simultaneous Localization and Mapping) is a computational technique used by autonomous robots to construct a map of an unknown environment while simultaneously keeping track of their own location within it.",
  yolo:
    "YOLO (You Only Look Once) is a popular real-time object detection architecture that processes entire camera frames in a single neural network pass to identify and classify objects with low latency.",
  fastapi:
    "FastAPI is a high-performance Python web framework for building APIs, leveraging Python type hints and asynchronous async/await concurrency.",
  react:
    "React is an open-source component-based JavaScript library developed by Meta for building dynamic user interfaces.",
  websockets:
    "WebSockets is a network communication protocol providing full-duplex, bidirectional persistent connections over a single TCP socket, ideal for real-time telemetry."
};

export const CONVERSATIONAL_TEMPLATES = {
  greetings: [
    "Hey! What are you curious about?",
    "Hi. What would you like to explore in Deswanth's work?",
    "Hey there. Ask me anything about Deswanth's projects or engineering.",
    "Good morning. What should we look into today?",
    "Hey! Ready to talk about the projects whenever you are."
  ],
  farewells: [
    "See you around.",
    "Catch you later.",
    "Take care. Feel free to come back if you have more questions.",
    "Good night. See you later."
  ],
  thanks: [
    "You're welcome!",
    "Glad that was helpful.",
    "Anytime.",
    "Happy to help."
  ],
  smallTalk: [
    "Doing good. Ready to talk about Deswanth's projects.",
    "I'm doing well. What should we explore?",
    "All systems running. What are you curious about?"
  ],
  identity: [
    "I'm Jannu, an assistant for Deswanth's portfolio. I can answer questions about his projects, systems architecture, engineering decisions, and technical background.",
    "I'm Jannu. I'm here to help visitors explore the projects and engineering work documented in Deswanth's portfolio."
  ],
  capabilities: [
    "You can ask me about Zeus (the robotics platform), JanAI (the civic RAG system), Sagiro (the offline finance app), EvalMesh (the AI eval framework), Deswanth's technical skills, or architectural decisions like why he chose FAISS or ROS 2.",
    "I know about Deswanth's 6 documented projects, hardware and software architectures, technical trade-offs, skills, and background. Feel free to ask about any specific project or compare them."
  ],
  compliments: [
    "Thanks! Deswanth put a lot of craftsmanship into building this.",
    "Glad you like it. The workshop design is meant to showcase real engineering artifacts.",
    "Appreciate that. It's built with attention to real software and systems design."
  ],
  clarificationPrompt: [
    "I'm not sure what you mean. Which project or technology would you like to know about?",
    "Could you rephrase that? You can ask about Zeus, JanAI, Sagiro, EvalMesh, or Deswanth's tech stack.",
    "Not sure I caught that. What would you like to explore?"
  ]
};

export const MANIFEST = {
  version: "2.0.0",
  projectCount: 6,
  factCount: FACTS.length,
  decisionCount: DECISIONS.length,
  verificationLevel: "STRICT",
  lastVerified: "2026-09-17",
  source: "portfolio repository and verified docs in data/knowledge_base/"
};
