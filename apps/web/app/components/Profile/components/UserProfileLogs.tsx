import React from 'react';
import Link from 'next/link';
import type { ILog } from '@/models/Log';

interface UserProfileLogsProps {
  authorRecentLogs: ILog[];
  pageUrl: string;
}

export function UserProfileLogs({
  authorRecentLogs,
  pageUrl,
}: UserProfileLogsProps) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <span className='text-B1B16 text-text-primary'>최근 작성한 글</span>
        <Link href={`/user/${pageUrl}`}>
          <span className='text-B3R12 text-text-gray'>더보기</span>
        </Link>
      </div>
      <div className='flex flex-col gap-4'>
        {authorRecentLogs.map((log: ILog, idx: number) => (
          <Link href={`/log/${log._id}`} key={idx} className='flex gap-2'>
            <div className='flex flex-col gap-1'>
              <div className='text-B2M14 text-text-primary truncate'>
                {log.title}
              </div>
              <div className='text-B3R12 text-text-secondary'>
                {log.updatedAt.toString().slice(0, 10)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
