import { cn } from "@/lib/utils";
import { mesaColors } from "./primitives/colors";

type AlertVariant = "attention" | "muted" | "danger" | "success";

interface AlertCardProps {
  /** Alert icon (React node or emoji) */
  icon: React.ReactNode;
  /** Alert title */
  title: string;
  /** Optional subtitle next to title */
  subtitle?: string;
  /** Visual variant */
  variant?: AlertVariant;
  /** Card content */
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; fg: string }> = {
  attention: {
    bg: "var(--bgColor-attention-muted)",
    border: "var(--borderColor-attention-muted)",
    fg: "var(--fgColor-attention)",
  },
  muted: {
    bg: "var(--bgColor-muted)",
    border: "var(--borderColor-default)",
    fg: "var(--fgColor-muted)",
  },
  danger: {
    bg: "var(--bgColor-danger-muted)",
    border: "var(--borderColor-danger-muted)",
    fg: "var(--fgColor-danger)",
  },
  success: {
    bg: "var(--bgColor-success-muted)",
    border: "var(--borderColor-success-muted)",
    fg: "var(--fgColor-success)",
  },
};

/**
 * Alert card for warnings, notices, and status information.
 * Consistent styling for all alert-style content blocks.
 *
 * @example
 * <AlertCard
 *   icon={Icons.warning}
 *   title="Security-sensitive files modified"
 *   variant="attention"
 * >
 *   <FileList files={securityFiles} />
 * </AlertCard>
 */
export function AlertCard({
  icon,
  title,
  subtitle,
  variant = "attention",
  children,
  className,
}: AlertCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn("p-3 rounded-md border", className)}
      style={{
        backgroundColor: styles.bg,
        borderColor: styles.border,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: styles.fg }}>{icon}</span>
        <span
          className="text-sm font-medium"
          style={{ color: styles.fg }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className="text-xs"
            style={{ color: mesaColors.muted.fg }}
          >
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Badge showing AI vs Human origin with appropriate coloring.
 *
 * @example
 * <OriginBadge aiGenerated={true} />
 * <OriginBadge aiGenerated={false} />
 */
export function OriginBadge({ aiGenerated }: { aiGenerated: boolean }) {
  return (
    <span
      className="text-xs px-1 py-0.5 rounded"
      style={{
        backgroundColor: aiGenerated
          ? mesaColors.severe.bg
          : mesaColors.success.bg,
        color: aiGenerated
          ? mesaColors.severe.fg
          : mesaColors.success.fg,
      }}
    >
      {aiGenerated ? "🤖 AI" : "👤 Human"}
    </span>
  );
}

/**
 * Inline code snippet with neutral background.
 *
 * @example
 * <CodeSnippet>src/auth.ts</CodeSnippet>
 */
export function CodeSnippet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn("text-xs px-1 py-0.5 rounded", className)}
      style={{ backgroundColor: mesaColors.neutral.bg }}
    >
      {children}
    </code>
  );
}
