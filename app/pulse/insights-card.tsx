"use client";

import { strengths, intelligence, costs, reviews } from "./data";
import { MesaCardHeader } from "@/components/mesa";

// Condensed dots for strengths matrix
function Dots({ count }: { count: number }) {
  return (
    <span className="font-mono text-[10px] tracking-tight">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < count ? "var(--fgColor-success)" : "var(--fgColor-muted)",
            opacity: i < count ? 1 : 0.25,
          }}
        >
          ●
        </span>
      ))}
    </span>
  );
}

// Mini bar for model breakdown
function MiniBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div
      className="h-2 flex-1 rounded-sm overflow-hidden"
      style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
    >
      <div
        className="h-full rounded-sm"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}

// Intelligence zone bar
function ZoneBar({ percent, variant }: { percent: number; variant: "success" | "caution" }) {
  const color = variant === "success" ? "var(--fgColor-success)" : "var(--fgColor-attention)";
  return (
    <div
      className="h-2 w-full rounded-sm overflow-hidden"
      style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
    >
      <div className="h-full rounded-sm" style={{ width: `${percent}%`, backgroundColor: color }} />
    </div>
  );
}

// Review balance bar (human | AI split)
function RatioBar({ human, ai }: { human: number; ai: number }) {
  const total = human + ai;
  const humanPct = (human / total) * 100;
  const aiPct = (ai / total) * 100;

  return (
    <div className="flex h-2 w-full rounded-sm overflow-hidden">
      <div
        className="h-full"
        style={{ width: `${humanPct}%`, backgroundColor: "var(--fgColor-success)" }}
      />
      <div
        className="h-full"
        style={{ width: `${aiPct}%`, backgroundColor: "var(--fgColor-severe)" }}
      />
    </div>
  );
}

