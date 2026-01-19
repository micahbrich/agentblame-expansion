"use client";

import { GitHubShell } from "@/components/shells/GitHubShell";
import { PulseAICard } from "@/components/agentblame/PulseAICard";

export default function PulsePage() {
  return (
    <GitHubShell
      repo="mesa-dot-dev/agentblame"
      tabs={[{ label: "Insights", href: "/pulse", active: true }]}
    >
      {/* Pulse Header */}
      <div className="px-6 py-4 flex gap-6">
        {/* Sidebar */}
        <aside className="w-56 shrink-0">
          <nav className="space-y-1">
            {[
              { label: "Pulse", active: true },
              { label: "Contributors" },
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
                href={item.label === "Contributors" ? "/contributors" : "#"}
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
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Pulse</h2>
            <select
              className="px-3 py-1.5 text-sm rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-default)",
                borderColor: "var(--borderColor-default)",
                color: "var(--fgColor-default)",
              }}
              defaultValue="week"
            >
              <option value="day">Past 24 hours</option>
              <option value="3days">Past 3 days</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
            </select>
          </div>

          {/* Overview card */}
          <div
            className="p-4 rounded-md border mb-4"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <p className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
              Excluding merges,{" "}
              <span style={{ color: "var(--fgColor-default)" }}>4 authors</span>{" "}
              have pushed{" "}
              <span style={{ color: "var(--fgColor-default)" }}>12 commits</span>{" "}
              to main and{" "}
              <span style={{ color: "var(--fgColor-default)" }}>8 commits</span>{" "}
              to all branches. On main,{" "}
              <span style={{ color: "var(--fgColor-default)" }}>24 files</span>{" "}
              have changed and there have been{" "}
              <span style={{ color: "var(--fgColor-success)" }}>1,234 additions</span>{" "}
              and{" "}
              <span style={{ color: "var(--fgColor-danger)" }}>567 deletions</span>.
            </p>
          </div>

          {/* Agentblame AI Card */}
          <div className="-mx-6">
            <PulseAICard />
          </div>

          {/* Active PRs */}
          <div className="mt-6">
            <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                style={{ fill: "var(--fgColor-success)" }}
              >
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
              </svg>
              2 Active pull requests
            </h3>
            <ul className="space-y-2">
              {[
                {
                  title: "feat: Add AI-powered code review suggestions",
                  number: 47,
                  author: "alice",
                  aiPercent: 51,
                },
                {
                  title: "fix: Resolve authentication edge case",
                  number: 46,
                  author: "bob",
                  aiPercent: 28,
                },
              ].map((pr) => (
                <li
                  key={pr.number}
                  className="p-3 rounded-md border flex items-center justify-between"
                  style={{
                    backgroundColor: "var(--bgColor-default)",
                    borderColor: "var(--borderColor-default)",
                  }}
                >
                  <div>
                    <a
                      href="/pr"
                      className="text-sm font-medium hover:underline"
                      style={{ color: "var(--fgColor-accent)" }}
                    >
                      {pr.title}
                    </a>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      #{pr.number} opened by {pr.author}
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 text-xs rounded-full font-medium"
                    style={{
                      backgroundColor: "var(--bgColor-severe-muted)",
                      color: "var(--fgColor-severe)",
                    }}
                  >
                    {pr.aiPercent}% AI
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </GitHubShell>
  );
}
