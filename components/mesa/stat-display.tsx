import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { mesaColors, type MesaColorName } from "./primitives/colors";

const statValueVariants = cva("font-bold", {
  variants: {
    size: {
      sm: "text-lg",
      md: "text-2xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const statLabelVariants = cva("", {
  variants: {
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface StatDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statValueVariants> {
  /** The main value to display */
  value: string | number;
  /** Label describing the value */
  label: string;
  /** Color for the value */
  color?: MesaColorName;
  /** Optional trend indicator */
  trend?: {
    value: string;
    positive?: boolean;
  };
  /** Center the content */
  centered?: boolean;
}

/**
 * Big number with label for hero metrics.
 *
 * @example
 * <StatDisplay value="34%" label="AI-assisted" color="severe" size="lg" />
 * <StatDisplay value="1,234" label="Lines" trend={{ value: "+12%", positive: true }} />
 */
export function StatDisplay({
  value,
  label,
  color = "default",
  size,
  trend,
  centered = false,
  className,
  ...props
}: StatDisplayProps) {
  const colorValue = mesaColors[color]?.fg || mesaColors.default.fg;

  return (
    <div
      className={cn(centered && "text-center", className)}
      {...props}
    >
      <div
        className={cn(statValueVariants({ size }))}
        style={{ color: colorValue }}
      >
        {value}
      </div>
      <div
        className={cn(statLabelVariants({ size }), "flex items-center gap-1")}
        style={{ color: mesaColors.muted.fg }}
      >
        {label}
        {trend && (
          <span
            style={{
              color: trend.positive
                ? mesaColors.success.fg
                : mesaColors.danger.fg,
            }}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Grid of stat displays for dashboard-style layouts.
 */
export function StatGrid({
  children,
  columns = 3,
  className,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-4 border-b p-4",
        gridCols[columns],
        className
      )}
      style={{ borderColor: mesaColors.default.border }}
    >
      {children}
    </div>
  );
}
