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
  { label: "Pulse", href: "/pulse", active: true },
  { label: "Contributors", href: "/contributors" },
  { label: "Community", href: "#" },
  { label: "Traffic", href: "#" },
  { label: "Commits", href: "#" },
  { label: "Code frequency", href: "#" },
  { label: "Dependency graph", href: "#" },
  { label: "Network", href: "#" },
  { label: "Forks", href: "#" },
];
