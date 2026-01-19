"use client";

import { useState } from "react";
import { contributors } from "./data";
import { ContributorRow } from "./contributor-row";
import { FingerprintCard } from "./fingerprint-card";
import { SurvivabilityCard } from "./survivability-card";

export default function ContributorsPage() {
  const [selected, setSelected] = useState(contributors[0].username);

  return (
    <>
      {/* Contributors list */}
      <div
        className="rounded-md border overflow-hidden"
        style={{ borderColor: "var(--borderColor-default)" }}
      >
        <div
          className="px-4 py-2 text-xs font-medium border-b"
          style={{
            backgroundColor: "var(--bgColor-muted)",
            borderColor: "var(--borderColor-default)",
            color: "var(--fgColor-muted)",
          }}
        >
          Click a contributor to see their AI fingerprint
        </div>
        {contributors.map((contributor) => (
          <ContributorRow
            key={contributor.username}
            {...contributor}
            isSelected={selected === contributor.username}
            onClick={() => setSelected(contributor.username)}
          />
        ))}
      </div>

      {/* Selected contributor's AI fingerprint */}
      <FingerprintCard username={selected} />

      {/* Survivability panel */}
      <SurvivabilityCard />
    </>
  );
}
