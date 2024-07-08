import { MyProfileCard } from '@/components/Profile/MyProfileCard';
import { auth } from '@/auth/auth';
import { notFound, redirect } from 'next/navigation';
import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';
import { headers } from 'next/headers';
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect('/login');
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
    method: 'GET',
    headers: new Headers(headers()),
  });
  if (!res.ok) notFound();
  const data = await res.json();
  if (!data.user) {
    return (
      <div className='main__page mt-20 flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className='main__page mt-10 flex gap-10'>
      <MyProfileCard user={data.user} />
      {children}
    </main>
  );
}
