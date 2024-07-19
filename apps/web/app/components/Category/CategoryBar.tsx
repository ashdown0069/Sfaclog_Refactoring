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
import { CapsuleButton } from '@repo/ui/Button';
import Link from 'next/link';
import { useState } from 'react';
const TOPBAR_CATEGORY_LIST = [
  {
    id: '1',
    value: 'all',
    label: '전체',
  },
  {
    id: '2',
    value: 'frontend',
    label: '프론트엔드',
  },
  {
    id: '3',
    value: 'backend',
    label: '백엔드',
  },
  {
    id: '4',
    value: 'data',
    label: '데이터분석',
  },
  {
    id: '5',
    value: 'db',
    label: '데이터베이스',
  },
  {
    id: '6',
    value: 'ios',
    label: 'IOS 개발',
  },
  {
    id: '7',
    value: 'android',
    label: '안드로이드 개발',
  },
  {
    id: '8',
    value: 'ai',
    label: '인공지능',
  },
  {
    id: '9',
    value: 'game',
    label: '게임 개발',
  },
  {
    id: '10',
    value: 'embedded',
    label: '임베디드',
  },
  {
    id: '11',
    value: 'security',
    label: '보안',
  },
  {
    id: '12',
    value: 'etc',
    label: '기타',
  },
];
/**
 * searchParams를 받아서 카테고리 선택상태를 유지
 * /popular?category=frontend 의 경우 frontend 카테고리가 선택되어있는 상태로 유지
 */
export const CategoryBar = ({
  searchParams,
  sort,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  sort: 'popular' | 'latest';
}) => {
  const selectedClasses = '!bg-brand-90 !text-text-white';
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
          prevEl: '.category-prev',
          nextEl: '.category-next',
        }}
        className='mb-7 mt-14'
        onSlideChange={swiper => {
          setIsBeginning(swiper.isBeginning);
        }}
      >
        {TOPBAR_CATEGORY_LIST.map(category => (
          <SwiperSlide key={category.id} className='!w-fit'>
            <Link href={`/${sort}?category=${category.value}`}>
              <CapsuleButton
                size='medium'
                style='outline'
                className={`hover:bg-brand-90 hover:text-text-white ${Object.keys(searchParams).length == 0 && category.value === 'all' ? selectedClasses : searchParams && searchParams.category === category.value ? selectedClasses : ''}`}
              >
                {/* className => searchParams이 없으면 전체 선택 효과, 존재할경우에는 현재searchParams에 의해 선택효과 */}
                {category.label}
              </CapsuleButton>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className='category-prev flex justify-center'
        style={{
          display: isBeginning ? 'none' : 'flex',
        }}
      >
        <IconTaillessArrowLeftBlack className='stroke-neutral-90 size-5' />
      </button>
      <button className='category-next'>
        <IconTaillessArrowRightBlack className='stroke-neutral-90 size-5' />
      </button>
    </div>
  );
};
