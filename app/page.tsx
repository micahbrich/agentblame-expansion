"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: "var(--bgColor-default)",
        color: "var(--fgColor-default)",
      }}
    >
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo and title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 16 16"
              style={{ fill: "var(--fgColor-severe)" }}
            >
              <path d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 0 1-1.436-.874A3.198 3.198 0 0 0 3 10c0 2.53 2.164 4.5 4.998 4.5ZM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.796.167-2.31-.188-.872-.604-2.53.074-2.683 1.114A4.702 4.702 0 0 0 1 9.5c0 3.25 2.797 6 6.998 6 4.19 0 7-2.79 7-6C15 6.816 12.61 3.969 9.533.753Z" />
            </svg>
            <h1 className="text-4xl font-bold">agentblame</h1>
          </div>
          <p
            className="text-lg"
            style={{ color: "var(--fgColor-muted)" }}
          >
            GitHub mockups for AI contribution tracking
          </p>
        </div>

        {/* Theme toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border"
            style={{
              borderColor: "var(--borderColor-default)",
              backgroundColor: "var(--bgColor-muted)",
            }}
          >
            {theme === "dark" ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Zm0 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13ZM2.343 2.343a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061Zm9.193 9.193a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM0 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8Zm13 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8ZM2.343 13.657a.75.75 0 0 1 0-1.061l1.061-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061 0Zm9.193-9.193a.75.75 0 0 1 0-1.06l1.061-1.061a.75.75 0 0 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061 0Z" />
                </svg>
                Light mode
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z" />
                </svg>
                Dark mode
              </>
            )}
          </button>
        </div>

        {/* Demo links */}
        <div className="grid gap-4">
          <Link
            href="/pr"
            className="block p-6 rounded-lg border transition-colors hover:border-[var(--borderColor-accent-emphasis)]"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                style={{ fill: "var(--fgColor-success)" }}
              >
                <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
              </svg>
              <h2 className="text-xl font-semibold">Pull Request View</h2>
            </div>
            <p style={{ color: "var(--fgColor-muted)" }}>
              AI contribution summary banner with line attribution, provider breakdown,
              security alerts, and duplicate detection.
            </p>
          </Link>

          <Link
            href="/pulse"
            className="block p-6 rounded-lg border transition-colors hover:border-[var(--borderColor-accent-emphasis)]"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                style={{ fill: "var(--fgColor-accent)" }}
              >
                <path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
              </svg>
              <h2 className="text-xl font-semibold">Pulse / Insights</h2>
            </div>
            <p style={{ color: "var(--fgColor-muted)" }}>
              AI adoption trends over time, tool usage breakdown, and repository-wide
              AI contribution statistics.
            </p>
          </Link>

          <Link
            href="/contributors"
            className="block p-6 rounded-lg border transition-colors hover:border-[var(--borderColor-accent-emphasis)]"
            style={{
              backgroundColor: "var(--bgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                style={{ fill: "var(--fgColor-done)" }}
              >
                <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z" />
              </svg>
              <h2 className="text-xl font-semibold">Contributors</h2>
            </div>
            <p style={{ color: "var(--fgColor-muted)" }}>
              Personal AI fingerprint, survivability panel, productivity heatmap,
              and individual contribution patterns.
            </p>
          </Link>
        </div>

        {/* Footer */}
        <div
          className="text-center text-sm"
          style={{ color: "var(--fgColor-muted)" }}
        >
          Design mockups for interview presentation
        </div>
      </div>
    </div>
  );
}
