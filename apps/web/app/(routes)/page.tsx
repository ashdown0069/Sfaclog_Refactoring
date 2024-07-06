import React from 'react';
import { PopularLogs } from './components/PopularLogs';
import Footer from '@/components/Footer/Footer';
import { RecommendedLogs } from './components/RecommendedLogs';
// import { CarouselWrapper } from '@/components/Carousel/CarouselWrapper';
export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/main`, {
    cache: 'no-cache',
  });
  const data = await res.json();
  return (
    <>
      {/* <CarouselWrapper /> */}
      <main className='main__page'>
        <PopularLogs logs={data.popularLogs} />
        <RecommendedLogs logs={data.recommendLogs} />
      </main>
      <Footer />
    </>
  );
}
