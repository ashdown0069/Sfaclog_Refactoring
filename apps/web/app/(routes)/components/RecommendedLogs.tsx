'use client';
import React from 'react';
import { SectionHeader } from './SectionHeader';
import type { ILog } from '@/models/Log';
import { LogCard } from '@/components/Card/LogCard';

export const RecommendedLogs = ({ logs }: { logs: ILog[] }) => {
  return (
    <section className='mx-auto mt-[60px] flex w-[960px] flex-col gap-8'>
      <SectionHeader title='추천 로그' />
      <div className='grid grid-cols-3 items-start gap-6'>
        {logs.map((log: ILog) => (
          <LogCard key={log._id} log={log} />
        ))}
      </div>
    </section>
  );
};
