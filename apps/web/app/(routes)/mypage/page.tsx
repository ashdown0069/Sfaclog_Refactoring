import React from 'react';
import { MyPageCategory } from './components/MyPageCategory';
import { MyLogs } from './components/myLogs/MyLogs';
import { myPageCategoryList } from '@/constant';
import { notFound } from 'next/navigation';
import { MyComments } from './components/myComments/MyComments';
import { MyBookmarks } from './components/myBookmarks/MyBookmarks';
import { Pagination } from '@/components/Pagination/Pagination';
import { headers } from 'next/headers';
import Notifications from './components/myNotifications/Notifications';
async function MyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const category = searchParams.category || 'mylogs';
  const page = searchParams.page || '1';

  //searchParams의 category의 값이 myPageCategoryList에 있는지 확인
  const isPass = myPageCategoryList.some(item => item.category === category);
  if (!isPass) {
    //searchParams에 category가 myPageCategoryList에 없는 경우
    notFound();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/${category}?page=${page}`,
    {
      method: 'GET',
      headers: new Headers(headers()),
      next: { tags: ['comment', 'like', 'newLog', 'modify'] },
    },
  );
  if (!res.ok) {
    notFound();
  }
  const data = await res.json();
  console.log(data);
  return (
    <div className='flex w-full flex-col'>
      <h1 className='text-primary text-H1M24 mb-8'>나의 활동</h1>
      <MyPageCategory category={category} />
      {category === 'mylogs' && <MyLogs logs={data.logs} />}
      {category === 'mycomments' && (
        <MyComments commentsAndReplies={data.comments} />
      )}
      {category === 'mybookmarks' && <MyBookmarks logs={data.logs} />}
      {category === 'mynotifications' && (
        <Notifications notifications={data.notifications} />
      )}
      {data.length !== 0 && (
        <Pagination
          currentPage={page}
          countAll={data.length}
          itemsPerPage={6}
        />
      )}
    </div>
  );
}

export default MyPage;
