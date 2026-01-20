"use client";

import { strengths, intelligence, costs, reviews } from "./data";
import {
  MesaCard,
  MesaCardHeader,
  SectionTitle,
  ProgressBar,
  SegmentedBar,
  InsightPanel,
  AIHumanLegend,
  mesaColors,
} from "@/components/mesa";

/** Condensed dots for strengths matrix */
function Dots({ count, max = 4 }: { count: number; max?: number }) {
  return (
    <span className="font-mono text-[10px] tracking-tight">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < count ? mesaColors.success.fg : mesaColors.muted.fg,
            opacity: i < count ? 1 : 0.25,
          }}
        >
          ●
        </span>
      ))}
    </span>
  );
}

/** Hero metrics: big numbers + model sparklines */
function HeroMetrics() {
  const { byModel, total } = costs;
  const maxSpend = Math.max(...byModel.map((m) => m.spend));

  const allZones = [...intelligence.high, ...intelligence.caution];
  const avgSurvival = Math.round(
    allZones.reduce((sum, z) => sum + z.survivability, 0) / allZones.length
  );

  return (
    <div className="space-y-3">
      {/* Big numbers */}
      <div className="flex gap-3">
        <MetricBox value={`$${total.toLocaleString()}`} label="spend" color="severe" />
        <MetricBox value={`${avgSurvival}%`} label="surv" color="success" />
      </div>

      {/* Model sparklines */}
      <div className="space-y-2">
        {byModel.map((m) => {
          const name = m.model.replace("claude-", "").replace("3.5-", "").replace("-4-", " ");
          return (
            <div key={m.model} className="flex items-center gap-2 text-[10px]">
              <span className="w-12 truncate font-mono" style={{ color: mesaColors.muted.fg }}>
                {name}
              </span>
              <ProgressBar value={(m.spend / maxSpend) * 100} color="severe" height="md" className="flex-1" />
              <span className="w-10 text-right font-mono">${m.spend}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Small metric box with colored value */
function MetricBox({ value, label, color }: { value: string; label: string; color: "severe" | "success" }) {
  return (
    <div className="flex-1 p-3 rounded-md text-center" style={{ backgroundColor: mesaColors.muted.bg }}>
      <div className="text-xl font-bold" style={{ color: mesaColors[color].fg }}>{value}</div>
      <div className="text-[10px]" style={{ color: mesaColors.muted.fg }}>{label}</div>
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

/** Intelligence zones: where AI code survives best */
function IntelligenceZones() {
  const { high, caution } = intelligence;

  const ZoneItem = ({ area, survivability, color }: { area: string; survivability: number; color: "success" | "attention" }) => (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-[11px]">
        <span>{area}</span>
        <span className="font-mono" style={{ color: mesaColors[color].fg }}>{survivability}%</span>
      </div>
      <ProgressBar value={survivability} color={color} height="md" />
    </div>
  );

  return (
    <div className="space-y-2">
      {high.map((item) => (
        <ZoneItem key={item.area} area={item.area} survivability={item.survivability} color="success" />
      ))}
      <div className="h-px" style={{ backgroundColor: mesaColors.muted.border }} />
      {caution.map((item) => (
        <ZoneItem key={item.area} area={item.area} survivability={item.survivability} color="attention" />
      ))}
    </div>
  );
}

/** Review balance: human vs AI review ratio per reviewer */
function ReviewBalance() {
  const sorted = [...reviews.reviewers].sort((a, b) => b.ai / b.human - a.ai / a.human);

  return (
    <div className="space-y-2">
      {sorted.map((r) => {
        const total = r.human + r.ai;
        const ratio = r.ai / r.human;
        const isHigh = ratio > 2;
        return (
          <div key={r.name} className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px]">
              <span>{r.name}</span>
              <span
                className="font-mono"
                style={{ color: isHigh ? mesaColors.attention.fg : mesaColors.muted.fg }}
              >
                {ratio.toFixed(1)}x {isHigh && "⚠️"}
              </span>
            </div>
            <SegmentedBar
              height="md"
              segments={[
                { value: (r.human / total) * 100, color: "success" },
                { value: (r.ai / total) * 100, color: "severe" },
              ]}
            />
          </div>
        );
      })}
      <AIHumanLegend className="justify-center pt-1 text-[10px]" />
    </div>
  );
}

/** Muted section panel for bento grid items */
function BentoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-3 rounded-md" style={{ backgroundColor: mesaColors.muted.bg }}>
      <SectionTitle size="xs">{title}</SectionTitle>
      {children}
    </div>
  );
}

export function InsightsCard() {
  const insights = [
    costs.insight,
    reviews.warning,
    strengths.insight.split(". ")[0],
  ].join(" • ");

  return (
    <MesaCard margin="mx-6 my-6">
      <MesaCardHeader title="Team AI Insights" />

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BentoPanel title="Cost & Performance">
            <HeroMetrics />
          </BentoPanel>

          <BentoPanel title="Team Strengths">
            <StrengthsMatrix />
          </BentoPanel>

          <BentoPanel title="Where AI Works">
            <IntelligenceZones />
          </BentoPanel>

          <BentoPanel title="Review Balance">
            <ReviewBalance />
          </BentoPanel>
        </div>

        <InsightPanel className="mt-4">{insights}</InsightPanel>
      </div>
    </MesaCard>
  );
}
