import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { mesaColors, type SeverityColorName } from "./primitives/colors";

const mesaBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      size: {
        sm: "text-[10px] px-1.5 py-0",
        md: "text-xs px-2 py-0.5",
        lg: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface MesaBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof mesaBadgeVariants> {
  variant?: SeverityColorName;
}

/**
 * Severity-aware badge using Primer colors.
 *
 * @example
 * <MesaBadge variant="severe">58% AI</MesaBadge>
 * <MesaBadge variant="success">Active</MesaBadge>
 * <MesaBadge variant="attention" size="lg">Warning</MesaBadge>
 */
export function MesaBadge({
  variant = "severe",
  size,
  className,
  children,
  style,
  ...props
}: MesaBadgeProps) {
  const colors = mesaColors[variant];

  return (
    <span
      className={cn(mesaBadgeVariants({ size }), className)}
      style={{
        backgroundColor: colors.bg,
        color: colors.fg,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
