import type { Fingerprint } from "../data";
import { Lines } from "./lines";

interface OverviewProps {
  data: Fingerprint;
}

export function Overview({ data }: OverviewProps) {
  const { overall, byFileType, byTool, byModel, trend, lines } = data;

  return (
    <div className="space-y-4">
      {/* Overall stat */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div
            className="text-4xl font-bold"
            style={{ color: "var(--fgColor-severe)" }}
          >
            {overall}%
          </div>
          <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
            AI-assisted
          </div>
        </div>
        <div
          className="flex-1 h-4 rounded-full overflow-hidden flex"
          style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${overall}%`,
              backgroundColor: "var(--fgColor-severe)",
            }}
          />
          <div
            className="h-full"
            style={{
              width: `${100 - overall}%`,
              backgroundColor: "var(--fgColor-success)",
            }}
          />
        </div>
        <div
          className="text-sm font-medium"
          style={{
            color: trend.startsWith("+")
              ? "var(--fgColor-danger)"
              : "var(--fgColor-success)",
          }}
        >
          {trend}
        </div>
      </div>

      {/* Lines summary */}
      <div
        className="py-2 px-3 rounded"
        style={{ backgroundColor: "var(--bgColor-muted)" }}
      >
        <Lines lines={lines} />
      </div>

      {/* 3-column breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {/* By file type */}
        <div>
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            By File Type
          </h4>
          <div className="space-y-2">
            {byFileType.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span>{item.type}</span>
                  <span style={{ color: "var(--fgColor-muted)" }}>
                    {item.percent}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: "var(--fgColor-severe)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By tool */}
        <div>
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            By Tool
          </h4>
          <div className="space-y-2">
            {byTool.map((item) => (
              <div key={item.tool}>
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span>{item.tool}</span>
                  <span style={{ color: "var(--fgColor-muted)" }}>
                    {item.percent}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: "var(--fgColor-attention)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By model */}
        <div>
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            By Model
          </h4>
          <div className="space-y-2">
            {byModel.map((item) => (
              <div key={item.model}>
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="truncate">{item.model}</span>
                  <span style={{ color: "var(--fgColor-muted)" }}>
                    {item.percent}%
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: "var(--fgColor-accent)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
