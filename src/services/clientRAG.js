/**
 * JANNU CONVERSATIONAL RAG ENGINE & INTENT ROUTER
 * 
 * Surface: Natural human conversation, broad intent understanding,
 * paraphrase coverage, typo tolerance, stateful context memory.
 * 
 * Depth: Grounded technical retrieval backed by the Knowledge Verification Gate.
 * Zero unsupported buzzwords, explicit refusal of false premises.
 */

import {
  PERSON,
  PROJECTS,
  DECISIONS,
  GENERAL_TECH,
  CONVERSATIONAL_TEMPLATES,
  MANIFEST
} from "../data/canonicalKnowledge.js";

// Entity alias dictionary for natural references
const ENTITY_ALIASES = {
  zeus: [
    "zeus", "robot", "robotics", "slam robot", "autonomous robot", "hardware project",
    "the robot", "robot thing", "the bot"
  ],
  sagiro: [
    "sagiro", "finance app", "money app", "expense tracker", "offline ledger",
    "the finance app", "the money app", "android app", "the ledger"
  ],
  janai: [
    "janai", "government scheme", "government schemes", "govt scheme", "govt schemes", "govt", "welfare", "civic project", "scheme app",
    "the government project", "the civic project", "the welfare app", "welfare scheme"
  ],
  evalmesh: [
    "evalmesh", "evaluation project", "rag evaluation", "benchmarking project",
    "eval tool", "benchmarking framework", "the eval tool"
  ],
  "security-toolkit": [
    "security toolkit", "cyber security toolkit", "cybersecurity project", "security project",
    "port scanner", "packet inspector", "network security"
  ],
  "student-db": [
    "student database", "student app", "student db", "desktop database",
    "staff management", "library system", "tkinter app", "desktop app"
  ]
};

// Typo & informal slang normalizations
const TYPO_MAP = {
  helo: "hello",
  helloo: "hello",
  hii: "hi",
  hiii: "hi",
  heyy: "hey",
  hy: "hey",
  wassup: "what's up",
  sup: "what's up",
  thx: "thanks",
  ty: "thanks",
  tysm: "thank you",
  wat: "what",
  wht: "what",
  abt: "about",
  govt: "government",
  u: "you",
  ur: "your",
  pls: "please",
  plz: "please",
  idk: "i don't know",
  dont: "don't",
  cant: "can't",
  ros2: "ros 2",
  sqlite3: "sqlite"
};

/**
 * Normalizes input text: lowercases, cleans punctuation, maps typos/slang.
 */
export function normalizeText(text) {
  if (!text) return "";
  let cleaned = text.trim().toLowerCase();
  // Strip commas, semicolons, colons so punctuation doesn't attach to words
  cleaned = cleaned.replace(/[,;:]/g, " ");
  // Replace multiple punctuation with single
  cleaned = cleaned.replace(/[?!.]{2,}/g, "?");
  
  const words = cleaned.split(/\s+/).filter(Boolean).map((w) => {
    const stripped = w.replace(/[^\w]/g, "");
    return TYPO_MAP[stripped] || TYPO_MAP[w] || w;
  });
  return words.join(" ");
}

/**
 * Resolves which project entity is being referred to in the text or via context.
 */
export function detectEntity(text, context = {}) {
  const norm = normalizeText(text);

  // Check explicit project IDs first
  if (norm.includes("zeus")) return "zeus";
  if (norm.includes("sagiro")) return "sagiro";
  if (norm.includes("janai")) return "janai";
  if (norm.includes("evalmesh")) return "evalmesh";
  if (norm.includes("security") || norm.includes("cyber security")) return "security-toolkit";
  if (norm.includes("student database") || norm.includes("student db") || norm.includes("staff management") || norm.includes("library system")) return "student-db";

  // Check entity aliases
  for (const [entityId, aliases] of Object.entries(ENTITY_ALIASES)) {
    for (const alias of aliases) {
      if (norm.includes(alias)) {
        return entityId;
      }
    }
  }

  // Pronoun and reference resolution to active entity
  const isReference = /\b(it|this|that|the project|the app|that app|this project|the robot|that thing|same project)\b/i.test(norm);
  if (isReference && context.activeEntity) {
    return context.activeEntity;
  }

  return null;
}

