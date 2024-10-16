'use client';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  {
    date: '2024-01-01',
    steps: 20,
  },
  {
    date: '2024-01-02',
    steps: 10,
  },
  {
    date: '2024-01-03',
    steps: 23,
  },
  {
    date: '2024-01-04',
    steps: 13,
  },
  {
    date: '2024-01-05',
    steps: 14,
  },
  {
    date: '2024-01-06',
    steps: 50,
  },
  {
    date: '2024-01-07',
    steps: 160,
  },
];

const chartConfig = {
  steps: {
    label: '가입자 수',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function SubscriberCountLineChart() {
  return (
    <Card className='flex h-full flex-col justify-between'>
      <CardHeader>
        <CardTitle>가입자 수</CardTitle>
        <CardDescription>2024. 1. 1 ~ 2024. 1. 7</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={value => {
                return new Date(value).toLocaleDateString('ko-Ko', {
                  weekday: 'short',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey='steps'
              type='natural'
              stroke='#4C8BFF'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='text-sm'>지난 7일간 가입자 수</CardFooter>
    </Card>
  );
}
