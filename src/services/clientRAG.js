/**
 * Client-Side Grounded RAG Vector Engine
 * Verified portfolio knowledge base for K. Deswanth
 * Strictly grounded: no hallucinations, zero speculative answers.
 */

export const KNOWLEDGE_BASE = [
  {
    id: "about",
    source: "ABOUT // PROFILE",
    caseStudyId: null,
    heading: "Profile & Summary",
    text: "Kuchi Deswanth is a systems builder and software engineer based in Tirupati, Andhra Pradesh, India. He works at the intersection of full-stack software, autonomous robotics hardware, and local-first architecture. Currently focused on production RAG platforms, local-first Android mobile ledgers, and edge ROS 2 robotics navigation.",
    keywords: ["deswanth", "kuchi", "location", "tirupati", "bio", "background", "engineer", "builder", "profile", "creator", "based", "live", "lives", "city", "india"]
  },
  {
    id: "janai",
    source: "JANAI CASE STUDY",
    caseStudyId: "janai",
    heading: "JanAI — Civic Welfare Discovery Platform",
    text: "JanAI is an AI-powered civic scheme discovery platform developed by Deswanth. It matches citizens with government welfare schemes using multilingual semantic vector search. Built with React 19, FastAPI, and a local FAISS cosine vector index for sub-10ms retrieval with strict source citation boundaries to eliminate hallucinations.",
    keywords: ["janai", "welfare", "scheme", "schemes", "civic", "rag", "faiss", "vector", "citizen", "government", "multilingual"]
  },
  {
    id: "zeus",
    source: "ZEUS CASE STUDY",
    caseStudyId: "zeus",
    heading: "Zeus Robot — Autonomous ROS 2 & LiDAR Platform",
    text: "Zeus Robot is an autonomous mobile robotics platform designed and built by Deswanth. Powered by a Raspberry Pi 4 B running ROS 2 Humble and Ubuntu 22.04 LTS. Features Cartographer SLAM 2D mapping, an RPLIDAR S2 360° laser scanner at 30Hz, MPU-6050 IMU sensor fusion, Arduino closed-loop PID motor velocity control, edge YOLO v8 object classification, and a WebSockets real-time radar telemetry canvas.",
    keywords: ["zeus", "robot", "robotics", "ros", "ros2", "lidar", "slam", "rplidar", "navigation", "raspberry", "pi", "hardware", "arduino", "imu", "motor", "pid"]
  },
  {
    id: "sagiro",
    source: "SAGIRO CASE STUDY",
    caseStudyId: "sagiro",
    heading: "Sagiro — Offline-First Mobile Ledger",
    text: "Sagiro is an offline-first personal finance management ledger built natively for Android using Kotlin, Room ORM, and local SQLite. All transaction reads and writes touch local SQLite synchronously with deterministic balance recalculation, local cryptographic backups, and zero outbound network telemetry.",
    keywords: ["sagiro", "finance", "money", "ledger", "offline", "android", "kotlin", "room", "sqlite", "local", "privacy", "transactions"]
  },
  {
    id: "evalmesh",
    source: "EVALMESH CASE STUDY",
    caseStudyId: "evalmesh",
    heading: "EvalMesh — RAG Evaluation & Benchmarking Rig",
    text: "EvalMesh is an automated AI evaluation and RAG benchmarking framework engineered by Deswanth. Built with Python, FastAPI, React, and the Ragas framework. It evaluates retrieval precision, context recall, faithfulness scoring, prompt regression test suites, and response latency telemetry across LLM revisions.",
    keywords: ["evalmesh", "ragas", "evaluation", "eval", "benchmark", "faithfulness", "precision", "hallucination", "metrics", "test", "rig"]
  },
  {
    id: "security-toolkit",
    source: "SECURITY TOOLKIT",
    caseStudyId: "security-toolkit",
    heading: "Cyber Security Toolkit",
    text: "Cyber Security Toolkit is a Python package built by Deswanth for network security workflows. It includes a multi-threaded port scanner, raw socket connection inspection, packet analysis, and a local SQLite audit logger. GitHub: https://github.com/deswanth12/Cyber-Security-Toolkit",
    keywords: ["security", "cyber", "network", "port", "scanner", "sockets", "packet", "audit", "toolkit"]
  },
  {
    id: "student-db",
    source: "STUDENT DB CASE STUDY",
    caseStudyId: "student-db",
    heading: "Desktop Database Systems",
    text: "Deswanth built desktop database management systems (Student Database System, Staff Management, Library System) using Python, Tkinter GUI, and SQLite3 with parameterized CRUD queries and offline local storage.",
    keywords: ["student", "database", "desktop", "tkinter", "staff", "library", "crud", "management"]
  },
  {
    id: "sqlite",
    source: "SYSTEMS ARCHITECTURE",
    caseStudyId: "sagiro",
    heading: "Projects Using SQLite",
    text: "Deswanth uses SQLite across three major systems: 1. Sagiro (offline-first Android financial ledger via Room ORM), 2. Cyber Security Toolkit (local connection audit log storage), 3. Student & Staff Management Systems (desktop relational data engine in Python).",
    keywords: ["sqlite", "sql", "database", "room", "storage", "local"]
  },
  {
    id: "skills",
    source: "TECHNICAL DISCIPLINES",
    caseStudyId: null,
    heading: "Skills & Stack",
    text: "Core technical stack: Languages (Python, JavaScript ES6+, Kotlin, SQL). Application Layers (React 19, FastAPI, Tailwind CSS, Vite). Systems & Data (SQLite3, Room ORM, FAISS Vector Index, WebSockets). Hardware & Robotics (ROS 2 Humble, Raspberry Pi 4 B, RPLIDAR S2 360°, ESP32, PID Motor Control).",
    keywords: ["skills", "technologies", "tech", "stack", "languages", "tools", "frameworks", "python", "react", "fastapi", "kotlin"]
  },
  {
    id: "decisions",
    source: "ENGINEERING DECISIONS",
    caseStudyId: null,
    heading: "Key Engineering Decisions",
    text: "Key architectural decisions: 1. FAISS local cosine vector index over cloud DBs for sub-10ms retrieval without recurring costs. 2. ROS 2 Humble over ROS 1 for native DDS real-time execution on edge Linux. 3. Native Kotlin and local SQLite for Sagiro to guarantee zero telemetry and private personal financial data.",
    keywords: ["decisions", "architecture", "tradeoffs", "why", "rationale", "design"]
  },
  {
    id: "timeline",
    source: "DEVELOPMENT TIMELINE",
    caseStudyId: null,
    heading: "Development Timeline",
    text: "2026: Autonomous Robotics (Zeus ROS 2 SLAM), JanAI Welfare RAG, and Sagiro offline ledger. 2025: Full-stack React, FastAPI microservices, and network security utilities. 2024: Desktop database applications in Python/Tkinter/SQLite. 2023: Algorithmic foundations and computational mathematics.",
    keywords: ["timeline", "chronology", "journey", "history", "years", "2026", "2025", "2024", "2023"]
  },
  {
    id: "contact",
    source: "CONTACT DIRECTORY",
    caseStudyId: null,
    heading: "Contact & Links",
    text: "Contact K. Deswanth via Email: kdeswanth@gmail.com | Phone: +91 8374646073 | GitHub: https://github.com/deswanth12 | LinkedIn: https://www.linkedin.com/in/deswanth | Location: Tirupati, Andhra Pradesh, India.",
    keywords: ["contact", "email", "github", "linkedin", "hire", "phone", "reach", "message"]
  }
];