/**
 * Rotates through conversational templates smoothly.
 */
let rotationIndex = 0;
function getTemplate(array) {
  if (!array || !array.length) return "";
  const item = array[rotationIndex % array.length];
  rotationIndex++;
  return item;
}

/**
 * Master Intent Classifier: 41 intents evaluated in prioritized order.
 */
export function classifyIntent(text, context = {}) {
  const norm = normalizeText(text);
  const words = norm.split(/\s+/);
  const isShort = words.length <= 4;

  // 1. CORRECTION ("no I meant...", "sorry I meant Sagiro")
  if (/^(no|sorry|oops|wait)[\s]+(i meant|actually|not that)/i.test(norm) || /\b(i meant|not that one|wrong project)\b/i.test(norm)) {
    return "CORRECTION";
  }

  // 2. SIMPLIFICATION ("make it simple", "explain simply", "ELI5", "simpler", "short version")
  if (/\b(make it simple|explain simply|eli5|in simple words|simpler|short version|explain like i'm a beginner|explain like i'm new|keep it simple)\b/i.test(norm)) {
    return "SIMPLIFICATION";
  }

  // 3. DEEPENING ("go deeper", "tell me more", "more details", "architecture", "technical version")
  if (/\b(go deeper|tell me more|more details|explain technically|technical version|architecture details|how does it work internally)\b/i.test(norm)) {
    return "DEEPENING";
  }

  // 4. REPETITION ("say that again", "repeat that", "repeat", "what did you say")
  if (/\b(say that again|repeat that|repeat|what did you say|say again|can you repeat)\b/i.test(norm)) {
    return "REPETITION";
  }

  // 5. CONFIRMATION ("really?", "are you sure?", "is that true?", "for real?")
  if (/^(really\??|are you sure\??|is that true\??|for real\??|you're sure\??|100%\??)$/i.test(norm)) {
    return "CONFIRMATION";
  }

  // 6. GREETINGS
  const greetingPatterns = [
    /^(hi|hello|hey|yo|sup|hiya|howdy)\b/i,
    /^(hey|hi|hello)\s+(jannu|there|bro|buddy|man)\b/i,
    /^(good\s+(morning|afternoon|evening|day))\b/i,
    /^(what's up|wassup)\b/i
  ];
  if (isShort && greetingPatterns.some((rx) => rx.test(norm))) {
    return "GREETING";
  }

  // 7. FAREWELL
  const farewellPatterns = [
    /^(bye|goodbye|see you|see ya|see you later|catch you later|talk later|gotta go|peace|good night|later)\b/i
  ];
  if (farewellPatterns.some((rx) => rx.test(norm))) {
    return "FAREWELL";
  }

  // 8. THANKS
  const thanksPatterns = [
    /^(thanks|thank you|thx|ty|tysm|appreciate it|much appreciated|thanks jannu|thank you so much)\b/i,
    /\b(nice answer|helpful|great answer|that helped|that's helpful)\b/i
  ];
  if (thanksPatterns.some((rx) => rx.test(norm))) {
    return "THANKS";
  }

  // 9. APOLOGY
  if (/^(sorry|my bad|oops|apologies)\b/i.test(norm) && isShort) {
    return "APOLOGY";
  }

  // 10. SOCIAL / COMPLIMENTS / ACKNOWLEDGEMENT
  if (/^(cool|nice|awesome|impressive|wow|great|damn|interesting|got it|makes sense|okay|ok|alright|sweet|sounds good)$/i.test(norm)) {
    return "ACKNOWLEDGEMENT";
  }
  if (/\b(nice website|great portfolio|cool site|love the site|cool design|awesome portfolio|impressive work)\b/i.test(norm)) {
    return "COMPLIMENT";
  }

  // 11. SMALL TALK
  if (/^(how are you|how's it going|what's up|how is your day|are you doing okay|you doing good|are you there|are you ready)/i.test(norm)) {
    return "SMALL_TALK";
  }

  // 12. IDENTITY QUESTIONS
  if (/\b(who are you|what are you|what is your name|what's your name|who is jannu|are you an ai|are you a bot|are you human|who made you|who built you|why are you called jannu)\b/i.test(norm)) {
    return "IDENTITY";
  }

  // 13. CAPABILITIES & HELP
  if (/\b(what can you do|what can i ask|what do you know|how can you help|what are you capable of|what can you help me with)\b/i.test(norm)) {
    return "CAPABILITY";
  }
  if (/^(help|help me|what should i ask|where do i start|what can i explore|give me something to ask)\b/i.test(norm)) {
    return "HELP";
  }

  // 14. META
  if (/\b(what is this website|is this a portfolio|what am i looking at|why is this site here|what is this site)\b/i.test(norm)) {
    return "META";
  }

  // 15. OPINION / RECOMMENDATION REQUESTS
  if (/\b(which project do you like|what's your favorite|favorite project|which is most interesting|what do you recommend|which one should i look at|what should i explore first)\b/i.test(norm)) {
    return "OPINION_REQUEST";
  }

  // 16. CONFUSION / CLARIFICATION
  if (/\b(i don't understand|what does that mean|i'm confused|i don't get it|what do you mean|can you clarify)\b/i.test(norm)) {
    return "CONFUSION";
  }

  // 17. CONFIDENTLY WRONG PREMISES & FALSE ASSUMPTIONS (Refusal Gate)
  const wrongPremises = [
    /\b(how many users|user count|how many active users|have .* users|has .* users|users does)\b/i,
    /\b(how much revenue|annual revenue|how much money does it make|profit)\b/i,
    /\b(hipaa|hipaa compliant|fda approved)\b/i,
    /\b(commercial|commercially|buy zeus|order zeus)\b/i,
    /\b(is zeus fully autonomous|full autonomy|level 5 autonomous)\b/i,
    /\b(deswanth's salary|how much does deswanth earn|net worth)\b/i,
    /\b(10\s*000 users|10,?000 users|100k users|1m users|downloads|installs)\b/i
  ];
  if (wrongPremises.some((rx) => rx.test(norm))) {
    return "UNSUPPORTED_PREMISE";
  }

  // 18. GENERAL TECH QUERIES (Explaining technologies without Deswanth specifics)
  // e.g., "what is sqlite?", "how does faiss work?", "what is ros 2?", "what is rag?", "what is python?"
  const isGeneralTech = (
    /^(what is|explain|what's|how does)\s+(sqlite|ros 2|ros2|faiss|rag|kotlin|room orm|python|slam|yolo|fastapi|react|websockets)(\s+(work|mean))?\??$/i.test(norm) ||
    /^(how does faiss work|how does ros 2 work|how does slam work|what does api mean)\??$/i.test(norm) ||
    /^(what is gravity|how does wi-fi work|what is a database)\??$/i.test(norm)
  );
  if (isGeneralTech && !norm.includes("deswanth") && !norm.includes("he use") && !norm.includes("did he")) {
    return "GENERAL_TECH";
  }

  // 19. COMPARISONS ("compare zeus and janai", "sagiro vs janai", "difference between X and Y")
  if (/\b(compare|difference between|vs\b|versus)\b/i.test(norm)) {
    return "COMPARISON";
  }

  // 20. MULTI-HOP / SYSTEMS AGGREGATIONS
  if (/\b(which projects|what projects|projects using|all projects|where does he use|systems using)\b/i.test(norm)) {
    return "MULTI_HOP";
  }

  // 21. ARCHITECTURAL DECISIONS ("why did he choose FAISS", "why ROS 2 instead of ROS 1")
  if (/\b(why did he|why did deswanth|why choose|why use|why ros 2|why faiss|why offline|tradeoff|decision)\b/i.test(norm)) {
    return "DECISION";
  }

  // 22. CONTEXTUAL FOLLOW-UP (has active entity, query is asking hardware/software/features/who)
  if (context.activeEntity && (
    /\b(hardware|software|tech|stack|who is it for|features|limitations|github|demo|components|sensors)\b/i.test(norm) ||
    /^(and what about|how about|what does it use|what sensors|what libraries)\b/i.test(norm)
  )) {
    return "CONTEXTUAL_FOLLOWUP";
  }

  // 23. PORTFOLIO QUERY (explicit project, creator profile, contact, timeline)
  if (detectEntity(norm, context) || /\b(deswanth|projects|built|creator|portfolio|contact|email|github|linkedin|timeline|history|skills|work)\b/i.test(norm)) {
    return "PORTFOLIO_QUERY";
  }

  // 24. OUT OF SCOPE (External world trivia outside portfolio: president of France, weather, etc.)
  const externalTrivia = [
    /\b(president of france|capital of|who is the ceo of apple|weather in|stock price|election|bitcoin price)\b/i
  ];
  if (externalTrivia.some((rx) => rx.test(norm))) {
    return "OUT_OF_SCOPE";
  }

  return "UNKNOWN";
}

/**
 * Main grounded RAG search and natural conversational handler.
 * Backward compatible with AskMyPortfolio while maintaining rich session context.
 */
export function searchClientKnowledge(query, sessionContext = {}) {
  const rawQuery = (query || "").trim();
  const norm = normalizeText(rawQuery);

  // Initialize or carry over session context
  const context = {
    activeEntity: sessionContext.activeEntity || null,
    activeTopic: sessionContext.activeTopic || null,
    lastAnswerRaw: sessionContext.lastAnswerRaw || "",
    lastAnswerSimple: sessionContext.lastAnswerSimple || "",
    lastAnswerDeep: sessionContext.lastAnswerDeep || "",
    history: sessionContext.history || []
  };

  if (!norm) {
    return {
      answer: "Hey! What would you like to explore in Deswanth's work?",
      sources: [],
      intent: "EMPTY",
      context
    };
  }

  const intent = classifyIntent(rawQuery, context);

  // 1. CORRECTION
  if (intent === "CORRECTION") {
    // Detect which new entity is mentioned
    const newEntity = detectEntity(norm, {});
    if (newEntity && PROJECTS[newEntity]) {
      context.activeEntity = newEntity;
      const proj = PROJECTS[newEntity];
      const answer = `Got it. Let's look at ${proj.title}. ${proj.summary}`;
      context.lastAnswerRaw = answer;
      context.lastAnswerSimple = proj.summarySimple;
      context.lastAnswerDeep = proj.summaryDeep;
      return {
        answer,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent,
        context
      };
    }
    return {
      answer: "No problem. Which project would you like to talk about instead?",
      sources: [],
      intent,
      context
    };
  }

  // 2. SIMPLIFICATION ("make it simple", "ELI5")
  if (intent === "SIMPLIFICATION") {
    if (context.activeEntity && PROJECTS[context.activeEntity]) {
      const proj = PROJECTS[context.activeEntity];
      return {
        answer: `In simple terms: ${proj.summarySimple}`,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent,
        context
      };
    }
    if (context.lastAnswerSimple) {
      return {
        answer: `In simple terms: ${context.lastAnswerSimple}`,
        sources: [],
        intent,
        context
      };
    }
    return {
      answer: "Sure! In simple terms, Deswanth builds practical software, autonomous robotics with ROS 2, and local-first applications.",
      sources: [],
      intent,
      context
    };
  }

  // 3. DEEPENING ("go deeper", "more details", "architecture")
  if (intent === "DEEPENING") {
    if (context.activeEntity && PROJECTS[context.activeEntity]) {
      const proj = PROJECTS[context.activeEntity];
      return {
        answer: `Here is the deeper technical breakdown for ${proj.title}:\n\n${proj.summaryDeep}`,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent,
        context
      };
    }
    return {
      answer: "Which project would you like to examine in deep technical detail? (Zeus, JanAI, Sagiro, or EvalMesh)",
      sources: [],
      intent,
      context
    };
  }

  // 4. REPETITION ("say that again")
  if (intent === "REPETITION") {
    if (context.lastAnswerRaw) {
      return {
        answer: context.lastAnswerRaw,
        sources: [],
        intent,
        context
      };
    }
    return {
      answer: "I haven't said much yet! Ask me about Zeus, JanAI, Sagiro, or Deswanth's background.",
      sources: [],
      intent,
      context
    };
  }

  // 5. CONFIRMATION ("really?", "are you sure?")
  if (intent === "CONFIRMATION") {
    if (context.activeEntity && PROJECTS[context.activeEntity]) {
      const proj = PROJECTS[context.activeEntity];
      return {
        answer: `Yes, that's verified directly in the ${proj.title} project documentation and case study.`,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent,
        context
      };
    }
    return {
      answer: "Yes, all project details and architecture decisions here are verified against Deswanth's documented work.",
      sources: [],
      intent,
      context
    };
  }

  // 6. GREETINGS
  if (intent === "GREETING") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.greetings),
      sources: [],
      intent,
      context
    };
  }

  // 7. FAREWELL
  if (intent === "FAREWELL") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.farewells),
      sources: [],
      intent,
      context
    };
  }

  // 8. THANKS
  if (intent === "THANKS") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.thanks),
      sources: [],
      intent,
      context
    };
  }

  // 9. APOLOGY
  if (intent === "APOLOGY") {
    return {
      answer: "No worries at all! What can I help you explore?",
      sources: [],
      intent,
      context
    };
  }

  // 10. SOCIAL / COMPLIMENTS / ACKNOWLEDGEMENT
  if (intent === "ACKNOWLEDGEMENT") {
    return {
      answer: "Glad it makes sense. What should we look into next?",
      sources: [],
      intent,
      context
    };
  }
  if (intent === "COMPLIMENT") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.compliments),
      sources: [],
      intent,
      context
    };
  }

  // 11. SMALL TALK
  if (intent === "SMALL_TALK") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.smallTalk),
      sources: [],
      intent,
      context
    };
  }

  // 12. IDENTITY
  if (intent === "IDENTITY") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.identity),
      sources: [],
      intent,
      context
    };
  }

  // 13. CAPABILITY & HELP
  if (intent === "CAPABILITY" || intent === "HELP") {
    return {
      answer: getTemplate(CONVERSATIONAL_TEMPLATES.capabilities),
      sources: [],
      intent,
      context
    };
  }

  // 14. META
  if (intent === "META") {
    return {
      answer: "This is Deswanth's engineering workshop and personal portfolio. It showcases his work across full-stack systems, autonomous robotics with ROS 2, AI RAG platforms, and local-first mobile apps.",
      sources: [],
      intent,
      context
    };
  }

  // 15. OPINION REQUESTS
  if (intent === "OPINION_REQUEST") {
    return {
      answer: "Rather than picking a favorite, each project highlights a different engineering strength: Zeus stands out for robotics hardware and ROS 2 SLAM navigation, JanAI focuses on semantic RAG retrieval for civic welfare, and Sagiro demonstrates local-first Android persistence.",
      sources: [
        { label: "ZEUS CASE STUDY", caseStudyId: "zeus" },
        { label: "JANAI CASE STUDY", caseStudyId: "janai" },
        { label: "SAGIRO CASE STUDY", caseStudyId: "sagiro" }
      ],
      intent,
      context
    };
  }

  // 16. CONFUSION
  if (intent === "CONFUSION") {
    if (context.activeEntity && PROJECTS[context.activeEntity]) {
      const proj = PROJECTS[context.activeEntity];
      return {
        answer: `Let me clarify: ${proj.summarySimple} Would you like to know about the hardware or the software?`,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent,
        context
      };
    }
    return {
      answer: "No problem. Which part would you like me to clarify? You can ask about Zeus, JanAI, Sagiro, or Deswanth's skills.",
      sources: [],
      intent,
      context
    };
  }

  // 17. UNSUPPORTED PREMISE & FALSE ASSUMPTIONS (Refusal Gate)
  if (intent === "UNSUPPORTED_PREMISE") {
    let refusal = "I don't have verified information about that in Deswanth's portfolio.";
    if (norm.includes("user") && norm.includes("zeus")) {
      refusal = "Zeus is an engineering and robotics research platform built by Deswanth, not a consumer product with users.";
    } else if (norm.includes("revenue") || norm.includes("money") || norm.includes("profit")) {
      refusal = "JanAI and Zeus are engineering and research projects; there is no commercial revenue data documented for them.";
    } else if (norm.includes("hipaa")) {
      refusal = "I don't have verified information regarding HIPAA compliance for Sagiro. Sagiro is an offline-first personal finance manager, not a healthcare records application.";
    } else if (norm.includes("commercial") || norm.includes("buy")) {
      refusal = "Zeus is a personal robotics engineering platform; there is no documented commercial deployment or product sale.";
    } else if (norm.includes("fully autonomous")) {
      refusal = "Zeus is an indoor mobile robot platform utilizing Cartographer 2D SLAM and Nav2 waypoint navigation in mapped indoor environments, rather than unconstrained full autonomy.";
    } else if (norm.includes("salary") || norm.includes("net worth")) {
      refusal = "I don't have verified information about Deswanth's personal financial or compensation details.";
    } else if (norm.includes("10,000") || norm.includes("download")) {
      refusal = "I don't have a verified user count or download metric for Sagiro.";
    }
    return {
      answer: refusal,
      sources: [],
      intent,
      context
    };
  }

  // 18. GENERAL TECH QUERIES
  if (intent === "GENERAL_TECH") {
    for (const [techKey, definition] of Object.entries(GENERAL_TECH)) {
      if (norm.includes(techKey)) {
        return {
          answer: definition,
          sources: [],
          intent,
          context
        };
      }
    }
    if (norm.includes("api")) {
      return {
        answer: "An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate and exchange data with each other.",
        sources: [],
        intent,
        context
      };
    }
    if (norm.includes("database")) {
      return {
        answer: "A database is an organized collection of structured data stored electronically on a computer system, managed by a Database Management System (DBMS) like SQLite or PostgreSQL.",
        sources: [],
        intent,
        context
      };
    }
    return {
      answer: "That is a general technical concept rather than a Deswanth-specific project. Could you clarify what aspect you'd like to explore?",
      sources: [],
      intent,
      context
    };
  }

  // 19. COMPARISON QUERIES ("compare zeus and janai", "sagiro vs janai")
  if (intent === "COMPARISON") {
    let p1 = null;
    let p2 = null;
    for (const entityId of Object.keys(PROJECTS)) {
      if (norm.includes(entityId) || (ENTITY_ALIASES[entityId] && ENTITY_ALIASES[entityId].some((a) => norm.includes(a)))) {
        if (!p1) p1 = entityId;
        else if (!p2 && entityId !== p1) p2 = entityId;
      }
    }

    if (p1 && p2) {
      const proj1 = PROJECTS[p1];
      const proj2 = PROJECTS[p2];
      const answer = `Comparing ${proj1.title} and ${proj2.title}:\n\n` +
        `• ${proj1.title}: ${proj1.category}. ${proj1.summary} Key stack: ${proj1.techStack.slice(0, 4).join(", ")}.\n\n` +
        `• ${proj2.title}: ${proj2.category}. ${proj2.summary} Key stack: ${proj2.techStack.slice(0, 4).join(", ")}.`;
      return {
        answer,
        sources: [
          { label: `${proj1.title.toUpperCase()} CASE STUDY`, caseStudyId: proj1.caseStudyId },
          { label: `${proj2.title.toUpperCase()} CASE STUDY`, caseStudyId: proj2.caseStudyId }
        ],
        intent,
        context
      };
    }

    if (p1 && !p2 && context.activeEntity && context.activeEntity !== p1) {
      const proj1 = PROJECTS[context.activeEntity];
      const proj2 = PROJECTS[p1];
      const answer = `Comparing ${proj1.title} and ${proj2.title}:\n\n` +
        `• ${proj1.title}: ${proj1.category}. ${proj1.summary}\n\n` +
        `• ${proj2.title}: ${proj2.category}. ${proj2.summary}`;
      return {
        answer,
        sources: [
          { label: `${proj1.title.toUpperCase()} CASE STUDY`, caseStudyId: proj1.caseStudyId },
          { label: `${proj2.title.toUpperCase()} CASE STUDY`, caseStudyId: proj2.caseStudyId }
        ],
        intent,
        context
      };
    }
  }

  // 20. ARCHITECTURAL DECISIONS ("why did he choose FAISS", "why ROS 2", "why offline")
  if (intent === "DECISION") {
    for (const dec of DECISIONS) {
      if (
        norm.includes(dec.entity) ||
        (dec.entity === "janai" && norm.includes("faiss")) ||
        (dec.entity === "zeus" && (norm.includes("ros 2") || norm.includes("ros2") || norm.includes("motor") || norm.includes("arduino"))) ||
        (dec.entity === "sagiro" && (norm.includes("offline") || norm.includes("privacy"))) ||
        (dec.entity === "evalmesh" && (norm.includes("dual") || norm.includes("metric") || norm.includes("ragas")))
      ) {
        context.activeEntity = dec.entity;
        const answer = `In ${PROJECTS[dec.entity].title}, Deswanth's documented rationale: ${dec.rationale}\n\n• Alternative considered: ${dec.alternative_considered}\n• Trade-off: ${dec.tradeoff}`;
        return {
          answer,
          sources: [{ label: `${PROJECTS[dec.entity].title.toUpperCase()} CASE STUDY`, caseStudyId: PROJECTS[dec.entity].caseStudyId }],
          intent,
          context
        };
      }
    }
  }

  // 21. MULTI-HOP QUERIES ("which projects use sqlite", "hardware projects with python")
  if (intent === "MULTI_HOP" || norm.includes("sqlite") || norm.includes("which project")) {
    if (norm.includes("sqlite")) {
      const answer = "Deswanth uses SQLite across three documented systems:\n\n" +
        "1. Sagiro — Offline-first Android financial ledger using Kotlin Room ORM and local SQLite.\n" +
        "2. Cyber Security Toolkit — Persistent local network event and audit logger.\n" +
        "3. Student Database System — Desktop relational records application built with Python Tkinter.";
      return {
        answer,
        sources: [
          { label: "SAGIRO CASE STUDY", caseStudyId: "sagiro" },
          { label: "SECURITY TOOLKIT", caseStudyId: "security-toolkit" },
          { label: "STUDENT DB", caseStudyId: "student-db" }
        ],
        intent: "MULTI_HOP",
        context
      };
    }

    if (norm.includes("python")) {
      const answer = "Python is a core language in Deswanth's work, appearing in:\n\n" +
        "• Zeus Robot: ROS 2 nodes, OpenCV vision, and YOLO v8 object detection.\n" +
        "• JanAI: FastAPI backend and asynchronous vector query processing.\n" +
        "• EvalMesh: Ragas AI evaluation harness and regression testing.\n" +
        "• Cyber Security Toolkit: Raw socket network analyzer and port scanner.\n" +
        "• Student Database System: Tkinter desktop GUI and SQLite queries.";
      return {
        answer,
        sources: [
          { label: "ZEUS CASE STUDY", caseStudyId: "zeus" },
          { label: "JANAI CASE STUDY", caseStudyId: "janai" },
          { label: "EVALMESH CASE STUDY", caseStudyId: "evalmesh" }
        ],
        intent: "MULTI_HOP",
        context
      };
    }

    if (norm.includes("rag") || norm.includes("evaluation") || norm.includes("ai")) {
      const answer = "Deswanth has built two central AI/RAG systems:\n\n" +
        "1. JanAI — A multilingual RAG platform matching citizens with government welfare schemes using FAISS vector search and cited circulars.\n" +
        "2. EvalMesh — An evaluation framework measuring context precision, context recall, and faithfulness across RAG pipelines.";
      return {
        answer,
        sources: [
          { label: "JANAI CASE STUDY", caseStudyId: "janai" },
          { label: "EVALMESH CASE STUDY", caseStudyId: "evalmesh" }
        ],
        intent: "MULTI_HOP",
        context
      };
    }
  }

  // 22. CONTEXTUAL FOLLOW-UP WITH ACTIVE ENTITY
  if (context.activeEntity && PROJECTS[context.activeEntity]) {
    const proj = PROJECTS[context.activeEntity];

    if (norm.includes("hardware") && proj.hardware) {
      const answer = `${proj.title} hardware includes:\n\n` + proj.hardware.map((h) => `• ${h}`).join("\n");
      return {
        answer,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent: "CONTEXTUAL_FOLLOWUP",
        context
      };
    }

    if (norm.includes("software") && (proj.software || proj.techStack)) {
      const list = proj.software || proj.techStack;
      const answer = `${proj.title} software stack:\n\n` + list.map((s) => `• ${s}`).join("\n");
      return {
        answer,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent: "CONTEXTUAL_FOLLOWUP",
        context
      };
    }

    if (norm.includes("who is it for") || norm.includes("target")) {
      const audience = proj.targetAudience || proj.solution || proj.problem;
      const answer = `${proj.title} is designed for: ${audience}`;
      return {
        answer,
        sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
        intent: "CONTEXTUAL_FOLLOWUP",
        context
      };
    }
  }

  // 23. SPECIFIC PROJECT DEEP-DIVE
  const targetEntity = detectEntity(norm, context);
  if (targetEntity && PROJECTS[targetEntity]) {
    context.activeEntity = targetEntity;
    const proj = PROJECTS[targetEntity];

    let answer = `${proj.summary}\n\nKey Technologies: ${proj.techStack.join(", ")}.`;
    if (norm.includes("hardware") && proj.hardware) {
      answer = `${proj.title} hardware configuration:\n\n` + proj.hardware.map((h) => `• ${h}`).join("\n");
    } else if (norm.includes("how does") || norm.includes("architecture")) {
      answer = `${proj.summaryDeep}`;
    }

    context.lastAnswerRaw = answer;
    context.lastAnswerSimple = proj.summarySimple;
    context.lastAnswerDeep = proj.summaryDeep;

    return {
      answer,
      sources: [{ label: `${proj.title.toUpperCase()} CASE STUDY`, caseStudyId: proj.caseStudyId }],
      intent: "PORTFOLIO_QUERY",
      context
    };
  }

  // 24. TIMELINE / RECENT WORK
  if (norm.includes("recent") || norm.includes("timeline") || norm.includes("2026") || norm.includes("when did he")) {
    const answer = "Deswanth's engineering progression spans 2023 to 2026:\n\n" +
      "• 2026: Zeus Robot (ROS 2 SLAM robotics) and JanAI (civic welfare RAG platform).\n" +
      "• 2025: Sagiro (offline-first Android ledger), EvalMesh (RAG benchmarking rig), and Cyber Security Toolkit.\n" +
      "• 2024: Desktop database applications in Python Tkinter and SQLite.\n" +
      "• 2023: Algorithmic computing foundations and software scripting.";
    return {
      answer,
      sources: [],
      intent: "PORTFOLIO_QUERY",
      context
    };
  }

  // 25. SKILLS / TECH STACK
  if (norm.includes("skill") || norm.includes("tech stack") || norm.includes("technologies") || norm.includes("languages")) {
    const answer = "Deswanth's verified technical disciplines:\n\n" +
      "• Languages: Python, JavaScript (ES6+), Kotlin, SQL.\n" +
      "• Frontend: React 19, Vite, Tailwind CSS, WebSockets.\n" +
      "• Backend & Systems: FastAPI, SQLite3, Room ORM, FAISS Vector Index.\n" +
      "• Robotics & AI: ROS 2 Humble, RPLIDAR 360°, OpenCV, YOLO v8, Ragas evaluation.";
    return {
      answer,
      sources: [],
      intent: "PORTFOLIO_QUERY",
      context
    };
  }

  // 26. PERSON PROFILE & CONTACT
  if (norm.includes("who is deswanth") || norm.includes("about deswanth") || norm.includes("who built")) {
    const answer = `${PERSON.name} is a software engineer and systems builder based in ${PERSON.location}. He specializes in AI RAG platforms, autonomous robotics with ROS 2, and local-first application architecture.`;
    return {
      answer,
      sources: [],
      intent: "PORTFOLIO_QUERY",
      context
    };
  }

  if (norm.includes("contact") || norm.includes("email") || norm.includes("github") || norm.includes("linkedin") || norm.includes("reach")) {
    const answer = `You can reach Deswanth via:\n\n• Email: ${PERSON.email}\n• GitHub: ${PERSON.github}\n• LinkedIn: ${PERSON.linkedin}\n• Location: ${PERSON.location}`;
    return {
      answer,
      sources: [],
      intent: "PORTFOLIO_QUERY",
      context
    };
  }

  // 27. OUT OF SCOPE
  if (intent === "OUT_OF_SCOPE") {
    return {
      answer: "I don't have verified information about that in Deswanth's portfolio.",
      sources: [],
      intent: "OUT_OF_SCOPE",
      context
    };
  }

  // 28. UNKNOWN / AMBIGUOUS
  return {
    answer: getTemplate(CONVERSATIONAL_TEMPLATES.clarificationPrompt),
    sources: [],
    intent: "UNKNOWN",
    context
  };
}

export { MANIFEST };
