# Hardcoded Prototype Plan (Simple, Rauch-style)

## Philosophy

- **Delete complex code first** - remove broken API-fetching
- **Hardcode mock data** - verify visual design works
- **Simple rendering** - one function per feature, no fancy abstraction
- **Lean on GitHub's design system** - use their CSS variables, minimize custom CSS

---

## CSS Strategy: Use GitHub's Primer Variables

**Key insight:** GitHub already has orange/coral semantic colors on the page. Use them.

### One Custom Variable (Mesa brand)
```css
:root {
  --ab-ai-color: #a93000; /* Mesa Orange - left border only */
}
```

### Everything Else: GitHub's System
```css
/* Brand signature: left border on cards */
.ab-pr-summary,
.ab-pulse-card {
  border-left: 3px solid var(--ab-ai-color);
  border: var(--border-default);
  background: var(--bgColor-default);
  border-radius: 6px;
}

/* AI = severe (orange), Human = success (green) */
.ab-stat-ai .ab-stat-value { color: var(--fgColor-severe); }
.ab-stat-human .ab-stat-value { color: var(--fgColor-success); }

/* Bars and badges use severe (orange) */
.ab-provider-bar { background: var(--bgColor-severe-emphasis); }
.ab-badge {
  background: var(--bgColor-severe-muted);
  color: var(--fgColor-severe);
}

/* Security warnings = attention (amber) */
.ab-security {
  background: var(--bgColor-attention-muted);
  color: var(--fgColor-attention);
}

/* Text uses GitHub's semantic colors */
.ab-label { color: var(--fgColor-muted); }
.ab-value { color: var(--fgColor-default); }
```

### GitHub Variables We Use
| Purpose | Variable | Color |
|---------|----------|-------|
| AI stats/bars | `--fgColor-severe`, `--bgColor-severe-*` | Orange |
| Human stats | `--fgColor-success` | Green |
| Security alerts | `--fgColor-attention`, `--bgColor-attention-*` | Amber |
| Muted text | `--fgColor-muted` | Gray |
| Backgrounds | `--bgColor-default`, `--bgColor-muted` | White/Gray |
| Borders | `--border-default`, `--borderColor-default` | Light gray |

### Benefits
- **~80% less custom CSS** - GitHub handles colors + dark mode
- **Automatic dark mode** - GitHub's vars have dark variants
- **Feels native** - Same color logic as GitHub
- **One brand touch** - Mesa orange left border is distinctive

---

## Feature 1: PR Summary Banner (Already Built - Just Add Sections)

**Current working design** (flat, no expand/collapse):
```
┌─────────────────────────────────────────────────────────────┐
│  [🤙logo] Agent Blame          ✨ 6        👤 3       67%   │
│                              AI GENERATED  HUMAN    AI CODE │
│                                                             │
│                    cursor (claude-4.5-opus)    3 lines (50%)│
│                    claude_code (claude)        3 lines (50%)│
└─────────────────────────────────────────────────────────────┘
```

**To add** (mock when no real data):
```
│  SECURITY-SENSITIVE FILES                                   │
│  ⚠️  src/auth/oauth.ts              AI: 78%                 │
│                                                             │
│  DUPLICATION DETECTED                                       │
│  🔄 hash: 725288e4 appears 2x:                             │
│     • src/api/users.ts:42                                  │
│     • src/api/orders.ts:38                                 │
```

**Mock data** (when real data insufficient):
```typescript
const mockSecurityFiles = [{ path: "src/auth/oauth.ts", aiPercent: 78 }];
const mockDuplicates = [{ hash: "725288e4", locations: ["src/api/users.ts:42", "src/api/orders.ts:38"] }];
```

---

## Feature 2: Pulse Page Card

