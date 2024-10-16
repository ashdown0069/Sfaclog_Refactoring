'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

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

export const description = 'A mixed bar chart';

const chartData = [
  { path: 'HOME', minutes: 3, fill: '#0059FF' },
  { path: 'popular', minutes: 4, fill: '#196AFF' },
  { path: 'latest', minutes: 5, fill: '#337AFF' },
  { path: 'log', minutes: 10, fill: '#4C8BFF' },
  { path: 'following', minutes: 2, fill: '#669BFF' },
  { path: 'write', minutes: 20, fill: '#7FACFF' },
  { path: 'mypage', minutes: 10, fill: '#99BDFF' },
];

const chartConfig = {
  minutes: {
    label: 'Minutes',
  },
  HOME: {
    label: 'HOME',
  },

  popular: {
    label: 'Popular',
  },
  latest: {
    label: 'Latest',
  },
  log: {
    label: 'Log',
  },
  following: {
    label: 'Following',
  },
  write: {
    label: 'Write',
  },
  mypage: {
    label: 'Mypage',
  },
} satisfies ChartConfig;

export function TimeOnPageBarChart() {
  return (
    <Card className='flex h-full flex-col justify-between'>
      <CardHeader>
        <CardTitle>페이지 별 평균 머문 시간</CardTitle>
        <CardDescription>2024. 1. 1 ~ 2024. 1. 7</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout='vertical'
            margin={{
              left: 0,
            }}
          >
            <YAxis
              className='md:text-xs xl:text-[0.5rem]'
              dataKey='path'
              type='category'
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={value =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey='minutes' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='minutes' layout='vertical' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='text-sm'>
        지난 7일간의 페이지별 머문 시간
      </CardFooter>
    </Card>
  );
}
