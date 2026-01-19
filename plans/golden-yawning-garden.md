# Agentblame Dashboard Design

## Core Principle
**Actionable insights, not surveillance.** Every metric should answer "so what?" with a clear next step.

---

## Dashboard Views

### 1. Personal Developer View (Individual)

**Purpose:** Help developers understand their own patterns, not for management review.

```
┌─────────────────────────────────────────────────────────────┐
│  YOUR AI CODING PATTERNS (last 30 days)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Code Survivability          │  Tool Effectiveness          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  AI code unchanged: 73%      │  Cursor: 82% survives        │
│  AI code modified:  27%      │  Claude Code: 91% survives   │
│                              │                              │
│  [View modified blocks →]    │  Insight: Claude Code        │
│                              │  producing more stable code  │
│                              │                              │
├──────────────────────────────┴──────────────────────────────┤
│                                                             │
│  Productivity Windows (when your AI code sticks)            │
│                                                             │
│  Mon ░░░░████░░░░░░░░░░░░░░░░░░                            │
│  Tue ░░░░░░░░░░░░████████░░░░░░                            │
│  Wed ░░░░████████░░░░░░░░░░░░░░                            │
│  Thu ░░░░░░░░░░░░░░████████░░░░                            │
│  Fri ░░░░████░░░░░░░░░░░░░░░░░░                            │
│       6am      12pm      6pm      12am                      │
│                                                             │
│  Your AI code written 2-4pm has 94% survivability          │
│  vs. 61% for code written after 8pm                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why this matters:**
- Survivability = proxy for code quality
- Time patterns = personal insight, not management data
- Tool comparison = helps choose right tool for task

---

### 2. Code Health View (Per-Repository)

**Purpose:** Identify technical debt and refactoring opportunities.

```
┌─────────────────────────────────────────────────────────────┐
│  CODE HEALTH SIGNALS                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ⚠️  DUPLICATION DETECTED (3 instances)                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Content hash: 725288e451...                                │
│  Same AI-generated code appears in:                         │
│    • src/api/users.py:42-47                                │
│    • src/api/orders.py:38-43                               │
│    • src/api/products.py:55-60                             │
│                                                             │
│  → Suggest: Extract to shared utility                       │
│  [Create refactor ticket] [Dismiss]                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📈 COMPLEXITY CREEP                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Files where original AI code has drifted 100+ lines:       │
│                                                             │
│  File                    Original  Current   Growth         │
│  src/services/auth.py    L:45      L:312     +267 lines    │
│  src/handlers/webhook.py L:23      L:189     +166 lines    │
│                                                             │
│  → These files may benefit from splitting                   │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔒 SECURITY-SENSITIVE AI CODE                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  AI-generated code in sensitive paths:                      │
│                                                             │
│  Path                          AI%    Last Review           │
│  src/auth/oauth.py             34%    2 weeks ago ✓        │
│  src/payments/stripe.py        12%    Never ⚠️             │
│  src/crypto/signing.py         8%     3 days ago ✓         │
│                                                             │
│  [Request security review for stripe.py]                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Why this matters:**
- Duplication = concrete refactoring opportunity
- Complexity creep = early warning before files become unmaintainable
- Security paths = audit trail and review triggers

---

### 3. Quality Correlation View (Team/Org)

**Purpose:** Data-driven decisions about AI tooling and processes.

