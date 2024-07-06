import Link from 'next/link';
import Image from 'next/image';
import { Avatar } from '@/components/Avatar/Avatar';
import type { ILog } from '@/models/Log';
interface RecommendLogsProps {
  logs: ILog[];
}

export const RecommendLogs = ({ logs }: RecommendLogsProps) => {
  return (
    <div className='shadow-custom flex h-fit !w-[245px] shrink-0 flex-col rounded-md px-5 py-6 pb-2'>
      <span className='text-B1B16 text-text-primary'>함께 보면 좋은 로그</span>
      <ul className='group'>
        {logs.map((log: ILog) => (
          <li
            key={log._id}
            className='flex flex-col gap-[10px] border-b py-4 last:border-none'
          >
            <Link
              href={`/log/${log._id}`}
              className='text-B3R12 text-text-gray'
            >
              <div className='text-B2R14 text-text-primary truncate'>
                {log.title}
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[6px]'>
                  {log.author.avatar ? (
                    <div className='relative size-5 overflow-hidden rounded-full'>
                      <Image
                        src={log.author.avatar}
                        fill
                        objectFit='cover'
                        alt='avatar'
                      />
                    </div>
                  ) : (
                    <Avatar size='s' />
                  )}
                  <span className='text-B3R12'>{log.author.nickname}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
