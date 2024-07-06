import Link from 'next/link';

interface ProfileFlwFlwerProps {
  followingCount: number;
  followerCount: number;
  LinkUrl: string;
}

export function ProfileFlwFlwer({
  followingCount,
  followerCount,
  LinkUrl,
}: ProfileFlwFlwerProps) {
  return (
    <Link
      href={LinkUrl}
      className='bg-brand-5 relative flex h-[53px] w-full rounded-md'
    >
      <div className='flex basis-1/2 flex-col items-center justify-center gap-[2px] p-[10px]'>
        <div className='text-B1B16 text-brand-90'>{followingCount || 0}</div>
        <div className='text-B5R10 text-neutral-50'>팔로우</div>
      </div>
      <div className='bg-brand-30 absolute left-1/2 top-[10px] h-[33px] w-px rounded-md' />
      <div className='flex basis-1/2 flex-col items-center justify-center gap-[2px] p-[10px]'>
        <div className='text-B1B16 text-brand-90'>{followerCount || 0}</div>
        <div className='text-B5R10 text-neutral-50'>팔로워</div>
      </div>
    </Link>
  );
}
