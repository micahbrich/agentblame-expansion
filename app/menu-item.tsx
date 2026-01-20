"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { PingIndicator } from "@/components/mesa/ping-indicator";

interface MenuItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  count?: number;
  matchPrefix?: boolean;
  showPing?: boolean;
}

export function MenuItem({ href, icon, label, count, matchPrefix = false, showPing = false }: MenuItemProps) {
  const pathname = usePathname();
  const active = matchPrefix
    ? pathname.startsWith(href)
    : pathname === href || (href === "/" && pathname === "/");

  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-4 py-3 border-b-2 transition-colors"
      style={{
        color: "#f0f6fc",
        fontWeight: active ? 600 : 400,
        borderColor: active ? "#f78166" : "transparent",
      }}
    >
      <span className="relative" style={{ color: "#848d97" }}>
        {icon}
        {showPing && <PingIndicator className="absolute -top-1 -right-1" />}
      </span>
      {label}
      {count !== undefined && (
        <span
          className="px-1.5 py-0.5 text-xs rounded-full"
          style={{ backgroundColor: "#30363d", color: "#c9d1d9" }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
