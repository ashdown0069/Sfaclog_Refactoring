import { Breadcrumbs } from '@/components/Breadcrumb';
import React from 'react';
import { UserDetail } from './UserDetail';
import { getUserInfo } from '../Loader';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { userId: string } }) => {
  const userInfo = await getUserInfo(params.userId);
  if (Object.keys(userInfo).length === 0) notFound();
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
            {
              title: 'Detail',
              link: `/dashboard/users/${params}`,
            },
          ]}
        />
      </div>
      <div className='p-5'>
        <UserDetail userInfo={userInfo} />
      </div>
    </section>
  );
};

export default page;
