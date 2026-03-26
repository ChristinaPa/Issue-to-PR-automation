const teams = [
  {
    id: "frontend",
    name: "Frontend Team",
    keywords: ["ui", "ux", "css", "html", "javascript", "react", "angular", "vue", "button", "layout", "responsive", "design", "browser", "dom", "component", "page", "style", "display", "render", "animation"],
    description: "Handles UI/UX issues, browser compatibility, and frontend frameworks"
  },
  {
    id: "backend",
    name: "Backend Team",
    keywords: ["api", "server", "database", "sql", "rest", "graphql", "endpoint", "authentication", "authorization", "middleware", "node", "express", "spring", "django", "controller", "service", "repository", "query", "migration"],
    description: "Handles server-side logic, APIs, and database issues"
  },
  {
    id: "devops",
    name: "DevOps Team",
    keywords: ["deploy", "deployment", "ci", "cd", "pipeline", "docker", "kubernetes", "k8s", "terraform", "aws", "azure", "gcp", "cloud", "infrastructure", "monitoring", "logging", "container", "helm", "jenkins", "github actions"],
    description: "Handles deployments, infrastructure, and CI/CD pipelines"
  },
  {
    id: "security",
    name: "Security Team",
    keywords: ["security", "vulnerability", "cve", "xss", "csrf", "injection", "ssl", "tls", "certificate", "encryption", "auth", "oauth", "token", "password", "breach", "penetration", "firewall", "compliance"],
    description: "Handles security vulnerabilities, compliance, and access control"
  },
  {
    id: "data",
    name: "Data Engineering Team",
    keywords: ["data", "analytics", "etl", "pipeline", "warehouse", "lake", "spark", "hadoop", "kafka", "streaming", "batch", "reporting", "dashboard", "metrics", "bigquery", "redshift", "snowflake"],
    description: "Handles data pipelines, analytics, and data infrastructure"
  },
  {
    id: "mobile",
    name: "Mobile Team",
    keywords: ["mobile", "ios", "android", "swift", "kotlin", "react native", "flutter", "app store", "push notification", "tablet", "phone", "touch", "gesture"],
    description: "Handles mobile app development for iOS and Android"
  }
];

function routeTicket(title, description, category) {
  const text = `${title} ${description}`.toLowerCase();

  // If category matches a team id directly, use that
  const directMatch = teams.find(t => t.id === category);
  if (directMatch) {
    return { team: directMatch, confidence: "high", method: "category_match" };
  }

  // Score each team based on keyword matches
  const scores = teams.map(team => {
    const matchedKeywords = team.keywords.filter(kw => text.includes(kw));
    return {
      team,
      score: matchedKeywords.length,
      matchedKeywords
    };
  });

  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score > 0) {
    const confidence = scores[0].score >= 3 ? "high" : scores[0].score >= 2 ? "medium" : "low";
    return {
      team: scores[0].team,
      confidence,
      method: "keyword_match",
      matchedKeywords: scores[0].matchedKeywords
    };
  }

  // Default to backend team if no matches
  return {
    team: teams.find(t => t.id === "backend"),
    confidence: "low",
    method: "default"
  };
}

module.exports = { teams, routeTicket };
