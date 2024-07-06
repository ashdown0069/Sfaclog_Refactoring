import React from 'react';
import Link from 'next/link';
import { myPageCategoryList } from '@/constant';

export function MyPageCategory({ category = 'my-log' }: { category?: string }) {
  return (
    <div className='mb-[30px] flex gap-[25px]'>
      {myPageCategoryList &&
        myPageCategoryList.map((item, idx) => (
          <Link
            key={idx}
            href={`/mypage?category=${item.category}`}
            className={`${item.category === category ? 'text-B1B16 text-brand-90' : 'text-B1R16 text-neutral-40'}`}
          >
            {item.title}
          </Link>
        ))}
    </div>
  );
}
