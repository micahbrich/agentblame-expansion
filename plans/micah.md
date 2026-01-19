# Agentblame Enhancement Plan: Unified Approach

## Decision: Both PR Pages AND Insights Pages

Inject into **both** locations - they serve different use cases:
- **PR pages**: Immediate, actionable context for the current PR
- **Insights pages**: Historical trends, personal patterns, repo-level view

## Data Architecture: GitHub API, Not Chrome Storage

The extension already has GitHub API access. For historical data:

```
┌─────────────────────────────────────────────────────────────────┐
│                     DATA SOURCES (all via GitHub API)           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Git Notes (refs/notes/agentblame)     Commits API              │
│  ─────────────────────────────────     ───────────              │
│  • provider, model per line            • Commit history         │
│  • content_hash                        • Timestamps             │
│  • confidence, match_type              • Authors                │
│  • Already fetched for PRs             • File diffs             │
│                                                                 │
│  Blame API (GraphQL)                   Compare API              │
│  ───────────────────                   ───────────              │
│  • Line-by-line authorship             • Diff between refs      │
│  • Commit SHA per line                 • Survivability check    │
│  • Enables survivability tracking      • What changed since X   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**New GitHub API methods to add to `github-api.ts`:**

```typescript
// Get commits in a time range for a repo
async getCommitsSince(owner, repo, since: string, author?: string): Promise<Commit[]>

// Get blame data for a file (GraphQL API)
async getBlame(owner, repo, path, ref?): Promise<BlameData>

// Get file content at a specific ref
async getFileAtRef(owner, repo, path, ref): Promise<string>

// Compare two refs to see what changed
async compareRefs(owner, repo, base, head): Promise<Comparison>
```

---

## Visual Design: What Each Feature Looks Like

### 1. Expanded PR Summary Banner (PR Page)

**Current state:**
```
┌─────────────────────────────────────────────────────────────┐
│  [logo] Agent Blame                                         │
│                                                             │
│  ✨ 18          👤 17           51%                         │
│  AI Generated   Human Written   AI Code                     │
└─────────────────────────────────────────────────────────────┘
```

**Proposed expansion (click to expand):**
```
┌─────────────────────────────────────────────────────────────┐
│  [logo] Agent Blame                                         │
│                                                             │
│  ✨ 18          👤 17           51%                         │
│  AI Generated   Human Written   AI Code                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PROVIDER BREAKDOWN                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  Cursor (claude-4-opus)   ████████████░░░░  12 lines (67%)  │
│  Claude Code              ████░░░░░░░░░░░░   6 lines (33%)  │
│                                                             │
│  SECURITY-SENSITIVE FILES                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ⚠️  src/auth/oauth.ts         AI: 78%   [Review suggested] │
│  ⚠️  src/payments/stripe.ts    AI: 45%   [Review suggested] │
│                                                             │
│  DUPLICATION DETECTED                                       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  🔄 Same code block (hash: 725288e4...) appears 3 times:   │
│     • src/api/users.ts:42-47                               │
│     • src/api/orders.ts:38-43                              │
│     • src/api/products.ts:55-60                            │
│     → Consider extracting to shared utility                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**
- Extend `injectPRSummary()` in `github-dom.ts`
- Add toggle button, expanded panel
- Compute provider breakdown from existing `GitNotesAttribution` data
- Detect duplicates via `content_hash` grouping
- Pattern match file paths for security detection

---

### 2. Insights > Pulse Page Augmentation

**GitHub's existing Pulse page shows:**
- Summary: "X commits, Y files changed"
- Top committers

