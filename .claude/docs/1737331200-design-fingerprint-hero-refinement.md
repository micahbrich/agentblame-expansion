# AI Fingerprint Hero Section - Visual Design Refinement

## Overview

This plan addresses visual refinements to the AI Fingerprint card's hero section, specifically targeting the large percentage display, unclear trend indicator, and overall visual hierarchy.

---

## DESIGN ANALYSIS

### Current Issues Identified

**1. Large Percentage Display ("58%") - "Ugly"**

The current implementation uses:
```tsx
<StatDisplay value={`${overall}%`} label="AI-assisted" color="severe" size="lg" centered />
```

Problems:
- **Raw numeric presentation**: The `text-4xl font-bold` styling creates a visually heavy, undifferentiated block of text
- **Lack of visual hierarchy within the number**: The percentage sign (%) competes equally with the digits
- **No visual context**: The number floats without supporting visual elements to give it meaning
- **Color without purpose**: Using `severe` (orange) communicates urgency but lacks the nuance to explain *why* this matters

**Psychology insight**: Large numbers need visual framing to feel intentional rather than arbitrary. Without typographic refinement, they feel like raw data rather than a designed statistic.

**2. Trend Indicator (+12%) - "Unclear"**

Current implementation:
```tsx
<div className="text-sm font-medium px-2 py-1 rounded" style={{...}}>
  {trend}
</div>
```

Problems:
- **No contextual label**: "+12%" means nothing without "vs last week" or "30-day trend"
- **Isolated placement**: Floating on the far right with no visual connection to what it's comparing
- **Competing with the main stat**: Both are percentages, creating confusion about which is primary
- **Missing directionality cue**: The +/- prefix alone doesn't clearly communicate "this is a trend"

**Psychology insight**: Trend indicators require explicit temporal context. Users cannot infer time periods from raw deltas.

**3. Visual Hierarchy Issues**

Current layout flow:
```
[58%] [================bar================] [+12%]
      [2,847 total · 1,651 AI (58%) · 1,196 human]
```

Problems:
- **Three-element row creates visual noise**: The eye bounces between stat, bar, and trend
- **Lines component duplicates information**: "58%" appears twice (in StatDisplay and in Lines)
- **Horizontal sprawl**: Elements stretch across full width without clear grouping
- **Bar lacks labeling**: Orange/green segments have no inline legend

---

## STRATEGIC RECOMMENDATIONS

### 1. Percentage Display Refinement

**Approach**: Create visual sophistication through typographic contrast and supporting elements.

**Key changes**:
- Reduce visual weight of the % sign (smaller size, lighter weight)
- Add a subtle ring/arc visualization around or behind the number
- Integrate trend directly below the main stat to create a unified "hero stat" block
- Add micro-label for clarity: "of lines are AI-assisted"

**Rationale**: The most polished data visualizations (Linear, Stripe Dashboard, Vercel Analytics) all treat percentage displays as composed units, not raw text. The percentage sign is always de-emphasized.

### 2. Trend Indicator Clarification

**Approach**: Move trend into the stat block with explicit temporal context.

**Key changes**:
- Position trend directly under the label, as part of the stat block
- Add temporal context: "from last 30 days" or an icon + "vs prior period"
- Use a small arrow icon (trending-up/trending-down) alongside the number
- Consider making it a secondary stat rather than a badge

**Rationale**: Trends only make sense relative to time. The best dashboards (Plausible, Fathom, PostHog) always show "compared to X period" inline.

### 3. Layout Restructuring

**Approach**: Create a two-column hero with clear primary/secondary hierarchy.

**Proposed layout**:
```
[LEFT: Stat Block]              [RIGHT: Bar + Context]
  58%                            [====bar====]
  AI-assisted                    1,651 AI · 1,196 human
  +12% vs last 30 days           2,847 total lines
```

