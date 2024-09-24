import Image from 'next/image';
import { LogCardContainer } from './components/CardContainers';
import { CardCategory } from './components/CardCategory';
import { CardTitle } from './components/CardTitle';
import { Avatar } from '../Avatar/Avatar';
import { CardViews } from './components/CardViews';
import { CardLikes } from './components/CardLikes';
import { CardDate } from './components/CardDate';
import Link from 'next/link';
import { ILog } from '@/models/Log';
import { extractTextFromHTML } from '@/utils/extractTextFromHTML';

interface LogCardProps {
  log: ILog;
}

export function LogCard({ log }: LogCardProps) {
  //썸네일을 등록하지 않았다면 글내용 미리보기
  const altThumbnail__ContentTitle = log.title; //로그 타이틀
  const altThumbnail__ContentText = extractTextFromHTML(log.logConentHTML);

  return (
    <LogCardContainer>
      <Link href={`/log/${log._id}`} className='flex flex-col gap-2'>
        <div className='size-[280px] overflow-hidden rounded-md'>
          {log.thumbnail == '' ? (
            <div className='flex size-full flex-col p-2'>
              <div className='text-B2B14'>{altThumbnail__ContentTitle}</div>
              <div className='text-B2M14'>{altThumbnail__ContentText}</div>
            </div>
          ) : (
            <Image
              src={log.thumbnail}
              width={280}
              height={280}
              className='size-full object-cover'
              alt='thumbnail'
            />
          )}
        </div>
        <div className='flex w-full items-start justify-between'>
          <CardCategory category={log.category} />
          <CardDate date={log.createdAt.toString()} />
        </div>
        <div>
          <CardTitle title={log.title} />
        </div>
      </Link>
      <Link
        href={`/user/${log.author.pageUrl}`}
        className='flex w-full justify-between py-2'
      >
        <div className='flex w-full justify-between'>
          <div className='flex items-center gap-2'>
            <Avatar size='xs' url={log.author.avatar || undefined} />
            <span className='text-B3R12 hover:underline'>
              {log?.author?.nickname}
            </span>
          </div>
          <div className='flex gap-3'>
            <CardViews count={log.views} />
            <CardLikes count={log.likes} />
          </div>
        </div>
      </Link>
    </LogCardContainer>
  );
}
