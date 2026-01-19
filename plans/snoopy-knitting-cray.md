# GitHub Insights AI Attribution Extension

## Overview
Extend the agentblame Chrome extension to augment GitHub's existing Insights pages with AI attribution data. The goal is to enable **curiosity and self-awareness** - helping individuals and teams discover interesting patterns about how they collaborate with AI.

## Design Philosophy
- **Actionable insights, not surveillance** - Every metric should answer "so what?"
- **Curiosity-driven, not metrics-driven** - Frame insights as discoveries, not dashboards
- **Non-judgmental** - High AI ≠ bad, low AI ≠ good
- **Personal and surprising** - Like Spotify Wrapped for your coding patterns
- **Questions, not answers** - Prompt self-reflection

### What to AVOID
- ❌ Leaderboards of who uses AI most
- ❌ Individual AI % visible to managers as surveillance
- ❌ Shaming metrics
- ❌ Raw line counts without context

### What to INCLUDE
- ✅ Quality correlation (survivability)
- ✅ Tool effectiveness comparisons
- ✅ Personal productivity insights (private)
- ✅ Actionable refactoring signals (duplication, security paths)

---

## Features

### Feature 1: Pulse Page + AI Adoption Graph (Real)

**Summary Section Augmentation:**
```
On main, 1 file has changed with 34 additions and 0 deletions
  └─ 🤖 22 AI-generated (65%) · 👤 12 human (35%)
```

**Top Committers Augmentation:**
```
👤 alice    ████████ 13
            🤖 62% AI
```

**New Card: AI Adoption Over Time (Graph, not just a number)**
```
┌─ AI Adoption Over Time ─────────────────────────────┐
│                                                     │
│ 70% │                                      ●───●    │
│     │                                ●────●   ↑     │
│ 50% │                          ●────●      Cursor   │
│     │                    ●────●                     │
│ 30% │              ○────○────○────○────○   Claude   │
│     │        ●────●                                 │
│ 10% │  ●────●                                       │
│     └───────────────────────────────────────────    │
│       W1   W2   W3   W4   W5   W6   W7   W8        │
│                                                     │
│ Current: 65%  ↑ 8% vs last week                     │
│ Cursor: 53% · Claude: 12%                           │
└─────────────────────────────────────────────────────┘
```

**Why a graph:** Shows trajectory and tool adoption trends, not just a snapshot.

---

### Feature 2: Contributors + Personal Fingerprint (Real)

**Per-Contributor Badge:**
```
alice                    1,234 ++ / 567 --    🤖 58%
```

