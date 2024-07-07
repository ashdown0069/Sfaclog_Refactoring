'use client';
import dynamic from 'next/dynamic';
/**
 * 캐러셀이 js가 로딩된 후 조정되기 때문에
 * 클라이언트 사이드 렌더링이 필요
 */
const DynamicMainCarousel = dynamic(() => import('./MainCarousel') as any, {
  ssr: false,
});
export const CarouselWrapper = () => {
  return (
    <>
      <DynamicMainCarousel />
    </>
  );
};
