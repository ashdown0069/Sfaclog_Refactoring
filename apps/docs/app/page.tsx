'use client';
import React from 'react';
import { BoxButton, CapsuleButton } from '@repo/ui/Button';
import { Chip } from '@repo/ui';
export default function page() {
  return (
    <div className='mx-auto my-32'>
      <button className='size-4 animate-spin border'></button>
      <div className='w-28'>
        <Chip size='small'>Chip</Chip>
        <Chip size='small'>Chip</Chip>
        <Chip size='small'>Chip</Chip>
        <Chip size='small'>Chip</Chip>
        <Chip size='large'>Chip</Chip>
      </div>
    </div>
  );
}
