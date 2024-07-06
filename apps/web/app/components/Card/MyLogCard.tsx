'use client';
import { ILog } from '@/models/Log';
import { MylogCardContainer } from './components/CardContainers';
import { IconChatBlack, IconHeartBlack, IconViewBlack } from '@repo/ui/Icon';
import { CountComments } from '@/utils/formatUtils';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export const MyLogCard = ({ log }: { log: ILog }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDeleteLog = async () => {
    if (isLoading) return;
    setIsLoading(() => true);
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${log._id}`,
        {
          method: 'DELETE',
        },
      );

      if (!res.ok) {
        alert('삭제에 실패했습니다.');
      }
    }
    setIsLoading(() => false);
    router.refresh();
  };
  return (
    <MylogCardContainer>
      <Link href={`/log/${log._id}`}>
        <div className='flex flex-col justify-center gap-3'>
          <div className='text-H2M20 truncate'>{log.title}</div>
          <div className='text-B3M12 flex gap-2'>
            <div className='text-text-point min-w-[40px]'>{log.category}</div>
            <div className='flex min-w-[33px] gap-1'>
              <IconViewBlack className='size-4' />
              <div>{log.views}</div>
            </div>
            <div className='flex min-w-[33px] gap-1'>
              <IconHeartBlack className='size-4' />
              <div>{log.likes}</div>
            </div>
            <div className='flex min-w-[33px] gap-1'>
              <IconChatBlack className='size-4' />
              <div>{CountComments(log.comments)}</div>
            </div>
            <div>{log.createdAt.toString().slice(0, 10)}</div>
            <div>{log.isVisibility ? '공개' : '비공개'}</div>
          </div>
        </div>
      </Link>
      <div className='text-B1M16 flex items-center justify-center gap-2'>
        <Link
          href={`/write/${log._id}`}
          className='text-text-gray hover:text-text-point'
        >
          수정
        </Link>
        <button
          onClick={handleDeleteLog}
          className='text-text-gray hover:text-text-point'
        >
          삭제
        </button>
      </div>
    </MylogCardContainer>
  );
};
