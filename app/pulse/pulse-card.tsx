"use client";

import { pulse, byWeek, byProvider, contributionActivity } from "./data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Bar, BarChart } from "recharts";
import {
  MesaCardHeader,
  StatDisplay,
  StatGrid,
  DetailedBreakdownList,
} from "@/components/mesa";

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
      <MesaCardHeader
        title="AI Contribution Trends"
        badge={{ label: period, variant: "severe" }}
      />

      {/* Stats summary */}
      <StatGrid columns={3}>
        <StatDisplay value={`${aiPercent}%`} label="AI-generated code" />
        <StatDisplay value={aiLines.toLocaleString()} label="AI lines this period" />
        <StatDisplay value={totalLines.toLocaleString()} label="Total lines" />
      </StatGrid>

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
          <DetailedBreakdownList
            title="By AI Provider"
            items={byProvider.map((p) => ({
              name: p.name,
              lines: p.lines,
              percent: p.percent,
            }))}
          />

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
