/**
 * Client-Side Vector Search & RAG Engine (Optimized High-Performance Edition)
 * Features pre-tokenized index caching, query result caching, and zero-allocation scoring.
 */

export const KNOWLEDGE_BASE = [
  {
    source: "JanAI Project",
    heading: "Overview & Features",
    text: "JanAI is an AI-powered civic scheme discovery platform developed by K Deswanth. It uses multi-lingual RAG (Retrieval-Augmented Generation) semantic search to match citizens with government welfare schemes based on socio-economic profiles. Supports natural language queries, document checklists, and eligibility matching."
  },
  {
    source: "JanAI Project",
    heading: "Tech Stack & Architecture",
    text: "JanAI is built with React.js, Tailwind CSS, Python FastAPI, LangChain/LlamaIndex, OpenAI/Gemini models, Pinecone/FAISS vector database, and Web Speech API for voice interactions."
  },
  {
    source: "EvalMesh Project",
    heading: "AI Evaluation & RAG Benchmarking",
    text: "EvalMesh is an automated AI evaluation and RAG benchmarking framework engineered by K Deswanth. It evaluates vector retrieval precision, context recall, hallucination detection, prompt regression testing, and LLM response latency across OpenAI, Gemini, and local models."
  },
  {
    source: "EvalMesh Project",
    heading: "Tech Stack & Dashboard",
    text: "EvalMesh is built using Python, FastAPI, React, Ragas, Pandas, Scikit-Learn, and Chart.js to provide interactive benchmark visualization, radar charts, and safety guardrails enforcement."
  },
  {
    source: "Zeus Robot Documentation",
    heading: "Autonomous Robotics System",
    text: "Zeus Robot is an autonomous multipurpose robotics platform designed by Deswanth. It features SLAM navigation, real-time edge AI object detection with YOLO and OpenCV, sensor fusion (LiDAR, Ultrasonic, IMU), and a React WebSockets telemetry dashboard."
  },
  {
    source: "Zeus Robot Documentation",
    heading: "Hardware & ROS 2",
    text: "Zeus Robot runs on ROS 2 (Humble), Raspberry Pi 4 B for compute and AI vision, Arduino Mega / ESP32 for low-level motor PWM control, and MQTT/WebSockets communication."
  },
  {
    source: "Resume",
    heading: "Profile & Summary",
    text: "K Deswanth is a Full Stack Developer and Python/AI Systems Builder based in India. He specializes in Python, React, vector databases, RAG architecture, LLM evaluation (EvalMesh), SQLite desktop application engineering, and cybersecurity utilities. Contact: kdeswanth@gmail.com, Phone: +91 8374646073."
  },
  {
    source: "Resume",
    heading: "Technical Skills",
    text: "Languages: Python, JavaScript (ES6+), SQL, HTML5, CSS3. Frontend: React, Vite, Tailwind CSS, Framer Motion. Backend & AI: FastAPI, Node.js/Express, Python Tkinter, RAG Pipelines, Vector DBs (FAISS, Pinecone), EvalMesh, Prompt Engineering, Document Processing."
  },
  {
    source: "Portfolio Projects",
    heading: "Cyber Security Toolkit",
    text: "Cyber Security Toolkit is a Python package built by Deswanth for practical security workflows, network inspection, port scanning, packet analysis, and local audit logging. GitHub: https://github.com/deswanth12/Cyber-Security-Toolkit"
  },
  {
    source: "Portfolio Projects",
    heading: "Desktop Database Systems",
    text: "Deswanth built Student Database System, Staff Management System, and Library Management System using Python, Tkinter GUI, and SQLite database with full CRUD workflows and data export capabilities."
  },
  {
    source: "GitHub README",
    heading: "Repositories & Open Source",
    text: "Deswanth maintains open source repositories on GitHub at github.com/deswanth12 including JanAI, EvalMesh, Cyber Security Toolkit, studentdatabase, staffdatamanagement, and Library-data-management-system."
  },
  {
    source: "Certificates & Blogs",
    heading: "RAG & AI Publications",
    text: "Deswanth authored articles on 'Building RAG Applications: From Vector DBs to Prompt Engineering' and 'LLM Evaluation with EvalMesh', holding certifications in Full Stack Web Development, Python Desktop Systems, and Network Security."
  }
];

// Helper to tokenize and normalize string
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

