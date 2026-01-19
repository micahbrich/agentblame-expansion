"use client";

import { Icons } from "../icons";
import { pulse, byWeek, byProvider, contributionActivity } from "./data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Bar, BarChart } from "recharts";

export function PulseCard() {
  const { period, totalLines, aiLines, aiPercent } = pulse;

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
          <span style={{ color: "var(--fgColor-severe)" }}>{Icons.flame}</span>
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
        <div className="text-xs" style={{ color: "var(--fgColor-muted)" }}>
          Powered by agentblame
        </div>
      </div>

      {/* Stats summary */}
      <div
        className="p-4 grid grid-cols-3 gap-4 border-b"
        style={{ borderColor: "var(--borderColor-default)" }}
      >
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
              <AreaChart data={contributionActivity}>
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
