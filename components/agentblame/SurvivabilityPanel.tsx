"use client";

import { mockSurvivability } from "@/lib/mock-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

export function SurvivabilityPanel() {
  const { unchanged, modified, deleted, byTool, byCodeType, productivityWindows } =
    mockSurvivability;

  const survivalData = [
    { status: "Unchanged", value: unchanged, fill: "var(--fgColor-success)" },
    { status: "Modified", value: modified, fill: "var(--fgColor-attention)" },
    { status: "Deleted", value: deleted, fill: "var(--fgColor-danger)" },
  ];

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
            style={{ fill: "var(--fgColor-done)" }}
          >
            <path d="M8.834.066c.763.087 1.5.295 2.01.884.505.581.656 1.378.656 2.3 0 .467-.087 1.119-.157 1.637L11.328 5h1.422c.603 0 1.174.085 1.668.333.508.254.911.679 1.137 1.2.453.103.757.441.757.92 0 .317-.162.616-.41.7.084.1.154.207.205.328.3.725-.04 1.397-.596 1.893.052.244.073.503.073.75 0 .648-.216 1.276-.756 1.708-.473.38-1.104.553-1.79.553-.36 0-.736-.06-1.108-.162H9.5a6.26 6.26 0 0 0-.723.255A5.86 5.86 0 0 0 7.36 14a.75.75 0 0 1-.64-.64A5.86 5.86 0 0 0 6.216 12a6.26 6.26 0 0 0-.723-.255H3.036a3.065 3.065 0 0 1-1.108.162c-.686 0-1.317-.173-1.79-.553C.598 10.974.382 10.346.382 9.7c0-.247.021-.506.073-.75-.556-.496-.896-1.168-.596-1.893.05-.121.12-.228.205-.328A.814.814 0 0 1 0 6.249c0-.479.304-.817.757-.92.226-.52.629-.946 1.137-1.2.494-.248 1.066-.333 1.669-.333h1.422l-.015-.113C4.88 3.119 4.793 2.467 4.793 2c0-.922.15-1.719.656-2.3.51-.589 1.247-.797 2.01-.884A6.016 6.016 0 0 1 8.5.008c.276.003.549.02.834.058ZM5.043 3.91c.066.364.132.775.201 1.227.08.53.147.973.26 1.356a2.269 2.269 0 0 0 .628 1.004c.368.342.87.522 1.504.522h.728c.635 0 1.136-.18 1.504-.522a2.27 2.27 0 0 0 .628-1.004c.113-.383.18-.825.26-1.356.069-.452.135-.863.201-1.227.024-.13.042-.252.055-.367a8.53 8.53 0 0 0-.007-1.095c-.047-.485-.167-.845-.377-1.086-.204-.235-.516-.375-1.065-.432A4.516 4.516 0 0 0 8.5 1.508c-.178 0-.376.01-.563.035-.549.057-.86.197-1.065.432-.21.241-.33.601-.377 1.086a8.528 8.528 0 0 0-.007 1.095c.013.115.031.237.055.367Z" />
          </svg>
          <span className="font-semibold text-sm">Code Survivability</span>
          <span
            className="px-2 py-0.5 text-xs rounded-full"
            style={{
              backgroundColor: "var(--bgColor-success-muted)",
              color: "var(--fgColor-success)",
            }}
          >
            {unchanged}% unchanged after 90 days
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Main survival chart */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4
              className="text-xs font-medium mb-3"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Code Fate Distribution
            </h4>
            <div className="h-32">
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                  },
                }}
                className="h-full w-full"
              >
                <BarChart data={survivalData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    type="category"
                    dataKey="status"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={70}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-medium mb-3"
              style={{ color: "var(--fgColor-muted)" }}
            >
              Survival by Tool
            </h4>
            <div className="space-y-2">
              {byTool.map((item) => (
                <div key={item.tool}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{item.tool}</span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--fgColor-success)" }}
                    >
                      {item.survives}% survives
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.survives}%`,
                        backgroundColor: "var(--fgColor-success)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI vs Human comparison */}
        <div>
          <h4
            className="text-xs font-medium mb-3"
            style={{ color: "var(--fgColor-muted)" }}
          >
            AI vs Human Survivability by Code Type
          </h4>
          <div className="space-y-3">
            {byCodeType.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{item.type}</span>
                  <div className="flex items-center gap-4">
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "var(--fgColor-severe)" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--fgColor-severe)]" />
                      AI: {item.aiSurvives}%
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "var(--fgColor-success)" }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--fgColor-success)]" />
                      Human: {item.humanSurvives}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.aiSurvives}%`,
                      backgroundColor: "var(--fgColor-severe)",
                    }}
                  />
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.humanSurvives}%`,
                      backgroundColor: "var(--fgColor-success)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity windows */}
        <div
          className="p-3 rounded-md"
          style={{ backgroundColor: "var(--bgColor-muted)" }}
        >
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            Productivity Insight
          </h4>
          <p className="text-sm">
            AI code written{" "}
            <span
              className="font-medium"
              style={{ color: "var(--fgColor-success)" }}
            >
              {productivityWindows.best}
            </span>{" "}
            survives at{" "}
            <span className="font-medium">{productivityWindows.bestRate}%</span>,
            while code written{" "}
            <span
              className="font-medium"
              style={{ color: "var(--fgColor-danger)" }}
            >
              {productivityWindows.worst}
            </span>{" "}
            only survives at{" "}
            <span className="font-medium">{productivityWindows.worstRate}%</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
