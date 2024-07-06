import { auth } from '@/auth/auth';
import { UserProfileCard } from '@/components/Profile/UserProfileCard';
import { ExtendedSession } from '@/types/next-auth';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageurl: string };
}) {
  const session: ExtendedSession = await auth();
  //GET api/user/[pageurl]
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${params.pageurl}`,
    { method: 'GET', headers: new Headers(headers()), cache: 'no-cache' },
  );
  if (!res.ok) notFound();
  const data = await res.json();

  //profile card의 유저와 현재로그인한 유저가 같은지 판별
  const isLogOwner = session?.user?.userId === data.user._id;
  //로그인 여부
  const isLoggedIn = !!session;
  return (
    <main className='main__page flex mt-5 gap-[83px]'>
      <UserProfileCard
        author={data.user}
        isLogOwner={isLogOwner}
        userId={data.user._id}
        authorRecentLogs={data.logs}
        isLoggedIn={isLoggedIn}
      />
      {children}
    </main>
  );
}
