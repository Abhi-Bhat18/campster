"use client";
import { TrendingUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useGetTimeSeriesDataQuery } from "@/lib/features/campaign/campaignApis";

export const description = "A stacked area chart";

const chartConfig = {
  views: {
    label: "views",
    color: "hsl(var(--chart-1))",
  },
  clicks: {
    label: "clicks",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const ViewsChart = () => {
  const pathName = usePathname();
  const id = pathName.split("/").at(-1)
  const { data } = useGetTimeSeriesDataQuery(id!);

  return (
    <Card className="border-none bg-card">
      <CardHeader>
        <CardTitle>Email Views & Clicks</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[0, "auto"]} // Ensure the Y-axis starts at 0
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="views"
              type="monotone"
              fill={chartConfig.views.color}
              fillOpacity={0.4}
              stroke={chartConfig.views.color}
              stackId="a"
            />
            <Area
              dataKey="clicks"
              type="monotone"
              fill={chartConfig.clicks.color}
              fillOpacity={0.4}
              stroke={chartConfig.clicks.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ViewsChart;
