import { Icons } from "../icons";
import { stats, securityFiles, duplicates } from "./data";

export function SummaryCard() {
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
          <span style={{ color: "var(--fgColor-severe)" }}>{Icons.flame}</span>
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

        <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
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
              {stats.providers.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{p.name}</span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      ({p.model})
                    </span>
                  </div>
                  <span>
                    {p.lines} lines ({p.percent}%)
                  </span>
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
                <span style={{ color: "var(--fgColor-attention)" }}>
                  {Icons.warning}
                </span>
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
                <span style={{ color: "var(--fgColor-muted)" }}>{Icons.copy}</span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--fgColor-muted)" }}
                >
                  Potential duplicates detected
                </span>
              </div>
              {duplicates.map((d) => (
                <div key={d.hash} className="space-y-1">
                  <div
                    className="text-xs"
                    style={{ color: "var(--fgColor-muted)" }}
                  >
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
