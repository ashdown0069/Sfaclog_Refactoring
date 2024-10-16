import { Header } from '@/components/Header/Header';
import React from 'react';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
