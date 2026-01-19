import Image from "next/image";
import { MesaBadge } from "./badge";
import { mesaColors, type SeverityColorName } from "./primitives/colors";

interface BadgeConfig {
  label: string;
  variant?: SeverityColorName;
}

interface MesaCardHeaderProps {
  title: string;
  badge?: BadgeConfig;
  className?: string;
}

/**
 * Mesa brand icon (cactus) with slight rounding.
 */
export function MesaIcon({ size = 16 }: { size?: number }) {
  return (
    <Image
      src="/icon128.png"
      alt="Mesa"
      width={size}
      height={size}
      className="inline-block rounded-xs"
    />
  );
}

/**
 * "Powered by mesa.dev" attribution link.
 */
export function PoweredBy() {
  return (
    <span
      className="text-xs inline-flex items-center gap-1"
      style={{ color: mesaColors.muted.fg }}
    >
      Powered by
      <a
        href="https://mesa.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        style={{ color: "inherit" }}
      >
        mesa.dev
      </a>
    </span>
  );
}

/**
 * Branded header with Mesa cactus icon + title + badge + attribution.
 *
 * @example
 * <MesaCardHeader
 *   title="AI Contribution Summary"
 *   badge={{ label: "72% AI-generated", variant: "severe" }}
 * />
 */
export function MesaCardHeader({
  title,
  badge,
  className,
}: MesaCardHeaderProps) {
  return (
    <div
      className={`px-4 py-3 flex items-center justify-between border-b ${className || ""}`}
      style={{
        backgroundColor: mesaColors.muted.bg,
        borderColor: mesaColors.default.border,
      }}
    >
      <div className="flex items-center gap-2">
        <MesaIcon size={16} />
        <span className="font-semibold text-sm">{title}</span>
        {badge && (
          <MesaBadge variant={badge.variant || "severe"}>
            {badge.label}
          </MesaBadge>
        )}
      </div>
      <PoweredBy />
    </div>
  );
}
