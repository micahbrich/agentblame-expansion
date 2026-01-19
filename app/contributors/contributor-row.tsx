"use client";

import { Icons } from "../icons";
import { Contributor } from "./data";

interface ContributorRowProps extends Contributor {
  isSelected?: boolean;
  onClick?: () => void;
}

export function ContributorRow({
  username,
  avatar,
  additions,
  deletions,
  aiPercent,
  commits,
  isSelected,
  onClick,
}: ContributorRowProps) {
  const total = additions + deletions;
  const maxBar = 2000;
  const barWidth = Math.min((total / maxBar) * 100, 100);
  const additionWidth = (additions / total) * 100;

  return (
    <button
      onClick={onClick}
      className="w-full p-4 flex items-center gap-4 border-b transition-colors text-left"
      style={{
        backgroundColor: isSelected
          ? "var(--bgColor-accent-muted)"
          : "transparent",
        borderColor: "var(--borderColor-default)",
      }}
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={username}
        className="w-10 h-10 rounded-full"
        style={{ border: "1px solid var(--borderColor-default)" }}
      />

      {/* Username and stats */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{username}</span>
          <span
            className="px-2 py-0.5 text-xs rounded-full font-medium text-nowrap"
            style={{
              backgroundColor:
                aiPercent > 50
                  ? "var(--bgColor-severe-muted)"
                  : aiPercent > 25
                    ? "var(--bgColor-attention-muted)"
                    : "var(--bgColor-success-muted)",
              color:
                aiPercent > 50
                  ? "var(--fgColor-severe)"
                  : aiPercent > 25
                    ? "var(--fgColor-attention)"
                    : "var(--fgColor-success)",
            }}
          >
            {aiPercent}% AI
          </span>
        </div>
        <div className="text-xs mt-0.5" style={{ color: "var(--fgColor-muted)" }}>
          {commits} commits
        </div>
      </div>

      {/* Contribution bar */}
      <div className="w-48">
        <div className="flex items-center gap-2 text-xs mb-1">
          <span style={{ color: "var(--fgColor-success)" }}>
            +{additions.toLocaleString()}
          </span>
          <span style={{ color: "var(--fgColor-danger)" }}>
            -{deletions.toLocaleString()}
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden flex"
          style={{
            width: `${barWidth}%`,
            backgroundColor: "var(--bgColor-neutral-muted)",
          }}
        >
          <div
            className="h-full"
            style={{
              width: `${additionWidth}%`,
              backgroundColor: "var(--fgColor-success)",
            }}
          />
          <div
            className="h-full"
            style={{
              width: `${100 - additionWidth}%`,
              backgroundColor: "var(--fgColor-danger)",
            }}
          />
        </div>
      </div>

      {/* Chevron indicator for selected */}
      <div
        className="hidden lg:block w-4"
        style={{
          color: isSelected ? "var(--fgColor-muted)" : "transparent",
        }}
      >
        {Icons.chevronRight}
      </div>
    </button>
  );
}
