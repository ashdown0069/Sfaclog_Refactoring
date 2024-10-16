import { Breadcrumbs } from '@/components/Breadcrumb';
import React from 'react';
import { LogDetail } from './LogDetail';
import { getLogInfo } from '../Loader';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { logId: string } }) => {
  const log = await getLogInfo(params.logId);
  if (!log) return notFound();
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
              title: 'Logs',
              link: '/dashboard/logs',
            },
            {
              title: 'Detail',
              link: `/dashboard/users/${params.logId}`,
            },
          ]}
        />
      </div>
      <div className='p-5'>
        <LogDetail log={log} />
      </div>
    </section>
  );
};

export default page;
