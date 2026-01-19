import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Icons } from "./icons";
import { MenuItem } from "./menu-item";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentblame - GitHub Mockups",
  description: "Design mockups for agentblame GitHub integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const owner = "mesa-dot-dev";
  const repo = "agentblame";
  const stars = 39;

  return (
    <html
      lang="en"
      data-color-mode="light"
      data-light-theme="light"
      data-dark-theme="dark"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className="min-h-screen"
          style={{
            backgroundColor: "var(--bgColor-default)",
            color: "var(--fgColor-default)",
          }}
        >
          {/* GitHub Header */}
          <header
            className="px-4 h-16 flex items-center justify-between"
            style={{ backgroundColor: "#010409" }}
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              {/* Hamburger menu */}
              <button
                className="p-2 rounded-md hover:bg-[#21262d]"
                style={{ color: "#f0f6fc" }}
              >
                {Icons.hamburger}
              </button>

              {/* GitHub Logo */}
              <Link href="/" style={{ color: "#f0f6fc" }}>
                {Icons.logo}
              </Link>

              {/* Repo path */}
              <div className="flex items-center gap-1 text-sm">
                <Link
                  href="/"
                  className="font-semibold hover:underline"
                  style={{ color: "#f0f6fc" }}
                >
                  {owner}
                </Link>
                <span style={{ color: "#848d97" }}>/</span>
                <Link
                  href="/"
                  className="font-semibold hover:underline"
                  style={{ color: "#f0f6fc" }}
                >
                  {repo}
                </Link>
              </div>

              {/* Stars button */}
              <div
                className="flex items-center border rounded-md text-xs"
                style={{ borderColor: "#30363d" }}
              >
                <button
                  className="flex items-center gap-1 px-2 py-1 hover:bg-[#21262d]"
                  style={{ color: "#c9d1d9" }}
                >
                  {Icons.star}
                  <span>Star</span>
                </button>
                <span
                  className="px-2 py-1 border-l"
                  style={{ borderColor: "#30363d", color: "#c9d1d9" }}
                >
                  {stars}
                </span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Search bar */}
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm w-72"
                style={{
                  backgroundColor: "#010409",
                  borderColor: "#30363d",
                  color: "#848d97",
                }}
              >
                {Icons.search}
                <span className="flex-1">Type / to search</span>
                <span
                  className="text-xs px-1 border rounded"
                  style={{ borderColor: "#30363d" }}
                >
                  /
                </span>
              </div>

              {/* Divider */}
              <div
                className="h-6 w-px mx-1"
                style={{ backgroundColor: "#21262d" }}
              />

              {/* Header icons */}
              <div className="flex items-center gap-1">
                <button
                  className="p-2 rounded-md hover:bg-[#21262d]"
                  style={{ color: "#848d97" }}
                >
                  {Icons.terminal}
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#21262d]"
                  style={{ color: "#848d97" }}
                >
                  {Icons.copilot}
                </button>
                <button
                  className="flex items-center p-2 rounded-md hover:bg-[#21262d]"
                  style={{ color: "#f0f6fc" }}
                >
                  {Icons.plus}
                  {Icons.triangle}
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#21262d]"
                  style={{ color: "#848d97" }}
                >
                  {Icons.issue}
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#21262d]"
                  style={{ color: "#848d97" }}
                >
                  {Icons.pr}
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#21262d] relative"
                  style={{ color: "#f0f6fc" }}
                >
                  {Icons.bell}
                  <span
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#388bfd" }}
                  />
                </button>
                <button className="ml-1">
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden border-2"
                    style={{ borderColor: "#30363d" }}
                  >
                    <img
                      src="https://avatars.githubusercontent.com/u/1?v=4"
                      alt="avatar"
                      className="w-full h-full"
                    />
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* Repo nav */}
          <nav
            className="px-4 border-b"
            style={{ backgroundColor: "#010409", borderColor: "#21262d" }}
          >
            <ul className="flex gap-0 text-sm">
              <li>
                <MenuItem href="/" icon={Icons.code} label="Code" />
              </li>
              <li>
                <MenuItem href="/issues" icon={Icons.issue} label="Issues" count={1} />
              </li>
              <li>
                <MenuItem href="/pr" icon={Icons.pr} label="Pull requests" matchPrefix />
              </li>
              <li>
                <MenuItem href="/actions" icon={Icons.actions} label="Actions" />
              </li>
              <li>
                <MenuItem href="/models" icon={Icons.models} label="Models" />
              </li>
              <li>
                <MenuItem href="/pulse" icon={Icons.insights} label="Insights" matchPrefix />
              </li>
              <li>
                <MenuItem
                  href="/releases"
                  icon={Icons.release}
                  label="Releases"
                  count={1}
                />
              </li>
              <li className="ml-auto">
                <button
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ color: "#848d97" }}
                >
                  {Icons.more}
                </button>
              </li>
            </ul>
          </nav>

          {/* Main content */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
