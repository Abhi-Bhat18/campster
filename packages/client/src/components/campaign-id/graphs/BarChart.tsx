"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { useAppSelector } from "@/lib/hook";
export const description = "A mixed bar chart";

const chartConfig = {
  count: {
    label: "Count",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-1))",
  },
  views: {
    label: "Views",
    color: "hsl(var(--chart-2))",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-3))",
  },
  bounces: {
    label: "Bounces",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function CampaignBarChart() {
  const { campaign } = useAppSelector((state) => state.campaign);

  console.log(campaign);

  let total_clicks,
    total_bounces,
    total_deliveried,
    total_opens = 0;

  if (campaign != null) {
    total_clicks = campaign.total_clicks;
    total_bounces = campaign.total_bounces;
    total_deliveried = campaign.total_delivered;
    total_opens = campaign.total_opens;
  }

  const chartData = [
    {
      status: "delivered",
      count: total_deliveried,
      fill: "var(--color-delivered)",
    },
    { status: "views", count: total_opens, fill: "var(--color-views)" },
    { status: "clicks", count: total_clicks, fill: "var(--color-clicks)" },
    { status: "bounces", count: total_bounces, fill: "var(--color-bounces)" },
  ];

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Total Delivered, Views, Clicks and Bounces</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
