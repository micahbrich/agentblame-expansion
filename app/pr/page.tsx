"use client";

import { GitHubShell, Icons } from "@/components/shells/GitHubShell";
import { PRSummaryBanner } from "@/components/agentblame/PRSummaryBanner";
import { mockPR } from "@/lib/mock-data";

export default function PRPage() {
  const totalFiles = mockPR.files.length;

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
            style={{ backgroundColor: "#8957e5", color: "#ffffff" }}
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
            <a href="#" className="px-1.5 py-0.5 text-xs font-mono rounded-md hover:underline"
              style={{ backgroundColor: "rgba(56, 139, 253, 0.1)", color: "#4493f8" }}>
              main
            </a>
            {" "}from{" "}
            <a href="#" className="px-1.5 py-0.5 text-xs font-mono rounded-md hover:underline"
              style={{ backgroundColor: "rgba(56, 139, 253, 0.1)", color: "#4493f8" }}>
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
              { icon: Icons.file, label: "Files changed", count: totalFiles, active: true },
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
                <span className="px-1.5 py-0.5 text-xs rounded-full"
                  style={{ backgroundColor: "var(--bgColor-neutral-muted)", color: "var(--fgColor-muted)" }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* +/- stats with colored blocks */}
          <div className="flex items-center gap-1 text-sm">
            <span style={{ color: "#3fb950" }}>+{mockPR.additions}</span>
            <span style={{ color: "#f85149" }}>-{mockPR.deletions}</span>
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
      <div className="flex items-center justify-between px-4 py-2 border-b"
        style={{ backgroundColor: "var(--bgColor-muted)", borderColor: "var(--borderColor-muted)" }}>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
            {Icons.sidebar}
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border"
            style={{ backgroundColor: "var(--bgColor-default)", borderColor: "var(--borderColor-default)", color: "var(--fgColor-default)" }}>
            <span className="w-4 h-4 rounded border text-xs flex items-center justify-center" style={{ borderColor: "var(--borderColor-default)" }}></span>
            All commits
            {Icons.triangle}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
            <span className="inline-flex w-4 h-4 rounded-full border-2" style={{ borderColor: "var(--borderColor-default)" }} />
            {" "}0 / {totalFiles} viewed
          </span>
          <button className="p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.copy}</button>
          <button className="flex items-center gap-1 p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
            {Icons.comment}<span className="text-sm">Comments</span><span className="text-sm">0</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md"
            style={{ backgroundColor: "#238636", color: "#ffffff" }}>
            Submit comments{Icons.triangle}
          </button>
          <button className="p-1.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.gear}</button>
        </div>
      </div>

      {/* Main content with file tree sidebar */}
      <div className="flex">
        {/* File tree sidebar */}
        <div className="w-72 border-r shrink-0 p-3" style={{ borderColor: "var(--borderColor-muted)", backgroundColor: "var(--bgColor-default)" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-2 flex-1 px-2 py-1.5 text-sm rounded-md border"
              style={{ backgroundColor: "var(--bgColor-default)", borderColor: "var(--borderColor-default)", color: "var(--fgColor-muted)" }}>
              {Icons.search}
              <input type="text" placeholder="Filter files..." className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--fgColor-default)" }} />
            </div>
            <button className="p-1.5 rounded hover:bg-[var(--bgColor-muted)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.gear}</button>
          </div>

          {/* File tree - grouped by folder */}
          <div className="text-sm space-y-0.5">
            {/* src folder */}
            <div>
              <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                <span style={{ color: "var(--fgColor-default)" }}>src</span>
              </button>

              {/* api folder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>api</span>
                </button>
                <div className="ml-4">
                  {mockPR.files.filter(f => f.path.startsWith("src/api/")).map(file => (
                    <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>{file.path.split("/").pop()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* auth folder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>auth</span>
                </button>
                <div className="ml-4">
                  {mockPR.files.filter(f => f.path.startsWith("src/auth/")).map(file => (
                    <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>{file.path.split("/").pop()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* payments folder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>payments</span>
                </button>
                <div className="ml-4">
                  {mockPR.files.filter(f => f.path.startsWith("src/payments/")).map(file => (
                    <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>{file.path.split("/").pop()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* utils folder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>utils</span>
                </button>
                <div className="ml-4">
                  {mockPR.files.filter(f => f.path.startsWith("src/utils/")).map(file => (
                    <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>{file.path.split("/").pop()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* components folder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>components</span>
                </button>
                <div className="ml-4">
                  {mockPR.files.filter(f => f.path.startsWith("src/components/")).map(file => (
                    <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>{file.path.split("/").pop()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* hooks folder */}
              <div className="ml-4">
                <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                  <span style={{ color: "var(--fgColor-muted)" }}>{Icons.folderOpen}</span>
                  <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                  <span style={{ color: "var(--fgColor-default)" }}>hooks</span>
                </button>
                <div className="ml-4">
                  {mockPR.files.filter(f => f.path.startsWith("src/hooks/")).map(file => (
                    <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                      <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                      <span style={{ color: "var(--fgColor-default)" }}>{file.path.split("/").pop()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Root files */}
            {mockPR.files.filter(f => !f.path.includes("/")).map(file => (
              <button key={file.path} className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                <span style={{ color: "var(--fgColor-muted)" }}>{Icons.file}</span>
                <span style={{ color: "var(--fgColor-default)" }}>{file.path}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Diff content - show first file with mock diff */}
        <div className="flex-1 p-4 space-y-4">
          {/* Show first 3 files with diff view */}
          {mockPR.files.slice(0, 3).map((file) => (
            <div key={file.path} className="rounded-md border overflow-hidden" style={{ borderColor: "var(--borderColor-default)" }}>
              {/* File header */}
              <div className="px-3 py-2 flex items-center justify-between border-b"
                style={{ backgroundColor: "var(--bgColor-muted)", borderColor: "var(--borderColor-default)" }}>
                <div className="flex items-center gap-2 text-sm">
                  <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.chevron}</button>
                  <span style={{ color: "var(--fgColor-default)" }}>{file.path}</span>
                  <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.copy}</button>
                  <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.expand}</button>
                  {/* AI badge */}
                  {file.aiPercent > 0 && (
                    <span className="px-1.5 py-0.5 text-xs rounded"
                      style={{
                        backgroundColor: file.aiPercent >= 50 ? "rgba(169, 48, 0, 0.15)" : "rgba(56, 139, 253, 0.15)",
                        color: file.aiPercent >= 50 ? "#A93000" : "#4493f8"
                      }}>
                      {file.aiPercent}% AI
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span style={{ color: "#3fb950" }}>+{file.additions}</span>
                  <span style={{ color: "#f85149" }}>-{file.deletions}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const addRatio = file.additions / (file.additions + file.deletions);
                      return <div key={i} className="w-2 h-2 rounded-sm" style={{ backgroundColor: i < Math.round(addRatio * 5) ? "#3fb950" : "#f85149" }} />;
                    })}
                  </div>
                  <label className="flex items-center gap-1 text-xs" style={{ color: "var(--fgColor-muted)" }}>
                    <input type="checkbox" className="rounded" />Viewed
                  </label>
                  <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.comment}</button>
                  <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.more}</button>
                </div>
              </div>

              {/* Hunk header */}
              <div className="px-4 py-1 text-xs font-mono"
                style={{ backgroundColor: "rgba(56, 139, 253, 0.1)", color: "var(--fgColor-muted)" }}>
                <button className="mr-2 p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>{Icons.expand}</button>
                @@ -38,{file.deletions} +38,{file.additions} @@
              </div>

              {/* Mock diff lines with ORANGE LEFT BORDER for AI lines */}
              <div className="font-mono text-xs">
                {/* Generate mock diff lines based on file data */}
                {[
                  { type: "context", oldLine: 38, newLine: 38, content: `// ${file.path.split("/").pop()?.replace(".ts", "").replace(".tsx", "")} module` },
                  { type: "context", oldLine: 39, newLine: 39, content: "" },
                  { type: "deletion", oldLine: 40, newLine: null, content: "  // Old implementation" },
                  { type: "addition", oldLine: null, newLine: 40, content: "  // New implementation with better error handling", ai: file.aiPercent > 50, provider: file.provider, model: file.model },
                  { type: "addition", oldLine: null, newLine: 41, content: "  const result = await processData(input);", ai: file.aiPercent > 50, provider: file.provider, model: file.model },
                  { type: "addition", oldLine: null, newLine: 42, content: "  if (!result) {", ai: file.aiPercent > 50, provider: file.provider, model: file.model },
                  { type: "addition", oldLine: null, newLine: 43, content: "    throw new Error('Processing failed');", ai: file.aiPercent > 50, provider: file.provider, model: file.model },
                  { type: "addition", oldLine: null, newLine: 44, content: "  }", ai: file.aiPercent > 50, provider: file.provider, model: file.model },
                  { type: "context", oldLine: 41, newLine: 45, content: "  return result;" },
                  { type: "context", oldLine: 42, newLine: 46, content: "}" },
                ].map((line, i) => (
                  <div key={i} className="flex group"
                    style={{
                      backgroundColor: line.type === "addition" ? "var(--diffBlob-addition-bgColor-line)"
                        : line.type === "deletion" ? "var(--diffBlob-deletion-bgColor-line)" : "transparent",
                    }}>
                    {/* Old line number */}
                    <div className="w-12 px-2 py-0.5 text-right select-none"
                      style={{
                        backgroundColor: line.type === "addition" ? "var(--diffBlob-addition-bgColor-num)"
                          : line.type === "deletion" ? "var(--diffBlob-deletion-bgColor-num)" : "var(--bgColor-muted)",
                        color: "var(--fgColor-muted)",
                      }}>
                      {line.oldLine || ""}
                    </div>
                    {/* New line number with ORANGE BORDER for AI lines */}
                    <div
                      className="w-12 px-2 py-0.5 text-right select-none cursor-help"
                      style={{
                        backgroundColor: line.type === "addition" ? "var(--diffBlob-addition-bgColor-num)"
                          : line.type === "deletion" ? "var(--diffBlob-deletion-bgColor-num)" : "var(--bgColor-muted)",
                        color: "var(--fgColor-muted)",
                        boxShadow: line.ai ? "inset 4px 0 0 0 #A93000" : "none",
                      }}
                      title={line.ai ? `AI Generated (${line.provider} - ${line.model})` : undefined}
                    >
                      {line.newLine || ""}
                    </div>

                    {/* Code content */}
                    <div className="flex-1 px-2 py-0.5">
                      <span style={{
                        color: line.type === "addition" ? "var(--diffBlob-addition-fgColor-text)"
                          : line.type === "deletion" ? "var(--diffBlob-deletion-fgColor-text)"
                          : "var(--fgColor-default)",
                      }}>
                        {line.type === "addition" && "+ "}
                        {line.type === "deletion" && "- "}
                        {line.content}
                      </span>
                    </div>

                    {/* Comment button on hover */}
                    <div className="w-8 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="p-0.5 rounded" style={{ backgroundColor: "#238636", color: "#ffffff" }}>{Icons.plus}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Collapsed file indicators for remaining files */}
          {mockPR.files.slice(3).map((file) => (
            <div key={file.path} className="rounded-md border overflow-hidden" style={{ borderColor: "var(--borderColor-default)" }}>
              <div className="px-3 py-2 flex items-center justify-between"
                style={{ backgroundColor: "var(--bgColor-muted)" }}>
                <div className="flex items-center gap-2 text-sm">
                  <button className="p-0.5 rounded hover:bg-[var(--bgColor-default)]" style={{ color: "var(--fgColor-muted)" }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
                    </svg>
                  </button>
                  <span style={{ color: "var(--fgColor-default)" }}>{file.path}</span>
                  {file.aiPercent > 0 && (
                    <span className="px-1.5 py-0.5 text-xs rounded"
                      style={{
                        backgroundColor: file.aiPercent >= 50 ? "rgba(169, 48, 0, 0.15)" : "rgba(56, 139, 253, 0.15)",
                        color: file.aiPercent >= 50 ? "#A93000" : "#4493f8"
                      }}>
                      {file.aiPercent}% AI
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span style={{ color: "#3fb950" }}>+{file.additions}</span>
                  <span style={{ color: "#f85149" }}>-{file.deletions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GitHubShell>
  );
}
