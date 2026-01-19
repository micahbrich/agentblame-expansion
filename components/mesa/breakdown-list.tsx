import { cn } from "@/lib/utils";
import { mesaColors, type MesaColorName } from "./primitives/colors";

interface BreakdownItem {
  label: string;
  value: number;
  /** Optional sub-label (e.g., model name) */
  subLabel?: string;
  /** Bar color, defaults to severe (orange) */
  color?: MesaColorName;
}

interface BreakdownListProps {
  /** Section title */
  title?: string;
  /** Items to display */
  items: BreakdownItem[];
  /** Default bar color for all items */
  defaultColor?: MesaColorName;
  /** Show value on right side */
  showValue?: boolean;
  /** Format for the value display */
  valueFormat?: "percent" | "number" | "custom";
  /** Custom value formatter */
  formatValue?: (value: number, item: BreakdownItem) => string;
  /** Bar height variant */
  barHeight?: "sm" | "md";
  className?: string;
}

/**
 * Category breakdowns with progress bars.
 *
 * @example
 * <BreakdownList
 *   title="By File Type"
 *   items={[
 *     { label: "Tests", value: 68 },
 *     { label: "Utils", value: 42 },
 *   ]}
 * />
 */
export function BreakdownList({
  title,
  items,
  defaultColor = "severe",
  showValue = true,
  valueFormat = "percent",
  formatValue,
  barHeight = "sm",
  className,
}: BreakdownListProps) {
  const barHeightClass = barHeight === "sm" ? "h-1.5" : "h-2";

  const getDisplayValue = (value: number, item: BreakdownItem) => {
    if (formatValue) return formatValue(value, item);
    if (valueFormat === "percent") return `${value}%`;
    if (valueFormat === "number") return value.toLocaleString();
    return String(value);
  };

  return (
    <div className={className}>
      {title && (
        <h4
          className="text-xs font-medium mb-2"
          style={{ color: mesaColors.muted.fg }}
        >
          {title}
        </h4>
      )}
      <div className="space-y-1.5">
        {items.map((item) => {
          const color = item.color || defaultColor;
          const colorValue = mesaColors[color]?.fg || mesaColors.severe.fg;

          return (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex-1 rounded-full overflow-hidden",
                  barHeightClass
                )}
                style={{ backgroundColor: mesaColors.neutral.bg }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: colorValue,
                  }}
                />
              </div>
              <span className="text-xs w-24 text-right truncate">
                {item.label}
                {item.subLabel && (
                  <span style={{ color: mesaColors.muted.fg }}>
                    {" "}
                    ({item.subLabel})
                  </span>
                )}
                {showValue && (
                  <span style={{ color: mesaColors.muted.fg }}>
                    {" "}
                    {getDisplayValue(item.value, item)}
                  </span>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Detailed breakdown with label on left, value and bar below.
 * Used for provider/tool breakdowns with more detail.
 */
export function DetailedBreakdownList({
  title,
  items,
  defaultColor = "severe",
  className,
}: {
  title?: string;
  items: Array<{
    name: string;
    detail?: string;
    lines?: number;
    percent: number;
  }>;
  defaultColor?: MesaColorName;
  className?: string;
}) {
  return (
    <div className={className}>
      {title && (
        <h4
          className="text-xs font-medium mb-2"
          style={{ color: mesaColors.muted.fg }}
        >
          {title}
        </h4>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.name} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.name}</span>
                {item.detail && (
                  <span
                    className="text-xs"
                    style={{ color: mesaColors.muted.fg }}
                  >
                    ({item.detail})
                  </span>
                )}
              </div>
              <span style={{ color: mesaColors.muted.fg }}>
                {item.lines !== undefined && `${item.lines} lines `}({item.percent}%)
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: mesaColors.neutral.bg }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.percent}%`,
                  backgroundColor: mesaColors[defaultColor].fg,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
