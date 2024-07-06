import React from 'react';
import { AuthorCard } from '@/components/Card/AuthorCard';
import { SectionHeader } from './SectionHeader';
export const PopularAuthor = () => {
  return (
    <section className='mx-auto mt-[60px] flex w-[960px] flex-col gap-8'>
      <SectionHeader title='인기 작가' />
      <div className='grid grid-cols-2 gap-4'>
        <AuthorCard />
        <AuthorCard />
        <AuthorCard />
        <AuthorCard />
      </div>
    </section>
  );
};
