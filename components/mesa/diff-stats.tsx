import { diff } from "./primitives/colors";

interface DiffStatsProps {
  additions: number;
  deletions: number;
  /** Number of blocks to show (default 5) */
  blocks?: number;
  /** Show the +/- numbers */
  showNumbers?: boolean;
  className?: string;
}

/**
 * Diff statistics with +/- counts and colored block visualization.
 * Shows the ratio of additions to deletions visually.
 *
 * @example
 * <DiffStats additions={234} deletions={56} />
 * <DiffStats additions={100} deletions={50} showNumbers={false} />
 */
export function DiffStats({
  additions,
  deletions,
  blocks = 5,
  showNumbers = true,
  className,
}: DiffStatsProps) {
  const total = additions + deletions;
  const ratio = total > 0 ? additions / total : 0.5;
  const additionBlocks = Math.round(ratio * blocks);

  return (
    <div className={`flex items-center gap-1 text-sm ${className || ""}`}>
      {showNumbers && (
        <>
          <span style={{ color: diff.addition }}>+{additions}</span>
          <span style={{ color: diff.deletion }}>-{deletions}</span>
        </>
      )}
      <div className={`flex gap-0.5 ${showNumbers ? "ml-1" : ""}`}>
        {Array.from({ length: blocks }, (_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-sm"
            style={{
              backgroundColor: i < additionBlocks ? diff.addition : diff.deletion,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * AI percentage badge with severity-based coloring.
 * Orange for high AI %, blue for low AI %.
 *
 * @example
 * <AIPercentBadge percent={72} />
 * <AIPercentBadge percent={15} showLabel />
 */
export function AIPercentBadge({
  percent,
  showLabel = false,
  className,
}: {
  percent: number;
  showLabel?: boolean;
  className?: string;
}) {
  const isHighAI = percent >= 50;

  return (
    <span
      className={`px-1.5 py-0.5 text-xs rounded ${className || ""}`}
      style={{
        backgroundColor: isHighAI ? diff.aiBg : "rgba(56, 139, 253, 0.15)",
        color: isHighAI ? diff.ai : diff.accent,
      }}
    >
      {percent}%{showLabel && " AI"}
    </span>
  );
}
