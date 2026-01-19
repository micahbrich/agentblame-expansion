"use client";

import { mockPulse, mockContributionActivity } from "@/lib/mock-data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from "recharts";

export function PulseAICard() {
  const { period, totalLines, aiLines, aiPercent, byWeek, byProvider } = mockPulse;

  return (
    <div
      className="mx-6 my-6 rounded-md border overflow-hidden"
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
          <span className="font-semibold text-sm">AI Contribution Trends</span>
          <span
            className="px-2 py-0.5 text-xs rounded-full font-medium"
            style={{
              backgroundColor: "var(--bgColor-severe-muted)",
              color: "var(--fgColor-severe)",
            }}
          >
            {period}
          </span>
        </div>
        <div
          className="text-xs"
          style={{ color: "var(--fgColor-muted)" }}
        >
          Powered by agentblame
        </div>
      </div>

      {/* Stats summary */}
      <div className="p-4 grid grid-cols-3 gap-4 border-b" style={{ borderColor: "var(--borderColor-default)" }}>
        <div>
          <div className="text-2xl font-bold">{aiPercent}%</div>
          <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
            AI-generated code
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">{aiLines.toLocaleString()}</div>
          <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
            AI lines this period
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalLines.toLocaleString()}</div>
          <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
            Total lines
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="p-4 space-y-6">
        {/* AI adoption over time */}
        <div>
          <h3 className="text-sm font-semibold mb-3">AI Adoption Over Time</h3>
          <div className="h-48">
            <ChartContainer
              config={{
                human: {
                  label: "Human",
                  color: "var(--fgColor-success)",
                },
                ai: {
                  label: "AI",
                  color: "var(--fgColor-severe)",
                },
              }}
              className="h-full w-full"
            >
              <AreaChart data={mockContributionActivity}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  width={30}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="human"
                  stackId="1"
                  stroke="var(--fgColor-success)"
                  fill="var(--bgColor-success-muted)"
                />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stackId="1"
                  stroke="var(--fgColor-severe)"
                  fill="var(--bgColor-severe-muted)"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        {/* Provider breakdown */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">By AI Provider</h3>
            <div className="space-y-2">
              {byProvider.map((p) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{p.name}</span>
                    <span style={{ color: "var(--fgColor-muted)" }}>
                      {p.lines} lines ({p.percent}%)
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ backgroundColor: "var(--bgColor-neutral-muted)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.percent}%`,
                        backgroundColor: "var(--fgColor-severe)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Weekly Trend</h3>
            <div className="h-32">
              <ChartContainer
                config={{
                  cursor: {
                    label: "Cursor",
                    color: "var(--fgColor-severe)",
                  },
                  claude: {
                    label: "Claude Code",
                    color: "var(--fgColor-attention)",
                  },
                }}
                className="h-full w-full"
              >
                <BarChart data={byWeek}>
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="cursor"
                    stackId="a"
                    fill="var(--fgColor-severe)"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="claude"
                    stackId="a"
                    fill="var(--fgColor-attention)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
