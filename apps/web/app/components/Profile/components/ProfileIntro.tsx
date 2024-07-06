import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
interface ProfileIntro {
  username: string;
  userintro: string;
  avatar: string;
  pageUrl: string;
}
export function ProfileIntro({
  avatar,
  username,
  userintro,
  pageUrl,
}: ProfileIntro) {
  const avatarUrl =
    avatar && avatar.length > 0
      ? avatar
      : '/images/DefaultAvatarProfileCard.png';
  return (
    <div className='flex flex-col gap-5 object-cover'>
      <Link href={`/user/${pageUrl}`}>
        <Image
          src={avatarUrl}
          width={205}
          height={205}
          alt='userImage'
          className='size-[205px] rounded-md object-cover'
          priority
          // unoptimized
        />
      </Link>
      <div className='text-text-primary flex flex-col gap-2'>
        <Link href={`/user/${pageUrl}`} className='text-B1B16'>
          {username}
        </Link>
        {userintro && <div className='text-B2R14'>{userintro}</div>}
      </div>
    </div>
  );
}