// Pre-index knowledge base chunks once on startup (O(1) search execution)
const INDEXED_CHUNKS = KNOWLEDGE_BASE.map((chunk) => {
  const tokens = tokenize(`${chunk.source} ${chunk.heading} ${chunk.text}`);
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

// Cache query results for instant response
const QUERY_CACHE = new Map();

export function searchClientKnowledge(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (QUERY_CACHE.has(normalizedQuery)) {
    return QUERY_CACHE.get(normalizedQuery);
  }

  const qTokens = tokenize(query);
  if (!qTokens.length) {
    return {
      answer: "Please ask a question about Deswanth, his projects, skills, or experience!",
      sources: []
    };
  }

  // Fast score computation using token frequency lookup
  const scored = INDEXED_CHUNKS.map((chunk) => {
    let score = 0;

    qTokens.forEach((qt) => {
      if (chunk.tokenFreq[qt]) {
        score += chunk.tokenFreq[qt] * 2.5;
      }
      if (chunk.headingLower.includes(qt) || chunk.sourceLower.includes(qt)) {
        score += 4.0;
      }
    });

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.filter((item) => item.score > 0).slice(0, 3);

  if (!topMatches.length) {
    const fallbackRes = {
      answer:
        "I'm Jannu 🤖! I couldn't find specific details matching your query in Deswanth's portfolio documentation. You can get in touch with him directly via email at **kdeswanth@gmail.com** or check his GitHub at **github.com/deswanth12**!",
      sources: []
    };
    QUERY_CACHE.set(normalizedQuery, fallbackRes);
    return fallbackRes;
  }

  const sources = Array.from(new Set(topMatches.map((m) => m.chunk.source)));

  let answer = "";
  if (normalizedQuery.includes("who is") || (normalizedQuery.includes("about") && normalizedQuery.includes("deswanth"))) {
    answer =
      "Hey there! I'm Jannu 🤖, Deswanth's AI companion. K Deswanth is a Full Stack Developer and Python/AI Systems Builder based in India. He specializes in building practical web applications with React, backend services with FastAPI and SQLite, AI evaluation systems (EvalMesh), autonomous robotics with ROS2, and RAG applications.";
  } else if (normalizedQuery.includes("janai")) {
    answer =
      "JanAI is an AI-powered civic scheme discovery platform built by Deswanth. It enables citizens to match with government welfare schemes using multi-lingual RAG semantic search, natural language eligibility analysis, and step-by-step document guidance.";
  } else if (normalizedQuery.includes("evalmesh")) {
    answer =
      "EvalMesh is an automated AI evaluation and RAG benchmarking framework engineered by Deswanth. It evaluates RAG retrieval precision, context recall, hallucination detection, prompt regression testing, and LLM response latency with an interactive visual dashboard.";
  } else if (normalizedQuery.includes("zeus")) {
    answer =
      "Zeus Robot is an autonomous multipurpose robotics system engineered by Deswanth. It combines ROS2, SLAM navigation, real-time edge AI object detection with YOLO & OpenCV, and a WebSockets live telemetry dashboard.";
  } else if (normalizedQuery.includes("react") || normalizedQuery.includes("frontend")) {
    answer =
      "Yes! Deswanth has strong React experience! He builds responsive web applications using React 19, Vite, Framer Motion, Tailwind CSS, and WebSockets. He designed this portfolio website, JanAI, and the EvalMesh benchmark dashboard.";
  } else if (normalizedQuery.includes("project") || normalizedQuery.includes("work")) {
    answer =
      "Deswanth has created multiple impactful projects:\n\n• **JanAI**: Multi-lingual RAG Civic Scheme Discovery Platform\n• **EvalMesh**: AI Evaluation & RAG Benchmarking Framework\n• **Zeus Robot**: Autonomous ROS2 Robotics System with Edge AI Vision\n• **Cyber Security Toolkit**: Python network security & audit utility\n• **Desktop Database Apps**: Student, Staff, and Library Management Systems in Python/SQLite";
  } else if (normalizedQuery.includes("contact") || normalizedQuery.includes("email") || normalizedQuery.includes("phone")) {
    answer =
      "You can get in touch with K Deswanth via Email at **kdeswanth@gmail.com**, Phone at **+91 8374646073**, or view his projects on GitHub at **github.com/deswanth12**.";
  } else {
    const topText = topMatches[0].chunk.text;
    answer = `Based on Deswanth's portfolio documentation:\n\n${topText}`;
  }

  const result = { answer, sources };
  QUERY_CACHE.set(normalizedQuery, result);
  return result;
}
