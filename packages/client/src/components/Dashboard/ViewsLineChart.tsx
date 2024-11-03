"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetLineChartDataQuery } from "@/lib/features/dashboard/dashboardApis";

export const description = "An interactive line chart";

const chartConfig = {
  Views: {
    label: "User interactions",
  },
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ViewsLineChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("views");
  const { data, isLoading, isError } = useGetLineChartDataQuery(undefined);
  const total = React.useMemo(
    () => ({
      views: data ?  data.reduce((acc : any, curr : any) => acc + curr.views, 0) : 0,
      clicks:  data ? data?.reduce((acc : any , curr : any) => acc + curr.clicks, 0) : 0,
    }),
    [data]
  );

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b-[1px] border-b-foreground/30 p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>User Evets</CardTitle>
          <CardDescription>total events for the last month</CardDescription>
        </div>
        <div className="flex">
          {["views", "clicks"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t-foreground/30 px-6 py-4 text-left even:border-l-foreground/30 data-[active=true]:bg-muted/50 sm:border-l-foreground/30 sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
