"use client";

import { heatmap } from "./primitives/colors";

interface PingIndicatorProps {
  size?: "sm" | "md";
  className?: string;
}

/**
 * Animated ping indicator to highlight interactive demo elements.
 * Uses mesa orange color (AI/severe) to draw attention.
 */
export function PingIndicator({ size = "sm", className = "" }: PingIndicatorProps) {
  const dimensions = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
  const pingDimensions = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";

  return (
    <span className={`relative flex ${dimensions} ${className}`}>
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`}
        style={{ backgroundColor: heatmap.ai.base }}
      />
      <span
        className={`relative inline-flex rounded-full ${pingDimensions}`}
        style={{ backgroundColor: heatmap.ai.base }}
      />
    </span>
  );
}
