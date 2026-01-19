import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { semantic } from "./primitives/colors";

const aiHumanBarVariants = cva("rounded-full overflow-hidden flex", {
  variants: {
    height: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    height: "md",
  },
});

interface AIHumanBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof aiHumanBarVariants> {
  /** AI percentage (0-100), human is calculated as remainder */
  ai: number;
  /** Override AI bar color */
  aiColor?: string;
  /** Override human bar color */
  humanColor?: string;
  /** Show background track */
  showTrack?: boolean;
}

/**
 * Dual-color progress bar showing AI vs human contribution.
 * Orange = AI, Green = Human.
 *
 * @example
 * <AIHumanBar ai={59} />
 * <AIHumanBar ai={72} height="lg" />
 */
export function AIHumanBar({
  ai,
  height,
  aiColor,
  humanColor,
  showTrack = true,
  className,
  style,
  ...props
}: AIHumanBarProps) {
  const human = 100 - ai;

  return (
    <div
      className={cn(aiHumanBarVariants({ height }), className)}
      style={{
        backgroundColor: showTrack ? semantic.track.bg : "transparent",
        ...style,
      }}
      {...props}
    >
      <div
        className="h-full"
        style={{
          width: `${ai}%`,
          backgroundColor: aiColor || semantic.ai.fg,
        }}
      />
      <div
        className="h-full"
        style={{
          width: `${human}%`,
          backgroundColor: humanColor || semantic.human.fg,
        }}
      />
    </div>
  );
}

/**
 * Legend for the AI/Human bar showing color keys.
 */
export function AIHumanLegend({
  aiLabel = "AI",
  humanLabel = "Human",
  aiValue,
  humanValue,
  className,
}: {
  aiLabel?: string;
  humanLabel?: string;
  aiValue?: number | string;
  humanValue?: number | string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <div className="flex items-center gap-1.5">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: semantic.ai.fg }}
        />
        <span className="text-sm font-medium">
          {aiValue !== undefined ? `${aiValue} ` : ""}
          {aiLabel}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: semantic.human.fg }}
        />
        <span className="text-sm font-medium">
          {humanValue !== undefined ? `${humanValue} ` : ""}
          {humanLabel}
        </span>
      </div>
    </div>
  );
}
