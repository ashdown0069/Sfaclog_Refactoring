import React from 'react';
import { Chip } from '@repo/ui';
export function PopularSearchTerms() {
  return (
    <div className='flex flex-col pt-2'>
      <div className='text-B1M16'>인기검색어</div>
      <div className='mt-3 flex w-56 flex-wrap gap-2'>
        <Chip size='small'>개발자</Chip>
        <Chip size='small'>js</Chip>
        <Chip size='small'>부트캠프</Chip>
        <Chip size='small'>Spring boot</Chip>
        <Chip size='small'>React</Chip>
        <Chip size='small'>Next.js</Chip>
      </div>
    </div>
  );
}
