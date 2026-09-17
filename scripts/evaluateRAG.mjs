/**
 * Comprehensive Evaluation Test Runner for Jannu Conversational RAG
 * 
 * Verifies:
 * 1. Human Casual Conversation (no RAG retrieval overhead)
 * 2. Typo & Slang Normalization
 * 3. Contextual Follow-ups & Multi-Turn State (pronouns, depth controls, corrections)
 * 4. General Tech vs Portfolio Knowledge Separation
 * 5. False Premise Refusal & Anti-Hallucination Guardrails
 * 6. Verified Portfolio Technical Deep-Dives, Comparisons & Multi-Hop
 * 7. Knowledge Verification Gate Assertions
 */

import { searchClientKnowledge, normalizeText, detectEntity, classifyIntent } from "../src/services/clientRAG.js";
import { FACTS, DECISIONS, PROJECTS, MANIFEST } from "../src/data/canonicalKnowledge.js";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(description, condition, details = "") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${description}`);
  } else {
    failedTests++;
    console.log(`  \x1b[31m✖ FAIL\x1b[0m: ${description}`);
    if (details) console.log(`         \x1b[33m${details}\x1b[0m`);
  }
}

console.log("\n=======================================================");
console.log(" JANNU CONVERSATIONAL RAG EVALUATION SUITE");
console.log("=======================================================\n");

// ==========================================
// 1. HUMAN CASUAL CONVERSATION TESTS
// ==========================================
console.log("\x1b[36m[SUITE 1: Human Casual Conversation (Zero RAG Retrieval)]\x1b[0m");

const casualQueries = [
  { q: "hi", expectedIntent: "GREETING" },
  { q: "hello", expectedIntent: "GREETING" },
  { q: "hey", expectedIntent: "GREETING" },
  { q: "good morning", expectedIntent: "GREETING" },
  { q: "yo", expectedIntent: "GREETING" },
  { q: "hey jannu", expectedIntent: "GREETING" },
  { q: "what's up", expectedIntent: "GREETING" },
  { q: "thanks", expectedIntent: "THANKS" },
  { q: "thank you", expectedIntent: "THANKS" },
  { q: "thx", expectedIntent: "THANKS" },
  { q: "appreciate it", expectedIntent: "THANKS" },
  { q: "nice answer", expectedIntent: "THANKS" },
  { q: "bye", expectedIntent: "FAREWELL" },
  { q: "goodbye", expectedIntent: "FAREWELL" },
  { q: "see you later", expectedIntent: "FAREWELL" },
  { q: "nice website", expectedIntent: "COMPLIMENT" },
  { q: "great portfolio", expectedIntent: "COMPLIMENT" },
  { q: "cool", expectedIntent: "ACKNOWLEDGEMENT" },
  { q: "makes sense", expectedIntent: "ACKNOWLEDGEMENT" },
  { q: "how are you", expectedIntent: "SMALL_TALK" },
  { q: "who are you", expectedIntent: "IDENTITY" },
  { q: "are you an ai", expectedIntent: "IDENTITY" },
  { q: "who made you", expectedIntent: "IDENTITY" },
  { q: "what can you do", expectedIntent: "CAPABILITY" },
  { q: "help", expectedIntent: "HELP" },
  { q: "what is this website", expectedIntent: "META" },
  { q: "which project do you like", expectedIntent: "OPINION_REQUEST" }
];

casualQueries.forEach(({ q, expectedIntent }) => {
  const res = searchClientKnowledge(q);
  assert(
    `"${q}" -> ${expectedIntent} (sources = 0)`,
    res.intent === expectedIntent && (res.sources.length === 0 || expectedIntent === "OPINION_REQUEST"),
    `Got intent: ${res.intent}, sources: ${res.sources.length}, answer: "${res.answer.slice(0, 50)}..."`
  );
});

// ==========================================
// 2. TYPO & SLANG NORMALIZATION TESTS
// ==========================================
console.log("\n\x1b[36m[SUITE 2: Typo & Slang Normalization]\x1b[0m");

const typoTests = [
  { q: "helo", expectedIntent: "GREETING" },
  { q: "thx jannu", expectedIntent: "THANKS" },
  { q: "wat is zeus", targetEntity: "zeus" },
  { q: "tell me abt sagiro", targetEntity: "sagiro" },
  { q: "wassup", expectedIntent: "GREETING" },
  { q: "tell me abt that robot thing", targetEntity: "zeus" },
  { q: "which one is the finance app", targetEntity: "sagiro" },
  { q: "what is the govt schemes project", targetEntity: "janai" }
];

typoTests.forEach(({ q, expectedIntent, targetEntity }) => {
  const res = searchClientKnowledge(q);
  if (expectedIntent) {
    assert(`Typo "${q}" -> intent ${expectedIntent}`, res.intent === expectedIntent, `Got: ${res.intent}`);
  }
  if (targetEntity) {
    assert(
      `Slang/Typo "${q}" -> entity ${targetEntity}`,
      res.context.activeEntity === targetEntity || (res.sources.length > 0 && res.sources[0].caseStudyId === targetEntity),
      `Got activeEntity: ${res.context.activeEntity}`
    );
  }
});

// ==========================================
// 3. CONTEXTUAL FOLLOW-UP & MULTI-TURN TESTS
// ==========================================
console.log("\n\x1b[36m[SUITE 3: Contextual Follow-up & Multi-Turn State]\x1b[0m");

// Sequence A: Zeus deep dive & controls
let ctx = {};
let t1 = searchClientKnowledge("Tell me about Zeus", ctx);
assert("Turn 1: 'Tell me about Zeus' sets activeEntity to zeus", t1.context.activeEntity === "zeus");
ctx = t1.context;

let t2 = searchClientKnowledge("What hardware does it use?", ctx);
assert(
  "Turn 2: 'What hardware does it use?' resolves 'it' -> Zeus hardware",
  t2.answer.toLowerCase().includes("raspberry pi") && t2.answer.toLowerCase().includes("rplidar"),
  `Got: ${t2.answer.slice(0, 70)}...`
);
ctx = t2.context;

let t3 = searchClientKnowledge("And what software?", ctx);
assert(
  "Turn 3: 'And what software?' resolves to Zeus software stack",
  t3.answer.toLowerCase().includes("ros 2") && t3.answer.toLowerCase().includes("slam"),
  `Got: ${t3.answer.slice(0, 70)}...`
);
ctx = t3.context;

let t4 = searchClientKnowledge("Make it simple", ctx);
assert(
  "Turn 4: 'Make it simple' simplifies the active project answer",
  t4.intent === "SIMPLIFICATION" && t4.answer.toLowerCase().includes("simple terms"),
  `Got: ${t4.answer.slice(0, 70)}...`
);
ctx = t4.context;

let t5 = searchClientKnowledge("Go deeper", ctx);
assert(
  "Turn 5: 'Go deeper' expands active project with deep architecture",
  t5.intent === "DEEPENING" && t5.answer.toLowerCase().includes("architecture"),
  `Got: ${t5.answer.slice(0, 70)}...`
);
ctx = t5.context;

let t6 = searchClientKnowledge("Really?", ctx);
assert(
  "Turn 6: 'Really?' confirms documented evidence without defensiveness",
  t6.intent === "CONFIRMATION" && t6.answer.toLowerCase().includes("verified"),
  `Got: ${t6.answer.slice(0, 70)}...`
);
ctx = t6.context;

let t7 = searchClientKnowledge("Say that again", ctx);
assert(
  "Turn 7: 'Say that again' repeats recent answer",
  t7.intent === "REPETITION" && t7.answer.length > 20,
  `Got: ${t7.answer.slice(0, 70)}...`
);

// Sequence B: Correction
let ctxB = {};
let b1 = searchClientKnowledge("Tell me about JanAI", ctxB);
assert("Turn B1: 'Tell me about JanAI' sets activeEntity to janai", b1.context.activeEntity === "janai");
ctxB = b1.context;

let b2 = searchClientKnowledge("Sorry, I meant Sagiro", ctxB);
assert(
  "Turn B2: 'Sorry, I meant Sagiro' updates activeEntity to sagiro",
  b2.context.activeEntity === "sagiro" && b2.answer.toLowerCase().includes("sagiro"),
  `Got: ${b2.answer.slice(0, 70)}...`
);
ctxB = b2.context;

let b3 = searchClientKnowledge("Why did he make it offline-first?", ctxB);
assert(
  "Turn B3: 'Why did he make it offline-first?' answers Sagiro decision",
  b3.answer.toLowerCase().includes("privacy") || b3.answer.toLowerCase().includes("room orm"),
  `Got: ${b3.answer.slice(0, 70)}...`
);

// ==========================================
// 4. GENERAL TECH VS PORTFOLIO KNOWLEDGE
// ==========================================
console.log("\n\x1b[36m[SUITE 4: General Tech vs Portfolio Knowledge Separation]\x1b[0m");

const techQueries = [
  {
    q: "What is SQLite?",
    shouldHaveSources: false,
    mustInclude: "database"
  },
  {
    q: "Why did Deswanth use SQLite?",
    shouldHaveSources: true,
    mustInclude: "sagiro"
  },
  {
    q: "What is ROS 2?",
    shouldHaveSources: false,
    mustInclude: "robotics middleware"
  },
  {
    q: "Why did Deswanth use ROS 2?",
    shouldHaveSources: true,
    mustInclude: "zeus"
  },
  {
    q: "What is RAG?",
    shouldHaveSources: false,
    mustInclude: "retrieval-augmented"
  },
  {
    q: "How does FAISS work?",
    shouldHaveSources: false,
    mustInclude: "vector"
  }
];

techQueries.forEach(({ q, shouldHaveSources, mustInclude }) => {
  const res = searchClientKnowledge(q);
  const sourcesOk = shouldHaveSources ? res.sources.length > 0 : res.sources.length === 0;
  const contentOk = res.answer.toLowerCase().includes(mustInclude.toLowerCase());
  assert(
    `"${q}" (hasSources=${shouldHaveSources}, content matches '${mustInclude}')`,
    sourcesOk && contentOk,
    `Sources: ${res.sources.length}, answer: "${res.answer.slice(0, 60)}..."`
  );
});

// ==========================================
// 5. FALSE PREMISE REFUSAL & ANTI-HALLUCINATION
// ==========================================
console.log("\n\x1b[36m[SUITE 5: Confidently Wrong Premise Refusal & Anti-Hallucination]\x1b[0m");

const premiseTests = [
  {
    q: "How many users does Zeus have?",
    refusesPremise: (ans) => ans.toLowerCase().includes("not a consumer product") || ans.toLowerCase().includes("research platform")
  },
  {
    q: "How much revenue did JanAI make?",
    refusesPremise: (ans) => ans.toLowerCase().includes("no commercial revenue") || ans.toLowerCase().includes("no revenue")
  },
  {
    q: "Is Sagiro HIPAA compliant?",
    refusesPremise: (ans) => ans.toLowerCase().includes("hipaa") && ans.toLowerCase().includes("personal finance")
  },
  {
    q: "Did Deswanth deploy Zeus commercially?",
    refusesPremise: (ans) => ans.toLowerCase().includes("no documented commercial deployment") || ans.toLowerCase().includes("research")
  },
  {
    q: "Is Zeus fully autonomous?",
    refusesPremise: (ans) => ans.toLowerCase().includes("cartographer") || ans.toLowerCase().includes("indoor")
  },
  {
    q: "Does Sagiro have 10,000 users?",
    refusesPremise: (ans) => ans.toLowerCase().includes("verified user count") || ans.toLowerCase().includes("don't have")
  },
  {
    q: "Who is the president of France?",
    refusesPremise: (ans) => ans.toLowerCase().includes("don't have verified information")
  },
  {
    q: "What is Deswanth's salary?",
    refusesPremise: (ans) => ans.toLowerCase().includes("don't have verified information") || ans.toLowerCase().includes("compensation")
  }
];

premiseTests.forEach(({ q, refusesPremise }) => {
  const res = searchClientKnowledge(q);
  assert(
    `False Premise: "${q}" -> gracefully refused`,
    refusesPremise(res.answer),
    `Got response: "${res.answer}"`
  );
});

// ==========================================
// 6. VERIFIED PORTFOLIO RETRIEVAL & CITATIONS
// ==========================================
console.log("\n\x1b[36m[SUITE 6: Verified Portfolio Retrieval, Decisions & Comparisons]\x1b[0m");

const portfolioTests = [
  {
    q: "Tell me about JanAI",
    expectedCaseStudy: "janai"
  },
  {
    q: "What is EvalMesh?",
    expectedCaseStudy: "evalmesh"
  },
  {
    q: "What is the Cyber Security Toolkit?",
    expectedCaseStudy: "security-toolkit"
  },
  {
    q: "Tell me about the Student Database System",
    expectedCaseStudy: "student-db"
  },
  {
    q: "Why did Deswanth choose FAISS?",
    expectedCaseStudy: "janai"
  },
  {
    q: "Why offload motor control in Zeus?",
    expectedCaseStudy: "zeus"
  },
  {
    q: "Compare Zeus and JanAI",
    expectedCaseStudy: "zeus" // should cite both
  },
  {
    q: "Sagiro vs JanAI",
    expectedCaseStudy: "sagiro" // should cite both
  },
  {
    q: "Which projects use SQLite?",
    checkAnswer: (ans) => ans.includes("Sagiro") && ans.includes("Cyber Security Toolkit") && ans.includes("Student Database")
  },
  {
    q: "What did Deswanth build in 2026?",
    checkAnswer: (ans) => ans.includes("Zeus") && ans.includes("JanAI")
  }
];

portfolioTests.forEach(({ q, expectedCaseStudy, checkAnswer }) => {
  const res = searchClientKnowledge(q);
  let ok = false;
  if (expectedCaseStudy) {
    ok = res.sources.some((s) => s.caseStudyId === expectedCaseStudy);
  } else if (checkAnswer) {
    ok = checkAnswer(res.answer);
  }
  assert(
    `Portfolio Query: "${q}"`,
    ok,
    `Sources: ${JSON.stringify(res.sources)}, Answer snippet: "${res.answer.slice(0, 60)}..."`
  );
});

// ==========================================
// 7. KNOWLEDGE VERIFICATION GATE ASSERTION
// ==========================================
console.log("\n\x1b[36m[SUITE 7: Knowledge Verification Gate & Anti-Buzzword Assertion]\x1b[0m");

const BANNED_BUZZWORDS = [
  "100% private",
  "sub-10ms",
  "zero latency",
  "fully autonomous",
  "zero-cost"
];

let allFactsValid = true;
let invalidFactReason = "";

FACTS.forEach((fact) => {
  if (!fact.fact_id || !fact.entity || !fact.statement || !fact.source) {
    allFactsValid = false;
    invalidFactReason = `Missing required fields on fact ${fact.fact_id}`;
  }
  if (fact.verification_status !== "VERIFIED" && fact.verification_status !== "SUPPORTED_BY_DOCS") {
    allFactsValid = false;
    invalidFactReason = `Fact ${fact.fact_id} has invalid verification_status: ${fact.verification_status}`;
  }
  BANNED_BUZZWORDS.forEach((bw) => {
    if (fact.statement.toLowerCase().includes(bw)) {
      allFactsValid = false;
      invalidFactReason = `Fact ${fact.fact_id} contains banned buzzword '${bw}'`;
    }
  });
});

assert(
  `Knowledge Verification Gate: all ${FACTS.length} facts verified with valid metadata and zero banned buzzwords`,
  allFactsValid,
  invalidFactReason
);

assert(
  `Manifest consistency: recorded facts count matches (${MANIFEST.factCount} === ${FACTS.length})`,
  MANIFEST.factCount === FACTS.length
);

assert(
  `Canonical projects: exactly 6 canonical projects present`,
  Object.keys(PROJECTS).length === 6
);

// ==========================================
// SUMMARY REPORT
// ==========================================
console.log("\n=======================================================");
console.log(` TOTAL EVALUATION TESTS: ${totalTests}`);
console.log(` \x1b[32mPASSED\x1b[0m: ${passedTests}`);
if (failedTests > 0) {
  console.log(` \x1b[31mFAILED\x1b[0m: ${failedTests}`);
} else {
  console.log(` \x1b[32mALL TESTS PASSED (100% SUCCESS RATE)\x1b[0m`);
}
console.log("=======================================================\n");

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