**Key changes**:
- Group stat + trend + label into a single left-aligned block
- Move the bar and line counts to right side
- Remove redundant "58%" from the lines display (it's shown in the main stat)
- Add inline legend dots to the bar or line counts

---

## IMPLEMENTATION PLAN

### Step 1: Enhance StatDisplay Component

**File**: `/components/mesa/stat-display.tsx`

Add a new size variant `hero` that provides:
- Split rendering of number vs. unit (% sign)
- Support for integrated trend display
- Optional ring/progress arc background

```tsx
// New variant additions to statValueVariants
hero: "text-5xl leading-none tracking-tight"

// New: StatHero component for composite stat display
export function StatHero({
  value,        // The number (e.g., 58)
  unit,         // The unit (e.g., "%")
  label,        // Primary label
  sublabel,     // Secondary context
  trend,        // Trend object { value, label, positive }
  color,
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-0.5">
        <span className="text-5xl font-bold tracking-tight" style={{ color }}>
          {value}
        </span>
        <span className="text-2xl font-medium opacity-60" style={{ color }}>
          {unit}
        </span>
      </div>
      <div className="text-sm" style={{ color: muted }}>
        {label}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs">
          <TrendIcon direction={trend.positive ? "up" : "down"} />
          <span style={{ color: trend.positive ? danger : success }}>
            {trend.value}
          </span>
          <span style={{ color: muted }}>{trend.label}</span>
        </div>
      )}
    </div>
  );
}
```

### Step 2: Create TrendBadge Component

**File**: `/components/mesa/trend-badge.tsx` (new)

A compact trend indicator with:
- Arrow icon for direction
- Value display
- Optional temporal label

```tsx
interface TrendBadgeProps {
  value: string;          // e.g., "+12%"
  label?: string;         // e.g., "vs last 30 days"
  positive?: boolean;     // Controls color and icon
  size?: "sm" | "md";
}

export function TrendBadge({ value, label, positive, size = "sm" }) {
  const Icon = positive ? TrendingUp : TrendingDown;
  const color = positive ? mesaColors.danger.fg : mesaColors.success.fg;

  return (
    <div className="flex items-center gap-1">
      <Icon size={size === "sm" ? 12 : 14} style={{ color }} />
      <span className={size === "sm" ? "text-xs" : "text-sm"} style={{ color }}>
        {value}
      </span>
      {label && (
        <span className="text-xs" style={{ color: mesaColors.muted.fg }}>
          {label}
        </span>
      )}
    </div>
  );
}
```

### Step 3: Refactor Hero Section Layout

**File**: `/app/contributors/fingerprint/card.tsx`

Replace current hero section with refined structure:

```tsx
{/* Hero: Refined layout */}
<div className="flex items-start gap-6">
  {/* Left: Primary stat block */}
  <div className="shrink-0">
    <div className="flex items-baseline gap-0.5">
      <span
        className="text-5xl font-bold tracking-tight"
        style={{ color: mesaColors.severe.fg }}
      >
        {overall}
      </span>
      <span
        className="text-2xl font-medium opacity-50"
        style={{ color: mesaColors.severe.fg }}
      >
        %
      </span>
    </div>
    <div
      className="text-sm mt-1"
      style={{ color: mesaColors.muted.fg }}
    >
      AI-assisted code
    </div>
    <div className="flex items-center gap-1.5 mt-2">
      {isPositiveTrend ? (
        <TrendingUp size={14} style={{ color: mesaColors.danger.fg }} />
      ) : (
        <TrendingDown size={14} style={{ color: mesaColors.success.fg }} />
      )}
      <span
        className="text-sm font-medium"
        style={{ color: isPositiveTrend ? mesaColors.danger.fg : mesaColors.success.fg }}
      >
        {trend}
      </span>
      <span
        className="text-xs"
        style={{ color: mesaColors.muted.fg }}
      >
        vs last 30 days
      </span>
    </div>
  </div>

  {/* Right: Bar + breakdown */}
  <div className="flex-1 pt-2">
    <AIHumanBar ai={overall} height="lg" className="mb-3" />
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1.5">
        <div
          className="w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: mesaColors.severe.fg }}
        />
        <span style={{ color: mesaColors.muted.fg }}>
          {lines.ai.toLocaleString()} AI
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: mesaColors.success.fg }}
        />
        <span style={{ color: mesaColors.muted.fg }}>
          {lines.human.toLocaleString()} human
        </span>
      </div>
      <span style={{ color: mesaColors.muted.fg }}>
        · {lines.total.toLocaleString()} total lines
      </span>
    </div>
  </div>
</div>
```

### Step 4: Typography and Spacing Refinements

**Specific adjustments**:

| Element | Current | Recommended | Rationale |
|---------|---------|-------------|-----------|
| Main number | `text-4xl font-bold` | `text-5xl font-bold tracking-tight` | Tighter tracking reduces visual sprawl |
| % sign | Same as number | `text-2xl font-medium opacity-50` | De-emphasize unit for better hierarchy |
| Label | `text-sm` | `text-sm mt-1` | Consistent spacing |
| Trend | Floating badge | Inline below label | Creates unified stat block |
| Hero padding | `p-4` | `p-5` or `p-6` | More breathing room for hero content |
| Gap between stat and bar | `gap-4` | `gap-6` | Clearer separation of primary/secondary |

### Step 5: Optional Enhancement - Progress Ring

For additional visual polish, consider adding a subtle ring/arc behind the percentage:

```tsx
// Optional: CircularProgress behind the stat
<div className="relative">
  <svg className="absolute -left-2 -top-2 w-20 h-20 opacity-10">
    <circle
      cx="40" cy="40" r="36"
      fill="none"
      stroke={mesaColors.severe.fg}
      strokeWidth="4"
      strokeDasharray={`${overall * 2.26} 226`}
      transform="rotate(-90 40 40)"
    />
  </svg>
  {/* Stat content */}
</div>
```

This adds depth without overwhelming the design.

---

## QUALITY ASSURANCE

### Visual Review Checklist

- [ ] Main percentage has clear typographic hierarchy (number > unit)
- [ ] Trend indicator includes temporal context ("vs last X days")
- [ ] Trend direction is clear via both color AND icon
- [ ] No redundant information displayed (58% should appear once)
- [ ] Bar has inline legend or clear proximity to legend
- [ ] Spacing creates clear groupings (stat block vs bar block)
- [ ] Color usage is consistent with existing Mesa design system

### Accessibility Verification

- [ ] Trend direction is not communicated by color alone (icons provide redundancy)
- [ ] Text contrast meets WCAG AA (4.5:1 for normal text)
- [ ] Semantic HTML structure maintained
- [ ] Screen reader can interpret the stat meaningfully

### Cross-Reference Points

- [ ] Colors use existing `mesaColors` tokens
- [ ] Spacing aligns with Tailwind scale (gap-4, gap-6, p-4, p-5)
- [ ] Typography uses existing `StatDisplay` patterns where possible
- [ ] Component can be reused across other cards

---

## ALTERNATIVE APPROACHES

### Option A: Minimal Refinement
Only fix the % sign weight and add trend label. Fastest to implement, smallest visual change.

### Option B: Proposed Restructure (Recommended)
Full hero refinement as detailed above. Best balance of impact and effort.

### Option C: Radial Visualization
Replace the linear bar with a donut/radial chart. Higher visual impact but may feel inconsistent with GitHub's linear-bar aesthetic.

---

## IMPLEMENTATION NOTES

1. **Import requirements**: Add `TrendingUp`, `TrendingDown` from `lucide-react` or Primer Octicons
2. **Existing component reuse**: Continue using `AIHumanBar` - just relocate it
3. **Data changes**: Consider adding `trendPeriod` to data model (e.g., "30 days")
4. **Testing**: Verify at different percentage values (0%, 50%, 100%) and trend directions

---

## SUMMARY

The core issues stem from:
1. **Undifferentiated typography** on the main stat
2. **Missing context** on the trend indicator
3. **Horizontal sprawl** creating visual noise

The solution groups related information, adds typographic refinement to the percentage display, and provides explicit temporal context to the trend. This creates a polished, professional hero section that communicates clearly at a glance.
