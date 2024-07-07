import React from 'react';
import { auth } from '@/auth/auth';
import { UserProfileCard } from '@/components/Profile/UserProfileCard';
import { notFound } from 'next/navigation';
import { LogViewer } from '../components/LogViewer';
import type { Metadata } from 'next';
import { Comments } from '../components/comments/Comments';
import 'highlight.js/styles/atom-one-dark.css';
import { checkHeadingTags } from '@/utils/checkHeadingTags';
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // fetch data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${params.id}`,
    { next: { tags: ['follow', 'comment', 'modify'] } },
  );

  if (!res.ok) {
    return {};
  }

  const log = await res.json();

  return {
    title: log.title,
    description: `${log.author.nickname}의 로그`,
    keywords: log.tags,
    authors: [{ name: log.author.nickname }],
    category: log.category,
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  //로그인한 사용자 정보 가져오기
  const session = await auth();
  //로그 아이디로 로그 정보 가져오기
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${params.id}`,
    { next: { tags: ['follow', 'comment'] } },
  );
  //로그 정보가 없을 경우 404 페이지로 이동
  if (!res.ok) {
    notFound();
  }
  const log = await res.json();

  //로그 작성자가 작성한 최근 로그 3개 가져오기 - UserProfileCard에서 사용
  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/user/${log.author._id}`,
  );
  const authorRecentLogs = await res2.json();

  //로그의 작성자인지 확인
  const isLogOwner = log.author._id === session?.user.userId;

  //본문에 heading(제목) 이 존재하면 우측에 table of content(목차) 를 보여줌
  const hasHeading = checkHeadingTags(log.logConentHTML);

  //로그 좋아요 눌렀는지 여부 확인
  const isLikedUser = log.likedUsers.includes(session?.user.userId);
  return (
    <div className='main__page'>
      <div className='mt-5 flex gap-16'>
        <UserProfileCard
          author={log.author}
          userId={session?.user.userId}
          isLogOwner={isLogOwner}
          authorRecentLogs={authorRecentLogs}
          isLoggedIn={!!session}
        />
        <div className='flex size-full flex-col'>
          <LogViewer
            log={log}
            hasHeading={hasHeading}
            isLogOwner={isLogOwner}
            isLoggedIn={!!session}
            isLikedUser={isLikedUser}
          />
          <div className='border-neutral-20 my-6 border-t-2' />
          <Comments isLoggedIn={!!session} comments={log.comments} />
        </div>
      </div>
    </div>
  );
};

export default Page;