**Target DOM**:
```
┌─────────────────────────────────────────────────────────────┐
│  🤖 AI CODE THIS PERIOD                     [agentblame]    │
├─────────────────────────────────────────────────────────────┤
│  340 AI-generated lines (34% of total)                      │
│                                                             │
│  AI ADOPTION OVER TIME                                      │
│  [bar chart - 5-8 weeks]                                    │
│                                                             │
│  BY TOOL                                                    │
│  Cursor ██████████░░ 67%                                    │
│  Claude ████░░░░░░░░ 33%                                    │
└─────────────────────────────────────────────────────────────┘
```

**Mock data**:
```typescript
const pulse = {
  totalLines: 1000, aiLines: 340,
  byProvider: [{ name: "Cursor", lines: 220 }, { name: "Claude Code", lines: 120 }],
  byWeek: [
    { week: "W01", ai: 30 }, { week: "W02", ai: 50 }, { week: "W03", ai: 80 },
    { week: "W04", ai: 60 }, { week: "W05", ai: 120 },
  ],
};
```

---

## Feature 3: Contributors Badges + Fingerprint

**Target DOM**:
```
alice   ████████████████  1,234++ [🤖 58% AI]   ← badge
bob     ██████████         892++ [🤖 34% AI]

YOUR AI FINGERPRINT (private)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall: 58% AI-assisted (90 days)

BY FILE TYPE        BY TOOL
Tests   ████░ 78%   Cursor  62%
Utils   ███░░ 54%   Claude  38%
Core    ██░░░ 41%
```

**Mock data**:
```typescript
const contributors = new Map([["alice", 58], ["bob", 34]]);
const fingerprint = {
  overall: 58,
  byFileType: [{ type: "Tests", pct: 78 }, { type: "Utils", pct: 54 }],
  byTool: [{ tool: "Cursor", pct: 62 }, { tool: "Claude", pct: 38 }],
};
```

---

## Feature 4: Survivability Panel

**Target DOM**:
```
WHAT HAPPENED TO YOUR AI CODE? (90 days)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Unchanged   ████████████████░░░░  73%
Modified    █████░░░░░░░░░░░░░░░  22%
Deleted     █░░░░░░░░░░░░░░░░░░░   5%

TOOL EFFECTIVENESS
Cursor:       82% survives
Claude Code:  91% survives ← more stable
```

**Mock data**:
```typescript
const survivability = {
  unchanged: 73, modified: 22, deleted: 5,
  byTool: [{ tool: "Cursor", survives: 82 }, { tool: "Claude Code", survives: 91 }],
};
```

---

## Feature 5: Code Health Signals

**Target DOM**:
```
CODE HEALTH SIGNALS
━━━━━━━━━━━━━━━━━━━

🔄 CROSS-PR DUPLICATION
Same pattern (725288e4) in:
  • PR #47 - src/api/users.ts:42
  • PR #51 - src/api/orders.ts:38

📈 COMPLEXITY CREEP
src/services/auth.ts   45→312 lines (+593%)
```

**Mock data**:
```typescript
const health = {
  duplicates: [{ hash: "725288e4", prs: ["#47 users.ts:42", "#51 orders.ts:38"] }],
  creep: [{ file: "src/services/auth.ts", from: 45, to: 312 }],
};
```

---

## Step 1: Code Cleanup (DELETE FIRST)

### `github-dom.ts`
- **DELETE `injectPRSummary()` (lines 462-542)** - Dead code, not imported anywhere. `injectExpandedPRSummary` replaced it. (~80 lines)

### `content.ts`
- **DELETE `calculateInsightsStats()` (lines 412-466)** - Complex stats calculation that feeds broken Pulse page (~55 lines)
- **DELETE `calculateAuthorStats()` (lines 471-527)** - Complex author stats, never worked reliably (~57 lines)
- **DELETE `getWeekKey()` (lines 532-540)** - Helper only used by above functions (~9 lines)
- **SIMPLIFY `processPulsePage()` (lines 277-332)** - Replace API fetching with hardcoded data
- **SIMPLIFY `processContributorsPage()` (lines 337-392)** - Replace API fetching with hardcoded data

