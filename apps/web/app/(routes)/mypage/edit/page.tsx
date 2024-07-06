import React from 'react';
import { ProfileEditForm } from './components/ProfileEditForm';
import { auth } from '@/auth/auth';
import { getUserById } from '@/utils/getUserData';
import { notFound } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
const page = async () => {
  const session = await auth();
  const user = await getUserById(session.user.userId);
  if (!user) notFound();

  const userData = JSON.stringify(user);
  return (
    <div className='main__page flex justify-center'>
      <SessionProvider session={session}>
        <ProfileEditForm user={JSON.parse(userData)} />
      </SessionProvider>
    </div>
  );
};

export default page;
