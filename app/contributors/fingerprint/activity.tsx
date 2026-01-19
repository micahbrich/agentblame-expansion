"use client";

import type { Fingerprint } from "../data";
import { Heatmap } from "./heatmap";
import { Sessions } from "./sessions";

interface ActivityProps {
  data: Fingerprint;
}

export function Activity({ data }: ActivityProps) {
  return (
    <div className="space-y-4">
      {/* Heatmap */}
      <div>
        <h4
          className="text-xs font-medium mb-3"
          style={{ color: "var(--fgColor-muted)" }}
        >
          AI Activity
        </h4>
        <Heatmap activity={data.activity} />
      </div>

      {/* Recent sessions */}
      <div>
        <h4
          className="text-xs font-medium mb-2"
          style={{ color: "var(--fgColor-muted)" }}
        >
          Recent Sessions
        </h4>
        <Sessions sessions={data.sessions} />
      </div>
    </div>
  );
}
