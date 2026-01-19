"use client";

import { useState } from "react";
import { GitHubShell } from "@/components/shells/GitHubShell";
import { ContributorRow } from "@/components/agentblame/ContributorRow";
import { PersonalFingerprint } from "@/components/agentblame/PersonalFingerprint";
import { SurvivabilityPanel } from "@/components/agentblame/SurvivabilityPanel";
import { mockContributors } from "@/lib/mock-data";

export default function ContributorsPage() {
  const [selected, setSelected] = useState(mockContributors[0].username);

  return (
    <GitHubShell
      repo="mesa-dot-dev/agentblame"
      tabs={[{ label: "Insights", href: "/pulse", active: true }]}
    >
      <div className="px-6 py-4 flex gap-6">
        {/* Sidebar */}
        <aside className="w-56 shrink-0">
          <nav className="space-y-1">
            {[
              { label: "Pulse", href: "/pulse" },
              { label: "Contributors", active: true },
              { label: "Community" },
              { label: "Traffic" },
              { label: "Commits" },
              { label: "Code frequency" },
              { label: "Dependency graph" },
              { label: "Network" },
              { label: "Forks" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href || "#"}
                className="block px-3 py-2 text-sm rounded-md"
                style={{
                  backgroundColor: item.active
                    ? "var(--bgColor-accent-muted)"
                    : "transparent",
                  color: item.active
                    ? "var(--fgColor-accent)"
                    : "var(--fgColor-default)",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contributors</h2>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--fgColor-muted)" }}>
                {mockContributors.length} contributors
              </span>
              <span
                className="px-2 py-0.5 text-xs rounded-full font-medium"
                style={{
                  backgroundColor: "var(--bgColor-severe-muted)",
                  color: "var(--fgColor-severe)",
                }}
              >
                38% avg AI
              </span>
            </div>
          </div>

          {/* Contribution graph placeholder */}
          <div
            className="h-40 rounded-md border flex items-center justify-center"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 16 16"
                className="mx-auto mb-2"
                style={{ fill: "var(--fgColor-muted)" }}
              >
                <path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
              </svg>
              <p className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
                Contribution activity graph
              </p>
            </div>
          </div>

          {/* Contributors list */}
          <div
            className="rounded-md border overflow-hidden"
            style={{ borderColor: "var(--borderColor-default)" }}
          >
            <div
              className="px-4 py-2 text-xs font-medium border-b"
              style={{
                backgroundColor: "var(--bgColor-muted)",
                borderColor: "var(--borderColor-default)",
                color: "var(--fgColor-muted)",
              }}
            >
              Click a contributor to see their AI fingerprint
            </div>
            {mockContributors.map((contributor) => (
              <ContributorRow
                key={contributor.username}
                {...contributor}
                isSelected={selected === contributor.username}
                onClick={() => setSelected(contributor.username)}
              />
            ))}
          </div>

          {/* Selected contributor's AI fingerprint */}
          <PersonalFingerprint username={selected} />

          {/* Survivability panel */}
          <SurvivabilityPanel />
        </div>
      </div>
    </GitHubShell>
  );
}
