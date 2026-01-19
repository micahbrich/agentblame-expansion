"use client";

import { fingerprints, fingerprint as defaultFingerprint } from "../data";
import { Lines } from "./lines";
import { Heatmap } from "./heatmap";
import {
  AIHumanBar,
  MesaCard,
  SectionTitle,
  ProgressBar,
  mesaColors,
} from "@/components/mesa";
import { heatmap, type MesaColorName } from "@/components/mesa/primitives/colors";

/** Small helper for breakdown columns - bar on left, label on right */
function BreakdownColumn({
  title,
  items,
  color,
  labelWidth,
}: {
  title: string;
  items: Array<{ label: string; percent: number }>;
  color: MesaColorName;
  labelWidth: string;
}) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="space-y-1.5">
        {items.map(({ label, percent }) => (
          <div key={label} className="flex items-center gap-2">
            <ProgressBar value={percent} color={color} height="sm" className="flex-1" />
            <span className={`text-xs ${labelWidth} text-right truncate`}>
              {label} <span style={{ color: mesaColors.muted.fg }}>{percent}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface FingerprintCardProps {
  username?: string;
  embedded?: boolean;
}

export function FingerprintCard({
  username = "alice",
  embedded = false,
}: FingerprintCardProps) {
  const data = fingerprints[username] || defaultFingerprint;
  const { overall, byFileType, byTool, byModel, trend, lines, activity, sessions, quality } = data;
  const isPositiveTrend = trend.startsWith("+");
  const isPositiveVsTeam = quality.vsTeamAvg.startsWith("+");

  return (
    <MesaCard borderless={embedded}>
      <div className="p-5 space-y-5">
        {/* Hero: Stat block + Bar with legend */}
        <div className="flex items-start gap-6">
          {/* Left: Stat block with trend */}
          <div className="shrink-0 border-r pr-6">
            <div className="flex items-baseline">
              <span
                className="text-base font-bold tracking-tight"
                style={{ color: heatmap.ai.base }}
              >
                {overall}
              </span>
              <span
                className="text-base font-medium ml-0.5"
                style={{ color: heatmap.ai.base, opacity: 0.5 }}
              >
                %
              </span>
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--fgColor-muted)" }}>
              AI-assisted code
            </div>
            <div
              className="flex items-center gap-1.5 mt-2 text-sm"
              style={{
                color: isPositiveTrend ? mesaColors.danger.fg : mesaColors.success.fg,
              }}
            >
              <span className="font-medium">{trend}</span>
              <span className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
                vs last 30d
              </span>
            </div>
          </div>

          {/* Right: Bar + Legend */}
          <div className="flex-1 pt-2">
            <AIHumanBar ai={overall} height="lg" className="mb-3" />
            <Lines lines={lines} />
          </div>
        </div>

        {/* Heatmap + Quality stats side by side */}
        <div className="flex gap-4">
          <Heatmap activity={activity} />
          <div
            className="p-3 rounded flex-1 space-y-3"
            style={{ backgroundColor: "var(--bgColor-muted)" }}
          >
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: "var(--fgColor-success)" }}>
                  {quality.survivability}%
                </div>
                <div className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
                  Survives{" "}
                  <span style={{ color: isPositiveVsTeam ? "var(--fgColor-success)" : "var(--fgColor-danger)" }}>
                    {quality.vsTeamAvg}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: "var(--fgColor-success)" }}>
                  {quality.prApprovalRate}%
                </div>
                <div className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
                  PR approval
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{
                    color: quality.avgReviewComments <= 2 ? "var(--fgColor-success)" : "var(--fgColor-attention)",
                  }}
                >
                  {quality.avgReviewComments}
                </div>
                <div className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
                  Avg comments
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-lg font-bold"
                  style={{
                    color: quality.regressionCount === 0 ? "var(--fgColor-success)" : "var(--fgColor-danger)",
                  }}
                >
                  {quality.regressionCount}
                </div>
                <div className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
                  Regressions
                </div>
              </div>
            </div>
            {sessions.length > 0 && (
              <div
                className="pt-3 border-t flex items-center justify-center gap-3"
                style={{ borderColor: "var(--borderColor-muted)" }}
              >
                <span className="text-[10px]" style={{ color: "var(--fgColor-muted)" }}>
                  Recent
                </span>
                {sessions.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-1 rounded"
                    style={{ backgroundColor: "var(--bgColor-default)" }}
                  >
                    {s.ago} · {s.tool} · <span style={{ color: "var(--fgColor-success)" }}>+{s.lines}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3-column breakdown */}
        <div className="grid grid-cols-3 gap-4">
          <BreakdownColumn
            title="By File Type"
            items={byFileType.map(({ type, percent }) => ({ label: type, percent }))}
            color="severe"
            labelWidth="w-16"
          />
          <BreakdownColumn
            title="By Tool"
            items={byTool.map(({ tool, percent }) => ({ label: tool, percent }))}
            color="attention"
            labelWidth="w-20"
          />
          <BreakdownColumn
            title="By Model"
            items={byModel.map(({ model, percent }) => ({ label: model.replace("claude-", ""), percent }))}
            color="accent"
            labelWidth="w-24"
          />
        </div>
      </div>
    </MesaCard>
  );
}
