"use client";

import { HeatmapCalendar, type HeatmapCell } from "@/components/ui/heatmap-calendar";
import { heatmap as heatmapColors } from "@/components/mesa/primitives/colors";
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
    const total = ai + human;
    const aiPct = total > 0 ? Math.round((ai / total) * 100) : 0;
    const humanPct = total > 0 ? 100 - aiPct : 0;
    return (
      <div className="text-sm">
        <div className="font-medium">{cell.label}</div>
        <div className="flex gap-3 mt-1">
          <span style={{ color: heatmapColors.ai.base }}>{aiPct}% AI</span>
          <span style={{ color: heatmapColors.human.base }}>{humanPct}% human</span>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <HeatmapCalendar
        data={data}
        rangeDays={90}
        cellSize={12}
        cellGap={3}
        palette={[
          "var(--bgColor-neutral-muted)",
          heatmapColors.ai.low,
          heatmapColors.ai.mid,
          heatmapColors.ai.high,
          heatmapColors.ai.base,
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
