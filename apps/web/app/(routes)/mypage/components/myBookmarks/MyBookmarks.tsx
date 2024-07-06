import { ILog } from '@/models/Log';
import React from 'react';
import { MypageNotFound } from '../MypageNotFound';
import { MyLogCard } from '@/components/Card/MyLogCard';
import { LogCard } from '@/components/Card/LogCard';

interface MyBookmarksProps {
  logs: ILog[];
}
export const MyBookmarks = ({ logs }: MyBookmarksProps) => {
  return (
    <section className='size-full'>
      {logs.length === 0 && (
        <div className='flex size-full items-center justify-center'>
          <MypageNotFound
            title='좋아요를 누른 로그가 없어요.'
            description='관심있는 로그에 좋아요 버튼을 눌러보세요'
            LinkLabel='인기로그 바로가기'
            href='/popular'
          />
        </div>
      )}
      {logs.length > 0 && (
        <div className='flex flex-wrap gap-3'>
          {logs.map(log => (
            <LogCard key={log._id} log={log} />
          ))}
        </div>
      )}
    </section>
  );
};
