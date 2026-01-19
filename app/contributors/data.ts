// Contributors mock data

export interface Contributor {
  username: string;
  avatar: string;
  additions: number;
  deletions: number;
  aiPercent: number;
  commits: number;
}

export const contributors: Contributor[] = [
  {
    username: "alice",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    additions: 1234,
    deletions: 567,
    aiPercent: 58,
    commits: 42,
  },
  {
    username: "bob",
    avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    additions: 892,
    deletions: 234,
    aiPercent: 34,
    commits: 28,
  },
  {
    username: "carol",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    additions: 456,
    deletions: 123,
    aiPercent: 22,
    commits: 15,
  },
  {
    username: "dave",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    additions: 234,
    deletions: 89,
    aiPercent: 15,
    commits: 9,
  },
];

export const fingerprint = {
  overall: 58,
  period: "90 days",
  byFileType: [
    { type: "Tests", percent: 78 },
    { type: "Utils", percent: 54 },
    { type: "Core", percent: 41 },
  ],
  byTool: [
    { tool: "Cursor", percent: 62 },
    { tool: "Claude Code", percent: 38 },
  ],
  byModel: [
    { model: "claude-4-opus", percent: 65 },
    { model: "claude-3.5-sonnet", percent: 30 },
    { model: "gpt-4o", percent: 5 },
  ],
  trend: "+12%",
};

export const survivability = {
  unchanged: 73,
  modified: 22,
  deleted: 5,
  byTool: [
    { tool: "Cursor", survives: 82 },
    { tool: "Claude Code", survives: 91 },
  ],
  byCodeType: [
    { type: "Tests", aiSurvives: 95, humanSurvives: 92 },
    { type: "API endpoints", aiSurvives: 89, humanSurvives: 94 },
    { type: "Business logic", aiSurvives: 62, humanSurvives: 85 },
  ],
  productivityWindows: {
    best: "2-4pm",
    bestRate: 94,
    worst: "after 8pm",
    worstRate: 61,
  },
};

export const sidebarNav = [
  { label: "Pulse", href: "/pulse" },
  { label: "Contributors", href: "/contributors", active: true },
  { label: "Community", href: "#" },
  { label: "Traffic", href: "#" },
  { label: "Commits", href: "#" },
  { label: "Code frequency", href: "#" },
  { label: "Dependency graph", href: "#" },
  { label: "Network", href: "#" },
  { label: "Forks", href: "#" },
];

// Computed average AI percent
export const avgAIPercent = Math.round(
  contributors.reduce((sum, c) => sum + c.aiPercent, 0) / contributors.length
);
