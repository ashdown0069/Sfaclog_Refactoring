"use client";
import React from "react";
import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";

export const VisitorCountBarChart = () => {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="flex flex-row space-y-0 pb-2 md:gap-3 lg:gap-5">
        <div className="grow">
          <CardDescription>오늘</CardDescription>
          <CardTitle className="text-4xl tabular-nums md:text-2xl">
            12{" "}
            <span className="text-muted-foreground font-sans text-sm font-normal tracking-normal md:text-xs">
              방문자
            </span>
          </CardTitle>
        </div>
        <div className="grow">
          <CardDescription>전체</CardDescription>
          <CardTitle className="text-4xl tabular-nums md:text-2xl">
            12,584{" "}
            <span className="text-muted-foreground font-sans text-sm font-normal tracking-normal md:text-xs">
              방문자
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            steps: {
              label: "방문자 수",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={[
              {
                date: "2024-01-01",
                steps: 200,
              },
              {
                date: "2024-01-02",
                steps: 210,
              },
              {
                date: "2024-01-03",
                steps: 220,
              },
              {
                date: "2024-01-04",
                steps: 130,
              },
              {
                date: "2024-01-05",
                steps: 140,
              },
              {
                date: "2024-01-06",
                steps: 250,
              },
              {
                date: "2024-01-07",
                steps: 160,
              },
            ]}
          >
            <Bar
              dataKey="steps"
              fill="#4C8BFF"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("ko-Ko", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ko-KO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={120}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="평균 방문자 수"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value="1,343"
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">지난 7일간의 방문자 수</CardFooter>
    </Card>
  );
};
