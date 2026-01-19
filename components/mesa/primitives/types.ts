import type { SeverityColorName, MesaColorName } from "./colors";

/**
 * Common size variants used across Mesa components.
 */
export type Size = "sm" | "md" | "lg";

/**
 * Badge configuration for card headers.
 */
export interface BadgeConfig {
  label: string;
  variant?: SeverityColorName;
}

/**
 * Breakdown item for lists showing category percentages.
 */
export interface BreakdownItem {
  label: string;
  value: number;
  color?: MesaColorName;
}

/**
 * Lines attribution data for AI/Human breakdown.
 */
export interface LinesAttribution {
  ai: number;
  human: number;
  percent: number;
}
