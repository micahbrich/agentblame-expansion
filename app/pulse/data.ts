// Pulse mock data for AI adoption trends

export const pulse = {
  period: "Past week",
  totalLines: 1000,
  aiLines: 340,
  aiPercent: 34,
};

export const byWeek = [
  { week: "W1", cursor: 20, claude: 10 },
  { week: "W2", cursor: 35, claude: 15 },
  { week: "W3", cursor: 50, claude: 30 },
  { week: "W4", cursor: 40, claude: 20 },
  { week: "W5", cursor: 75, claude: 45 },
];

export const byProvider = [
  { name: "Cursor", lines: 220, percent: 67 },
  { name: "Claude Code", lines: 120, percent: 33 },
];

export const contributionActivity = [
  { date: "Jan 1", human: 45, ai: 12 },
  { date: "Jan 8", human: 52, ai: 18 },
  { date: "Jan 15", human: 48, ai: 25 },
  { date: "Jan 22", human: 61, ai: 32 },
  { date: "Jan 29", human: 55, ai: 38 },
  { date: "Feb 5", human: 67, ai: 45 },
  { date: "Feb 12", human: 72, ai: 52 },
  { date: "Feb 19", human: 58, ai: 48 },
  { date: "Feb 26", human: 63, ai: 55 },
  { date: "Mar 5", human: 70, ai: 62 },
];

export const activePRs = [
  {
    title: "feat: Add AI-powered code review suggestions",
    number: 47,
    author: "alice",
    aiPercent: 51,
  },
  {
    title: "fix: Resolve authentication edge case",
    number: 46,
    author: "bob",
    aiPercent: 28,
  },
];

export const overview = {
  authors: 4,
  commits: 12,
  branchCommits: 8,
  files: 24,
  additions: 1234,
  deletions: 567,
};

export const sidebarNav = [
  { label: "Pulse", href: "/pulse", active: true, interactive: true },
  { label: "Contributors", href: "/contributors", interactive: true },
  { label: "Community", href: "#", interactive: false },
  { label: "Traffic", href: "#", interactive: false },
  { label: "Commits", href: "#", interactive: false },
  { label: "Code frequency", href: "#", interactive: false },
  { label: "Dependency graph", href: "#", interactive: false },
  { label: "Network", href: "#", interactive: false },
  { label: "Forks", href: "#", interactive: false },
];

// Complementary Strengths Map - where different team members excel
export const strengths = {
  areas: ["Tests", "APIs", "UI", "Logic"],
  contributors: [
    { name: "alice", scores: [4, 3, 2, 1] }, // ●●●●, ●●●, ●●, ●
    { name: "bob", scores: [2, 4, 3, 3] },
    { name: "carol", scores: [3, 2, 4, 2] },
    { name: "dave", scores: [2, 2, 2, 4] },
  ],
  insight:
    "Different strengths, not better/worse. alice → tests, bob → APIs, carol → UI, dave → logic",
};

// Collective Intelligence Map - team-aggregated AI success zones
export const intelligence = {
  high: [
    { area: "Tests", survivability: 92 },
    { area: "Utilities", survivability: 88 },
    { area: "Components", survivability: 85 },
  ],
  caution: [
    { area: "Business logic", survivability: 62 },
    { area: "Auth flows", survivability: 58 },
    { area: "Payments", survivability: 54 },
  ],
  meta: {
    contributors: 4,
    days: 90,
  },
};

// AI Cost Breakdown - estimated spend using models.dev pricing
export const costs = {
  byModel: [
    { model: "claude-4-opus", spend: 847, inputCost: 15, lines: 2100 },
    { model: "claude-3.5-sonnet", spend: 234, inputCost: 3, lines: 1800 },
    { model: "gpt-4o", spend: 156, inputCost: 2.5, lines: 1200 },
  ],
  total: 1237,
  efficiency: {
    costPerSurviving: 0.12,
    costPerReverted: 0.31,
  },
  insight:
    "opus is 3x the cost but only 9% better survival. Consider sonnet for routine tasks.",
};

// Review Workload Distribution - who reviews AI-heavy PRs
export const reviews = {
  reviewers: [
    { name: "alice", human: 12, ai: 28 },
    { name: "bob", human: 25, ai: 8 },
    { name: "carol", human: 18, ai: 22 },
    { name: "dave", human: 15, ai: 12 },
  ],
  warning: "alice reviewing 3.5x more AI PRs than bob",
  insight: "Consider balancing review assignments",
};
