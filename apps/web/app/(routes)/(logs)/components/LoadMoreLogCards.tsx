'use client';
import { LogCard } from '@/components/Card/LogCard';
import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';
import { ILog } from '@/models/Log';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

let page = 2;
export const LoadMoreLogCards = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false); //더이상 로그가 없을때
  const [data, setData] = useState<ILog[]>([]); //로그 데이터

  const { ref, inView } = useInView({
    rootMargin: '0px 0px 100px 0px',
  }); //무한스크롤 훅
  const searchParams = useSearchParams();
  const sortingType = searchParams.get('sort') || 'popular';
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    //카테고리나 정렬방식이 바뀌면 초기화
    setData(() => []);
    setIsEmpty(() => false);
    page = 2;
  }, [sortingType, category]);

  useEffect(() => {
    //무한스크롤, 로그 더 불러오기
    const delay = 500;
    if (inView && !isEmpty) {
      setIsLoading(() => true);
      const timeout = setTimeout(() => {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/pagination?page=${page}&sort=${sortingType}&category=${category}`;
        fetch(url, { cache: 'no-cache' })
          .then(res => res.json())
          .then(res => {
            if (res.logs.length === 0) setIsEmpty(() => true);
            setData(state => [...state, ...res.logs]);
            setIsLoading(() => false);
            page++;
          });
        setIsLoading(() => false);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [inView, setData, page, sortingType, category, isEmpty]);

  return (
    <>
      <div className='mt-6 grid min-w-max grid-cols-3 items-start gap-6'>
        {data.map((log: ILog) => (
          <LogCard key={log._id} log={log} />
        ))}
      </div>
      <div ref={ref}>
        <div className='mt-6 flex justify-center'>
          {inView && isLoading && <LoadingSpinner />}
        </div>
      </div>
    </>
  );
};