**Total cleanup: ~200 lines of broken/unused code**

---

## Step 2: Files to Modify

### `content.ts`
- Simplify `processPulsePage()` - use hardcoded data
- Simplify `processContributorsPage()` - use hardcoded data
- Keep page detection logic

### `github-dom.ts`
- `injectExpandedPRSummary()` - add security files + duplicates sections
- `showPulseStats()` - fix injection, keep rendering
- `showContributorBadge()` - keep for badges
- NEW: `showFingerprint()` - personal AI fingerprint panel
- NEW: `showSurvivability()` - survivability panel
- NEW: `showCodeHealth()` - code health signals

### `content.css`
- Ensure all provider bar classes exist
- Add styles for security/duplicates sections
- Add styles for fingerprint panel
- Add styles for survivability panel
- Add styles for code health signals

### `types.ts`
- Keep existing types
- Add new types for fingerprint, survivability, code health

---

## ✅ Chapter 1 Status: COMPLETE

All Chapter 1 tasks have been implemented:
- Deleted dead code (injectPRSummary, calculateInsightsStats, etc.)
- Simplified processPulsePage() and processContributorsPage() with mock data
- Added new types for fingerprint, survivability, code health
- Implemented showFingerprint(), showSurvivability(), showCodeHealth()
- Updated CSS with GitHub Primer variables

---

# Chapter 2: Polish & Expansion

## Problem 1: PR Banner Needs Expand/Collapse

Current banner shows only basic stats. Per the mockup, we need:

**Collapsed state** (current):
```
┌─────────────────────────────────────────────────────────────┐
│  [🌵] Agent Blame          ✨ 6        👤 3       67%       │
│                          AI GENERATED  HUMAN    AI CODE     │
└─────────────────────────────────────────────────────────────┘
```

**Expanded state** (click to expand):
```
┌─────────────────────────────────────────────────────────────┐
│  [🌵] Agent Blame                                    [▼]    │
├─────────────────────────────────────────────────────────────┤
│  ✨ 18           👤 17          51%                         │
│  AI Generated    Human Written  AI Code                     │
│                                                             │
│  PROVIDER BREAKDOWN                                         │
│  Cursor (claude-4-opus)  ████████████░░░░  12 lines (67%)   │
│  Claude Code             ████████░░░░░░░░   6 lines (33%)   │
│                                                             │
│  SECURITY-SENSITIVE FILES                                   │
│  ⚠️  src/auth/oauth.ts           AI: 78%  [Review suggested]│
│  ⚠️  src/payments/stripe.ts      AI: 45%  [Review suggested]│
│                                                             │
│  DUPLICATION DETECTED                                       │
│  🔄 Same code block (hash: 725288e4...) appears 3 times:    │
│     • src/api/users.ts:42-47                               │
│     • src/api/orders.ts:38-43                              │
│     • src/api/products.ts:55-60                            │
│     → Consider extracting to shared utility                 │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

**Mock data for security files:**
```typescript
const mockSecurityFiles = [
  { path: "src/auth/oauth.ts", aiPercent: 78 },
  { path: "src/payments/stripe.ts", aiPercent: 45 },
];
```

**Mock data for duplicates:**
```typescript
const mockDuplicates = [
  {
    hash: "725288e4",
    locations: [
      "src/api/users.ts:42-47",
      "src/api/orders.ts:38-43",
      "src/api/products.ts:55-60"
    ]
  }
];
```

**Changes to `github-dom.ts`:**
1. Update `injectExpandedPRSummary()` to render collapsed by default
2. Add click handler to toggle expanded state
3. Add security files section (only shows when expanded)
4. Add duplicates section (only shows when expanded)
5. Use CSS class `.ab-expanded` to toggle visibility

**Changes to `content.css`:**
```css
.ab-pr-summary .ab-expandable { display: none; }
.ab-pr-summary.ab-expanded .ab-expandable { display: block; }
.ab-toggle { cursor: pointer; user-select: none; }
```

---

## Problem 2: Consistent Branding Across All Cards

All cards should have the same header format with logo and name.

**Standard header:**
```html
<div class="ab-card-header">
  <img src="${chrome.runtime.getURL('icons/icon48.png')}" class="ab-logo" />
  <span class="ab-brand-name">Agent Blame</span>
