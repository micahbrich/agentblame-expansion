"use client";

import { survivability } from "./data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  MesaCard,
  MesaCardHeader,
  SectionTitle,
  ProgressBar,
  mesaColors,
} from "@/components/mesa";

export function SurvivabilityCard() {
  const { unchanged, modified, deleted, byTool, byCodeType, productivityWindows } =
    survivability;

  const survivalData = [
    { status: "Unchanged", value: unchanged, fill: mesaColors.success.fg },
    { status: "Modified", value: modified, fill: mesaColors.attention.fg },
    { status: "Deleted", value: deleted, fill: mesaColors.danger.fg },
  ];

  return (
    <MesaCard>
      <MesaCardHeader
        title="Code Survivability"
        badge={{ label: `${unchanged}% unchanged after 90 days`, variant: "success" }}
      />

      <div className="p-4 space-y-4">
        {/* Main survival chart */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <SectionTitle className="mb-3">Code Fate Distribution</SectionTitle>
            <div className="h-32">
              <ChartContainer
                config={{ value: { label: "Percentage" } }}
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
            <SectionTitle className="mb-3">Survival by Tool</SectionTitle>
            <div className="space-y-2">
              {byTool.map((item) => (
                <div key={item.tool}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{item.tool}</span>
                    <span className="font-medium" style={{ color: mesaColors.success.fg }}>
                      {item.survives}% survives
                    </span>
                  </div>
                  <ProgressBar value={item.survives} color="success" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI vs Human comparison */}
        <div>
          <SectionTitle className="mb-3">AI vs Human Survivability by Code Type</SectionTitle>
          <div className="space-y-3">
            {byCodeType.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{item.type}</span>
                  <div className="flex items-center gap-4">
                    <LegendLabel color="severe" label={`AI: ${item.aiSurvives}%`} />
                    <LegendLabel color="success" label={`Human: ${item.humanSurvives}%`} />
                  </div>
                </div>
                <div className="flex gap-1">
                  <ProgressBar value={item.aiSurvives} color="severe" showTrack={false} />
                  <ProgressBar value={item.humanSurvives} color="success" showTrack={false} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity insight */}
        <ProductivityInsight {...productivityWindows} />
      </div>
    </MesaCard>
  );
}

/** Small legend label with colored dot */
function LegendLabel({ color, label }: { color: "severe" | "success"; label: string }) {
  return (
    <span className="flex items-center gap-1" style={{ color: mesaColors[color].fg }}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: mesaColors[color].fg }} />
      {label}
    </span>
  );
}

/** Productivity insight panel */
function ProductivityInsight({ best, bestRate, worst, worstRate }: {
  best: string;
  bestRate: number;
  worst: string;
  worstRate: number;
}) {
  return (
    <div className="p-3 rounded-md" style={{ backgroundColor: mesaColors.muted.bg }}>
      <SectionTitle>Productivity Insight</SectionTitle>
      <p className="text-sm">
        AI code written{" "}
        <span className="font-medium" style={{ color: mesaColors.success.fg }}>{best}</span>{" "}
        survives at <span className="font-medium">{bestRate}%</span>, while code written{" "}
        <span className="font-medium" style={{ color: mesaColors.danger.fg }}>{worst}</span>{" "}
        only survives at <span className="font-medium">{worstRate}%</span>.
      </p>
    </div>
  );
}