**Expanded Personal Dashboard (when viewing your own profile):**
```
┌─ Your AI Fingerprint ───────────────────────────────┐
│                                                     │
│ Overall: 58% AI-assisted                            │
│                                                     │
│ By file type:          Tools:        Trend:         │
│ Tests     ████░ 78%    Cursor  62%   ▁▂▃▅▆ +12%    │
│ Utils     ███░░ 54%    Claude  38%   (last 30d)    │
│ Core      ██░░░ 41%                                 │
│                                                     │
│ Models:                                             │
│ claude-3.5-sonnet  ██████░░ 65%                     │
│ claude-3-opus      ███░░░░░ 30%                     │
│ gpt-4              █░░░░░░░  5%                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### Feature 3: Survivability-Based Insights (Speculative - The "Wow")

**Core Concept:** Track what happens to AI-generated code over time. Survivability = proxy for code quality.

- **Unchanged** = AI code still exists, same content
- **Modified** = AI code exists but was changed
- **Deleted** = AI code was removed

**This requires new GitHub API integration** to fetch commit history and compare file contents over time.

**Visual Design:**

```
┌─ What Happened to Your AI Code? ────────────────────┐
│                                                     │
│  Survivability (last 30 days)                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Unchanged:  ████████████████░░░░  73%              │
│  Modified:   █████░░░░░░░░░░░░░░░  22%              │
│  Deleted:    █░░░░░░░░░░░░░░░░░░░   5%              │
│                                                     │
│  Tool Effectiveness                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  Cursor:      82% survives                          │
│  Claude Code: 91% survives ← more stable for you    │
│                                                     │
│  💡 Insight: Claude Code producing more stable      │
│     code - maybe use it for complex tasks?          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Productivity Windows (when your AI code sticks)    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│  Mon ░░░░████░░░░░░░░░░░░░░░░░░                     │
│  Tue ░░░░░░░░░░░░████████░░░░░░                     │
│  Wed ░░░░████████░░░░░░░░░░░░░░                     │
│  Thu ░░░░░░░░░░░░░░████████░░░░                     │
│  Fri ░░░░████░░░░░░░░░░░░░░░░░░                     │
│       6am      12pm      6pm      12am              │
│                                                     │
│  💡 "Your AI code written 2-4pm survives 94%        │
│      vs 61% after 8pm.                              │
│                                                     │
│      Tired brain accepts worse suggestions?"        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Survivability by Code Type                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                     │
│  Code Type         AI Survives   Human Survives     │
│  ───────────────────────────────────────────────    │
│  Tests             95%           92%          ✓     │
│  API endpoints     89%           94%                │
│  Business logic    62%           85%          ⚠️    │
│                                                     │
│  💡 AI great for tests, less reliable for           │
│     business logic - human review recommended       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Why this is impressive:**
1. **Novel quality metric** - Not just "how much AI" but "how good was that AI code"
2. **Requires real engineering** - New API calls, historical data analysis
3. **Actionable** - Tells you WHEN and WHERE to use AI more carefully
4. **Curiosity-driven** - Ends with reflective questions, not judgments

---

## Technical Approach

### Feature 1 & 2: Insights Page Integration

**Page Detection:** Extend content script to detect:
- `/insights/pulse` → Feature 1
- `/insights/contributors` → Feature 2

**Data Source:** Fetch git notes for commits in the repo, aggregate by:
- Author (for per-contributor stats)
- Time period (for trends)
- Provider/model (for tool breakdown)

### Feature 3: Survivability Calculation

**New GitHub API Methods (add to `github-api.ts`):**

```typescript
// Get commits since a specific date/SHA
async getCommitsSince(owner: string, repo: string, since: string, path?: string): Promise<Commit[]> {
  // GET /repos/{owner}/{repo}/commits?since={since}&path={path}
}

// Get file content at a specific ref
async getFileAtRef(owner: string, repo: string, path: string, ref: string): Promise<string> {
  // GET /repos/{owner}/{repo}/contents/{path}?ref={ref}
}

// Get blame data for a file (line-by-line history)
async getBlame(owner: string, repo: string, path: string, ref?: string): Promise<BlameData> {
  // Use GraphQL API for blame data
}
```

**Survivability Calculation Logic:**

```typescript
interface SurvivabilityResult {
  unchanged: number;   // Lines still exist, same hash
  modified: number;    // Lines exist but content changed
  deleted: number;     // Lines no longer exist
  total: number;
}

async function calculateSurvivability(
  owner: string,
  repo: string,
  attributions: Attribution[],  // AI-attributed lines from git notes
  afterCommit: string           // Calculate survival after this point
): Promise<SurvivabilityResult> {

  // 1. Group attributions by file path
  const byFile = groupBy(attributions, a => a.path);

  // 2. For each file, fetch current content at HEAD
  // 3. For each attributed line range, check:
  //    - Does the line still exist? (by line number proximity)
  //    - Is the content the same? (compare hashes)
  // 4. Classify: unchanged | modified | deleted
  // 5. Aggregate results
}
```

**Productivity Windows Calculation:**

