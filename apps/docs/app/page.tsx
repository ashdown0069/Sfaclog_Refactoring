'use client';
import React from 'react';
import { BoxButton, CapsuleButton } from '@repo/ui/Button';
import { Chip } from '@repo/ui';
export default function page() {
  return (
    <div className='mx-auto my-32'>
      <BoxButton label='dsad' type='button' size='middle' style='solid' />
      <CapsuleButton
        type='button'
        style='solid'
        label='Capsule Button'
        size='large'
      />
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
