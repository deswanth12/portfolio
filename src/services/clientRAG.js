/**
 * Client-Side Vector Search & RAG Engine Fallback
 * Provides instant semantic search, chunking, and source citation extraction
 * directly in the browser when backend API is offline or deployed as static site.
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
    text: "K Deswanth is a Full Stack Developer and Python/AI Systems Builder based in India. He specializes in Python, React, vector databases, RAG architecture, SQLite desktop application engineering, and cybersecurity utilities. Contact: kdeswanth@gmail.com, Phone: +91 8374646073."
  },
  {
    source: "Resume",
    heading: "Technical Skills",
    text: "Languages: Python, JavaScript (ES6+), SQL, HTML5, CSS3. Frontend: React, Vite, Tailwind CSS, Framer Motion. Backend & AI: FastAPI, Node.js/Express, Python Tkinter, RAG Pipelines, Vector DBs (FAISS, Pinecone), Prompt Engineering, Document Processing."
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
    text: "Deswanth maintains open source repositories on GitHub at github.com/deswanth12 including Cyber Security Toolkit, studentdatabase, staffdatamanagement, and Library-data-management-system."
  },
  {
    source: "Certificates & Blogs",
    heading: "RAG & AI Publications",
    text: "Deswanth authored articles on 'Building RAG Applications: From Vector DBs to Prompt Engineering' and holds certifications in Full Stack Web Development, Python Desktop Systems, and Network Security."
  }
];

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function searchClientKnowledge(query) {
  const qTokens = tokenize(query);
  if (!qTokens.length) {
    return {
      answer: "Please ask a question about Deswanth, his projects, skills, or experience!",
      sources: []
    };
  }

  // Score each chunk based on TF-IDF / Token overlap
  const scoredChunks = KNOWLEDGE_BASE.map((chunk) => {
    const chunkTokens = tokenize(`${chunk.source} ${chunk.heading} ${chunk.text}`);
    let score = 0;

    qTokens.forEach((qt) => {
      // Direct token match
      const count = chunkTokens.filter((t) => t === qt).length;
      score += count * 2;
      // Partial substring match
      chunkTokens.forEach((ct) => {
        if (ct.includes(qt) || qt.includes(ct)) {
          score += 0.5;
        }
      });
    });

    // Extra weight for heading / title matches
    const headingLower = chunk.heading.toLowerCase();
    const sourceLower = chunk.source.toLowerCase();
    qTokens.forEach((qt) => {
      if (headingLower.includes(qt) || sourceLower.includes(qt)) {
        score += 4;
      }
    });

    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  const topMatches = scoredChunks.filter((item) => item.score > 0).slice(0, 3);

  if (!topMatches.length) {
    return {
      answer:
        "I couldn't find specific details matching your query in Deswanth's portfolio. You can reach out directly via email at kdeswanth@gmail.com or check his GitHub at github.com/deswanth12!",
      sources: []
    };
  }

  const sources = Array.from(new Set(topMatches.map((m) => m.chunk.source)));
  const qLower = query.toLowerCase();

  // Smart natural answer synthesis
  let answer = "";
  if (qLower.includes("who is") || (qLower.includes("about") && qLower.includes("deswanth"))) {
    answer =
      "K Deswanth is a Full Stack Developer and Python/AI Systems Builder based in India. He specializes in building practical web applications with React, backend systems with FastAPI and SQLite, autonomous robotics with ROS2, and RAG (Retrieval-Augmented Generation) applications.";
  } else if (qLower.includes("janai")) {
    answer =
      "JanAI is an AI-powered civic scheme discovery platform built by Deswanth. It enables citizens to match with government welfare schemes using multi-lingual RAG semantic search, natural language eligibility analysis, and step-by-step document guidance.";
  } else if (qLower.includes("zeus")) {
    answer =
      "Zeus Robot is an autonomous multipurpose robotics system engineered by Deswanth. It combines ROS2, SLAM navigation, real-time edge AI object detection with YOLO & OpenCV, and a WebSockets live telemetry dashboard.";
  } else if (qLower.includes("react") || qLower.includes("frontend")) {
    answer =
      "Yes, Deswanth has strong React experience! He builds responsive web applications using React 19, Vite, Framer Motion, Tailwind CSS, and WebSockets. He designed both this portfolio website and the JanAI platform interface.";
  } else if (qLower.includes("project") || qLower.includes("work")) {
    answer =
      "Deswanth has created multiple impactful projects:\n\n• **JanAI**: Multi-lingual RAG Civic Scheme Discovery Platform\n• **Zeus Robot**: Autonomous ROS2 Robotics System with Edge AI Vision\n• **Cyber Security Toolkit**: Python network security & audit utility\n• **Desktop Database Apps**: Student, Staff, and Library Management Systems in Python/SQLite";
  } else if (qLower.includes("contact") || qLower.includes("email") || qLower.includes("phone")) {
    answer =
      "You can get in touch with K Deswanth via Email at **kdeswanth@gmail.com**, Phone at **+91 8374646073**, or view his projects on GitHub at **github.com/deswanth12**.";
  } else {
    // General synthesis from top chunk
    const topText = topMatches[0].chunk.text;
    answer = `Based on Deswanth's portfolio documentation:\n\n${topText}`;
  }

  return { answer, sources };
}