</div>
```

**Files to update:**
- `github-dom.ts`: Update `showPulseStats()`, `showFingerprint()`, `showSurvivability()`, `showCodeHealth()` to use shared header

**CSS additions:**
```css
.ab-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.ab-logo { width: 20px; height: 20px; }
.ab-brand-name {
  font-weight: 600;
  color: var(--fgColor-default);
}
```

---

## Problem 3: Dual-Line Chart for AI Adoption

Replace bar chart with line chart showing each provider over time.

**New data structure:**
```typescript
interface WeeklyProviderData {
  week: string;
  providers: Array<{ name: string; lines: number }>;
}

const mockByWeek: WeeklyProviderData[] = [
  { week: "W01", providers: [{ name: "Cursor", lines: 20 }, { name: "Claude Code", lines: 10 }] },
  { week: "W02", providers: [{ name: "Cursor", lines: 35 }, { name: "Claude Code", lines: 15 }] },
  { week: "W03", providers: [{ name: "Cursor", lines: 50 }, { name: "Claude Code", lines: 30 }] },
  { week: "W04", providers: [{ name: "Cursor", lines: 40 }, { name: "Claude Code", lines: 20 }] },
  { week: "W05", providers: [{ name: "Cursor", lines: 75 }, { name: "Claude Code", lines: 45 }] },
];
```

**SVG line chart implementation:**
```typescript
function renderLineChart(data: WeeklyProviderData[]): string {
  const width = 300, height = 100, padding = 20;
  const maxLines = Math.max(...data.flatMap(w => w.providers.map(p => p.lines)));

  // Get unique providers
  const providers = [...new Set(data.flatMap(w => w.providers.map(p => p.name)))];
  const colors = ["var(--fgColor-severe)", "var(--fgColor-success)"];

  // Build polyline for each provider
  const lines = providers.map((provider, idx) => {
    const points = data.map((week, i) => {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
      const providerData = week.providers.find(p => p.name === provider);
      const y = height - padding - ((providerData?.lines || 0) / maxLines) * (height - 2 * padding);
      return `${x},${y}`;
    }).join(" ");
    return `<polyline points="${points}" fill="none" stroke="${colors[idx]}" stroke-width="2"/>`;
  });

  return `<svg width="${width}" height="${height}" class="ab-line-chart">${lines.join("")}</svg>`;
}
```

---

## Problem 4: Pulse Page Card Positioning

Cards should appear AFTER the page header, not before.

**Current (wrong):** Cards prepended to `.Layout-main`
**Correct:** Cards inserted after `[class*="PageHeader"]`

**Implementation:**
```typescript
function findPulseInjectionPoint(): Element | null {
  // Try PageHeader first
  const pageHeader = document.querySelector('[class*="PageHeader-PageHeader"]');
  if (pageHeader) return pageHeader;

  // Fallback: date range selector
  const dateSelector = document.querySelector('[class*="DateRangeSelector"]');
  if (dateSelector) return dateSelector.closest('div');

  return null;
}

