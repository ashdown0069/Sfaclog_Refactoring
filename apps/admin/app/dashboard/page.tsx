import { Breadcrumbs } from '@/components/Breadcrumb';
import { PageViewsBarChart } from '@/components/chart/PageViews-BarChart';
import { SubscriberCountLineChart } from '@/components/chart/SubscriberCount-LineChart';
import { SearchKeywords } from '@/components/chart/SearchKeywords';
import { TimeOnPageBarChart } from '@/components/chart/TimeOnpage-BarChart';
import { UserTypePieChart } from '@/components/chart/UserType-PieChart';
import { VisitorCountBarChart } from '@/components/chart/VisitorCount-BarChart';

import React from 'react';

const page = () => {
  return (
    <section className='p-3'>
      <div className='p-5'>
        <Breadcrumbs
          items={[
            {
              title: 'Dashboard',
              link: '/dashboard',
            },
            {
              title: 'Chart is mock-up, Only Users and Logs is real data',
              link: '/MockData',
            },
          ]}
        />
      </div>
      <div className='grid p-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        <div className='p-3'>
          <VisitorCountBarChart />
        </div>
        <div className='p-3'>
          <SubscriberCountLineChart />
        </div>
        <div className='p-3'>
          <UserTypePieChart />
        </div>
        <div className='p-3'>
          <PageViewsBarChart />
        </div>
        <div className='p-3'>
          <TimeOnPageBarChart />
        </div>
        <div className='p-3'>
          <SearchKeywords />
        </div>
      </div>
    </section>
  );
};

export default page;