```typescript
interface ProductivityWindow {
  dayOfWeek: number;       // 0-6
  hourOfDay: number;       // 0-23
  survivabilityRate: number;
  sampleSize: number;
}

function calculateProductivityWindows(
  attributions: Attribution[],
  survivability: Map<string, 'unchanged' | 'modified' | 'deleted'>
): ProductivityWindow[] {
  // 1. Parse timestamp from each attribution
  // 2. Group by (dayOfWeek, hourOfDay)
  // 3. Calculate survivability rate per bucket
  // 4. Return buckets with sufficient sample size
}
```

### File Path Categorization

```typescript
type FileCategory = 'tests' | 'utilities' | 'frontend' | 'backend' | 'config' | 'core';

function categorizeFile(path: string): FileCategory {
  if (/\/(tests?|__tests__|spec)\//i.test(path) || /\.(test|spec)\.[jt]sx?$/.test(path))
    return 'tests';
  if (/\/(utils?|helpers?|lib)\//i.test(path))
    return 'utilities';
  if (/\/(components?|pages?|views?)\//i.test(path))
    return 'frontend';
  if (/\/(api|routes?|controllers?|server)\//i.test(path))
    return 'backend';
  if (/\.(config|rc)\.[jt]s$|\.json$|\.ya?ml$/.test(path))
    return 'config';
  return 'core';
}
```

### Security Path Detection

```typescript
const SECURITY_PATTERNS = [
  /auth/i, /payment/i, /crypto/i, /secret/i,
  /credential/i, /token/i, /password/i, /\.env/
];

function isSecuritySensitive(path: string): boolean {
  return SECURITY_PATTERNS.some(p => p.test(path));
}
```

---

## Files to Modify

```
packages/chrome/src/
├── content/
│   ├── insights/                  # NEW - Insights page handlers
│   │   ├── pulse.ts               # Pulse page injection (Feature 1)
│   │   ├── contributors.ts        # Contributors + fingerprint (Feature 2)
│   │   ├── survivability.ts       # Survivability calculation (Feature 3)
│   │   └── index.ts               # Page detection and routing
│   └── content.ts                 # Add insights page detection
├── lib/
│   ├── github-api.ts              # ADD: getCommitsSince, getFileAtRef, getBlame
│   ├── aggregation.ts             # NEW: Data aggregation utilities
│   ├── file-categories.ts         # NEW: File path categorization
│   └── survivability.ts           # NEW: Survivability calculation engine
├── components/
│   ├── AdoptionGraph.tsx          # NEW: Time series chart for Feature 1
│   ├── PersonalFingerprint.tsx    # NEW: Personal dashboard for Feature 2
│   ├── SurvivabilityPanel.tsx     # NEW: Survivability insights for Feature 3
│   └── ProductivityHeatmap.tsx    # NEW: Day/hour heatmap for Feature 3
└── content/content.css            # ADD: Styles for new components
```

---

## Verification

**Feature 1 (Pulse):**
1. Navigate to repo's Insights > Pulse
2. Verify Summary shows AI/human line breakdown
3. Verify Top Committers shows AI% per person
4. Verify AI Adoption graph renders with time series data
5. Verify tool split (Cursor vs Claude) appears

**Feature 2 (Contributors):**
1. Navigate to repo's Insights > Contributors
2. Verify AI% badge appears next to each contributor
3. Click your own profile, verify expanded fingerprint appears
4. Verify file type breakdown, tool preferences, model distribution

**Feature 3 (Survivability):**
1. View personal fingerprint section
2. Verify survivability breakdown appears (unchanged/modified/deleted)
3. Verify tool effectiveness comparison shows
4. Verify productivity windows heatmap renders
5. Verify survivability by code type table shows
6. Verify insights have curiosity-driven tone with reflective questions

---

## Open Questions

- Survivability lookback period: 30 days? 90 days? Configurable?
- Rate limiting: How many API calls can we make for historical data?
- Caching strategy: Cache survivability results in extension storage?
- Minimum sample size: How many lines before showing productivity windows?
- Privacy: Should survivability data be local-only or shareable?
