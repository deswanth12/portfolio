export const CASE_STUDIES = {
  janai: {
    id: "janai",
    number: "01",
    title: "JanAI",
    subtitle: "AI Civic Scheme Discovery Platform",
    year: "2026",
    category: "AI Systems & Semantic Retrieval",
    tagline: "Multilingual RAG platform matching citizens with government welfare schemes using semantic vector search.",
    problem:
      "Government welfare schemes in India are published across hundreds of fragmented state portals, official gazettes, and PDF circulars. Non-technical citizens and rural communities struggle to discover eligibility criteria due to bureaucratic language, lack of regional translation, and complex criteria cross-referencing.",
    solution:
      "Engineered an offline-indexed RAG platform that parses official welfare gazettes into chunked vector embeddings stored in a FAISS index. Developed a multilingual retrieval pipeline via FastAPI and React that provides natural-language eligibility verification with strict source grounding to prevent LLM hallucinations.",
    architecture: `+-----------------------------------------------------------------------------------+
|                            JanAI System Architecture                              |
+-----------------------------------------------------------------------------------+
|  Citizen Query (Voice / Text in Regional Languages)                               |
|        │                                                                          |
|        ▼                                                                          |
|  [ Multilingual Normalizer & Vector Embedding Generator ]                          |
|        │                                                                          |
|        ▼                                                                          |
|  [ Semantic Vector Retriever (FAISS Index / Cosine Matrix) ] ◄── Scheme Guidelines |
|        │                                                                          |
|        ▼                                                                          |
|  [ Top-K Context Formatting & Strict Hallucination Guardrails ]                    |
|        │                                                                          |
|        ▼                                                                          |
|  [ LLM Inference Engine (Grounded Prompt Context) ]                               |
|        │                                                                          |
|        ▼                                                                          |
|  Eligible Schemes Answer + Official Gazetted Source Citation Badges               |
+-----------------------------------------------------------------------------------+`,
    decisions: [
      "FAISS over remote vector DBs: Chose local FAISS index for deterministic cosine similarity queries and sub-10ms retrieval without recurring SaaS database costs.",
      "Strict Grounding Boundary: System prompt instructs the model to refuse answering if the retrieved chunk does not contain verifiable eligibility criteria, driving zero hallucinations.",
      "Multilingual Pre-Processing: Normalizes regional query phrasing into English semantic tokens before FAISS lookup, preserving local colloquialisms."
    ],
    metrics: [
      { label: "Vector Search", value: "FAISS Cosine Matrix" },
      { label: "Backend API", value: "FastAPI Asynchronous" },
      { label: "Frontend", value: "React 19 & Tailwind" },
      { label: "Grounding", value: "Source Citations" }
    ],
    features: [
      "Natural language eligibility checking based on demographic and income profile",
      "Strict context grounding against official government circulars",
      "Step-by-step required document checklist generation",
      "Voice query input support via Web Speech API in regional dialects"
    ],
    tech: ["React 19", "FastAPI", "Python", "FAISS", "OpenAI / Gemini API", "Tailwind CSS"],
    github: "https://github.com/deswanth12",
    demo: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/"
  },

  zeus: {
    id: "zeus",
    number: "02",
    title: "Zeus Robot",
    subtitle: "Autonomous Robotics & SLAM Platform",
    year: "2026",
    category: "Autonomous Systems & Edge AI",
    tagline: "Multipurpose indoor robotics system integrating ROS 2 SLAM navigation, 360° LiDAR, and edge computer vision.",
    problem:
      "Indoor autonomous mobile robots typically suffer from high compute latencies, fragile localization in dynamic environments, and reliance on tethered compute or cloud offloading for spatial mapping and object classification.",
    solution:
      "Architected a standalone differential-drive mobile robotics platform powered by a Raspberry Pi 4 B running ROS 2 Humble. Integrated an RPLIDAR S2 360° laser scanner with IMU sensor fusion for Cartographer SLAM, paired with an Arduino Mega PID motor controller and edge YOLO v8 object classification.",
    architecture: `+-----------------------------------------------------------------------------------+
|                           Zeus Robot Hardware Architecture                        |
+-----------------------------------------------------------------------------------+
|  Sensors: 360° RPLiDAR S2 + MPU-6050 IMU + Hall Wheel Encoders + Camera          |
|        │                                                                          |
|        ▼                                                                          |
|  [ Raspberry Pi 4 B (ROS 2 Humble / Ubuntu 22.04 LTS) ]                           |
|     ├── 1. Cartographer SLAM Indoor 2D Mapping Node                               |
|     ├── 2. Nav2 Costmap & Waypoint Path Planning Node                             |
|     └── 3. Edge YOLO v8 & OpenCV Object Classification                            |
|        │                                                                          |
|        ▼                                                                          |
|  [ Arduino Mega / ESP32 PID Motor Controller ] ──► Differential Drive Motors       |
|        │                                                                          |
|        ▼                                                                          |
|  [ WebSockets Telemetry Bridge ] ──► [ React Real-Time Telemetry Radar Canvas ]    |
+-----------------------------------------------------------------------------------+`,
    decisions: [
      "ROS 2 Humble over ROS 1: Selected ROS 2 for native DDS publish/subscribe communication and deterministic real-time executor capabilities on edge Linux.",
      "Separation of Concerns: Delegated closed-loop PID motor PWM to an Arduino microcontroller via serial UART to keep the Raspberry Pi CPU dedicated to SLAM and vision pipelines.",
      "Local Telemetry Bridge: Built a lightweight WebSocket bridge streaming LiDAR scan angles and obstacle distances to a browser-based radar canvas."
    ],
    metrics: [
      { label: "Core Architecture", value: "ROS 2 Humble" },
      { label: "LiDAR Hardware", value: "RPLIDAR S2 360°" },
      { label: "Edge Computer", value: "Raspberry Pi 4 B" },
      { label: "Motor Control", value: "Closed-loop PID" }
    ],
    features: [
      "Simultaneous Localization and Mapping (SLAM) for indoor navigation",
      "Edge AI obstacle and object classification using YOLO v8 & OpenCV",
      "Closed-loop PID velocity control with optical encoder feedback",
      "Real-time LiDAR point-cloud telemetry visualizer over WebSockets"
    ],
    tech: ["ROS 2 Humble", "Python", "OpenCV", "YOLO v8", "Raspberry Pi 4", "Arduino", "WebSockets"],
    github: "https://github.com/deswanth12",
    demo: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/"
  },

  sagiro: {
    id: "sagiro",
    number: "03",
    title: "Sagiro",
    subtitle: "Personal Finance & Ledger Application",
    year: "2025",
    category: "Mobile Architecture & Systems",
    tagline: "Offline-first personal expense tracker engineered with local-first persistence and zero external trackers.",
    problem:
      "Most contemporary personal finance applications require persistent cloud connectivity, monetize user spending behaviors through third-party tracking SDKs, or fail completely when users are in offline or low-connectivity environments.",
    solution:
      "Engineered Sagiro as an offline-first Android financial tracker built on a local SQLite / Room database. Architected a deterministic transaction ledger, local cryptographic backups, and real-time expense velocity calculations without sending a single byte of telemetry to external servers.",
    architecture: `+-----------------------------------------------------------------------------------+
|                         Sagiro Local-First Architecture                           |
+-----------------------------------------------------------------------------------+
|  User Transaction Entry / Recurring Rule / Budget Allocation                      |
|        │                                                                          |
|        ▼                                                                          |
|  [ UI Layer (Jetpack Compose / Android Native Architecture) ]                     |
|        │                                                                          |
|        ▼                                                                          |
|  [ Financial Ledger Engine & Velocity Calculator ]                                |
|        │                                                                          |
|        ▼                                                                          |
|  [ Room ORM / DAO Transaction Boundary with Invariants Validation ]               |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite Local Database (Encrypted Local Storage) ] ──► [ Local JSON/CSV Backup ]|
+-----------------------------------------------------------------------------------+`,
    decisions: [
      "Offline-First by Design: Every read and write transaction touches local SQLite synchronously, guaranteeing zero network latency and complete privacy.",
      "Deterministic Ledger: Transactions use immutable balance delta entries to prevent calculation drift and race conditions during rapid entry.",
      "Zero SDK Tracking: Deliberately removed all advertising and analytics dependencies, resulting in instant startup and minimal battery drain."
    ],
    metrics: [
      { label: "Architecture", value: "Offline-First Local" },
      { label: "Persistence", value: "SQLite / Room DB" },
      { label: "Network State", value: "Zero External Calls" },
      { label: "Platform", value: "Android Native" }
    ],
    features: [
      "Deterministic transaction ledger with categorization velocity charts",
      "Recurring expense rules and automated budget threshold tracking",
      "Local cryptographic export and import backup functionality",
      "Clean, tactile dark interface designed for fast single-handed logging"
    ],
    tech: ["Android Native", "Kotlin", "SQLite", "Room DB", "Jetpack Compose", "Coroutines"],
    github: "https://github.com/deswanth12",
    demo: "https://github.com/deswanth12"
  },

  evalmesh: {
    id: "evalmesh",
    number: "04",
    title: "EvalMesh",
    subtitle: "AI & RAG Evaluation Framework",
    year: "2025",
    category: "AI Evaluation & Guardrails",
    tagline: "Automated benchmarking suite measuring RAG precision, context recall, and hallucination rates.",
    problem:
      "Deploying RAG pipelines without continuous automated regression testing leads to silent hallucinations, unmonitored context dilution, and degraded retrieval accuracy as document collections evolve.",
    solution:
      "Built an automated evaluation pipeline that computes Ragas faithfulness metrics, context precision, and latency benchmarks against prompt regression test suites before production deployment.",
    architecture: `+-----------------------------------------------------------------------------------+
|                           EvalMesh Architecture Pipeline                          |
+-----------------------------------------------------------------------------------+
|  RAG Application Context & Generated Grounded Outputs                             |
|        │                                                                          |
|        ▼                                                                          |
|  [ Ragas Metric Engine: Faithfulness, Context Precision, Context Recall ]         |
|        │                                                                          |
|        ▼                                                                          |
|  [ Guardrails Validator: Hallucination Detection & Context Drift Check ]          |
|        │                                                                          |
|        ▼                                                                          |
|  [ Latency & TTFT Tracker: Token Speed & Benchmark Telemetry ]                    |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite Benchmark Store ] ──► [ Visual Comparative Radar Dashboard ]           |
+-----------------------------------------------------------------------------------+`,
    decisions: [
      "Automated Regression Harness: Tests every prompt variation against a ground-truth QA dataset to catch subtle context drift before pushing to production.",
      "Dual-Metric Scoring: Separates retrieval precision (did we find the right chunks?) from generator faithfulness (did the LLM invent facts?), pinpointing bugs immediately."
    ],
    metrics: [
      { label: "Evaluation Suite", value: "Ragas Framework" },
      { label: "Metrics Tracked", value: "Precision & Recall" },
      { label: "Storage", value: "SQLite Benchmark DB" },
      { label: "Visualizer", value: "Radar Metrics Chart" }
    ],
    features: [
      "Automated prompt regression testing across model versions",
      "Real-time hallucination & ungrounded statement detection",
      "Time-to-first-token (TTFT) and throughput latency benchmarking",
      "Comparative visual radar metrics for RAG pipeline versions"
    ],
    tech: ["Python", "FastAPI", "React", "Ragas", "Pandas", "Scikit-Learn"],
    github: "https://github.com/deswanth12",
    demo: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/"
  },

  "security-toolkit": {
    id: "security-toolkit",
    number: "05",
    title: "Cyber Security Toolkit",
    subtitle: "Network Inspection & Audit Utility",
    year: "2025",
    category: "Network Security & Tooling",
    tagline: "Python security utility for network inspection, multi-threaded port scanning, and audit logging.",
    problem:
      "Security students and developers frequently need lightweight, modular utilities to inspect local network traffic, audit open ports, and record persistent security logs without configuring heavyweight enterprise monitoring suites.",
    solution:
      "Developed a modular Python utility combining raw socket programming, packet header analysis, multi-threaded port auditing, and SQLite audit logging in a focused CLI and GUI interface.",
    architecture: `+-----------------------------------------------------------------------------------+
|                         Cyber Security Toolkit Pipeline                           |
+-----------------------------------------------------------------------------------+
|  Target Network Range / Host IP Input                                             |
|        │                                                                          |
|        ▼                                                                          |
|  [ Python Raw Socket Scanner & Multi-Threaded Worker Pool ]                       |
|        │                                                                          |
|        ▼                                                                          |
|  [ Service Banner Grabber & TCP/UDP Port Auditor ]                                |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite Audit Logger ] ──► [ Structured CLI Terminal & GUI Table ]              |
+-----------------------------------------------------------------------------------+`,
    decisions: [
      "Threaded Worker Pool: Implemented concurrent worker threads using Python's threading library to reduce subnet scan times from minutes to seconds.",
      "Persistent Event Logging: Logged every scan attempt, open socket, and banner into an offline SQLite database for chronological audit analysis."
    ],
    metrics: [
      { label: "Language", value: "Python 3.12" },
      { label: "Architecture", value: "Multi-threaded Sockets" },
      { label: "Database", value: "SQLite Audit Log" },
      { label: "Interface", value: "CLI + Tkinter GUI" }
    ],
    features: [
      "Multi-threaded TCP/UDP port scanner with banner grabbing",
      "Packet header inspection and network interface analyzer",
      "Persistent SQLite security event audit database",
      "Modular Python package structure suitable for CLI workflows"
    ],
    tech: ["Python", "SQLite", "Socket Programming", "Networking", "Tkinter"],
    github: "https://github.com/deswanth12/Cyber-Security-Toolkit",
    demo: "https://github.com/deswanth12/Cyber-Security-Toolkit"
  },

  "student-db": {
    id: "student-db",
    number: "06",
    title: "Student Database System",
    subtitle: "Desktop Records Management System",
    year: "2024",
    category: "Desktop Systems & Persistence",
    tagline: "Desktop database application for managing student academic records with SQLite persistence.",
    problem:
      "Educational administrative workflows require fast, offline local database systems with dependable CRUD forms, instant search filtering, and zero cloud lock-in.",
    solution:
      "Built a desktop database application using Python Tkinter and SQLite supporting instant student record lookups, registration management, and CSV data exports.",
    architecture: `+-----------------------------------------------------------------------------------+
|                       Student Database System Architecture                        |
+-----------------------------------------------------------------------------------+
|  Administrative User Action (Create, Search, Edit, Delete Record)                 |
|        │                                                                          |
|        ▼                                                                          |
|  [ Tkinter Desktop Form UI & Form Input Validator ]                               |
|        │                                                                          |
|        ▼                                                                          |
|  [ Python Database Abstraction Layer ]                                            |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite3 Relational Engine ] ──► CSV / Report Exporter                          |
+-----------------------------------------------------------------------------------+`,
    decisions: [
      "Pure Offline Persistence: Selected SQLite3 to eliminate external database servers and provide immediate file portability.",
      "Input Validation Boundary: Sanitized and validated all student IDs and phone numbers in memory before executing parameterized SQL statements."
    ],
    metrics: [
      { label: "Framework", value: "Python Tkinter" },
      { label: "Database Engine", value: "SQLite3" },
      { label: "Data Integrity", value: "Parameterized SQL" },
      { label: "Export Format", value: "CSV Reports" }
    ],
    features: [
      "Real-time search filtering across student names, roll numbers, and departments",
      "Validated input forms to prevent database constraint violations",
      "Instant CSV export for administrative report compilation",
      "Self-contained zero-configuration local desktop application"
    ],
    tech: ["Python", "SQLite3", "Tkinter GUI", "CRUD Architecture"],
    github: "https://github.com/deswanth12/studentdatabase",
    demo: "https://github.com/deswanth12/studentdatabase"
  }
};

