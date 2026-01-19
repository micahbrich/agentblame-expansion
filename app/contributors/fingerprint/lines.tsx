import type { Fingerprint } from "../data";
import { heatmap } from "@/components/mesa/primitives/colors";

interface LinesProps {
  lines: Fingerprint["lines"];
}

export function Lines({ lines }: LinesProps) {
  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-sm"
          style={{ backgroundColor: heatmap.ai.base }}
        />
        <span style={{ color: heatmap.ai.base }} className="font-medium">
          {lines.ai.toLocaleString()}
        </span>
        <span style={{ color: "var(--fgColor-muted)" }}>AI</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="w-2 h-2 rounded-sm"
          style={{ backgroundColor: heatmap.human.base }}
        />
        <span style={{ color: heatmap.human.base }} className="font-medium">
          {lines.human.toLocaleString()}
        </span>
        <span style={{ color: "var(--fgColor-muted)" }}>human</span>
      </span>
      <span style={{ color: "var(--fgColor-muted)" }}>
        {lines.total.toLocaleString()} total
      </span>
    </div>
  );
}
