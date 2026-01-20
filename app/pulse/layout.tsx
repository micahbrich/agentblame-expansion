import Link from "next/link";
import { Icons } from "../icons";
import { sidebarNav, overview, activePRs } from "./data";
import { PingIndicator } from "@/components/mesa/ping-indicator";

export default function PulseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4 flex gap-6">
      {/* Sidebar */}
      <aside className="w-56 shrink-0">
        <nav className="space-y-1">
          {sidebarNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md"
              style={{
                backgroundColor: item.active
                  ? "var(--bgColor-accent-muted)"
                  : "transparent",
                color: item.active
                  ? "var(--fgColor-accent)"
                  : "var(--fgColor-default)",
                opacity: item.interactive ? 1 : 0.5,
              }}
            >
              {item.interactive && <PingIndicator size="sm" />}
              {item.label}
            </Link>
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
            <span style={{ color: "var(--fgColor-default)" }}>
              {overview.authors} authors
            </span>{" "}
            have pushed{" "}
            <span style={{ color: "var(--fgColor-default)" }}>
              {overview.commits} commits
            </span>{" "}
            to main and{" "}
            <span style={{ color: "var(--fgColor-default)" }}>
              {overview.branchCommits} commits
            </span>{" "}
            to all branches. On main,{" "}
            <span style={{ color: "var(--fgColor-default)" }}>
              {overview.files} files
            </span>{" "}
            have changed and there have been{" "}
            <span style={{ color: "var(--fgColor-success)" }}>
              {overview.additions.toLocaleString()} additions
            </span>{" "}
            and{" "}
            <span style={{ color: "var(--fgColor-danger)" }}>
              {overview.deletions.toLocaleString()} deletions
            </span>
            .
          </p>
        </div>

        {/* Agentblame AI Card slot */}
        <div className="-mx-6">{children}</div>

        {/* Active PRs */}
        <div className="mt-6">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <span style={{ color: "var(--fgColor-success)" }}>{Icons.pr}</span>
            {activePRs.length} Active pull requests
          </h3>
          <ul className="space-y-2">
            {activePRs.map((pr) => (
              <li
                key={pr.number}
                className="p-3 rounded-md border flex items-center justify-between"
                style={{
                  backgroundColor: "var(--bgColor-default)",
                  borderColor: "var(--borderColor-default)",
                }}
              >
                <div>
                  <Link
                    href="/pr"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "var(--fgColor-accent)" }}
                  >
                    {pr.title}
                  </Link>
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
  );
}
