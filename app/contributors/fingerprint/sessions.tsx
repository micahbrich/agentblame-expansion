import type { Fingerprint } from "../data";

interface SessionsProps {
  sessions: Fingerprint["sessions"];
}

export function Sessions({ sessions }: SessionsProps) {
  if (sessions.length === 0) {
    return (
      <div
        className="text-sm py-4 text-center"
        style={{ color: "var(--fgColor-muted)" }}
      >
        No recent sessions
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sessions.map((session, i) => (
        <div
          key={i}
          className="flex items-center justify-between text-sm py-1.5 px-2 rounded"
          style={{ backgroundColor: "var(--bgColor-muted)" }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--fgColor-muted)" }}>{session.ago}</span>
            <span style={{ color: "var(--fgColor-muted)" }}>·</span>
            <span>{session.tool}</span>
            <span style={{ color: "var(--fgColor-muted)" }}>·</span>
            <span style={{ color: "var(--fgColor-accent)" }}>
              {session.model}
            </span>
          </div>
          <span style={{ color: "var(--fgColor-success)" }}>
            +{session.lines} lines
          </span>
        </div>
      ))}
    </div>
  );
}
