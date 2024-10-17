'use client';
import React from 'react';
import { Button } from './ui/button';

export const ExternalLink = ({
  url,
  label,
}: {
  url: string;
  label: string;
}) => {
  return (
    <Button
      variant='ghost'
      asChild
      className='bg-brand-70 hover:bg-brand-90 text-white hover:text-white'
    >
      <a target='_blank' href={url}>
        {label}
      </a>
    </Button>
  );
};