```
┌─────────────────────────────────────────────────────────────┐
│  AI CODE QUALITY METRICS (last 90 days)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BUG CORRELATION BY PROVIDER                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                             │
│  Provider              Lines   Bug-fix commits   Rate       │
│  ─────────────────────────────────────────────────────────  │
│  Human-written         12,847  89                0.69%      │
│  Cursor (opus)         3,421   31                0.91%      │
│  Claude Code           1,892   11                0.58%      │
│  Copilot               2,103   24                1.14%      │
│                                                             │
│  Insight: Claude Code has lowest bug correlation;           │
│           Copilot-generated code needs extra review         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SURVIVABILITY BY CODE TYPE                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                             │
│  Code Type             AI Survives   Human Survives         │
│  ─────────────────────────────────────────────────────────  │
│  API endpoints         89%           94%                    │
│  Database queries      71%           88%          ⚠️        │
│  Unit tests            95%           92%          ✓         │
│  Business logic        62%           85%          ⚠️        │
│                                                             │
│  Insight: AI great for tests/endpoints, less reliable       │
│           for DB queries and business logic                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  REVIEW FRICTION                                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                             │
│  PRs with AI code requiring 3+ review cycles:               │
│                                                             │
│  #1247 - auth refactor       4 cycles   AI: 67%            │
│  #1189 - payment flow        3 cycles   AI: 82%            │
│  #1156 - user settings       3 cycles   AI: 45%            │
│                                                             │
│  Pattern: High AI% PRs take longer to merge                 │
│  → Consider: AI for scaffolding, human for final impl       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 4. Trends Over Time (Strategic)

```
┌─────────────────────────────────────────────────────────────┐
│  AI ADOPTION TRENDS                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Codebase AI % Over Time                                    │
│                                                             │
│  25% │                                          ●──●        │
│      │                                    ●──●──            │
│  20% │                              ●──●──                  │
│      │                        ●──●──                        │
│  15% │                  ●──●──                              │
│      │            ●──●──                                    │
│  10% │      ●──●──                                          │
│      │●──●──                                                │
│   5% │                                                      │
│      └──────────────────────────────────────────────────    │
│        Jan  Feb  Mar  Apr  May  Jun  Jul  Aug              │
│                                                             │
│  Current: 23% AI-generated                                  │
│  Test coverage of AI code: 78% (vs 82% human)              │
│                                                             │
│  ⚠️ AI adoption outpacing test coverage                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Design Principles

### What to AVOID (vanity/surveillance metrics)
- ❌ "Leaderboard" of who uses AI most
- ❌ Individual developer AI % visible to managers
- ❌ Shaming metrics ("this code was AI-generated")
- ❌ Raw line counts without context

### What to INCLUDE (actionable insights)
- ✅ Quality correlation (bugs, survivability)
- ✅ Refactoring opportunities (duplication)
- ✅ Security review triggers
- ✅ Tool effectiveness comparisons
- ✅ Personal productivity insights (private)

---

## Data Sources Required

From agentblame:
- `content_hash` → duplication detection
- `provider` + `model` → tool comparison
- `path` + `start_line` → location tracking
- `timestamp` → time-based analysis

Additional integrations needed:
- Git history → survivability calculation
- Issue tracker → bug correlation
- PR reviews → friction analysis
- Test coverage tools → coverage correlation

---

## Implementation Plan

### Architecture: Chrome Extension Injection

The agentblame Chrome extension already:
- Reads git notes via GitHub API (token-authenticated)
- Injects UI into GitHub PR pages (summary banner, file badges, line markers)
- Has all the data we need in memory

**Strategy:** Expand the existing `.ab-pr-summary` banner with an expandable analytics panel.

### Extension Codebase (at /Users/guestdev/Developer/agentblame)

```
packages/chrome/src/
├── content/
│   ├── content.ts        # Main logic - fetch notes, coordinate injection
│   ├── github-dom.ts     # DOM manipulation - where we add metrics
│   └── content.css       # Styling
├── lib/
│   ├── github-api.ts     # GitHub API calls (commits, notes, blobs)
│   └── storage.ts        # Token storage
└── types.ts              # Shared interfaces
```

### Data Scope Challenge

| Metric | Single PR | Cross-PR History |
|--------|-----------|------------------|
| Provider breakdown | ✅ | - |
| Duplication in PR | ✅ | - |
| Personal analytics | - | ✅ needs storage |
| Complexity creep | - | ✅ needs file history |
| AI adoption trends | - | ✅ needs repo history |

**Solution:** Two-tier approach
1. **Tier 1 (PR Context):** Duplication, provider breakdown - works now
2. **Tier 2 (Historical):** Store data in `chrome.storage.local` + query repo history

### Phase 1: Enhance PR Summary Banner (Tier 1)

