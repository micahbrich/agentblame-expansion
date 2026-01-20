"use client";

import { useState } from "react";
import { contributors } from "./data";
import { ContributorRow } from "./contributor-row";
import { FingerprintCard } from "./fingerprint/card";
import { SurvivabilityCard } from "./survivability-card";
import { MesaIcon, PoweredBy } from "@/components/mesa";

export default function ContributorsPage() {
  const [selected, setSelected] = useState(contributors[0].username);

  return (
    <>
      {/* Unified side-by-side card */}
      <div
        className="rounded-md border overflow-hidden flex flex-col"
        style={{ borderColor: "var(--borderColor-default)" }}
      >
        {/* Header row */}
        <div
          className="flex border-b"
          style={{
            backgroundColor: "var(--bgColor-muted)",
            borderColor: "var(--borderColor-default)",
          }}
        >
          <div
            className="w-full lg:w-96 px-4 py-2 text-xs font-medium lg:border-r shrink-0"
            style={{
              color: "var(--fgColor-muted)",
              borderColor: "var(--borderColor-default)",
            }}
          >
            Contributors
          </div>
          <div
            className="hidden lg:flex flex-1 px-4 py-2 items-center justify-between text-xs font-medium"
            style={{ color: "var(--fgColor-muted)" }}
          >
            <div className="flex items-center gap-2">
              <MesaIcon size={16} />
              <span className="font-semibold">AI Fingerprint</span>
              <span>@{selected}</span>
            </div>
            <PoweredBy />
          </div>
        </div>

        {/* Content row */}
        <div className="flex flex-col lg:flex-row flex-1">
          {/* Left: contributors list */}
          <div
            className="w-full lg:w-96 shrink-0 lg:border-r"
            style={{ borderColor: "var(--borderColor-default)" }}
          >
            {contributors.map((contributor) => (
              <ContributorRow
                key={contributor.username}
                {...contributor}
                isSelected={selected === contributor.username}
                onClick={() => setSelected(contributor.username)}
              />
            ))}
          </div>

          {/* Right: fingerprint details - desktop */}
          <div className="hidden lg:block flex-1 min-w-[500px]">
            <FingerprintCard username={selected} embedded />
          </div>
        </div>
      </div>

      {/* Mobile: fingerprint card shown below contributor list */}
      <div className="lg:hidden mt-4">
        <div
          className="flex items-center gap-2 px-4 py-2 border-b rounded-t-md text-xs font-medium"
          style={{
            backgroundColor: "var(--bgColor-muted)",
            color: "var(--fgColor-muted)",
            borderColor: "var(--borderColor-default)",
          }}
        >
          <MesaIcon size={16} />
          <span className="font-semibold">AI Fingerprint</span>
          <span>@{selected}</span>
          <div className="ml-auto">
            <PoweredBy />
          </div>
        </div>
        <FingerprintCard username={selected} />
      </div>

      {/* Survivability panel */}
      <SurvivabilityCard />
    </>
  );
}
