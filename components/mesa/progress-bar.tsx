import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { mesaColors, type MesaColorName } from "./primitives/colors";

const progressBarVariants = cva("rounded-full overflow-hidden", {
  variants: {
    height: {
      xs: "h-1",
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    height: "md",
  },
});

interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  /** Progress value (0-100) */
  value: number;
  /** Bar color */
  color?: MesaColorName | string;
  /** Show background track */
  showTrack?: boolean;
}

/**
 * Simple progress bar with Mesa styling.
 *
 * @example
 * <ProgressBar value={75} />
 * <ProgressBar value={42} color="success" height="lg" />
 * <ProgressBar value={88} color="var(--fgColor-accent)" />
 */
export function ProgressBar({
  value,
  color = "severe",
  height,
  showTrack = true,
  className,
  style,
  ...props
}: ProgressBarProps) {
  // Resolve color - either from mesaColors or use directly
  const barColor =
    color in mesaColors
      ? mesaColors[color as MesaColorName].fg
      : color;

  return (
    <div
      className={cn(progressBarVariants({ height }), className)}
      style={{
        backgroundColor: showTrack ? mesaColors.neutral.bg : "transparent",
        ...style,
      }}
      {...props}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          backgroundColor: barColor,
        }}
      />
    </div>
  );
}

interface SegmentedBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  /** Segments with values that should sum to 100 */
  segments: Array<{
    value: number;
    color: MesaColorName | string;
  }>;
  /** Show background track */
  showTrack?: boolean;
}

/**
 * Multi-segment progress bar for showing breakdowns.
 *
 * @example
 * <SegmentedBar segments={[
 *   { value: 60, color: "success" },
 *   { value: 40, color: "severe" },
 * ]} />
 */
export function SegmentedBar({
  segments,
  height,
  showTrack = false,
  className,
  style,
  ...props
}: SegmentedBarProps) {
  return (
    <div
      className={cn(progressBarVariants({ height }), "flex", className)}
      style={{
        backgroundColor: showTrack ? mesaColors.neutral.bg : "transparent",
        ...style,
      }}
      {...props}
    >
      {segments.map((segment, i) => {
        const segmentColor =
          segment.color in mesaColors
            ? mesaColors[segment.color as MesaColorName].fg
            : segment.color;

        return (
          <div
            key={i}
            className="h-full"
            style={{
              width: `${segment.value}%`,
              backgroundColor: segmentColor,
            }}
          />
        );
      })}
    </div>
  );
}
