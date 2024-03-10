'use client';
import React from 'react';
import { MainCarousel } from '@/components/Carousel/MainCarousel';
import Loading from './loadingSpinner';

export default function page() {
  return (
    <main>
      <MainCarousel />
      {/* <Loading /> */}
    </main>
  );
}