**We inject alongside:**
```
┌─────────────────────────────────────────────────────────────┐
│  GITHUB'S PULSE PAGE                                        │
│  ───────────────────                                        │
│  Overview: 47 commits, 23 authors, 156 files changed        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  🤖 AI CODE THIS PERIOD                [agentblame] │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │                                                     │    │
│  │  34 additions were AI-generated (22% of total)      │    │
│  │                                                     │    │
│  │  AI ADOPTION OVER TIME                              │    │
│  │  ─────────────────────────────────────────────────  │    │
│  │  40% │                                    ●         │    │
│  │      │                              ●────●          │    │
│  │  30% │                        ●────●                │    │
│  │      │                  ●────●                      │    │
│  │  20% │            ●────●                            │    │
│  │      │      ●────●                                  │    │
│  │  10% │●────●                                        │    │
│  │      └───────────────────────────────────────────   │    │
│  │        W1   W2   W3   W4   W5   W6   W7   W8       │    │
│  │                                                     │    │
│  │  BY TOOL                                            │    │
│  │  Cursor ██████████░░ 67%                            │    │
│  │  Claude ████░░░░░░░░ 33%                            │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [rest of GitHub's Pulse page...]                           │
└─────────────────────────────────────────────────────────────┘
```

**How to compute (via GitHub API):**
1. `getCommitsSince(owner, repo, since)` - get commits in period
2. For each commit, fetch git notes via existing `fetchNotesForCommits()`
3. Aggregate by week, by provider
4. Render chart via simple ASCII or canvas

---

### 3. Insights > Contributors Page Augmentation

**GitHub's existing Contributors page shows:**
- Bar chart of contributions per person
- Activity graph

**We inject per-contributor badges + personal fingerprint:**
```
┌─────────────────────────────────────────────────────────────┐
│  GITHUB'S CONTRIBUTORS PAGE                                 │
│                                                             │
│  alice          ████████████████  1,234 ++ / 567 --         │
│                                   [🤖 58% AI]  ← our badge  │
│                                                             │
│  bob            ██████████        892 ++ / 234 --           │
│                                   [🤖 34% AI]               │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  YOUR AI FINGERPRINT (private - only visible to you)        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │  Overall: 58% AI-assisted (last 90 days)            │    │
│  │                                                     │    │
│  │  BY FILE TYPE            BY TOOL           TREND    │    │
│  │  Tests    ████░ 78%      Cursor  62%      ▁▂▃▅▆    │    │
│  │  Utils    ███░░ 54%      Claude  38%      +12%     │    │
│  │  Core     ██░░░ 41%                       (30d)    │    │
│  │                                                     │    │
│  │  BY MODEL                                           │    │
│  │  claude-4-opus     ██████░░ 65%                     │    │
│  │  claude-3.5-sonnet ███░░░░░ 30%                     │    │
│  │  gpt-4o            █░░░░░░░  5%                     │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Privacy model:**
- Per-contributor AI% badges are **visible to everyone** (same as GitHub's contribution counts)
- "Your AI Fingerprint" panel is **only shown to the authenticated user** viewing their own profile
- No leaderboard sorting by AI% - just factual badges

---

### 4. Survivability Panel (Personal Insight)

**Location**: Expandable section in Contributors fingerprint OR popup

```
┌─────────────────────────────────────────────────────────────┐
│  WHAT HAPPENED TO YOUR AI CODE? (last 90 days)              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                             │
│  Survivability                                              │
│  ─────────────────────────────────────────────────────────  │
│  Unchanged   ████████████████░░░░  73%   (code still there) │
│  Modified    █████░░░░░░░░░░░░░░░  22%   (edited later)     │
│  Deleted     █░░░░░░░░░░░░░░░░░░░   5%   (removed)          │
│                                                             │
│  Tool Effectiveness                                         │
│  ─────────────────────────────────────────────────────────  │
│  Cursor:       82% survives                                 │
│  Claude Code:  91% survives  ← more stable for you          │
│                                                             │
│  💡 Your Claude Code output tends to stick around longer.   │
│     Maybe use it for complex tasks?                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PRODUCTIVITY WINDOWS (when your AI code sticks)            │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Mon ░░░░████░░░░░░░░░░░░░░░░░░  (best: 10am-12pm)         │
│  Tue ░░░░░░░░░░░░████████░░░░░░  (best: 2pm-6pm)           │
│  Wed ░░░░████████░░░░░░░░░░░░░░  (best: 10am-2pm)          │
│  Thu ░░░░░░░░░░░░░░████████░░░░  (best: 3pm-7pm)           │
│  Fri ░░░░████░░░░░░░░░░░░░░░░░░  (best: 10am-12pm)         │
│       6am      12pm      6pm      12am                      │
│                                                             │
│  💡 AI code written 2-4pm survives 94% of the time          │
│     vs 61% after 8pm. Tired brain accepts worse suggestions?│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SURVIVABILITY BY CODE TYPE                                 │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Code Type         AI Survives   Human Survives             │
│  ───────────────────────────────────────────────            │
│  Tests             95%           92%           ✓            │
│  API endpoints     89%           94%                        │
│  Business logic    62%           85%           ⚠️           │
│                                                             │
│  💡 AI is great for tests, less reliable for business logic │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**How survivability is computed (via GitHub API):**

