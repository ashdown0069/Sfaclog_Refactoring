import { MyProfileCard } from '@/components/Profile/MyProfileCard';
import { getUserById } from '@/utils/getUserData';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect('/login');
  const user = await getUserById(session.user.userId);

  return (
    <main className='main__page mt-20 flex gap-[83px]'>
      {user && <MyProfileCard user={user} />}
      {children}
    </main>
  );
}
