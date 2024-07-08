'use client';
import './Category.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  IconTaillessArrowLeftBlack,
  IconTaillessArrowRightBlack,
} from '@repo/ui/Icon';
import Link from 'next/link';
import type { IUser } from '@/models/User';
import { Avatar } from '../Avatar/Avatar';
import { useState } from 'react';

interface AvatarCategoryBarProps {
  followingUsers: IUser[];
}

export const AvatarCategoryBar = ({
  followingUsers,
}: AvatarCategoryBarProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        slidesPerView={'auto'}
        slidesPerGroup={3}
        observer
        speed={600}
        navigation={{
          prevEl: '.avatarCategory-prev',
          nextEl: '.avatarCategory-next',
        }}
        className='mb-7 mt-14'
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
        }}
      >
        <SwiperSlide className='!w-fit'>
          <Link href={`/following`}>
            <Avatar size='l' type='all' />
            <div className='text-center mt-2 text-B3R12'>전체</div>
          </Link>
        </SwiperSlide>
        {followingUsers.map((user, idx) => (
          <SwiperSlide key={idx} className='!w-fit'>
            <Link href={`/following?user=${user.nickname}`}>
              <Avatar size='l' type='user' url={user.avatar || undefined} />
              <div className='text-center mt-2 text-B3R12'>{user.nickname}</div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className='avatarCategory-prev'
        style={{
          display: isBeginning ? 'none' : 'flex',
        }}
      >
        <IconTaillessArrowLeftBlack className='stroke-neutral-90 size-5' />
      </button>
      <button className='avatarCategory-next'>
        <IconTaillessArrowRightBlack className='stroke-neutral-90 size-5' />
      </button>
    </div>
  );
};