const STOP_WORDS = new Set([
  "who", "what", "which", "where", "when", "why", "how",
  "the", "and", "for", "with", "this", "that", "from",
  "are", "was", "were", "did", "does", "can", "tell", "about", "his"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

const INDEXED_CHUNKS = KNOWLEDGE_BASE.map((chunk) => {
  const corpus = `${chunk.source} ${chunk.heading} ${chunk.text} ${chunk.keywords.join(" ")}`;
  const tokens = tokenize(corpus);
  const tokenFreq = {};
  tokens.forEach((t) => {
    tokenFreq[t] = (tokenFreq[t] || 0) + 1;
  });
  return {
    ...chunk,
    tokens,
    tokenFreq,
    headingLower: chunk.heading.toLowerCase(),
    sourceLower: chunk.source.toLowerCase()
  };
});

const QUERY_CACHE = new Map();

/**
 * Searches the verified portfolio knowledge base with strict grounding.
 * Returns { answer, sources: [{ label, caseStudyId }] }
 */
export function searchClientKnowledge(query) {
  const rawQuery = query.trim();
  const normalizedQuery = rawQuery.toLowerCase();
  
  if (QUERY_CACHE.has(normalizedQuery)) {
    return QUERY_CACHE.get(normalizedQuery);
  }

  const qTokens = tokenize(rawQuery);
  if (!qTokens.length) {
    return {
      answer: "Please ask a question about Deswanth's projects, systems, architecture, or skills.",
      sources: []
    };
  }

  const scored = INDEXED_CHUNKS.map((chunk) => {
    let score = 0;

    qTokens.forEach((qt) => {
      // Keyword exact match boost
      if (chunk.keywords.includes(qt)) {
        score += 5.0;
      }
      // Token frequency score
      if (chunk.tokenFreq[qt]) {
        score += chunk.tokenFreq[qt] * 2.5;
      }
      // Heading or source match
      if (chunk.headingLower.includes(qt) || chunk.sourceLower.includes(qt)) {
        score += 4.0;
      }
    });

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.filter((item) => item.score >= 3.0).slice(0, 3);

  // STRICT GROUNDING: If no high-confidence match exists in the verified knowledge base
  if (!topMatches.length) {
    const fallbackRes = {
      answer: "I don't have verified information about that in Deswanth's portfolio.",
      sources: []
    };
    QUERY_CACHE.set(normalizedQuery, fallbackRes);
    return fallbackRes;
  }

  // Synthesize concise, grounded answers for specific common inquiries
  let answerText;
  const sourcesMap = new Map();

  topMatches.forEach((m) => {
    if (m.chunk.source && !sourcesMap.has(m.chunk.source)) {
      sourcesMap.set(m.chunk.source, {
        label: m.chunk.source,
        caseStudyId: m.chunk.caseStudyId
      });
    }
  });

  if (normalizedQuery.includes("ros 2") || normalizedQuery.includes("ros2")) {
    answerText = "Deswanth built the Zeus Robot platform with ROS 2 (Humble). It runs on a Raspberry Pi 4 B, coordinating Cartographer SLAM 2D occupancy mapping, 360° LiDAR scanning via RPLIDAR S2 at 30Hz, IMU sensor fusion, and closed-loop motor PID control.";
    sourcesMap.set("ZEUS CASE STUDY", { label: "ZEUS CASE STUDY", caseStudyId: "zeus" });
  } else if (normalizedQuery.includes("zeus")) {
    answerText = "Zeus is an autonomous multipurpose robotics platform engineered by Deswanth. It combines ROS 2 Humble on a Raspberry Pi 4, RPLIDAR S2 360° laser mapping, Cartographer SLAM, edge YOLO v8 object classification, and a WebSockets real-time radar telemetry canvas.";
    sourcesMap.set("ZEUS CASE STUDY", { label: "ZEUS CASE STUDY", caseStudyId: "zeus" });
  } else if (normalizedQuery.includes("janai")) {
    answerText = "JanAI is a civic welfare scheme discovery platform built by Deswanth. It parses government welfare circulars into vector chunks stored in a local FAISS index. Citizens can query eligibility criteria in natural language with strict source citations to eliminate hallucinations.";
    sourcesMap.set("JANAI CASE STUDY", { label: "JANAI CASE STUDY", caseStudyId: "janai" });
  } else if (normalizedQuery.includes("sqlite")) {
    answerText = "Deswanth uses SQLite across three engineered systems:\n\n1. Sagiro — Offline-first Android financial ledger using Room ORM and synchronous local SQLite.\n2. Cyber Security Toolkit — Local connection and network audit logging.\n3. Student & Staff Management Systems — Desktop relational databases built with Python and Tkinter.";
    sourcesMap.set("SAGIRO CASE STUDY", { label: "SAGIRO CASE STUDY", caseStudyId: "sagiro" });
    sourcesMap.set("SECURITY TOOLKIT", { label: "SECURITY TOOLKIT", caseStudyId: "security-toolkit" });
  } else if (normalizedQuery.includes("sagiro")) {
    answerText = "Sagiro is an offline-first personal finance ledger built natively for Android in Kotlin. It uses Room ORM and local SQLite with deterministic balance recalculation, cryptographic local backups, and zero outbound network telemetry.";
    sourcesMap.set("SAGIRO CASE STUDY", { label: "SAGIRO CASE STUDY", caseStudyId: "sagiro" });
  } else if (normalizedQuery.includes("evalmesh")) {
    answerText = "EvalMesh is an automated AI evaluation and RAG benchmarking rig engineered by Deswanth. Built with Python, FastAPI, and Ragas, it measures context precision, context recall, faithfulness scoring, and response latency telemetry across LLM prompt revisions.";
    sourcesMap.set("EVALMESH CASE STUDY", { label: "EVALMESH CASE STUDY", caseStudyId: "evalmesh" });
  } else if (normalizedQuery.includes("technology") || normalizedQuery.includes("technologies") || normalizedQuery.includes("tech stack") || normalizedQuery.includes("skills")) {
    answerText = "Deswanth's verified technical stack spans four disciplines:\n\n• Build: React 19, JavaScript ES6+, Python, FastAPI, Kotlin (Android Native), Tailwind CSS, Vite.\n• Systems: SQLite3, Room ORM, FAISS Vector Index, WebSockets, Local-First Architecture.\n• AI: RAG Pipelines, FAISS Cosine Retrieval, Ragas Evaluation Harness.\n• Hardware: ROS 2 Humble, Raspberry Pi 4 B, RPLIDAR S2 360°, ESP32, PID Motor Control.";
  } else if (normalizedQuery.includes("who is") || (normalizedQuery.includes("about") && normalizedQuery.includes("deswanth"))) {
    answerText = "Kuchi Deswanth is a systems builder and software engineer based in Tirupati, Andhra Pradesh, India. He builds production-ready RAG platforms, local-first Android mobile ledgers, and autonomous robotics with ROS 2.";
    sourcesMap.set("ABOUT // PROFILE", { label: "ABOUT // PROFILE", caseStudyId: null });
  } else if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("linkedin")) {
    answerText = "You can contact Deswanth via Email at kdeswanth@gmail.com, view his code at https://github.com/deswanth12, or connect on LinkedIn at https://www.linkedin.com/in/deswanth.";
    sourcesMap.set("CONTACT DIRECTORY", { label: "CONTACT DIRECTORY", caseStudyId: null });
  } else {
    // Default grounded retrieval directly from top matched chunk
    answerText = topMatches[0].chunk.text;
  }

  const sources = Array.from(sourcesMap.values());
  const result = { answer: answerText, sources };
  QUERY_CACHE.set(normalizedQuery, result);
  return result;
}
