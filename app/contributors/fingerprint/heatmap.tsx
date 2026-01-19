"use client";

import { HeatmapCalendar, type HeatmapCell } from "@/components/ui/heatmap-calendar";
import type { Fingerprint } from "../data";

interface HeatmapProps {
  activity: Fingerprint["activity"];
}

export function Heatmap({ activity }: HeatmapProps) {

  // Store AI lines in value, compute human as remainder
  const data = activity.map((a) => {
    const ai = a.count;
    const human = Math.max(0, 12 - a.count);
    return {
      date: a.date,
      value: a.count,
      meta: { ai, human },
      gradient: { ai, human },
    };
  });

  const renderTooltip = (cell: HeatmapCell) => {
    if (cell.disabled) return "Outside range";
    const meta = cell.meta as { ai: number; human: number } | undefined;
    const ai = meta?.ai ?? 0;
    const human = meta?.human ?? 0;
    return (
      <div className="text-sm">
        <div className="font-medium">{cell.label}</div>
        <div className="flex gap-3 mt-1">
          <span style={{ color: "rgb(245, 158, 11)" }}>{ai} AI</span>
          <span style={{ color: "rgb(34, 197, 94)" }}>{human} human</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <HeatmapCalendar
        data={data}
        rangeDays={90}
        cellSize={12}
        cellGap={3}
        palette={[
          "var(--bgColor-neutral-muted)",
          "rgba(245, 158, 11, 0.25)",
          "rgba(245, 158, 11, 0.5)",
          "rgba(245, 158, 11, 0.75)",
          "rgb(245, 158, 11)",
        ]}
        legend={{ show: false }}
        axisLabels={{
          showWeekdays: false,
          monthFormat: "short",
        }}
        renderTooltip={renderTooltip}
      />
    </div>
  );
}
