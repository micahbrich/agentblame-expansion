// Contributors mock data

export interface Contributor {
  username: string;
  avatar: string;
  additions: number;
  deletions: number;
  aiPercent: number;
  commits: number;
}

export interface Fingerprint {
  // Existing
  overall: number;
  period: string;
  byFileType: { type: string; percent: number }[];
  byTool: { tool: string; percent: number }[];
  byModel: { model: string; percent: number }[];
  trend: string;

  // New
  lines: { total: number; ai: number; human: number };

  activity: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];

  sessions: {
    ago: string;
    tool: string;
    model: string;
    lines: number;
  }[];

  files: {
    type: "Tests" | "Utils" | "Core";
    path: string;
    percent: number;
    lines: number;
  }[];

  quality: {
    survivability: number;
    vsTeamAvg: string;
    prApprovalRate: number;
    avgReviewComments: number;
    regressionCount: number;
    hotfixCount: number;
  };
}

export const contributors: Contributor[] = [
  {
    username: "alice",
    avatar: "https://i.pravatar.cc/150?img=5",
    additions: 1234,
    deletions: 567,
    aiPercent: 58,
    commits: 42,
  },
  {
    username: "bob",
    avatar: "https://i.pravatar.cc/150?img=12",
    additions: 892,
    deletions: 234,
    aiPercent: 34,
    commits: 28,
  },
  {
    username: "carol",
    avatar: "https://i.pravatar.cc/150?img=9",
    additions: 456,
    deletions: 123,
    aiPercent: 22,
    commits: 15,
  },
  {
    username: "dave",
    avatar: "https://i.pravatar.cc/150?img=8",
    additions: 234,
    deletions: 89,
    aiPercent: 15,
    commits: 9,
  },
];

// Generate deterministic activity data for the last 90 days
function generateActivity(seed: number, avgLevel: number): Fingerprint["activity"] {
  const data: Fingerprint["activity"] = [];
  // Use a fixed end date to avoid hydration mismatches
  const end = new Date("2026-01-19");
  for (let i = 90; i >= 0; i--) {
    const date = new Date(end);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    // Deterministic pseudo-random based on seed and day index
    const hash = ((seed * 31 + i) * 17) % 100;
    let level: 0 | 1 | 2 | 3 | 4;
    if (hash < 20) level = 0;
    else if (hash < 40) level = Math.min(avgLevel, 1) as 0 | 1 | 2 | 3 | 4;
    else if (hash < 70) level = Math.min(avgLevel + 1, 3) as 0 | 1 | 2 | 3 | 4;
    else level = Math.min(avgLevel + 2, 4) as 0 | 1 | 2 | 3 | 4;
    data.push({ date: dateStr, count: level * 3, level });
  }
  return data;
}

export const fingerprint: Fingerprint = {
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
  lines: { total: 2847, ai: 1651, human: 1196 },
  activity: generateActivity(1, 3),
  sessions: [
    { ago: "2h", tool: "Cursor", model: "opus", lines: 47 },
    { ago: "5h", tool: "Claude Code", model: "sonnet", lines: 23 },
    { ago: "1d", tool: "Cursor", model: "opus", lines: 156 },
    { ago: "2d", tool: "Cursor", model: "sonnet", lines: 89 },
  ],
  files: [
    { type: "Tests", path: "auth.test.ts", percent: 92, lines: 234 },
    { type: "Tests", path: "api.test.ts", percent: 78, lines: 189 },
    { type: "Utils", path: "helpers.ts", percent: 67, lines: 156 },
    { type: "Utils", path: "validators.ts", percent: 54, lines: 89 },
    { type: "Core", path: "auth.ts", percent: 45, lines: 312 },
    { type: "Core", path: "api.ts", percent: 38, lines: 267 },
  ],
  quality: {
    survivability: 82,
    vsTeamAvg: "+7%",
    prApprovalRate: 94,
    avgReviewComments: 2.1,
    regressionCount: 1,
    hotfixCount: 0,
  },
};

