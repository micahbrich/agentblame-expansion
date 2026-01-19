"use client";

import { Icons } from "../icons";
import { survivability } from "./data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export function SurvivabilityCard() {
  const { unchanged, modified, deleted, byTool, byCodeType, productivityWindows } =
    survivability;

  const survivalData = [
    { status: "Unchanged", value: unchanged, fill: "var(--fgColor-success)" },
    { status: "Modified", value: modified, fill: "var(--fgColor-attention)" },
    { status: "Deleted", value: deleted, fill: "var(--fgColor-danger)" },
  ];

  return (
    <div
      className="rounded-md border overflow-hidden"
      style={{
        backgroundColor: "var(--bgColor-default)",
        borderColor: "var(--borderColor-default)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{
          backgroundColor: "var(--bgColor-muted)",
          borderColor: "var(--borderColor-default)",
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--fgColor-done)" }}>{Icons.trophy}</span>
          <span className="font-semibold text-sm">Code Survivability</span>
          <span
            className="px-2 py-0.5 text-xs rounded-full"
            style={{
              backgroundColor: "var(--bgColor-success-muted)",
              color: "var(--fgColor-success)",
            }}
          >
            {unchanged}% unchanged after 90 days
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Main survival chart */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4
              className="text-xs font-medium mb-3"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Code Fate Distribution
            </h4>
            <div className="h-32">
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                  },
                }}
                className="h-full w-full"
              >
                <BarChart data={survivalData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    type="category"
                    dataKey="status"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={70}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-medium mb-3"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Survival by Tool
            </h4>
            <div className="space-y-2">
              {byTool.map((item) => (
                <div key={item.tool}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{item.tool}</span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--fgColor-success)" }}
                    >
                      {item.survives}% survives
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.survives}%`,
                        backgroundColor: "var(--fgColor-success)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI vs Human comparison */}
        <div>
          <h4
            className="text-xs font-medium mb-3"
            style={{ color: "var(--fgColor-muted)" }}
          >
            AI vs Human Survivability by Code Type
          </h4>
          <div className="space-y-3">
            {byCodeType.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{item.type}</span>
                  <div className="flex items-center gap-4">
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "var(--fgColor-severe)" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--fgColor-severe)]" />
                      AI: {item.aiSurvives}%
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "var(--fgColor-success)" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--fgColor-success)]" />
                      Human: {item.humanSurvives}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.aiSurvives}%`,
                      backgroundColor: "var(--fgColor-severe)",
                    }}
                  />
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.humanSurvives}%`,
                      backgroundColor: "var(--fgColor-success)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity windows */}
        <div
          className="p-3 rounded-md"
          style={{ backgroundColor: "var(--bgColor-muted)" }}
        >
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            Productivity Insight
          </h4>
          <p className="text-sm">
            AI code written{" "}
            <span
              className="font-medium"
              style={{ color: "var(--fgColor-success)" }}
            >
              {productivityWindows.best}
            </span>{" "}
            survives at{" "}
            <span className="font-medium">{productivityWindows.bestRate}%</span>,
            while code written{" "}
            <span
              className="font-medium"
              style={{ color: "var(--fgColor-danger)" }}
            >
              {productivityWindows.worst}
            </span>{" "}
            only survives at{" "}
            <span className="font-medium">{productivityWindows.worstRate}%</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
