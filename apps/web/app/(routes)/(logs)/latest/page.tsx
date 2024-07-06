import React from 'react';
import { CategoryBar } from '@/components/Category/CategoryBar';
import { PopularLogTools } from '../components/PopularLogTools';
import { LogCard } from '@/components/Card/LogCard';
import { LoadMoreLogCards } from '../components/LoadMoreLogCards';
import { getLogsData } from '@/utils/getLogsData';
import type { ILog } from '@/models/Log';
import { logsCategoryList, logsSortList } from '@/constant';
import { notFound } from 'next/navigation';
import { FloatingButtons } from '@/components/UniqueBtn/FloatingButtons';
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  console.log(searchParams);

  const logs = await getLogsData(searchParams?.category || 'all', 'latest', 1);
  // console.log('latest logs', logs);
  return (
    <main className='main__page flex flex-col'>
      {/* 상단 카테코리 전체, 프론트엔드, 백엔드 ... */}
      <CategoryBar searchParams={searchParams} sort='latest' />
      {/* 최상단 이동 글쓰기 플로팅 버튼 */}
      <FloatingButtons href='/write' />
      {/* 로그 리스트 */}
      <div className='grid min-w-max grid-cols-3 items-start gap-6'>
        {logs.map((log: ILog) => (
          <LogCard key={log._id} log={log} />
        ))}
      </div>
      <LoadMoreLogCards />
    </main>
  );
}