**File to modify:** `content/github-dom.ts`

```
┌─────────────────────────────────────────────────────────┐
│  ✨ 18 AI  │  👤 17 Human  │  51% AI Code  [▼ Details] │
├─────────────────────────────────────────────────────────┤
│  PROVIDER BREAKDOWN                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Cursor (claude-4.5-opus)    ████████████░░  14 lines  │
│  Claude Code                 ████░░░░░░░░░░   4 lines  │
│                                                         │
│  🔄 DUPLICATION DETECTED                                │
│  Same code block appears 3x (hash: 725288e4...)        │
│  → Consider extracting to shared utility                │
│    • main.py:42                                         │
│    • main.py:28 (branch: murali/PR10)                  │
│    • main.py:28 (branch: murali/PR1)                   │
└─────────────────────────────────────────────────────────┘
```

### Phase 2: Add Analytics Computation

**File to modify:** `content/content.ts`

Add new functions to compute metrics from existing data:

```typescript
interface PRAnalytics {
  providerBreakdown: Map<string, { lines: number; model: string }>;
  fileRiskList: Array<{ path: string; aiPercent: number; isSecuritySensitive: boolean }>;
  duplicateHashes: Array<{ hash: string; locations: string[] }>;
  securityAlerts: Array<{ path: string; aiPercent: number }>;
}

function computeAnalytics(
  attributions: Map<string, GitNotesAttribution>,
  fileStats: Map<string, { ai: number; human: number }>
): PRAnalytics {
  // Aggregate by provider
  // Detect security-sensitive paths
  // Find duplicate content_hash across files
}
```

### Phase 3: Historical Data Storage (Tier 2)

**New file:** `lib/history.ts`

Store PR data for historical analysis:

```typescript
interface PRSnapshot {
  repo: string;
  prNumber: number;
  timestamp: string;
  author: string;
  stats: {
    aiLines: number;
    humanLines: number;
    aiPercent: number;
  };
  providerBreakdown: Record<string, number>;
  files: Array<{ path: string; aiPercent: number }>;
  contentHashes: string[];  // For duplication tracking
}

// Store in chrome.storage.local
async function savePRSnapshot(snapshot: PRSnapshot): Promise<void> {
  const key = `pr:${snapshot.repo}:${snapshot.prNumber}`;
  await chrome.storage.local.set({ [key]: snapshot });
}

// Query historical data
async function getRepoHistory(repo: string): Promise<PRSnapshot[]> {
  const all = await chrome.storage.local.get(null);
  return Object.entries(all)
    .filter(([k]) => k.startsWith(`pr:${repo}:`))
    .map(([_, v]) => v as PRSnapshot)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
```

### Phase 4: Repo-Level Dashboard (Tier 2)

**Injection point:** GitHub repo main page or new popup tab

```
┌─────────────────────────────────────────────────────────┐
│  📊 REPO AI TRENDS (mesa-dot-dev/mesa-sandbox)         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  AI ADOPTION OVER TIME                                  │
│  25% │                                    ●───●         │
│  20% │                            ●───●───              │
│  15% │                    ●───●───                      │
│  10% │            ●───●───                              │
│   5% │    ●───●───                                      │
│      └──────────────────────────────────────────────    │
│        PR#1  PR#2  PR#3  PR#4  PR#5  PR#6  PR#7        │
│                                                         │
│  COMPLEXITY CREEP                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  main.py: AI code drifted from L:23 → L:54 (+31 lines) │
│  → File has grown 135% since first AI contribution     │
│                                                         │
│  DUPLICATION ACROSS PRs                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Hash 725288e4... found in PRs: #5, #6, #8             │
│  → Same pattern repeated - extract to shared module?    │
│                                                         │
│  YOUR PERSONAL STATS                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  PRs this month: 8                                      │
│  Avg AI %: 47%                                          │
│  Most used: Cursor (claude-4.5-opus)                   │
│  Peak productivity: Tue-Thu, 2-5pm                     │
└─────────────────────────────────────────────────────────┘
```

