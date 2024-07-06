'use client';
import { updateSearchParams } from '@/utils/updateSearchParams';
import {
  IconTaillessArrowLeftBlack,
  IconTaillessArrowRightBlack,
} from '@repo/ui/Icon';
import React from 'react';
import { useRouter } from 'next/navigation';
interface PaginationProps {
  currentPage: string;
  countAll: number;
  itemsPerPage: number;
}

export const Pagination = ({
  countAll,
  currentPage,
  itemsPerPage,
}: PaginationProps) => {
  const router = useRouter();

  // 전체 페이지 수
  const NumberOfAllPages = Math.ceil(countAll / itemsPerPage); // itemsPerPage 사용

  // 현재 페이지
  let startPage = Math.max(1, parseInt(currentPage) - 2);
  // 페이지 수
  if (startPage + 4 > NumberOfAllPages) {
    startPage = Math.max(1, NumberOfAllPages - 4);
  }

  const pages = Array.from(
    { length: Math.min(5, NumberOfAllPages) },
    (_, i) => startPage + i,
  );

  const handlePageChange =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (newPage: number) => (_event: React.MouseEvent<HTMLButtonElement>) => {
      const newPathname = updateSearchParams('page', newPage.toString());
      router.push(newPathname);
      if (newPage + 2 < NumberOfAllPages) {
        startPage = newPage;
      }
    };
  return (
    <div className='mt-9 flex justify-center gap-4'>
      <button onClick={handlePageChange(1)}>
        <IconTaillessArrowLeftBlack className='stroke-neutral-30 size-5' />
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={handlePageChange(page)}
          className={`${page === parseInt(currentPage) ? 'border-brand-90 text-brand-90' : 'text-text-primary border-transparent'} text-B2R14 flex size-5 items-center justify-center rounded-md border `}
        >
          {page}
        </button>
      ))}
      <button onClick={handlePageChange(NumberOfAllPages)}>
        <IconTaillessArrowRightBlack className='stroke-neutral-30 size-5' />
      </button>
    </div>
  );
};
