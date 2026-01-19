/**
 * Primer CSS variable mappings for Mesa design system.
 * These map semantic color names to GitHub's Primer design system variables.
 */

export const mesaColors = {
  severe: {
    fg: "var(--fgColor-severe)",
    bg: "var(--bgColor-severe-muted)",
    border: "var(--borderColor-severe-muted)",
  },
  success: {
    fg: "var(--fgColor-success)",
    bg: "var(--bgColor-success-muted)",
    border: "var(--borderColor-success-muted)",
  },
  attention: {
    fg: "var(--fgColor-attention)",
    bg: "var(--bgColor-attention-muted)",
    border: "var(--borderColor-attention-muted)",
  },
  danger: {
    fg: "var(--fgColor-danger)",
    bg: "var(--bgColor-danger-muted)",
    border: "var(--borderColor-danger-muted)",
  },
  accent: {
    fg: "var(--fgColor-accent)",
    bg: "var(--bgColor-accent-muted)",
    border: "var(--borderColor-accent-muted)",
  },
  muted: {
    fg: "var(--fgColor-muted)",
    bg: "var(--bgColor-muted)",
    border: "var(--borderColor-muted)",
  },
  default: {
    fg: "var(--fgColor-default)",
    bg: "var(--bgColor-default)",
    border: "var(--borderColor-default)",
  },
  done: {
    fg: "var(--fgColor-done)",
    bg: "var(--bgColor-done-muted)",
    border: "var(--borderColor-done-muted)",
  },
  neutral: {
    fg: "var(--fgColor-neutral)",
    bg: "var(--bgColor-neutral-muted)",
    border: "var(--borderColor-neutral-muted)",
  },
} as const;

export type MesaColorName = keyof typeof mesaColors;

/**
 * Severity colors used for AI percentage indicators.
 * Higher AI percentage = more severe (orange), lower = success (green).
 */
export const severityColors = {
  severe: mesaColors.severe,
  success: mesaColors.success,
  attention: mesaColors.attention,
  danger: mesaColors.danger,
} as const;

export type SeverityColorName = keyof typeof severityColors;

/**
 * Get severity color based on AI percentage.
 * @param percent - AI percentage (0-100)
 * @returns Severity color name
 */
export function getSeverityFromPercent(percent: number): SeverityColorName {
  if (percent >= 70) return "severe";
  if (percent >= 50) return "attention";
  if (percent >= 30) return "attention";
  return "success";
}

/**
 * Semantic color aliases for Mesa concepts.
 * Use these when the meaning is about AI vs human, not severity.
 */
export const semantic = {
  ai: mesaColors.severe, // Orange - AI-generated content
  human: mesaColors.success, // Green - Human-written content
  warning: mesaColors.attention,
  error: mesaColors.danger,
  ui: mesaColors.muted,
  track: mesaColors.neutral, // Progress bar backgrounds
} as const;

/**
 * Heatmap palette for activity intensity.
 * Uses Primer severe (AI) and success (human) colors.
 */
export const heatmap = {
  ai: {
    base: "#bc4c00", // Primer severe - burnt orange
    low: "rgba(188, 76, 0, 0.25)",
    mid: "rgba(188, 76, 0, 0.5)",
    high: "rgba(188, 76, 0, 0.75)",
  },
  human: {
    base: "#1a7f37", // Primer success - forest green
    low: "rgba(26, 127, 55, 0.25)",
    mid: "rgba(26, 127, 55, 0.5)",
    high: "rgba(26, 127, 55, 0.75)",
  },
} as const;

/**
 * Transparent background variants for badges/chips.
 * Uses same base colors as heatmap/diff for consistency.
 */
export const tint = {
  success: "rgba(26, 127, 55, 0.1)", // Primer success green
  danger: "rgba(207, 34, 46, 0.1)", // Primer danger red
  ai: "rgba(188, 76, 0, 0.1)", // Primer severe orange
  aiStrong: "rgba(188, 76, 0, 0.2)",
  accent: "rgba(56, 139, 253, 0.15)",
} as const;

/**
 * Diff colors - consistent with Primer semantic colors.
 */
export const diff = {
  addition: "#1a7f37", // Primer success - forest green (matches human)
  deletion: "#cf222e", // Primer danger - red
  ai: "#bc4c00", // Primer severe - burnt orange (matches AI)
  aiBg: "rgba(188, 76, 0, 0.15)",
  accent: "#4493f8", // Blue accent
} as const;
