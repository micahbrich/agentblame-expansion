import type { Fingerprint } from "../data";

interface LinesProps {
  lines: Fingerprint["lines"];
}

export function Lines({ lines }: LinesProps) {
  const aiPercent = Math.round((lines.ai / lines.total) * 100);

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium">{lines.total.toLocaleString()}</span>
      <span style={{ color: "var(--fgColor-muted)" }}>total</span>
      <span style={{ color: "var(--fgColor-muted)" }}>·</span>
      <span style={{ color: "var(--fgColor-severe)" }}>
        {lines.ai.toLocaleString()} AI ({aiPercent}%)
      </span>
      <span style={{ color: "var(--fgColor-muted)" }}>·</span>
      <span style={{ color: "var(--fgColor-success)" }}>
        {lines.human.toLocaleString()} human
      </span>
    </div>
  );
}
