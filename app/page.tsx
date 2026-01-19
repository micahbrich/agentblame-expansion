import Link from "next/link";
import { Icons } from "./icons";

export default function Home() {
  return (
    <div
      className="p-8"
      style={{
        backgroundColor: "var(--bgColor-default)",
        color: "var(--fgColor-default)",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo and title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span style={{ color: "var(--fgColor-severe)" }}>{Icons.flame}</span>
            <h1 className="text-4xl font-bold">agentblame</h1>
          </div>
          <p className="text-lg" style={{ color: "var(--fgColor-muted)" }}>
            GitHub mockups for AI contribution tracking
          </p>
        </div>

        {/* Demo links */}
        <div className="grid gap-4">
          <Link
            href="/pr"
            className="block p-6 rounded-lg border transition-colors hover:border-[var(--borderColor-accent-emphasis)]"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: "var(--fgColor-success)" }}>{Icons.pr}</span>
              <h2 className="text-xl font-semibold">Pull Request View</h2>
            </div>
            <p style={{ color: "var(--fgColor-muted)" }}>
              AI contribution summary banner with line attribution, provider
              breakdown, security alerts, and duplicate detection.
            </p>
          </Link>

          <Link
            href="/pulse"
            className="block p-6 rounded-lg border transition-colors hover:border-[var(--borderColor-accent-emphasis)]"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: "var(--fgColor-accent)" }}>
                {Icons.insights}
              </span>
              <h2 className="text-xl font-semibold">Pulse / Insights</h2>
            </div>
            <p style={{ color: "var(--fgColor-muted)" }}>
              AI adoption trends over time, tool usage breakdown, and
              repository-wide AI contribution statistics.
            </p>
          </Link>

          <Link
            href="/contributors"
            className="block p-6 rounded-lg border transition-colors hover:border-[var(--borderColor-accent-emphasis)]"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: "var(--fgColor-done)" }}>{Icons.people}</span>
              <h2 className="text-xl font-semibold">Contributors</h2>
            </div>
            <p style={{ color: "var(--fgColor-muted)" }}>
              Personal AI fingerprint, survivability panel, productivity
              heatmap, and individual contribution patterns.
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div
          className="text-center text-sm"
          style={{ color: "var(--fgColor-muted)" }}
        >
          Design mockups for interview presentation
        </div>
      </div>
    </div>
  );
}