// Hero metrics section
function HeroMetrics() {
  const { byModel, total } = costs;
  const maxSpend = Math.max(...byModel.map((m) => m.spend));

  // Calculate average survivability from intelligence data
  const allZones = [...intelligence.high, ...intelligence.caution];
  const avgSurvival = Math.round(
    allZones.reduce((sum, z) => sum + z.survivability, 0) / allZones.length
  );

  return (
    <div className="space-y-3">
      {/* Big numbers */}
      <div className="flex gap-3">
        <div
          className="flex-1 p-3 rounded-md text-center"
          style={{ backgroundColor: "var(--bgColor-muted)" }}
        >
          <div className="text-xl font-bold" style={{ color: "var(--fgColor-severe)" }}>
            ${total.toLocaleString()}
          </div>
          <div className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
            spend
          </div>
        </div>
        <div
          className="flex-1 p-3 rounded-md text-center"
          style={{ backgroundColor: "var(--bgColor-muted)" }}
        >
          <div className="text-xl font-bold" style={{ color: "var(--fgColor-success)" }}>
            {avgSurvival}%
          </div>
          <div className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
            surv
          </div>
        </div>
      </div>

      {/* Model sparklines */}
      <div className="space-y-2">
        {byModel.map((m) => {
          // Short model names
          const name = m.model.replace("claude-", "").replace("3.5-", "").replace("-4-", " ");
          return (
            <div key={m.model} className="flex items-center gap-2 text-[10px]">
              <span className="w-12 truncate font-mono" style={{ color: "var(--fgColor-muted)" }}>
                {name}
              </span>
              <MiniBar percent={(m.spend / maxSpend) * 100} color="var(--fgColor-severe)" />
              <span className="w-10 text-right font-mono">${m.spend}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Condensed strengths matrix
function StrengthsMatrix() {
  const { areas, contributors } = strengths;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px]">
        <thead>
          <tr>
            <th className="text-left py-1 pr-2 font-medium"></th>
            {areas.map((area) => (
              <th
                key={area}
                className="text-center py-1 px-1 font-medium"
                style={{ color: "var(--fgColor-muted)" }}
              >
                {area}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contributors.map((c) => (
            <tr key={c.name}>
              <td className="py-1 pr-2 font-medium">{c.name}</td>
              {c.scores.map((score, i) => (
                <td key={i} className="text-center py-1 px-1">
                  <Dots count={score} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Intelligence zones (unified list)
function IntelligenceZones() {
  const { high, caution } = intelligence;

  return (
    <div className="space-y-2">
      {high.map((item) => (
        <div key={item.area} className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span>{item.area}</span>
            <span className="font-mono" style={{ color: "var(--fgColor-success)" }}>
              {item.survivability}%
            </span>
          </div>
          <ZoneBar percent={item.survivability} variant="success" />
        </div>
      ))}
      <div className="h-px" style={{ backgroundColor: "var(--borderColor-muted)" }} />
      {caution.map((item) => (
        <div key={item.area} className="space-y-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span>{item.area}</span>
            <span className="font-mono" style={{ color: "var(--fgColor-attention)" }}>
              {item.survivability}%
            </span>
          </div>
          <ZoneBar percent={item.survivability} variant="caution" />
        </div>
      ))}
    </div>
  );
}

// Review balance section
function ReviewBalance() {
  const { reviewers } = reviews;

  // Sort by AI ratio descending
  const sorted = [...reviewers].sort((a, b) => b.ai / b.human - a.ai / a.human);

  return (
    <div className="space-y-2">
      {sorted.map((r) => {
        const ratio = r.ai / r.human;
        const isHigh = ratio > 2;
        return (
          <div key={r.name} className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span>{r.name}</span>
              <span
                className="font-mono"
                style={{ color: isHigh ? "var(--fgColor-attention)" : "var(--fgColor-muted)" }}
              >
                {ratio.toFixed(1)}x {isHigh && "⚠️"}
              </span>
            </div>
            <RatioBar human={r.human} ai={r.ai} />
          </div>
        );
      })}
      <div
        className="flex items-center justify-center gap-4 text-[10px] pt-1"
        style={{ color: "var(--fgColor-muted)" }}
      >
        <span className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "var(--fgColor-success)" }}
          />
          Human
        </span>
        <span className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm"
            style={{ backgroundColor: "var(--fgColor-severe)" }}
          />
          AI
        </span>
      </div>
    </div>
  );
}

export function InsightsCard() {
  // Consolidate insights
  const insights = [
    costs.insight,
    reviews.warning,
    strengths.insight.split(". ")[0], // Just the first sentence
  ];

  return (
    <div
      className="mx-6 my-6 rounded-md border overflow-hidden"
      style={{
        backgroundColor: "var(--bgColor-default)",
        borderColor: "var(--borderColor-default)",
      }}
    >
      <MesaCardHeader title="Team AI Insights" />

      {/* Bento Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hero Metrics */}
          <div
            className="p-3 rounded-md"
            style={{ backgroundColor: "var(--bgColor-muted)" }}
          >
            <h4
              className="text-[10px] font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Cost & Performance
            </h4>
            <HeroMetrics />
          </div>

          {/* Team Strengths */}
          <div
            className="p-3 rounded-md"
            style={{ backgroundColor: "var(--bgColor-muted)" }}
          >
            <h4
              className="text-[10px] font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Team Strengths
            </h4>
            <StrengthsMatrix />
          </div>

          {/* Where AI Works */}
          <div
            className="p-3 rounded-md"
            style={{ backgroundColor: "var(--bgColor-muted)" }}
          >
            <h4
              className="text-[10px] font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Where AI Works
            </h4>
            <IntelligenceZones />
          </div>

          {/* Review Balance */}
          <div
            className="p-3 rounded-md"
            style={{ backgroundColor: "var(--bgColor-muted)" }}
          >
            <h4
              className="text-[10px] font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Review Balance
            </h4>
            <ReviewBalance />
          </div>
        </div>

        {/* Consolidated Insight Strip */}
        <div
          className="mt-4 p-3 rounded-md text-xs flex items-start gap-2"
          style={{
            backgroundColor: "var(--bgColor-accent-muted)",
            color: "var(--fgColor-accent)",
          }}
        >
          <span>💡</span>
          <span>{insights.join(" • ")}</span>
        </div>
      </div>
    </div>
  );
}