function injectPulseCards(cards: HTMLElement[]): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'ab-pulse-wrapper';
  cards.forEach(card => wrapper.appendChild(card));

  const injectionPoint = findPulseInjectionPoint();
  if (injectionPoint) {
    injectionPoint.after(wrapper);
  } else {
    // Fallback: prepend to Layout-main
    document.querySelector('.Layout-main')?.prepend(wrapper);
  }
}
```

---

## Problem 5: Contributors Page - Dedicated Section

Instead of trying to inject badges into contributor rows, create a dedicated horizontal scroller section.

**Design:**
```
┌─────────────────────────────────────────────────────────────┐
│  [🌵] Agent Blame · AI Usage by Contributor                 │
├─────────────────────────────────────────────────────────────┤
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  →         │
│  │ avatar │  │ avatar │  │ avatar │  │ avatar │             │
│  │ alice  │  │  bob   │  │ carol  │  │  dave  │             │
│  │  58%   │  │  34%   │  │  22%   │  │  15%   │             │
│  │   AI   │  │   AI   │  │   AI   │  │   AI   │             │
│  └────────┘  └────────┘  └────────┘  └────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Mock data:**
```typescript
const mockContributorStats = [
  { username: "alice", aiPercent: 58, avatarUrl: "https://github.com/alice.png" },
  { username: "bob", aiPercent: 34, avatarUrl: "https://github.com/bob.png" },
  { username: "carol", aiPercent: 22, avatarUrl: "https://github.com/carol.png" },
  { username: "dave", aiPercent: 15, avatarUrl: "https://github.com/dave.png" },
];
```

**New function `showContributorAISection()`:**
```typescript
export function showContributorAISection(stats: ContributorStats[]): void {
  const container = document.querySelector('.Layout-main');
  if (!container || document.querySelector('.ab-contributors-section')) return;

  const section = document.createElement('div');
  section.className = 'ab-contributors-section ab-card';
  section.innerHTML = `
    <div class="ab-card-header">
      <img src="${chrome.runtime.getURL('icons/icon48.png')}" class="ab-logo" />
      <span class="ab-brand-name">Agent Blame</span>
      <span class="ab-header-subtitle">· AI Usage by Contributor</span>
    </div>
    <div class="ab-contributor-scroller">
      ${stats.map(s => `
        <div class="ab-contributor-card">
          <img src="${s.avatarUrl}" class="ab-contributor-avatar" />
          <div class="ab-contributor-name">${s.username}</div>
          <div class="ab-contributor-percent">${s.aiPercent}%</div>
          <div class="ab-contributor-label">AI</div>
        </div>
      `).join('')}
    </div>
  `;

  container.prepend(section);
}
```

**CSS:**
```css
.ab-contributor-scroller {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 8px 0;
}
.ab-contributor-card {
  flex: 0 0 80px;
  text-align: center;
  padding: 12px 8px;
  background: var(--bgColor-muted);
  border-radius: 8px;
}
.ab-contributor-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
.ab-contributor-percent {
  font-size: 18px;
  font-weight: 600;
  color: var(--fgColor-severe);
}
```

---

## Files to Modify (Chapter 2)

### `github-dom.ts`
- Update `injectExpandedPRSummary()` with expand/collapse + security + duplicates
- Add shared header helper function
- Update `showPulseStats()` with line chart and correct positioning
- Add `showContributorAISection()` function
- Update fingerprint/survivability/health cards with consistent headers

### `content.ts`
- Update `processContributorsPage()` to call `showContributorAISection()`
- Update mock data structures for weekly provider breakdown

### `content.css`
- Add expand/collapse styles
- Add line chart styles
- Add contributor scroller styles
- Add shared header styles

### `types.ts`
- Add `WeeklyProviderData` interface
- Update `ContributorStats` to include `avatarUrl`

---

## Verification (Chapter 2)

1. `bun run build:chrome`
2. Reload extension
3. **PR page**:
   - Banner shows collapsed by default
   - Click expands to show provider bars, security files, duplicates
   - Click again collapses
4. **Pulse page**:
   - Card appears AFTER the page header
   - Shows dual-line chart with provider breakdown
5. **Contributors page**:
   - Horizontal scroller with contributor cards
   - Each card shows avatar, name, AI percentage