```typescript
async function calculateSurvivability(owner, repo, myAttribs: Attribution[]) {
  // 1. Group AI-attributed lines by file and commit
  const byFile = groupBy(myAttribs, a => a.path);

  // 2. For each file, get current blame via GraphQL
  for (const [path, attribs] of byFile) {
    const blame = await api.getBlame(owner, repo, path, 'HEAD');

    // 3. For each originally AI-attributed line range:
    for (const attr of attribs) {
      const originalCommit = attr.commit_sha;
      const lineRange = { start: attr.start_line, end: attr.end_line };

      // Check: is this line still attributed to the original commit?
      // - YES, same commit → UNCHANGED
      // - NO, different commit but line exists → MODIFIED
      // - Line no longer exists → DELETED
    }
  }
}
```

---

### 5. Code Health Signals (Repo-Wide, Aggregate Only)

**Location**: Insights page OR popup dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  CODE HEALTH SIGNALS                                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                             │
│  🔄 CROSS-PR DUPLICATION                                    │
│  ─────────────────────────────────────────────────────────  │
│  Same AI-generated pattern (hash: 725288e4) found in:       │
│    • PR #47 - src/api/users.ts:42                          │
│    • PR #51 - src/api/orders.ts:38                         │
│    • PR #58 - src/api/products.ts:55                       │
│                                                             │
│  → This is a refactoring opportunity                        │
│                                                             │
│  📈 COMPLEXITY CREEP                                        │
│  ─────────────────────────────────────────────────────────  │
│  Files where AI-generated code has grown significantly:     │
│                                                             │
│  File                    Original   Current   Growth        │
│  src/services/auth.ts    45 lines   312 lines +267 (593%)  │
│  src/handlers/webhook.ts 23 lines   189 lines +166 (722%)  │
│                                                             │
│  → These files may benefit from splitting                   │
│                                                             │
│  📊 TOOL EFFECTIVENESS (aggregate, not per-person)          │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Provider        Lines   Avg Survivability   Trend          │
│  Cursor          3,421   82%                 ▲ +3%          │
│  Claude Code     1,892   91%                 ▲ +5%          │
│                                                             │
│  (These are repo-wide aggregates, NOT per-developer)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Scope: Phase 1 + 2 in Parallel

### Track A: Expanded PR Banner
- Extend `injectPRSummary()` with toggle + expanded panel
- Provider breakdown from existing attribution data
- Duplication detection via `content_hash`
- Security-sensitive file flagging via path patterns
- **Files**: `github-dom.ts`, `content.ts`, `content.css`
- **No new API calls needed** - uses existing data

### Track B: Insights Page Injection
- **Update manifest.json** to match Insights URLs:
  ```json
  "matches": [
    "https://github.com/*/*/pull/*",
    "https://github.com/*/*/pulse",
    "https://github.com/*/*/graphs/contributors"
  ]
  ```
- Add page detection for `/pulse` and `/graphs/contributors`
- Create `content/insights/` directory
- Add `getCommitsSince()` to `github-api.ts` for historical data
- Add caching layer in `lib/cache.ts` using chrome.storage.local
- Basic AI adoption stats on Pulse page
- Per-contributor AI% badges on Contributors page
- **Files**: `manifest.json`, new `insights/*.ts`, new `lib/cache.ts`, extend `github-api.ts`

