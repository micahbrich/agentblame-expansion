import { cn } from "@/lib/utils";
import { mesaColors } from "./primitives/colors";

interface MesaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove border (for embedded/nested cards) */
  borderless?: boolean;
  /** Padding variant */
  padding?: "none" | "sm" | "md" | "lg";
  /** Additional margin */
  margin?: string;
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

/**
 * Base card container with Mesa styling.
 * Provides consistent border, background, and overflow handling.
 *
 * @example
 * <MesaCard>
 *   <MesaCardHeader title="Summary" />
 *   <div className="p-4">Content</div>
 * </MesaCard>
 *
 * <MesaCard borderless padding="md">
 *   Embedded content
 * </MesaCard>
 */
export function MesaCard({
  borderless = false,
  padding = "none",
  margin,
  className,
  style,
  children,
  ...props
}: MesaCardProps) {
  return (
    <div
      className={cn(
        "rounded-md overflow-hidden",
        !borderless && "border",
        paddingClasses[padding],
        margin,
        className
      )}
      style={{
        backgroundColor: mesaColors.default.bg,
        borderColor: borderless ? undefined : mesaColors.default.border,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Section title with consistent Mesa styling.
 * Used for labeling sections within cards.
 *
 * @example
 * <SectionTitle>By File Type</SectionTitle>
 * <SectionTitle as="h3" size="md">Overview</SectionTitle>
 */
export function SectionTitle({
  children,
  as: Component = "h4",
  size = "sm",
  className,
}: {
  children: React.ReactNode;
  as?: "h3" | "h4" | "h5" | "span";
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const sizeClasses = {
    xs: "text-[10px] font-semibold uppercase tracking-wide",
    sm: "text-xs font-medium",
    md: "text-sm font-semibold",
  };

  return (
    <Component
      className={cn(sizeClasses[size], "mb-2", className)}
      style={{ color: mesaColors.muted.fg }}
    >
      {children}
    </Component>
  );
}

/**
 * Muted text panel for insights/tips.
 *
 * @example
 * <InsightPanel icon="💡">
 *   AI code written in morning survives longer
 * </InsightPanel>
 */
export function InsightPanel({
  children,
  icon = "💡",
  variant = "accent",
  className,
}: {
  children: React.ReactNode;
  icon?: string;
  variant?: "accent" | "muted";
  className?: string;
}) {
  const colors = variant === "accent" ? mesaColors.accent : mesaColors.muted;

  return (
    <div
      className={cn("p-3 rounded-md text-xs flex items-start gap-2", className)}
      style={{
        backgroundColor: colors.bg,
        color: colors.fg,
      }}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
