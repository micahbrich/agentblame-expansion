import Link from "next/link";
import { Icons } from "../icons";
import { sidebarNav, contributors, avgAIPercent } from "./data";

export default function ContributorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-4 flex gap-6">
      {/* Sidebar */}
      <aside className="w-56 shrink-0">
        <nav className="space-y-1">
          {sidebarNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-3 py-2 text-sm rounded-md"
              style={{
                backgroundColor: item.active
                  ? "var(--bgColor-accent-muted)"
                  : "transparent",
                color: item.active
                  ? "var(--fgColor-accent)"
                  : "var(--fgColor-default)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Contributors</h2>
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: "var(--fgColor-muted)" }}>
              {contributors.length} contributors
            </span>
            <span
              className="px-2 py-0.5 text-xs rounded-full font-medium"
              style={{
                backgroundColor: "var(--bgColor-severe-muted)",
                color: "var(--fgColor-severe)",
              }}
            >
              {avgAIPercent}% avg AI
            </span>
          </div>
        </div>

        {/* Contribution graph placeholder */}
        <div
          className="h-40 rounded-md border flex items-center justify-center"
          style={{
            backgroundColor: "var(--bgColor-muted)",
            borderColor: "var(--borderColor-default)",
          }}
        >
          <div className="text-center">
            <span
              className="block mx-auto mb-2"
              style={{ color: "var(--fgColor-muted)" }}
            >
              {Icons.insights}
            </span>
            <p className="text-sm" style={{ color: "var(--fgColor-muted)" }}>
              Contribution activity graph
            </p>
          </div>
        </div>

        {/* Children slot for contributor list and cards */}
        {children}
      </div>
    </div>
  );
}