### Future Phases (not this scope)
- Phase 3: Personal fingerprint + survivability calculation
- Phase 4: Productivity windows heatmap
- Phase 5: Cross-PR duplication + code health signals

---

## Files to Create/Modify

```
packages/chrome/src/
├── content/
│   ├── content.ts              # MODIFY: Add Insights page detection
│   ├── github-dom.ts           # MODIFY: Expand PR summary banner
│   ├── insights/               # NEW DIRECTORY
│   │   ├── index.ts            # NEW: Page detection + routing
│   │   ├── pulse.ts            # NEW: Pulse page augmentation
│   │   └── contributors.ts     # NEW: Contributors + fingerprint
│   └── content.css             # MODIFY: Styles for new components
├── lib/
│   ├── github-api.ts           # MODIFY: Add getCommitsSince, getBlame
│   ├── aggregation.ts          # NEW: Time series, provider aggregation
│   ├── survivability.ts        # NEW: Survivability calculation
│   ├── file-categories.ts      # NEW: Test/util/core classification
│   └── security-patterns.ts    # NEW: Security-sensitive path detection
└── types.ts                    # MODIFY: New interfaces
```

---

## Security-Sensitive Path Patterns

```typescript
const SECURITY_PATTERNS = [
  // Auth & Identity
  /\/(auth|authentication|oauth|sso|login|session)\//i,

  // Payment & Financial
  /\/(payment|billing|stripe|checkout|subscription)\//i,

  // Cryptography
  /\/(crypto|encryption|signing|hash)\//i,

  // Secrets & Credentials
  /\/(secrets?|credentials?|tokens?|passwords?|keys?)\//i,

  // Admin & Privileges
  /\/(admin|sudo|privilege|permissions?)\//i,

  // Environment & Config files
  /\.env/,
  /secrets?\.(ts|js|json|ya?ml)$/,
  /credentials?\.(ts|js|json|ya?ml)$/,
  /config\.(prod|production)\./i,
];
```

---

## Verification Plan

### Phase 1 (PR Banner)
1. Navigate to PR with agentblame notes
2. Click expand toggle on summary banner
3. Verify provider breakdown shows correct counts
4. Verify duplication alerts appear when content_hash repeats
5. Verify security flags appear for auth/payment files

### Phase 2 (Insights Pages)
1. Navigate to repo's Insights > Pulse
2. Verify AI Adoption card appears with chart
3. Navigate to Insights > Contributors
4. Verify AI% badges appear next to contributors
5. Verify YOUR fingerprint panel appears only for yourself

### Phase 3 (Survivability)
1. View your fingerprint on Contributors page
2. Verify survivability breakdown (unchanged/modified/deleted)
3. Verify productivity windows heatmap
4. Verify tool effectiveness comparison

---

---

## Pre-Flight Checklist

Before starting implementation:

1. **Git credentials** - User will configure their own name/email
2. **Branch**: `feature/expanded-analytics`
3. **Local testing**: `bun run build` → chrome://extensions → Load unpacked → `dist/`

## Key Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| Insights data source | Compute from git notes, cache in chrome.storage.local | No GitHub API for Insights pages |
| Pagination bug | Defer | Most PRs <100 commits, track as known issue |
| Security patterns | Comprehensive | Auth, payment, crypto, secrets, keys, credentials, tokens, admin, .env |
| Branch name | `feature/expanded-analytics` | |

## Known Limitations (Deferred)

1. **Pagination**: PRs with 100+ commits show incomplete data
2. **Rate limiting**: No retry/backoff logic
3. **Large repos**: First Insights load may be slow (caching mitigates)

---

## Philosophy Guardrails

**DO build:**
- Personal insights visible only to the individual
- Aggregate repo-level trends (not per-person)
- Security flags as helpful nudges
- Curiosity-driven "Spotify Wrapped" framing

**DON'T build:**
- Leaderboards of any kind
- Per-developer metrics visible to managers
- Bug rates attributed to individuals
- Any metric that compares developers to each other
