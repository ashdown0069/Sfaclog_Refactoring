import { MyLogCard } from '@/components/Card/MyLogCard';
import React from 'react';
import type { ILog } from '@/models/Log';
import { MypageNotFound } from '../MypageNotFound';

interface MyLogsProps {
  logs: ILog[];
}
export const MyLogs = async ({ logs }: MyLogsProps) => {
  return (
    <section className='size-full'>
      {logs.length === 0 && (
        <div className='flex size-full items-center justify-center'>
          <MypageNotFound
            title='아직 작성한 로그가 없어요.'
            description='나만의 로그를 작성해보세요'
            LinkLabel='로그 작성하기'
            href='/write'
          />
        </div>
      )}
      {logs.length > 0 && (
        <div className='flex flex-wrap gap-3'>
          {logs.map(log => (
            <MyLogCard key={log._id} log={log} />
          ))}
        </div>
      )}
    </section>
  );
};
