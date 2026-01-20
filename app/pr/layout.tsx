import { Icons } from "../icons";
import { files, pr, stats, getFileStats, getFileTree } from "./data";
import { DiffLine } from "./diff-line";
import { DiffStats, AIPercentBadge } from "@/components/mesa";

export default function PRLayout({ children }: { children: React.ReactNode }) {
  const fileTree = getFileTree();
  const totalFiles = files.length;

  return (
    <>
      {/* PR Header Section */}
      <div
        className="px-6 py-4"
        style={{ backgroundColor: "var(--bgColor-default)" }}
      >
        {/* Top row: Title + right side buttons */}
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-2xl font-normal pr-4">
            <span style={{ color: "var(--fgColor-default)" }}>{pr.title}</span>{" "}
            <span style={{ color: "var(--fgColor-muted)" }}>#{pr.number}</span>
          </h1>

          {/* Right side buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-sm px-2 py-1 rounded-md"
              style={{
                backgroundColor: "var(--bgColor-muted)",
                color: "var(--fgColor-muted)",
              }}
            >
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
                color: "var(--fgColor-default)",
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
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 text-sm font-medium rounded-full"
            style={{ backgroundColor: "#8957e5", color: "#ffffff" }}
          >
            {Icons.merge}
            Merged
          </span>

          <span className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
            <a
              href="#"
              className="font-semibold hover:underline"
              style={{ color: "var(--fgColor-default)" }}
            >
              {pr.author}
            </a>{" "}
            merged 1 commit into{" "}
            <a
              href="#"
              className="px-1.5 py-0.5 text-xs font-mono rounded-md hover:underline"
              style={{
                backgroundColor: "rgba(56, 139, 253, 0.1)",
                color: "#4493f8",
              }}
            >
              {pr.baseBranch}
            </a>{" "}
            from{" "}
            <a
              href="#"
              className="px-1.5 py-0.5 text-xs font-mono rounded-md hover:underline"
              style={{
                backgroundColor: "rgba(56, 139, 253, 0.1)",
                color: "#4493f8",
              }}
            >
              {pr.branch}
            </a>
            <button
              className="ml-1 p-0.5 rounded hover:bg-[var(--bgColor-muted)]"
              style={{ color: "var(--fgColor-muted)" }}
            >
              {Icons.copy}
            </button>{" "}
            3 days ago
          </span>
        </div>
      </div>

      {/* PR Tabs */}
      <div
        className="px-6 border-b"
        style={{ borderColor: "var(--borderColor-muted)" }}
      >
        <nav className="flex items-center justify-between">
          <div className="flex gap-1">
            {[
              { icon: Icons.comment, label: "Conversation", count: 0 },
              { icon: Icons.commit, label: "Commits", count: 1 },
              { icon: Icons.check, label: "Checks", count: 1 },
              {
                icon: Icons.file,
                label: "Files changed",
                count: totalFiles,
                active: true,
              },
            ].map((tab) => (
              <button
                key={tab.label}
                className="flex items-center gap-2 px-4 py-3 text-sm border-b-2"
                style={{
                  color: tab.active
                    ? "var(--fgColor-default)"
                    : "var(--fgColor-muted)",
                  borderColor: tab.active
                    ? "var(--underlineNav-borderColor-active)"
                    : "transparent",
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

          <DiffStats additions={stats.additions} deletions={stats.deletions} />
        </nav>
      </div>

      {/* Agentblame Summary Banner slot */}
      {children}

      {/* Diff Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          backgroundColor: "var(--bgColor-muted)",
          borderColor: "var(--borderColor-muted)",
        }}
      >
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded hover:bg-[var(--bgColor-default)]"
            style={{ color: "var(--fgColor-muted)" }}
          >
            {Icons.sidebar}
          </button>
          <button
            className="flex items-center gap-1 px-2 py-1 text-sm rounded-md border"
            style={{
              backgroundColor: "var(--bgColor-default)",
              borderColor: "var(--borderColor-default)",
              color: "var(--fgColor-default)",
            }}
          >
            <span
              className="w-4 h-4 rounded border text-xs flex items-center justify-center"
              style={{ borderColor: "var(--borderColor-default)" }}
            />
            All commits
            {Icons.triangle}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
            <span
              className="inline-flex w-4 h-4 rounded-full border-2"
              style={{ borderColor: "var(--borderColor-default)" }}
            />{" "}
            0 / {totalFiles} viewed
          </span>
          <button
            className="p-1.5 rounded hover:bg-[var(--bgColor-default)]"
            style={{ color: "var(--fgColor-muted)" }}
          >
            {Icons.copy}
          </button>
          <button
            className="flex items-center gap-1 p-1.5 rounded hover:bg-[var(--bgColor-default)]"
            style={{ color: "var(--fgColor-muted)" }}
          >
            {Icons.comment}
            <span className="text-sm">Comments</span>
            <span className="text-sm">0</span>
          </button>
          <button
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md"
            style={{ backgroundColor: "#238636", color: "#ffffff" }}
          >
            Submit comments{Icons.triangle}
          </button>
          <button
            className="p-1.5 rounded hover:bg-[var(--bgColor-default)]"
            style={{ color: "var(--fgColor-muted)" }}
          >
            {Icons.gear}
          </button>
        </div>
      </div>

      {/* Main content with file tree sidebar */}
      <div className="flex">
        {/* File tree sidebar */}
        <div
          className="w-72 border-r shrink-0 p-3"
          style={{
            borderColor: "var(--borderColor-muted)",
            backgroundColor: "var(--bgColor-default)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center gap-2 flex-1 px-2 py-1.5 text-sm rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-default)",
                borderColor: "var(--borderColor-default)",
                color: "var(--fgColor-muted)",
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
            <button
              className="p-1.5 rounded hover:bg-[var(--bgColor-muted)]"
              style={{ color: "var(--fgColor-muted)" }}
            >
              {Icons.gear}
            </button>
          </div>

          {/* File tree */}
          <div className="text-sm space-y-0.5">
            {Object.entries(fileTree).map(([dir, dirFiles]) => (
              <div key={dir || "root"}>
                {dir && (
                  <button className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1">
                    <span style={{ color: "var(--fgColor-muted)" }}>
                      {Icons.folderOpen}
                    </span>
                    <span style={{ color: "#848d97" }}>{Icons.folder}</span>
                    <span style={{ color: "var(--fgColor-default)" }}>{dir}</span>
                  </button>
                )}
                <div className={dir ? "ml-4" : ""}>
                  {dirFiles.map((file) => {
                    const fileStats = getFileStats(file);
                    return (
                      <button
                        key={file.path}
                        className="flex items-center gap-1 w-full text-left py-1 hover:bg-[var(--bgColor-muted)] rounded px-1"
                      >
                        <span style={{ color: "var(--fgColor-muted)" }}>
                          {Icons.file}
                        </span>
                        <span style={{ color: "var(--fgColor-default)" }}>
                          {file.path.split("/").pop()}
                        </span>
                        {fileStats.aiPercent > 0 && (
                          <AIPercentBadge percent={fileStats.aiPercent} className="ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diff content */}
        <div className="flex-1 p-4 space-y-4">
          {files.map((file) => {
            const fileStats = getFileStats(file);
            return (
              <div
                key={file.path}
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
                    <button
                      className="p-0.5 rounded hover:bg-[var(--bgColor-default)]"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      {Icons.chevron}
                    </button>
                    <span style={{ color: "var(--fgColor-default)" }}>
                      {file.path}
                    </span>
                    <button
                      className="p-0.5 rounded hover:bg-[var(--bgColor-default)]"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      {Icons.copy}
                    </button>
                    {fileStats.aiPercent > 0 && (
                      <AIPercentBadge percent={fileStats.aiPercent} showLabel />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <DiffStats additions={fileStats.additions} deletions={fileStats.deletions} />
                    <label
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      <input type="checkbox" className="rounded" />
                      Viewed
                    </label>
                  </div>
                </div>

                {/* Diff lines */}
                <div className="font-mono text-xs">
                  {file.lines.map((line, i) => (
                    <DiffLine key={i} line={line} path={file.path} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
