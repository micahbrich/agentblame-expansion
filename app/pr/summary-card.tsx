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
  MesaCard,
  MesaCardHeader,
  SectionTitle,
  AIHumanBar,
  AIHumanLegend,
  AlertCard,
  OriginBadge,
  CodeSnippet,
  mesaColors,
} from "@/components/mesa";

/** Error type label mapping */
const errorTypeLabels: Record<string, string> = {
  "empty-catch": "Empty catch",
  "console-only": "Console-only",
  "broad-catch": "Broad catch",
  "missing-boundary": "No boundary",
};

export function SummaryCard() {
  return (
    <MesaCard margin="mx-4 my-4">
      <MesaCardHeader
        title="AI Contribution Summary"
        badge={{ label: `${stats.percent}% AI-generated`, variant: "severe" }}
      />

      <div className="p-4 space-y-4">
        {/* Stats row */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* AI vs Human breakdown */}
          <div className="flex-1">
            <SectionTitle>Line Attribution</SectionTitle>
            <AIHumanLegend aiValue={stats.ai} humanValue={stats.human} />
            <AIHumanBar ai={stats.percent} className="mt-2" />
          </div>

          {/* Provider breakdown */}
          <div className="flex-1">
            <SectionTitle>By Provider</SectionTitle>
            <div className="space-y-1">
              {stats.providers.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-xs" style={{ color: mesaColors.muted.fg }}>({p.model})</span>
                  </div>
                  <span>{p.lines} lines ({p.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Security files */}
          {securityFiles.length > 0 && (
            <AlertCard icon={Icons.warning} title="Security-sensitive files modified" variant="attention">
              <div className="space-y-1">
                {securityFiles.map((f) => (
                  <div key={f.path} className="flex items-center justify-between text-sm">
                    <CodeSnippet>{f.path}</CodeSnippet>
                    <span className="text-xs font-medium" style={{ color: mesaColors.severe.fg }}>
                      {f.aiPercent}% AI
                    </span>
                  </div>
                ))}
              </div>
            </AlertCard>
          )}

          {/* Duplicates */}
          {duplicates.length > 0 && (
            <AlertCard icon={Icons.copy} title="Potential duplicates detected" variant="muted">
              {duplicates.map((d) => (
                <div key={d.hash} className="space-y-1">
                  <div className="text-xs" style={{ color: mesaColors.muted.fg }}>
                    Pattern #{d.hash} appears in {d.locations.length} locations:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {d.locations.map((loc) => (
                      <CodeSnippet key={loc}>{loc}</CodeSnippet>
                    ))}
                  </div>
                </div>
              ))}
            </AlertCard>
          )}

          {/* Complexity Hotspots */}
          {complexityIssues.length > 0 && (
            <AlertCard
              icon={Icons.flame}
              title="Complex functions"
              subtitle="(10+ branches)"
              variant="attention"
            >
              <div className="space-y-2">
                {complexityIssues.map((issue) => (
                  <div key={`${issue.file}:${issue.fn}`} className="text-sm">
                    <div className="flex items-center justify-between">
                      <code className="text-xs font-medium">{issue.fn}()</code>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs"
                          style={{ color: issue.cc > issue.threshold ? mesaColors.danger.fg : mesaColors.muted.fg }}
                        >
                          {issue.cc} branches
                        </span>
                        <OriginBadge aiGenerated={issue.aiPercent > 50} />
                      </div>
                    </div>
                    <div className="text-xs" style={{ color: mesaColors.muted.fg }}>
                      {issue.file}:{issue.lines}
                    </div>
                  </div>
                ))}
              </div>
            </AlertCard>
          )}

          {/* Over-Engineering Smell */}
          {overEngineering.abstractions > 0 && (
            <AlertCard icon={Icons.gear} title="Potential over-engineering" variant="attention">
              <div className="text-xs mb-2" style={{ color: mesaColors.muted.fg }}>
                {overEngineering.abstractions} new abstractions for {overEngineering.codeLines} lines of code
              </div>
              <div className="space-y-1">
                {overEngineering.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <CodeSnippet>{item.name}</CodeSnippet>
                    <span style={{ color: mesaColors.muted.fg }}>{item.type} · {item.lines} lines</span>
                  </div>
                ))}
              </div>
            </AlertCard>
          )}

          {/* Convention Drift */}
          {conventionDrift.length > 0 && (
            <AlertCard icon={Icons.code} title="Style differs from codebase patterns" variant="muted">
              <div className="space-y-2">
                {conventionDrift.map((issue, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-1 py-0.5 rounded uppercase"
                        style={{ backgroundColor: mesaColors.neutral.bg, color: mesaColors.muted.fg, fontSize: "10px" }}
                      >
                        {issue.type}
                      </span>
                      <code>{issue.found}</code>
                    </div>
                    <div className="mt-0.5 pl-1" style={{ color: mesaColors.muted.fg }}>
                      → existing pattern: {issue.expected}
                    </div>
                  </div>
                ))}
              </div>
            </AlertCard>
          )}

          {/* Error Handling Review */}
          {errorHandling.length > 0 && (
            <AlertCard icon={Icons.warning} title="Error handling needs review" variant="attention">
              <div className="space-y-2">
                {errorHandling.map((issue, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-1 py-0.5 rounded"
                        style={{
                          backgroundColor: issue.type === "empty-catch" ? mesaColors.danger.bg : mesaColors.attention.bg,
                          color: issue.type === "empty-catch" ? mesaColors.danger.fg : mesaColors.attention.fg,
                        }}
                      >
                        {errorTypeLabels[issue.type]}
                      </span>
                      <OriginBadge aiGenerated={issue.aiGenerated} />
                    </div>
                    <div className="mt-1" style={{ color: mesaColors.muted.fg }}>
                      {issue.file}:{issue.line}
                    </div>
                    <CodeSnippet className="mt-1 block">{issue.code}</CodeSnippet>
                  </div>
                ))}
              </div>
            </AlertCard>
          )}
        </div>
      </div>
    </MesaCard>
  );
}
