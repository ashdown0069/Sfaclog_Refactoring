'use client';
import { logPublishCategoryList } from '@/constant';
import { ViewerShareBtn } from './ViewerShareBtn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconViewBlack } from '@repo/ui/Icon';
import type { ILog } from '@/models/Log';
interface ViewerHeaderProps {
  log: ILog;
  isLogOwner: boolean;
}

export const ViewerHeader = ({ log, isLogOwner }: ViewerHeaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  //현재 경로에서 /log/[id]를 /write/[id]로 변경
  const pathname = usePathname();
  const logModifyPath = pathname.replace('log', 'write');

  const router = useRouter();
  const handleDeleteLog = async () => {
    if (isLoading) return;
    setIsLoading(() => true);
    const id = pathname.split('/').pop();
    if (!id) return;
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!res.ok) {
        alert('삭제에 실패했습니다.');
      }
    }

    setIsLoading(() => false);
    router.push('/');
  };
  return (
    <div className='mb-5 flex flex-col gap-2'>
      <div className='text-B1B16 text-brand-90'>
        {logPublishCategoryList.find(el => el.value === log.category)?.label}
      </div>
      <div className='text-H0M32 my-1 truncate'>{log.title}</div>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <div className='bg-neutral-90 text-B3R12 mr-[10px] min-w-max rounded-3xl px-3 py-2 text-white'>
            {log.isVisibility === true ? '공개' : '비공개'}
          </div>
          <div className='mx-2 flex items-center gap-1'>
            <div className='size-6'>
              <IconViewBlack />
            </div>
            <div className='text-B2R14 text-text-primary'>{log.views}</div>
          </div>
          <div className='text-B2R14 text-text-gray'>
            {log.createdAt.toString().slice(0, 10)}
          </div>
        </div>
        <div className='text-B1M16  flex items-center gap-[6px]'>
          <ViewerShareBtn />
          {isLogOwner && (
            <>
              <Link
                href={logModifyPath}
                className='text-text-gray hover:text-text-primary cursor-pointer'
              >
                수정
              </Link>
              <button
                onClick={handleDeleteLog}
                className='text-text-gray hover:text-text-primary cursor-pointer'
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
