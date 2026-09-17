/**
 * Smart Recovery Utility for Workshop Misfiled 404
 * 
 * Conservatively evaluates whether an invalid path resembles
 * a canonical project reference. Only recommends a project when:
 * 1. Similarity score >= 0.65
 * 2. Top match is clearly ahead of the second-best match (margin >= 0.15)
 */

import { PROJECTS } from "../data/canonicalKnowledge.js";

// Levenshtein distance implementation
function levenshteinDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

// Normalized similarity (0.0 to 1.0)
function stringSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;

  const maxLen = Math.max(s1.length, s2.length);
  const distance = levenshteinDistance(s1, s2);
  return 1 - distance / maxLen;
}

const PROJECT_CANDIDATES = [
  {
    id: "janai",
    title: PROJECTS.janai?.title || "JanAI",
    number: "01",
    aliases: ["janai", "jan-ai", "jana-ai", "janai-platform", "civic", "welfare"]
  },
  {
    id: "zeus",
    title: PROJECTS.zeus?.title || "Zeus Robot",
    number: "02",
    aliases: ["zeus", "zeus-robot", "robot", "slam", "lidar"]
  },
  {
    id: "sagiro",
    title: PROJECTS.sagiro?.title || "Sagiro",
    number: "03",
    aliases: ["sagiro", "sagiro-app", "sagiro-ledger", "finance", "ledger"]
  },
  {
    id: "evalmesh",
    title: PROJECTS.evalmesh?.title || "EvalMesh",
    number: "04",
    aliases: ["evalmesh", "eval-mesh", "eval", "mesh", "ragas"]
  },
  {
    id: "security-toolkit",
    title: PROJECTS["security-toolkit"]?.title || "Cyber Security Toolkit",
    number: "05",
    aliases: ["security-toolkit", "security", "cybersecurity", "cyber-toolkit", "toolkit"]
  },
  {
    id: "student-db",
    title: PROJECTS["student-db"]?.title || "Student Database System",
    number: "06",
    aliases: ["student-db", "student", "student-database", "database", "sqlite-student"]
  }
];

/**
 * Evaluates an invalid path and returns a confident project recommendation, or null.
 * 
 * @param {string} path - The invalid requested URL path (e.g. "/projects/sagirooo")
 * @returns {object|null} - { id, title, number, confidence } or null
 */
export function findSmartRecoveryMatch(path) {
  if (!path || typeof path !== "string") return null;

  // Clean path: strip slashes, "projects/", "work/", query params, file extensions
  let cleaned = path.toLowerCase().replace(/^[/#]+|[/#]+$/g, "");
  cleaned = cleaned.replace(/^(projects|project|work|case-study|studies)\//, "");
  cleaned = cleaned.split("?")[0].split("#")[0];
  cleaned = cleaned.replace(/\.(html|php|js)$/, "");

  if (!cleaned || cleaned.length < 3) return null;

  // Words or segments in the path
  const segments = cleaned.split(/[-_/ ]+/).filter((s) => s.length >= 3);
  if (segments.length === 0) segments.push(cleaned);

  const scores = [];

  for (const candidate of PROJECT_CANDIDATES) {
    let maxSim = 0;

    // Check direct ID & all aliases against each segment and the whole cleaned string
    for (const alias of candidate.aliases) {
      // Direct whole-string similarity
      const wholeSim = stringSimilarity(cleaned, alias);
      if (wholeSim > maxSim) maxSim = wholeSim;

      // Substring containment bonus if alias length >= 4
      if (alias.length >= 4 && (cleaned.includes(alias) || alias.includes(cleaned))) {
        const containmentScore = Math.min(cleaned.length, alias.length) / Math.max(cleaned.length, alias.length);
        if (containmentScore > maxSim) maxSim = containmentScore;
      }

      // Check against individual segments
      for (const seg of segments) {
        const segSim = stringSimilarity(seg, alias);
        if (segSim > maxSim) maxSim = segSim;
        if (alias.length >= 4 && (seg.includes(alias) || alias.includes(seg))) {
          const segContainment = Math.min(seg.length, alias.length) / Math.max(seg.length, alias.length);
          if (segContainment > maxSim) maxSim = segContainment;
        }
      }
    }

    scores.push({
      candidate,
      score: maxSim
    });
  }

  // Sort descending by score
  scores.sort((a, b) => b.score - a.score);

  const top = scores[0];
  const second = scores[1];

  // Conservative checks:
  // 1. Must reach >= 0.65 similarity
  if (!top || top.score < 0.65) {
    return null;
  }

  // 2. Must be decisively better than second best (margin >= 0.15) if second best is also reasonably high
  if (second && second.score >= 0.5) {
    if (top.score - second.score < 0.15) {
      return null; // Ambiguous, don't guess
    }
  }

  return {
    id: top.candidate.id,
    title: top.candidate.title,
    number: top.candidate.number,
    confidence: Math.round(top.score * 100) / 100
  };
}
