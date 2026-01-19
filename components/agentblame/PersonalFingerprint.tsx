"use client";

import { mockFingerprint } from "@/lib/mock-data";

interface PersonalFingerprintProps {
  username?: string;
}

export function PersonalFingerprint({ username = "alice" }: PersonalFingerprintProps) {
  const { overall, period, byFileType, byTool, byModel, trend } = mockFingerprint;

  return (
    <div
      className="rounded-md border overflow-hidden"
      style={{
        backgroundColor: "var(--bgColor-default)",
        borderColor: "var(--borderColor-default)",
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{
          backgroundColor: "var(--bgColor-muted)",
          borderColor: "var(--borderColor-default)",
        }}
      >
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={{ fill: "var(--fgColor-severe)" }}
          >
            <path d="M7.998 14.5c2.832 0 5-1.98 5-4.5 0-1.463-.68-2.19-1.879-3.383l-.036-.037c-1.013-1.008-2.3-2.29-2.834-4.434-.322.256-.63.579-.864.953-.432.696-.621 1.58-.046 2.73.473.947.67 2.284-.278 3.232-.61.61-1.545.84-2.403.633a2.79 2.79 0 0 1-1.436-.874A3.198 3.198 0 0 0 3 10c0 2.53 2.164 4.5 4.998 4.5ZM9.533.753C9.496.34 9.16.009 8.77.146 7.035.75 4.34 3.187 5.997 6.5c.344.689.285 1.218.003 1.5-.419.419-1.796.167-2.31-.188-.872-.604-2.53.074-2.683 1.114A4.702 4.702 0 0 0 1 9.5c0 3.25 2.797 6 6.998 6 4.19 0 7-2.79 7-6C15 6.816 12.61 3.969 9.533.753Z" />
          </svg>
          <span className="font-semibold text-sm">AI Fingerprint</span>
          <span className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
            @{username}
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
          {period}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Overall stat */}
        <div className="flex items-center gap-4 mb-4">
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
    </div>
  );
}
