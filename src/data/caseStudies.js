export const CASE_STUDIES = {
  janai: {
    id: "janai",
    title: "JanAI — AI Civic Scheme Discovery Platform",
    category: "AI & RAG Systems",
    tagline: "Multi-lingual RAG AI assistant that matches citizens with 500+ government welfare schemes.",
    problem:
      "Information asymmetry prevents millions of non-technical citizens and rural communities from discovering eligible government welfare schemes buried across complex gazettes and state portals.",
    solution:
      "JanAI indexes 500+ official scheme guidelines into a FAISS vector database and uses multi-lingual RAG to provide natural language eligibility matching and document checklists in regional languages without hallucination.",
    architecture: `
+-----------------------------------------------------------------------------------+
|                            JanAI System Architecture                              |
+-----------------------------------------------------------------------------------+
|  Citizen Query (Voice / Text in Regional Languages)                               |
|        │                                                                          |
|        ▼                                                                          |
|  [ Multilingual Normalizer & Vector Embedding Generator ]                          |
|        │                                                                          |
|        ▼                                                                          |
|  [ Semantic Vector Retriever (FAISS Index / Cosine Matrix) ] ◄── Scheme Datasets  |
|        │                                                                          |
|        ▼                                                                          |
|  [ Top-K Context Formatting & Strict Grounding Rules ]                            |
|        │                                                                          |
|        ▼                                                                          |
|  [ LLM Inference Engine (OpenAI GPT-4o / Gemini Flash) ]                          |
|        │                                                                          |
|        ▼                                                                          |
|  Eligible Schemes Answer + Official Portal Sources Citation Badges                |
+-----------------------------------------------------------------------------------+
`,
    metrics: [
      { label: "RAG Response Latency", value: "1.2s Average" },
      { label: "Schemes Indexed", value: "500+ Verified" },
      { label: "Factual Accuracy", value: "Ragas Benchmarked" },
      { label: "Multilingual Support", value: "English, Hindi, Telugu" }
    ],
    features: [
      "Natural language eligibility checking based on demographic profile",
      "Strict context grounding to prevent AI hallucinations",
      "Step-by-step document application checklists & administrative locator",
      "Voice query input support via Web Speech API"
    ],
    tech: ["React 19", "FastAPI", "RAG Engine", "FAISS", "OpenAI / Gemini API", "Tailwind CSS"],
    github: "https://github.com/deswanth12",
    demo: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/"
  },
  evalmesh: {
    id: "evalmesh",
    title: "EvalMesh — AI & RAG Evaluation Framework",
    category: "AI Evaluation & Guardrails",
    tagline: "Automated benchmarking suite for measuring RAG retrieval precision, context recall, and hallucination rates.",
    problem:
      "Deploying RAG pipelines without automated regression testing leads to silent hallucinations, degraded retrieval precision, and unmonitored API latency spikes.",
    solution:
      "EvalMesh provides automated evaluation pipelines that run Ragas precision metrics, faithfulness checks, and latency benchmarks across model prompts before production deployment.",
    architecture: `
+-----------------------------------------------------------------------------------+
|                           EvalMesh Architecture Pipeline                          |
+-----------------------------------------------------------------------------------+
|  RAG Application Context & Generated Outputs                                      |
|        │                                                                          |
|        ▼                                                                          |
|  [ Ragas Evaluation Engine: Faithfulness, Context Precision, Context Recall ]      |
|        │                                                                          |
|        ▼                                                                          |
|  [ Guardrails Validator: Hallucination Detection & Toxicity Filter ]               |
|        │                                                                          |
|        ▼                                                                          |
|  [ Latency & TTFT Tracker: Token Speed & API Response Benchmarking ]              |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite Metrics Store ] ──► [ React & Chart.js Visual Radar Dashboard ]         |
+-----------------------------------------------------------------------------------+
`,
    metrics: [
      { label: "Evaluation Suite", value: "Automated Ragas" },
      { label: "Metrics Tracked", value: "Faithfulness & Precision" },
      { label: "Model Providers", value: "OpenAI, Gemini, Ollama" },
      { label: "Dashboard", value: "Real-time Radar Charts" }
    ],
    features: [
      "Automated prompt regression testing across model versions",
      "Real-time hallucination & ungrounded output detection",
      "Time-to-first-token (TTFT) and throughput benchmarking",
      "Interactive radar charts & comparative run history"
    ],
    tech: ["Python", "FastAPI", "React", "Ragas", "Pandas", "Scikit-Learn", "Recharts"],
    github: "https://github.com/deswanth12",
    demo: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/"
  },
  zeus: {
    id: "zeus",
    title: "Zeus Robot — Autonomous Robotics Platform",
    category: "Autonomous Systems & Edge AI",
    tagline: "Multipurpose ROS 2 robotics system featuring SLAM navigation and real-time edge AI object vision.",
    problem:
      "Indoor autonomous mobile robots require low-latency spatial mapping, sensor fusion, and edge object classification without relying on cloud processing.",
    solution:
      "Zeus Robot integrates ROS 2 Humble SLAM navigation, LiDAR + IMU sensor fusion, and lightweight YOLO v8 edge vision on Raspberry Pi 4 B connected to a React WebSockets telemetry dashboard.",
    architecture: `
+-----------------------------------------------------------------------------------+
|                           Zeus Robot Hardware Architecture                         |
+-----------------------------------------------------------------------------------+
|  Sensors: LiDAR + IMU + Wheel Encoders + Camera                                   |
|        │                                                                          |
|        ▼                                                                          |
|  [ Raspberry Pi 4 B (ROS 2 Humble) ]                                              |
|     ├── 1. SLAM Indoor Mapping & Waypoint Path Planner                            |
|     └── 2. Edge YOLO v8 & OpenCV Object Detection (30 FPS)                         |
|        │                                                                          |
|        ▼                                                                          |
|  [ Arduino Mega / ESP32 PID Motor Controller ] ──► Differential Drive Wheels      |
|        │                                                                          |
|        ▼                                                                          |
|  [ WebSockets & MQTT Telemetry Bridge ] ──► [ React Web Telemetry Dashboard ]     |
+-----------------------------------------------------------------------------------+
`,
    metrics: [
      { label: "ROS 2 Version", value: "Humble Hawksbill" },
      { label: "Vision Frame Rate", value: "30 FPS Edge YOLO" },
      { label: "Compute Hardware", value: "Raspberry Pi 4 B" },
      { label: "Telemetry Protocol", value: "WebSockets / MQTT" }
    ],
    features: [
      "Simultaneous Localization and Mapping (SLAM) for indoor navigation",
      "Edge AI object classification using YOLO v8 & OpenCV acceleration",
      "Closed-loop PID motor speed control with wheel encoder feedback",
      "Real-time video streaming & telemetry web dashboard"
    ],
    tech: ["ROS 2", "Python", "OpenCV", "YOLO v8", "Raspberry Pi 4", "Arduino", "WebSockets"],
    github: "https://github.com/deswanth12",
    demo: "https://portfolio-plum-sigma-etfrkmq5t9.vercel.app/"
  },
  "security-toolkit": {
    id: "security-toolkit",
    title: "Cyber Security Toolkit",
    category: "Network Security & Tooling",
    tagline: "Python security utility for network inspection, port scanning, packet analysis, and audit logging.",
    problem:
      "Security developers require modular, lightweight CLI utilities to inspect local network traffic, audit open ports, and record persistent security logs.",
    solution:
      "Developed a modular Python toolkit combining socket programming, packet analysis, port scanning, and SQLite audit logging in a clean interface.",
    architecture: `
+-----------------------------------------------------------------------------------+
|                         Cyber Security Toolkit Pipeline                           |
+-----------------------------------------------------------------------------------+
|  Target Network Range / IP Address Input                                           |
|        │                                                                          |
|        ▼                                                                          |
|  [ Python Socket Scanner & Packet Inspector Module ]                              |
|        │                                                                          |
|        ▼                                                                          |
|  [ Network Port Auditor & Service Signature Analyzer ]                            |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite Audit Logger ] ──► [ Command Line & Tkinter Security Interface ]        |
+-----------------------------------------------------------------------------------+
`,
    metrics: [
      { label: "Scan Mode", value: "Multi-threaded Port Scanner" },
      { label: "Database", value: "SQLite Audit Log" },
      { label: "Language", value: "Python 3.12" },
      { label: "Interface", value: "CLI + Desktop GUI" }
    ],
    features: [
      "Multi-threaded TCP/UDP port scanner with service detection",
      "Packet header inspection and network interface analyzer",
      "Persistent SQLite security event audit database",
      "Modular python package structure"
    ],
    tech: ["Python", "SQLite", "Socket Programming", "Networking", "Security"],
    github: "https://github.com/deswanth12/Cyber-Security-Toolkit",
    demo: "https://github.com/deswanth12/Cyber-Security-Toolkit"
  },
  "student-db": {
    id: "student-db",
    title: "Student Database System",
    category: "Desktop Systems & Databases",
    tagline: "Desktop GUI application for managing student academic records with SQLite persistence.",
    problem:
      "Educational administrative workflows require fast, offline local database systems with reliable CRUD forms and instant search filtering.",
    solution:
      "Built a desktop database application using Python Tkinter and SQLite supporting instant student record lookups, registration management, and CSV data exports.",
    architecture: `
+-----------------------------------------------------------------------------------+
|                       Student Database System Architecture                        |
+-----------------------------------------------------------------------------------+
|  User Action (Create, Search, Edit, Delete Student Record)                        |
|        │                                                                          |
|        ▼                                                                          |
|  [ Tkinter Desktop Form UI & Form Input Validator ]                               |
|        │                                                                          |
|        ▼                                                                          |
|  [ Python Database Abstraction Layer ]                                            |
|        │                                                                          |
|        ▼                                                                          |
|  [ SQLite3 Relational Database Engine ] ──► CSV / Report Exporter                 |
+-----------------------------------------------------------------------------------+
`,
    metrics: [
      { label: "GUI Framework", value: "Python Tkinter" },
      { label: "Database", value: "SQLite3" },
      { label: "Operations", value: "Full CRUD & Realtime Filter" },
      { label: "Execution", value: "Offline Desktop App" }
    ],
    features: [
      "Real-time search filtering across student names and IDs",
      "Validated input forms to prevent database constraint errors",
      "CSV export for administrative report generation",
      "Clean dark desktop interface design"
    ],
    tech: ["Python", "SQLite3", "Tkinter GUI", "CRUD Architecture"],
    github: "https://github.com/deswanth12/studentdatabase",
    demo: "https://github.com/deswanth12/studentdatabase"
  }
};
