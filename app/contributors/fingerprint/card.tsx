"use client";

import { fingerprints, fingerprint as defaultFingerprint } from "../data";
import { Lines } from "./lines";
import { Heatmap } from "./heatmap";
import {
  AIHumanBar,
  mesaColors,
} from "@/components/mesa";
import { tint, heatmap } from "@/components/mesa/primitives/colors";

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
    <div
      className={embedded ? "overflow-hidden" : "rounded-md border overflow-hidden"}
      style={{
        backgroundColor: "var(--bgColor-default)",
        borderColor: embedded ? undefined : "var(--borderColor-default)",
      }}
    >
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
          {/* By file type */}
          <div>
            <h4 className="text-xs font-medium mb-2" style={{ color: "var(--fgColor-muted)" }}>
              By File Type
            </h4>
            <div className="space-y-1.5">
              {byFileType.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: "var(--fgColor-severe)",
                      }}
                    />
                  </div>
                  <span className="text-xs w-16 text-right">
                    {item.type} <span style={{ color: "var(--fgColor-muted)" }}>{item.percent}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By tool */}
          <div>
            <h4 className="text-xs font-medium mb-2" style={{ color: "var(--fgColor-muted)" }}>
              By Tool
            </h4>
            <div className="space-y-1.5">
              {byTool.map((item) => (
                <div key={item.tool} className="flex items-center gap-2">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: "var(--fgColor-attention)",
                      }}
                    />
                  </div>
                  <span className="text-xs w-20 text-right truncate">
                    {item.tool} <span style={{ color: "var(--fgColor-muted)" }}>{item.percent}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By model */}
          <div>
            <h4 className="text-xs font-medium mb-2" style={{ color: "var(--fgColor-muted)" }}>
              By Model
            </h4>
            <div className="space-y-1.5">
              {byModel.map((item) => (
                <div key={item.model} className="flex items-center gap-2">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.percent}%`,
                        backgroundColor: "var(--fgColor-accent)",
                      }}
                    />
                  </div>
                  <span className="text-xs w-24 text-right truncate">
                    {item.model.replace("claude-", "")} <span style={{ color: "var(--fgColor-muted)" }}>{item.percent}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
