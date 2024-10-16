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

const chartData = [
  { path: 'HOME', visitors: 275, fill: '#0059FF' },
  { path: 'popular', visitors: 200, fill: '#196AFF' },
  { path: 'latest', visitors: 187, fill: '#337AFF' },
  { path: 'log', visitors: 173, fill: '#4C8BFF' },
  { path: 'following', visitors: 90, fill: '#669BFF' },
  { path: 'write', visitors: 130, fill: '#7FACFF' },
  { path: 'mypage', visitors: 190, fill: '#99BDFF' },
];

const chartConfig = {
  visitors: {
    label: '방문자 수',
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

export function PageViewsBarChart() {
  return (
    <Card className='flex h-full flex-col justify-between'>
      <CardHeader>
        <CardTitle>페이지 별 방문자 수</CardTitle>
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
              className='md:text-xs xl:text-[0.45rem]'
              dataKey='path'
              type='category'
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={value =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey='visitors' type='number' hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='visitors' layout='vertical' radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='text-sm'>
        지난 7일간의 페이지별 접속자 수
      </CardFooter>
    </Card>
  );
}
