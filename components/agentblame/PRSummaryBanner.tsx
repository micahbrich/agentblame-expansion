"use client";

import { mockPR } from "@/lib/mock-data";

export function PRSummaryBanner() {
  const { stats, providers, securityFiles, duplicates } = mockPR;

  return (
    <div
      className="mx-4 my-4 rounded-md border overflow-hidden"
      style={{
        backgroundColor: "var(--bgColor-default)",
        borderColor: "var(--borderColor-default)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{
          backgroundColor: "var(--bgColor-muted)",
          borderColor: "var(--borderColor-default)",
        }}
      >
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={{ fill: "var(--fgColor-severe)" }}
          >
            <path d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 0 1-1.436-.874A3.198 3.198 0 0 0 3 10c0 2.53 2.164 4.5 4.998 4.5ZM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.796.167-2.31-.188-.872-.604-2.53.074-2.683 1.114A4.702 4.702 0 0 0 1 9.5c0 3.25 2.797 6 6.998 6 4.19 0 7-2.79 7-6C15 6.816 12.61 3.969 9.533.753Z" />
          </svg>
          <span className="font-semibold text-sm">AI Contribution Summary</span>
          <span
            className="px-2 py-0.5 text-xs rounded-full font-medium"
            style={{
              backgroundColor: "var(--bgColor-severe-muted)",
              color: "var(--fgColor-severe)",
            }}
          >
            {stats.percent}% AI-generated
          </span>
        </div>

        <div
          className="text-xs"
          style={{ color: "var(--fgColor-muted)" }}
        >
          Powered by agentblame
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Stats row */}
        <div className="flex gap-6">
          {/* AI vs Human breakdown */}
          <div className="flex-1">
            <div
              className="text-xs font-medium mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Line Attribution
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: "var(--fgColor-severe)" }}
                />
                <span className="text-sm font-medium">{stats.ai} AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: "var(--fgColor-success)" }}
                />
                <span className="text-sm font-medium">{stats.human} Human</span>
              </div>
            </div>
            {/* Progress bar */}
            <div
              className="h-2 rounded-full overflow-hidden mt-2 flex"
              style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
            >
              <div
                className="h-full"
                style={{
                  width: `${stats.percent}%`,
                  backgroundColor: "var(--fgColor-severe)",
                }}
              />
              <div
                className="h-full"
                style={{
                  width: `${100 - stats.percent}%`,
                  backgroundColor: "var(--fgColor-success)",
                }}
              />
            </div>
          </div>

          {/* Provider breakdown */}
          <div className="flex-1">
            <div
              className="text-xs font-medium mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              By Provider
            </div>
            <div className="space-y-1">
              {providers.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{p.name}</span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      ({p.model})
                    </span>
                  </div>
                  <span>{p.lines} lines ({p.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts section */}
        <div className="flex gap-4">
          {/* Security files */}
          {securityFiles.length > 0 && (
            <div
              className="flex-1 p-3 rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-attention-muted)",
                borderColor: "var(--borderColor-attention-muted)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style={{ fill: "var(--fgColor-attention)" }}
                >
                  <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
                </svg>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--fgColor-attention)" }}
                >
                  Security-sensitive files modified
                </span>
              </div>
              <div className="space-y-1">
                {securityFiles.map((f) => (
                  <div
                    key={f.path}
                    className="flex items-center justify-between text-sm"
                  >
                    <code
                      className="text-xs px-1 py-0.5 rounded"
                      style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                    >
                      {f.path}
                    </code>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--fgColor-severe)" }}
                    >
                      {f.aiPercent}% AI
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Duplicates */}
          {duplicates.length > 0 && (
            <div
              className="flex-1 p-3 rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-muted)",
                borderColor: "var(--borderColor-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style={{ fill: "var(--fgColor-muted)" }}
                >
                  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25ZM5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
                </svg>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--fgColor-muted)" }}
                >
                  Potential duplicates detected
                </span>
              </div>
              {duplicates.map((d) => (
                <div key={d.hash} className="space-y-1">
                  <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
                    Pattern #{d.hash} appears in {d.locations.length} locations:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {d.locations.map((loc) => (
                      <code
                        key={loc}
                        className="text-xs px-1 py-0.5 rounded"
                        style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                      >
                        {loc}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
