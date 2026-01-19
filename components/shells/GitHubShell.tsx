"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

interface GitHubShellProps {
  children: React.ReactNode;
  repo?: string;
  title?: string;
  tabs?: Array<{
    label: string;
    href: string;
    active?: boolean;
    count?: number;
  }>;
}

export function GitHubShell({
  children,
  repo = "mesa-dot-dev/agentblame",
  title,
  tabs,
}: GitHubShellProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bgColor-default)",
        color: "var(--fgColor-default)",
      }}
    >
      {/* GitHub Header */}
      <header
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{
          backgroundColor: "var(--header-bgColor)",
          borderColor: "var(--borderColor-muted)",
        }}
      >
        <div className="flex items-center gap-4">
          {/* GitHub Logo */}
          <svg
            height="32"
            viewBox="0 0 16 16"
            width="32"
            style={{ fill: "var(--header-fgColor-logo)" }}
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>

          {/* Repo path */}
          <div className="flex items-center gap-1 text-sm font-semibold">
            <Link
              href="/"
              className="hover:underline"
              style={{ color: "var(--header-fgColor-default)" }}
            >
              {repo.split("/")[0]}
            </Link>
            <span style={{ color: "var(--header-fgColor-muted)" }}>/</span>
            <Link
              href="/"
              className="hover:underline"
              style={{ color: "var(--header-fgColor-default)" }}
            >
              {repo.split("/")[1]}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md hover:opacity-80"
            style={{ color: "var(--header-fgColor-default)" }}
          >
            {theme === "dark" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Zm0 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13ZM2.343 2.343a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061Zm9.193 9.193a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061ZM0 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8Zm13 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8ZM2.343 13.657a.75.75 0 0 1 0-1.061l1.061-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061 0Zm9.193-9.193a.75.75 0 0 1 0-1.06l1.061-1.061a.75.75 0 0 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061 0Z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Repo nav */}
      <nav
        className="px-4 border-b"
        style={{ borderColor: "var(--borderColor-muted)" }}
      >
        <ul className="flex gap-4 text-sm">
          {[
            { label: "Code", href: "/" },
            { label: "Issues", href: "/", count: 3 },
            { label: "Pull requests", href: "/pr", count: 2 },
            { label: "Actions", href: "/" },
            { label: "Insights", href: "/pulse" },
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-1 py-3 border-b-2 transition-colors"
                style={{
                  color:
                    tabs?.find((t) => t.label === item.label)?.active
                      ? "var(--fgColor-default)"
                      : "var(--fgColor-muted)",
                  borderColor:
                    tabs?.find((t) => t.label === item.label)?.active
                      ? "var(--underlineNav-borderColor-active)"
                      : "transparent",
                }}
              >
                {item.label}
                {item.count && (
                  <span
                    className="px-1.5 py-0.5 text-xs rounded-full"
                    style={{
                      backgroundColor: "var(--bgColor-neutral-muted)",
                      color: "var(--fgColor-muted)",
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Title section if provided */}
      {title && (
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor: "var(--borderColor-muted)" }}
        >
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
      )}

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
