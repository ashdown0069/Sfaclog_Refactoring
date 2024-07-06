'use client';
import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ILog } from '@/models/Log';
import { LogCard } from '@/components/Card/LogCard';
export const PopularLogs = ({ logs }: { logs: ILog[] }) => {
  return (
    <section className='mx-auto mt-[60px] flex w-[960px] flex-col gap-8'>
      <SectionHeader title='인기 로그' href='/popular' />
      <div className='grid grid-cols-3 items-start gap-6'>
        {logs.map((log: ILog) => (
          <LogCard key={log._id} log={log} />
        ))}
      </div>
    </section>
  );
};
