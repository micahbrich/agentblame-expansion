import type { Fingerprint } from "../data";
import { tint } from "@/components/mesa/primitives/colors";

interface QualityProps {
  quality: Fingerprint["quality"];
}

export function Quality({ quality }: QualityProps) {
  const isPositive = quality.vsTeamAvg.startsWith("+");

  return (
    <div className="space-y-4">
      {/* Survivability */}
      <div>
        <h4
          className="text-xs font-medium mb-3"
          style={{ color: "var(--fgColor-muted)" }}
        >
          Survivability
        </h4>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div
              className="text-3xl font-bold"
              style={{ color: "var(--fgColor-success)" }}
            >
              {quality.survivability}%
            </div>
            <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
              AI code survives
            </div>
          </div>
          <div
            className="flex-1 h-3 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${quality.survivability}%`,
                backgroundColor: "var(--fgColor-success)",
              }}
            />
          </div>
          <div
            className="text-sm font-medium px-2 py-1 rounded"
            style={{
              color: isPositive
                ? "var(--fgColor-success)"
                : "var(--fgColor-danger)",
              backgroundColor: isPositive ? tint.success : tint.danger,
            }}
          >
            {quality.vsTeamAvg} vs team
          </div>
        </div>
      </div>

      {/* Review metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            Review Metrics
          </h4>
          <div className="space-y-2">
            <div
              className="flex items-center justify-between text-sm py-2 px-3 rounded"
              style={{ backgroundColor: "var(--bgColor-muted)" }}
            >
              <span>PR approval rate</span>
              <span
                className="font-medium"
                style={{ color: "var(--fgColor-success)" }}
              >
                {quality.prApprovalRate}%
              </span>
            </div>
            <div
              className="flex items-center justify-between text-sm py-2 px-3 rounded"
              style={{ backgroundColor: "var(--bgColor-muted)" }}
            >
              <span>Avg review comments</span>
              <span
                className="font-medium"
                style={{
                  color:
                    quality.avgReviewComments <= 2
                      ? "var(--fgColor-success)"
                      : "var(--fgColor-attention)",
                }}
              >
                {quality.avgReviewComments}
              </span>
            </div>
          </div>
        </div>

        {/* Bug correlation */}
        <div>
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            Bug Correlation
          </h4>
          <div className="space-y-2">
            <div
              className="flex items-center justify-between text-sm py-2 px-3 rounded"
              style={{ backgroundColor: "var(--bgColor-muted)" }}
            >
              <span>Regressions</span>
              <span
                className="font-medium"
                style={{
                  color:
                    quality.regressionCount === 0
                      ? "var(--fgColor-success)"
                      : "var(--fgColor-danger)",
                }}
              >
                {quality.regressionCount}
              </span>
            </div>
            <div
              className="flex items-center justify-between text-sm py-2 px-3 rounded"
              style={{ backgroundColor: "var(--bgColor-muted)" }}
            >
              <span>Hotfixes needed</span>
              <span
                className="font-medium"
                style={{
                  color:
                    quality.hotfixCount === 0
                      ? "var(--fgColor-success)"
                      : "var(--fgColor-danger)",
                }}
              >
                {quality.hotfixCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
