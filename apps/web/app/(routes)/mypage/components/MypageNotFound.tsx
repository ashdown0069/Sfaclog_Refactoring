import React from 'react';
import Link from 'next/link';
import { NotFoundMyPageItemImg } from '@public/svgs';
interface MypageNotFoundProps {
  title: string;
  description?: string;
  LinkLabel?: string;
  href?: string;
}

/**
 *  @example
 *  <MypageNotFound
 *  title='아직 작성한 로그가 없어요'
 *  description='나만의 로그를 작성해보세요'
 *  LinkLabel='로그 작성하기'
 *  href='#'/>
 */
export function MypageNotFound({
  title,
  description,
  LinkLabel,
  href,
}: MypageNotFoundProps) {
  return (
    <div className='flex w-fit flex-col items-center gap-5'>
      <div className='flex flex-col items-center justify-center gap-[6px]'>
        <div className='text-B1B16 text-neutral-70'>{title}</div>
        {description && (
          <div className='text-B2R14 text-neutral-70'>{description}</div>
        )}
      </div>
      <NotFoundMyPageItemImg className='grayscale' />
      {LinkLabel && href && (
        <Link
          href={href}
          className='text-brand-90 bg-brand-10 text-B3M12 flex items-center justify-center rounded-md px-8 py-2'
        >
          {LinkLabel}
        </Link>
      )}
    </div>
  );
}
