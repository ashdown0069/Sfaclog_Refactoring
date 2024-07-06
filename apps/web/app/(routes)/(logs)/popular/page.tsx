import React from 'react';
import { CategoryBar } from '@/components/Category/CategoryBar';
import { PopularLogTools } from '../components/PopularLogTools';
import { LogCard } from '@/components/Card/LogCard';
import { LoadMoreLogCards } from '../components/LoadMoreLogCards';
import { getLogsData } from '@/utils/getLogsData';
import type { ILog } from '@/models/Log';
import { logsCategoryList } from '@/constant';
import { notFound } from 'next/navigation';
import { FloatingButtons } from '@/components/UniqueBtn/FloatingButtons';
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const searchParamKeys = Object.keys(searchParams);
  const searchParamValue = Object.values(searchParams);

  //searchParams에 category나 sort가 없거나, category가 logsCategoryList에 없는 경우
  //notFound 페이지로 이동
  if (
    searchParamKeys.length > 0 &&
    (!searchParamKeys.some(key => key === 'category' || key === 'sort') ||
      searchParamValue.some(
        value => value && !logsCategoryList.includes(value),
      ))
  ) {
    notFound();
  }
  const logs = await getLogsData(searchParams?.category || 'all', 'popular', 1);

  return (
    <main className='main__page flex flex-col'>
      {/* 상단 카테코리 전체, 프론트엔드, 백엔드 ... */}
      <CategoryBar searchParams={searchParams} sort='popular' />
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
