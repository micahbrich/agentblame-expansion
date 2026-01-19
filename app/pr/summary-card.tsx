import { Icons } from "../icons";
import {
  stats,
  securityFiles,
  duplicates,
  complexityIssues,
  overEngineering,
  conventionDrift,
  errorHandling,
} from "./data";
import {
  MesaCardHeader,
  AIHumanBar,
  AIHumanLegend,
} from "@/components/mesa";

export function SummaryCard() {
  return (
    <div
      className="mx-4 my-4 rounded-md border overflow-hidden"
      style={{
        backgroundColor: "var(--bgColor-default)",
        borderColor: "var(--borderColor-default)",
      }}
    >
      <MesaCardHeader
        title="AI Contribution Summary"
        badge={{ label: `${stats.percent}% AI-generated`, variant: "severe" }}
      />

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
            <AIHumanLegend aiValue={stats.ai} humanValue={stats.human} />
            <AIHumanBar ai={stats.percent} className="mt-2" />
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

        {/* Alerts grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Security files */}
          {securityFiles.length > 0 && (
            <div
              className="p-3 rounded-md border"
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
              className="p-3 rounded-md border"
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

          {/* Complexity Hotspots */}
          {complexityIssues.length > 0 && (
            <div
              className="p-3 rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-attention-muted)",
                borderColor: "var(--borderColor-attention-muted)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "var(--fgColor-attention)" }}>
                  {Icons.flame}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--fgColor-attention)" }}
                >
                  Complex functions
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--fgColor-muted)" }}
                >
                  (10+ branches)
                </span>
              </div>
              <div className="space-y-2">
                {complexityIssues.map((issue) => (
                  <div key={`${issue.file}:${issue.fn}`} className="text-sm">
                    <div className="flex items-center justify-between">
                      <code
                        className="text-xs font-medium"
                        style={{ color: "var(--fgColor-default)" }}
                      >
                        {issue.fn}()
                      </code>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs"
                          style={{
                            color:
                              issue.cc > issue.threshold
                                ? "var(--fgColor-danger)"
                                : "var(--fgColor-muted)",
                          }}
                        >
                          {issue.cc} branches
                        </span>
                        <span
                          className="text-xs px-1 py-0.5 rounded"
                          style={{
                            backgroundColor:
                              issue.aiPercent > 50
                                ? "var(--bgColor-severe-muted)"
                                : "var(--bgColor-success-muted)",
                            color:
                              issue.aiPercent > 50
                                ? "var(--fgColor-severe)"
                                : "var(--fgColor-success)",
                          }}
                        >
                          {issue.aiPercent > 50 ? "🤖 AI" : "👤 Human"}
                        </span>
                      </div>
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      {issue.file}:{issue.lines}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Over-Engineering Smell */}
          {overEngineering.abstractions > 0 && (
            <div
              className="p-3 rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-attention-muted)",
                borderColor: "var(--borderColor-attention-muted)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "var(--fgColor-attention)" }}>
                  {Icons.gear}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--fgColor-attention)" }}
                >
                  Potential over-engineering
                </span>
              </div>
              <div
                className="text-xs mb-2"
                style={{ color: "var(--fgColor-muted)" }}
              >
                {overEngineering.abstractions} new abstractions for{" "}
                {overEngineering.codeLines} lines of code
              </div>
              <div className="space-y-1">
                {overEngineering.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <code
                      className="px-1 py-0.5 rounded"
                      style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                    >
                      {item.name}
                    </code>
                    <span style={{ color: "var(--fgColor-muted)" }}>
                      {item.type} · {item.lines} lines
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Convention Drift */}
          {conventionDrift.length > 0 && (
            <div
              className="p-3 rounded-md border"
              style={{
                backgroundColor: "var(--bgColor-muted)",
                borderColor: "var(--borderColor-default)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "var(--fgColor-muted)" }}>
                  {Icons.code}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--fgColor-muted)" }}
                >
                  Style differs from codebase patterns
                </span>
              </div>
              <div className="space-y-2">
                {conventionDrift.map((issue, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-1 py-0.5 rounded uppercase"
                        style={{
                          backgroundColor: "var(--bgColor-neutral-muted)",
                          color: "var(--fgColor-muted)",
                          fontSize: "10px",
                        }}
                      >
                        {issue.type}
                      </span>
                      <code style={{ color: "var(--fgColor-default)" }}>
                        {issue.found}
                      </code>
                    </div>
                    <div
                      className="mt-0.5 pl-1"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      → existing pattern: {issue.expected}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Handling Review */}
          {errorHandling.length > 0 && (
            <div
              className="p-3 rounded-md border"
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
                  Error handling needs review
                </span>
              </div>
              <div className="space-y-2">
                {errorHandling.map((issue, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-1 py-0.5 rounded"
                        style={{
                          backgroundColor:
                            issue.type === "empty-catch"
                              ? "var(--bgColor-danger-muted)"
                              : "var(--bgColor-attention-muted)",
                          color:
                            issue.type === "empty-catch"
                              ? "var(--fgColor-danger)"
                              : "var(--fgColor-attention)",
                        }}
                      >
                        {issue.type === "empty-catch" && "Empty catch"}
                        {issue.type === "console-only" && "Console-only"}
                        {issue.type === "broad-catch" && "Broad catch"}
                        {issue.type === "missing-boundary" && "No boundary"}
                      </span>
                      <span
                        className="px-1 py-0.5 rounded"
                        style={{
                          backgroundColor: issue.aiGenerated
                            ? "var(--bgColor-severe-muted)"
                            : "var(--bgColor-success-muted)",
                          color: issue.aiGenerated
                            ? "var(--fgColor-severe)"
                            : "var(--fgColor-success)",
                        }}
                      >
                        {issue.aiGenerated ? "🤖 AI" : "👤 Human"}
                      </span>
                    </div>
                    <div
                      className="mt-1"
                      style={{ color: "var(--fgColor-muted)" }}
                    >
                      {issue.file}:{issue.line}
                    </div>
                    <code
                      className="mt-1 block px-1 py-0.5 rounded"
                      style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                    >
                      {issue.code}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
