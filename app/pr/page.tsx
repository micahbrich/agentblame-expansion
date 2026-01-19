"use client";

import { GitHubShell } from "@/components/shells/GitHubShell";
import { PRSummaryBanner } from "@/components/agentblame/PRSummaryBanner";
import { mockPR } from "@/lib/mock-data";

export default function PRPage() {
  return (
    <GitHubShell
      repo="mesa-dot-dev/agentblame"
      tabs={[{ label: "Pull requests", href: "/pr", active: true }]}
    >
      {/* PR Header */}
      <div
        className="px-6 py-4 border-b"
        style={{ borderColor: "var(--borderColor-muted)" }}
      >
        <h1 className="text-2xl font-normal mb-2">
          <span style={{ color: "var(--fgColor-default)" }}>{mockPR.title}</span>{" "}
          <span style={{ color: "var(--fgColor-muted)" }}>#{mockPR.number}</span>
        </h1>
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-1 text-sm font-medium rounded-full"
            style={{
              backgroundColor: "var(--bgColor-success-emphasis)",
              color: "var(--fgColor-onEmphasis)",
            }}
          >
            Merged
          </span>
          <span className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
            <span className="font-semibold">{mockPR.author}</span> merged 1 commit
            into <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: "var(--bgColor-accent-muted)", color: "var(--fgColor-accent)" }}>main</code>
          </span>
        </div>
      </div>

      {/* PR Tabs */}
      <div
        className="px-6 border-b"
        style={{ borderColor: "var(--borderColor-muted)" }}
      >
        <nav className="flex gap-4">
          {[
            { label: "Conversation", count: 0 },
            { label: "Commits", count: 1 },
            { label: "Checks", count: 1 },
            { label: "Files changed", count: 11, active: true },
          ].map((tab) => (
            <button
              key={tab.label}
              className="py-3 text-sm flex items-center gap-2 border-b-2"
              style={{
                color: tab.active
                  ? "var(--fgColor-default)"
                  : "var(--fgColor-muted)",
                borderColor: tab.active
                  ? "var(--underlineNav-borderColor-active)"
                  : "transparent",
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className="px-1.5 py-0.5 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--bgColor-neutral-muted)",
                    color: "var(--fgColor-muted)",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Agentblame Summary Banner */}
      <PRSummaryBanner />

      {/* Mock File Diff */}
      <div className="px-4 pb-4">
        <div
          className="rounded-md border overflow-hidden"
          style={{ borderColor: "var(--borderColor-default)" }}
        >
          {/* File header */}
          <div
            className="px-4 py-2 flex items-center justify-between border-b"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--fgColor-default)" }}>
                src/api/users.ts
              </span>
              <span
                className="px-1.5 py-0.5 text-xs rounded"
                style={{
                  backgroundColor: "var(--bgColor-severe-muted)",
                  color: "var(--fgColor-severe)",
                }}
              >
                67% AI
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: "var(--fgColor-success)" }}>+26</span>
              <span style={{ color: "var(--fgColor-danger)" }}>-4</span>
            </div>
          </div>

          {/* Mock diff lines */}
          <div className="font-mono text-xs">
            {[
              { type: "context", line: 38, content: "export async function getUser(id: string) {" },
              { type: "context", line: 39, content: "  const db = await getDatabase();" },
              { type: "deletion", line: 40, content: "  return db.users.findOne({ id });" },
              { type: "addition", line: 40, content: "  const user = await db.users.findOne({ id });", ai: true },
              { type: "addition", line: 41, content: "  if (!user) {", ai: true },
              { type: "addition", line: 42, content: "    throw new NotFoundError(`User ${id} not found`);", ai: true },
              { type: "addition", line: 43, content: "  }", ai: true },
              { type: "addition", line: 44, content: "  return user;", ai: true },
              { type: "context", line: 45, content: "}" },
              { type: "context", line: 46, content: "" },
              { type: "addition", line: 47, content: "export async function updateUser(id: string, data: UserUpdate) {", ai: false },
              { type: "addition", line: 48, content: "  const user = await getUser(id);", ai: false },
              { type: "addition", line: 49, content: "  return db.users.updateOne({ id }, { $set: data });", ai: false },
              { type: "addition", line: 50, content: "}", ai: false },
            ].map((line, i) => (
              <div
                key={i}
                className="flex"
                style={{
                  backgroundColor:
                    line.type === "addition"
                      ? "var(--diffBlob-addition-bgColor-line)"
                      : line.type === "deletion"
                      ? "var(--diffBlob-deletion-bgColor-line)"
                      : "transparent",
                }}
              >
                {/* Line numbers */}
                <div
                  className="w-12 px-2 py-0.5 text-right select-none"
                  style={{
                    backgroundColor:
                      line.type === "addition"
                        ? "var(--diffBlob-addition-bgColor-num)"
                        : line.type === "deletion"
                        ? "var(--diffBlob-deletion-bgColor-num)"
                        : "var(--bgColor-muted)",
                    color: "var(--fgColor-muted)",
                  }}
                >
                  {line.type !== "addition" ? line.line : ""}
                </div>
                <div
                  className="w-12 px-2 py-0.5 text-right select-none"
                  style={{
                    backgroundColor:
                      line.type === "addition"
                        ? "var(--diffBlob-addition-bgColor-num)"
                        : line.type === "deletion"
                        ? "var(--diffBlob-deletion-bgColor-num)"
                        : "var(--bgColor-muted)",
                    color: "var(--fgColor-muted)",
                  }}
                >
                  {line.type !== "deletion" ? line.line : ""}
                </div>

                {/* AI indicator */}
                <div
                  className="w-6 flex items-center justify-center"
                  style={{
                    backgroundColor:
                      line.type === "addition"
                        ? "var(--diffBlob-addition-bgColor-num)"
                        : line.type === "deletion"
                        ? "var(--diffBlob-deletion-bgColor-num)"
                        : "var(--bgColor-muted)",
                  }}
                >
                  {line.type === "addition" && line.ai && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      style={{ fill: "var(--fgColor-severe)" }}
                    >
                      <path d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 0 1-1.436-.874A3.198 3.198 0 0 0 3 10c0 2.53 2.164 4.5 4.998 4.5ZM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.796.167-2.31-.188-.872-.604-2.53.074-2.683 1.114A4.702 4.702 0 0 0 1 9.5c0 3.25 2.797 6 6.998 6 4.19 0 7-2.79 7-6C15 6.816 12.61 3.969 9.533.753Z" />
                    </svg>
                  )}
                </div>

                {/* Code content */}
                <div className="flex-1 px-2 py-0.5">
                  <span
                    style={{
                      color:
                        line.type === "addition"
                          ? "var(--diffBlob-addition-fgColor-text)"
                          : line.type === "deletion"
                          ? "var(--diffBlob-deletion-fgColor-text)"
                          : "var(--fgColor-default)",
                    }}
                  >
                    {line.type === "addition" && "+ "}
                    {line.type === "deletion" && "- "}
                    {line.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GitHubShell>
  );
}
