"use client";

import { GitHubShell, Icons } from "@/components/shells/GitHubShell";
import { PRSummaryBanner } from "@/components/agentblame/PRSummaryBanner";
import { mockPR } from "@/lib/mock-data";

export default function PRPage() {
  return (
    <GitHubShell repo="mesa-dot-dev/agentblame">
      {/* PR Header Section */}
      <div className="px-6 py-4" style={{ backgroundColor: "var(--bgColor-default)" }}>
        {/* Top row: Title + right side buttons */}
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-2xl font-normal pr-4">
            <span style={{ color: "var(--fgColor-default)" }}>{mockPR.title}</span>{" "}
            <span style={{ color: "var(--fgColor-muted)" }}>#{mockPR.number}</span>
          </h1>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm px-2 py-1 rounded-md" style={{ backgroundColor: "var(--bgColor-muted)", color: "var(--fgColor-muted)" }}>
              Preview
            </span>
            <span className="text-sm" style={{ color: "var(--fgColor-accent)" }}>
              Switch back · Feedback
            </span>
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-default)",
                borderColor: "var(--borderColor-default)",
                color: "var(--fgColor-default)"
              }}
            >
              <span style={{ color: "var(--fgColor-muted)" }}>{Icons.code}</span>
              Code
              {Icons.triangle}
            </button>
          </div>
        </div>

        {/* Status row: Merged badge + author info + branches */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Purple Merged badge */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 text-sm font-medium rounded-full"
            style={{
              backgroundColor: "#8957e5",
              color: "#ffffff",
            }}
          >
            {Icons.merge}
            Merged
          </span>

          {/* Author info */}
          <span className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
            <a href="#" className="font-semibold hover:underline" style={{ color: "var(--fgColor-default)" }}>
              {mockPR.author}
            </a>
            {" "}merged 1 commit into{" "}
            {/* Branch pill - main */}
            <a
              href="#"
              className="px-1.5 py-0.5 text-xs font-mono rounded-md hover:underline"
              style={{
                backgroundColor: "rgba(56, 139, 253, 0.1)",
                color: "#4493f8"
              }}
            >
              main
            </a>
            {" "}from{" "}
            {/* Branch pill - feature branch */}
            <a
              href="#"
              className="px-1.5 py-0.5 text-xs font-mono rounded-md hover:underline"
              style={{
                backgroundColor: "rgba(56, 139, 253, 0.1)",
                color: "#4493f8"
              }}
            >
              feat/ai-review-suggestions
            </a>
            <button className="ml-1 p-0.5 rounded hover:bg-[var(--bgColor-muted)]" style={{ color: "var(--fgColor-muted)" }}>
              {Icons.copy}
            </button>
            {" "}3 days ago
          </span>
        </div>
      </div>

      {/* PR Tabs */}
      <div className="px-6 border-b" style={{ borderColor: "var(--borderColor-muted)" }}>
        <nav className="flex items-center justify-between">
          <div className="flex gap-1">
            {[
              { icon: Icons.comment, label: "Conversation", count: 0 },
              { icon: Icons.commit, label: "Commits", count: 1 },
              { icon: Icons.check, label: "Checks", count: 1 },
              { icon: Icons.file, label: "Files changed", count: 11, active: true },
            ].map((tab) => (
              <button
                key={tab.label}
                className="flex items-center gap-2 px-4 py-3 text-sm border-b-2"
                style={{
                  color: tab.active ? "var(--fgColor-default)" : "var(--fgColor-muted)",
                  borderColor: tab.active ? "var(--underlineNav-borderColor-active)" : "transparent",
                  fontWeight: tab.active ? 500 : 400,
                }}
              >
                <span style={{ color: "var(--fgColor-muted)" }}>{tab.icon}</span>
                {tab.label}
                <span
                  className="px-1.5 py-0.5 text-xs rounded-full"
                  style={{
                    backgroundColor: "var(--bgColor-neutral-muted)",
                    color: "var(--fgColor-muted)",
                  }}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* +/- stats with colored blocks */}
          <div className="flex items-center gap-1 text-sm">
            <span style={{ color: "#3fb950" }}>+319</span>
            <span style={{ color: "#f85149" }}>-121</span>
            {/* Colored blocks representing changes */}
            <div className="flex gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-sm" style={{ backgroundColor: i < 4 ? "#3fb950" : "#f85149" }} />
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Agentblame Summary Banner */}
      <PRSummaryBanner />

      {/* Diff Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ backgroundColor: "var(--bgColor-muted)", borderColor: "var(--borderColor-muted)" }}
      >
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Sidebar toggle */}
          <button className="p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
            {Icons.sidebar}
          </button>
          {/* All commits dropdown */}
          <button
            className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border"
            style={{
              backgroundColor: "var(--bgColor-default)",
              borderColor: "var(--borderColor-default)",
              color: "var(--fgColor-default)"
            }}
          >
            <span className="w-4 h-4 rounded border text-xs flex items-center justify-center" style={{ borderColor: "var(--borderColor-default)" }}>

            </span>
            All commits
            {Icons.triangle}
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* View progress */}
          <span className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
            <span className="inline-flex w-4 h-4 rounded-full border-2" style={{ borderColor: "var(--borderColor-default)" }} />
            {" "}0 / 11 viewed
          </span>

          {/* Copy button */}
          <button className="p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
            {Icons.copy}
          </button>

          {/* Comments */}
          <button className="flex items-center gap-1 p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
            {Icons.comment}
            <span className="text-sm">Comments</span>
            <span className="text-sm">0</span>
          </button>

          {/* Submit comments button */}
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md"
            style={{
              backgroundColor: "#238636",
              color: "#ffffff"
            }}
          >
            Submit comments
            {Icons.triangle}
          </button>

          {/* Settings */}
          <button className="p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
            {Icons.gear}
          </button>
        </div>
      </div>

      {/* Main content with file tree sidebar */}
      <div className="flex">
        {/* File tree sidebar */}
        <div
          className="w-72 border-r shrink-0 p-3"
          style={{ borderColor: "var(--borderColor-muted)", backgroundColor: "var(--bgColor-default)" }}
        >
          {/* Filter input */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center gap-2 flex-1 px-2 py-1.5 text-sm rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-default)",
                borderColor: "var(--borderColor-default)",
                color: "var(--fgColor-muted)"
              }}
            >
              {Icons.search}
              <input
                type="text"
                placeholder="Filter files..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--fgColor-default)" }}
              />
            </div>
            <button className="p-1.5 rounded hover:bg-[var(--bgColor-muted)]" style={{ color: "var(--fgColor-muted)" }}>
              {Icons.gear}
            </button>
          </div>

          {/* File tree */}
          <div className="text-sm">
            {/* packages folder */}
            <div className="mb-1">
              <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                <span style={{ color: "var(--fgColor-default)" }}>packages</span>
              </button>

              {/* chrome subfolder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>chrome</span>
                </button>

                {/* src subfolder */}
                <div className="ml-4">
                  <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                    <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                    <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                    <span style={{ color: "var(--fgColor-default)" }}>src</span>
                  </button>

                  {/* Files */}
                  <div className="ml-4">
                    <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>manifest.json</span>
                    </button>
                  </div>
                </div>

                {/* build-chrome.ts */}
                <div className="ml-4">
                  <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                    <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                    <span style={{ color: "var(--fgColor-default)" }}>build-chrome.ts</span>
                  </button>
                </div>

                {/* package.json */}
                <div className="ml-4">
                  <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                    <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                    <span style={{ color: "var(--fgColor-default)" }}>package.json</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diff content */}
        <div className="flex-1 p-4">
          <div
            className="rounded-md border overflow-hidden"
            style={{ borderColor: "var(--borderColor-default)" }}
          >
            {/* File header */}
            <div
              className="px-3 py-2 flex items-center justify-between border-b"
              style={{
                backgroundColor: "var(--bgColor-muted)",
                borderColor: "var(--borderColor-default)",
              }}
            >
              <div className="flex items-center gap-2 text-sm">
                <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                  {Icons.chevron}
                </button>
                <span style={{ color: "var(--fgColor-default)" }}>
                  src/api/users.ts
                </span>
                <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                  {Icons.copy}
                </button>
                <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                  {Icons.expand}
                </button>
                {/* Agentblame AI badge */}
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
              <div className="flex items-center gap-3 text-sm">
                {/* +/- stats */}
                <span style={{ color: "#3fb950" }}>+26</span>
                <span style={{ color: "#f85149" }}>-4</span>
                {/* Colored blocks */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-sm" style={{ backgroundColor: i < 4 ? "#3fb950" : "#f85149" }} />
                  ))}
                </div>
                {/* Viewed checkbox */}
                <label className="flex items-center gap-1 text-xs" style={{ color: "var(--fgColor-muted)" }}>
                  <input type="checkbox" className="rounded" />
                  Viewed
                </label>
                {/* Comment button */}
                <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                  {Icons.comment}
                </button>
                {/* More options */}
                <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                  {Icons.more}
                </button>
              </div>
            </div>

            {/* Hunk header */}
            <div
              className="px-4 py-1 text-xs font-mono"
              style={{
                backgroundColor: "rgba(56, 139, 253, 0.1)",
                color: "var(--fgColor-muted)"
              }}
            >
              <button className="mr-2 p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                {Icons.expand}
              </button>
              @@ -38,8 +38,13 @@
            </div>

            {/* Mock diff lines */}
            <div className="font-mono text-xs">
              {[
                { type: "context", oldLine: 38, newLine: 38, content: "export async function getUser(id: string) {" },
                { type: "context", oldLine: 39, newLine: 39, content: "  const db = await getDatabase();" },
                { type: "deletion", oldLine: 40, newLine: null, content: "  return db.users.findOne({ id });" },
                { type: "addition", oldLine: null, newLine: 40, content: "  const user = await db.users.findOne({ id });", ai: true },
                { type: "addition", oldLine: null, newLine: 41, content: "  if (!user) {", ai: true },
                { type: "addition", oldLine: null, newLine: 42, content: "    throw new NotFoundError(`User ${id} not found`);", ai: true },
                { type: "addition", oldLine: null, newLine: 43, content: "  }", ai: true },
                { type: "addition", oldLine: null, newLine: 44, content: "  return user;", ai: true },
                { type: "context", oldLine: 41, newLine: 45, content: "}" },
                { type: "context", oldLine: 42, newLine: 46, content: "" },
                { type: "addition", oldLine: null, newLine: 47, content: "export async function updateUser(id: string, data: UserUpdate) {" },
                { type: "addition", oldLine: null, newLine: 48, content: "  const user = await getUser(id);" },
                { type: "addition", oldLine: null, newLine: 49, content: "  return db.users.updateOne({ id }, { $set: data });" },
                { type: "addition", oldLine: null, newLine: 50, content: "}" },
              ].map((line, i) => (
                <div
                  key={i}
                  className="flex group"
                  style={{
                    backgroundColor:
                      line.type === "addition"
                        ? "var(--diffBlob-addition-bgColor-line)"
                        : line.type === "deletion"
                        ? "var(--diffBlob-deletion-bgColor-line)"
                        : "transparent",
                  }}
                >
                  {/* Old line number */}
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
                    {line.oldLine || ""}
                  </div>
                  {/* New line number */}
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
                    {line.newLine || ""}
                  </div>

                  {/* AI indicator column */}
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

                  {/* Comment button on hover */}
                  <div className="w-8 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      className="p-0.5 rounded"
                      style={{
                        backgroundColor: "#238636",
                        color: "#ffffff"
                      }}
                    >
                      {Icons.plus}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GitHubShell>
  );
}