export const fingerprints: Record<string, Fingerprint> = {
  alice: {
    overall: 58,
    period: "90 days",
    byFileType: [
      { type: "Tests", percent: 85 },
      { type: "Utils", percent: 62 },
      { type: "Core", percent: 45 },
    ],
    byTool: [
      { tool: "Cursor", percent: 72 },
      { tool: "Claude Code", percent: 28 },
    ],
    byModel: [
      { model: "claude-4-opus", percent: 65 },
      { model: "claude-3.5-sonnet", percent: 30 },
      { model: "gpt-4o", percent: 5 },
    ],
    trend: "+12%",
    lines: { total: 2847, ai: 1651, human: 1196 },
    activity: generateActivity(1, 3),
    sessions: [
      { ago: "2h", tool: "Cursor", model: "opus", lines: 47 },
      { ago: "5h", tool: "Claude Code", model: "sonnet", lines: 23 },
      { ago: "1d", tool: "Cursor", model: "opus", lines: 156 },
      { ago: "2d", tool: "Cursor", model: "sonnet", lines: 89 },
    ],
    files: [
      { type: "Tests", path: "auth.test.ts", percent: 92, lines: 234 },
      { type: "Tests", path: "api.test.ts", percent: 78, lines: 189 },
      { type: "Utils", path: "helpers.ts", percent: 67, lines: 156 },
      { type: "Utils", path: "validators.ts", percent: 54, lines: 89 },
      { type: "Core", path: "auth.ts", percent: 45, lines: 312 },
      { type: "Core", path: "api.ts", percent: 38, lines: 267 },
    ],
    quality: {
      survivability: 82,
      vsTeamAvg: "+7%",
      prApprovalRate: 94,
      avgReviewComments: 2.1,
      regressionCount: 1,
      hotfixCount: 0,
    },
  },
  bob: {
    overall: 34,
    period: "90 days",
    byFileType: [
      { type: "Tests", percent: 68 },
      { type: "Utils", percent: 42 },
      { type: "Core", percent: 18 },
    ],
    byTool: [
      { tool: "Cursor", percent: 52 },
      { tool: "Claude Code", percent: 48 },
    ],
    byModel: [
      { model: "claude-3.5-sonnet", percent: 58 },
      { model: "claude-4-opus", percent: 35 },
      { model: "gpt-4o", percent: 7 },
    ],
    trend: "+5%",
    lines: { total: 1892, ai: 643, human: 1249 },
    activity: generateActivity(2, 2),
    sessions: [
      { ago: "4h", tool: "Claude Code", model: "sonnet", lines: 34 },
      { ago: "1d", tool: "Cursor", model: "sonnet", lines: 67 },
      { ago: "3d", tool: "Claude Code", model: "opus", lines: 45 },
    ],
    files: [
      { type: "Tests", path: "user.test.ts", percent: 72, lines: 145 },
      { type: "Tests", path: "db.test.ts", percent: 65, lines: 98 },
      { type: "Utils", path: "format.ts", percent: 45, lines: 67 },
      { type: "Core", path: "user.ts", percent: 22, lines: 234 },
      { type: "Core", path: "db.ts", percent: 15, lines: 189 },
    ],
    quality: {
      survivability: 78,
      vsTeamAvg: "+3%",
      prApprovalRate: 91,
      avgReviewComments: 2.8,
      regressionCount: 2,
      hotfixCount: 1,
    },
  },
  carol: {
    overall: 22,
    period: "90 days",
    byFileType: [
      { type: "Tests", percent: 55 },
      { type: "Utils", percent: 12 },
      { type: "Core", percent: 8 },
    ],
    byTool: [
      { tool: "Claude Code", percent: 78 },
      { tool: "Cursor", percent: 22 },
    ],
    byModel: [
      { model: "claude-3.5-sonnet", percent: 82 },
      { model: "claude-4-opus", percent: 18 },
    ],
    trend: "-3%",
    lines: { total: 1456, ai: 320, human: 1136 },
    activity: generateActivity(3, 1),
    sessions: [
      { ago: "1d", tool: "Claude Code", model: "sonnet", lines: 18 },
      { ago: "4d", tool: "Claude Code", model: "sonnet", lines: 42 },
      { ago: "1w", tool: "Cursor", model: "opus", lines: 23 },
    ],
    files: [
      { type: "Tests", path: "integration.test.ts", percent: 58, lines: 112 },
      { type: "Utils", path: "logger.ts", percent: 15, lines: 45 },
      { type: "Core", path: "config.ts", percent: 10, lines: 89 },
      { type: "Core", path: "middleware.ts", percent: 6, lines: 178 },
    ],
    quality: {
      survivability: 88,
      vsTeamAvg: "+13%",
      prApprovalRate: 97,
      avgReviewComments: 1.4,
      regressionCount: 0,
      hotfixCount: 0,
    },
  },
  dave: {
    overall: 15,
    period: "90 days",
    byFileType: [
      { type: "Tests", percent: 38 },
      { type: "Utils", percent: 8 },
      { type: "Core", percent: 4 },
    ],
    byTool: [{ tool: "Cursor", percent: 100 }],
    byModel: [{ model: "claude-3.5-sonnet", percent: 100 }],
    trend: "+2%",
    lines: { total: 934, ai: 140, human: 794 },
    activity: generateActivity(4, 1),
    sessions: [
      { ago: "3d", tool: "Cursor", model: "sonnet", lines: 12 },
      { ago: "1w", tool: "Cursor", model: "sonnet", lines: 28 },
    ],
    files: [
      { type: "Tests", path: "e2e.test.ts", percent: 42, lines: 78 },
      { type: "Utils", path: "constants.ts", percent: 10, lines: 34 },
      { type: "Core", path: "types.ts", percent: 5, lines: 156 },
    ],
    quality: {
      survivability: 91,
      vsTeamAvg: "+16%",
      prApprovalRate: 98,
      avgReviewComments: 1.1,
      regressionCount: 0,
      hotfixCount: 0,
    },
  },
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
