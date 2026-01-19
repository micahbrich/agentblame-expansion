// Mock data for agentblame GitHub mockups

export const mockPR = {
  number: 47,
  title: "feat: Add AI-powered code review suggestions",
  author: "alice",
  stats: { ai: 18, human: 17, percent: 51 },
  providers: [
    { name: "Cursor", model: "claude-4-opus", lines: 12, percent: 67 },
    { name: "Claude Code", model: "claude-3.5-sonnet", lines: 6, percent: 33 },
  ],
  securityFiles: [
    { path: "src/auth/oauth.ts", aiPercent: 78 },
    { path: "src/payments/stripe.ts", aiPercent: 45 },
  ],
  duplicates: [
    {
      hash: "725288e4",
      locations: [
        "src/api/users.ts:42-47",
        "src/api/orders.ts:38-43",
        "src/api/products.ts:55-60",
      ],
    },
  ],
};

export const mockPulse = {
  period: "Past week",
  totalLines: 1000,
  aiLines: 340,
  aiPercent: 34,
  byWeek: [
    { week: "W1", cursor: 20, claude: 10 },
    { week: "W2", cursor: 35, claude: 15 },
    { week: "W3", cursor: 50, claude: 30 },
    { week: "W4", cursor: 40, claude: 20 },
    { week: "W5", cursor: 75, claude: 45 },
  ],
  byProvider: [
    { name: "Cursor", lines: 220, percent: 67 },
    { name: "Claude Code", lines: 120, percent: 33 },
  ],
};

export const mockContributors = [
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

export const mockFingerprint = {
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

export const mockSurvivability = {
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

// Contribution activity data for charts
export const mockContributionActivity = [
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
