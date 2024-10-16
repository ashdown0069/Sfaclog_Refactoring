import { Breadcrumbs } from '@/components/Breadcrumb';
import React from 'react';
import { UserTable } from '@/components/Table/UserTable';
import { getAllUsers } from './Loader';

const page = async () => {
  const data = await getAllUsers();
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
              title: 'Users',
              link: '/dashboard/users',
            },
          ]}
        />
      </div>
      <div className='text-H0M32 px-5'>User ({data.length})</div>
      <div className='p-5'>
        <UserTable data={data} />
      </div>
    </section>
  );
};

export default page;
