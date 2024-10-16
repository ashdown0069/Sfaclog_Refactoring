'use client';
import { LabelList, Pie, PieChart } from 'recharts';

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
  { userType: 'user', visitors: 200, fill: '#4C8BFF' },
  { userType: 'guest', visitors: 275, fill: '#f55252' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  guest: {
    label: 'Guest',
    color: 'hsl(var(--chart-1))',
  },
  user: {
    label: 'User',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function UserTypePieChart() {
  return (
    <Card className='flex h-full flex-col justify-between'>
      <CardHeader className='justify-evenly pb-0'>
        <CardTitle>접속 유저 유형</CardTitle>
        <CardDescription>2024. 1. 1 ~ 2024. 1. 7</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey='userType' hideLabel />}
            />
            <Pie data={chartData} dataKey='visitors'>
              <LabelList
                position='top'
                dataKey='userType'
                className='fill-background text-white'
                stroke='none'
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='text-sm'>지난 7일간의 접속자 유형</CardFooter>
    </Card>
  );
}
