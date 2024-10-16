import { Breadcrumbs } from '@/components/Breadcrumb';
import React from 'react';
import { LogsTable } from '@/components/Table/LogsTable';
import { getAllLogs } from './Loader';

const page = async () => {
  const data = await getAllLogs();
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
          ]}
        />
      </div>
      <div className='text-H0M32 px-5'>Logs ({data.length})</div>
      <div className='p-5'>
        <LogsTable data={data} />
      </div>
    </section>
  );
};

export default page;