### Phase 5: Complexity Creep Detection

**Add to:** `lib/history.ts`

```typescript
interface ComplexityDrift {
  file: string;
  originalLine: number;
  currentLine: number;
  drift: number;
  growthPercent: number;
}

async function detectComplexityCreep(
  repo: string,
  currentNotes: Map<string, GitNotesAttribution>
): Promise<ComplexityDrift[]> {
  const history = await getRepoHistory(repo);

  // Find earliest occurrence of each file's AI code
  // Compare original start_line to current
  // Flag if drift > threshold (e.g., 50 lines)
}
```

### Phase 6: Duplication Detection (Cross-PR)

**Add to:** `lib/history.ts`

```typescript
async function findCrossRepoDuplication(
  repo: string,
  currentHashes: string[]
): Promise<Array<{ hash: string; prs: number[] }>> {
  const history = await getRepoHistory(repo);
  const hashToPRs = new Map<string, Set<number>>();

  // Build map of hash → PRs it appeared in
  for (const pr of history) {
    for (const hash of pr.contentHashes) {
      const prs = hashToPRs.get(hash) || new Set();
      prs.add(pr.prNumber);
      hashToPRs.set(hash, prs);
    }
  }

  // Return hashes appearing in 2+ PRs
  return [...hashToPRs.entries()]
    .filter(([hash, prs]) => prs.size >= 2 && currentHashes.includes(hash))
    .map(([hash, prs]) => ({ hash, prs: [...prs] }));
}
```

### Phase 7: Styling

**File to modify:** `content/content.css`

```css
.ab-analytics-panel {
  display: none;
  padding: 12px 16px;
  border-top: 1px solid var(--borderColor-muted);
  background: var(--bgColor-subtle);
}

.ab-analytics-panel.expanded {
  display: block;
}

.ab-details-toggle {
  cursor: pointer;
  color: var(--fgColor-accent);
  margin-left: 8px;
}

.ab-provider-bar {
  display: flex;
  height: 8px;
  background: var(--bgColor-muted);
  border-radius: 4px;
  overflow: hidden;
}

.ab-provider-segment {
  height: 100%;
}

.ab-duplication-alert {
  background: var(--bgColor-accent-muted);
  border-left: 3px solid var(--borderColor-accent-emphasis);
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
}

.ab-complexity-alert {
  background: var(--bgColor-attention-muted);
  border-left: 3px solid var(--borderColor-attention-emphasis);
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
}

.ab-trend-chart {
  font-family: monospace;
  font-size: 11px;
  line-height: 1.2;
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `content/content.ts` | Add `computeAnalytics()`, save snapshots, pass to DOM |
| `content/github-dom.ts` | Add `injectAnalyticsPanel()`, expand summary banner |
| `content/content.css` | Styles for expandable panel, charts, alerts |
| `lib/history.ts` | **New** - PR snapshot storage, historical queries |
| `types.ts` | Add `PRSnapshot`, `PRAnalytics`, `ComplexityDrift` interfaces |

---

## Implementation Order

### MVP (Tier 1 - Single PR)
1. Provider breakdown in expandable panel
2. Duplication detection within PR
3. Basic styling

### V2 (Tier 2 - Historical)
4. Add `lib/history.ts` for snapshot storage
5. Save PR data on each view
6. Repo-level dashboard (popup or injected)
7. Complexity creep detection
8. AI adoption trend chart
9. Personal stats aggregation

---

## Verification

### Tier 1 (MVP)
1. Load extension in Chrome (`chrome://extensions` → Load unpacked)
2. Navigate to PR with agentblame notes
3. Verify:
   - Summary banner shows "▼ Details" toggle
   - Clicking expands analytics panel
   - Provider breakdown shows correct line counts
   - Duplicate content hashes are flagged (if any in PR)

### Tier 2 (Historical)
1. View multiple PRs in same repo
2. Open popup or repo dashboard view
3. Verify:
   - AI adoption trend shows data points per PR
   - Cross-PR duplication detected
   - Complexity creep flagged for growing files
   - Personal stats reflect your PRs only
