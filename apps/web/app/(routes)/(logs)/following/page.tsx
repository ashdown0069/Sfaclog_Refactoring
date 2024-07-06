import { AvatarCategoryBar } from '@/components/Category/AvatarCategoryBar';
import React from 'react';
import { headers } from 'next/headers';
import { LogCard } from '@/components/Card/LogCard';
import type { ILog } from '@/models/Log';
import { MypageNotFound } from '@/(routes)/mypage/components/MypageNotFound';
import { notFound } from 'next/navigation';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const session = await auth();
  if (!session) return redirect('/login');
  //"" 일 경우 팔로잉 유저 전체조회
  const nickname = searchParams.user || '';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/following?user=${nickname}`,
    {
      cache: 'no-cache',
      headers: new Headers(headers()),
    },
  );
  //searchParams
  if (!res.ok) notFound();
  const data = await res.json();

  return (
    <main className='main__page'>
      {/* 팔로잉한 유저가 없을 때 */}
      {data.logs.length === 0 && (
        <div className='flex justify-center items-center mt-32'>
          <MypageNotFound
            title='아직 아무도 팔로잉하지 않았거나 팔로잉한 유저가 글을 작성하지 않았어요'
            description='로그들을 둘러보며 팔로잉할 사람들을 찾아보세요'
            href='/popular'
            LinkLabel='인기로그 바로가기'
          />
        </div>
      )}
      {/* 팔로잉 한 유저가 있을 때 */}
      {data.logs.length > 0 && (
        <>
          <AvatarCategoryBar followingUsers={data.followingUsers} />
          <div className='grid min-w-max grid-cols-3 items-start gap-6'>
            {data.logs.map((log: ILog, idx: number) => (
              <LogCard key={idx} log={log} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
