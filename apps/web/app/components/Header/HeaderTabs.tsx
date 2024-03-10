'use client';
import React, { Fragment } from 'react';
import { SfaclogLogo } from '@repo/ui/Icon';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
interface HeaderTabsProps {
  defaultSelectedTabIndex?: number;
  onChange?: (index: number) => void;
}

export function HeaderTabs({
  defaultSelectedTabIndex,
  onChange,
}: HeaderTabsProps) {
  return (
    <Tab.Group defaultIndex={defaultSelectedTabIndex} onChange={onChange}>
      <Tab.List className={'relative flex items-center justify-center'}>
        <Tab as={Fragment}>
          <Link href={'#'}>
            <div className='ui-selected:z-10  ui-selected:bg-white ui-not-selected:bg-neutral-10 absolute left-0 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md p-[10px] outline-none duration-300 ease-in-out'>
              <SfaclogLogo className='fill-brand-100 ui-not-selected:fill-neutral-40 h-[13px] w-[79px] duration-300 ease-in-out' />
            </div>
          </Link>
        </Tab>
        <Tab as={Fragment}>
          <Link href={'#'}>
            <div className='ui-selected:z-10 ui-selected:bg-white ui-not-selected:bg-neutral-10 absolute left-24 mt-[6px] inline-flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-t-md p-[10px] outline-none duration-300 ease-in-out'>
              <SfaclogLogo className='fill-brand-100 ui-not-selected:fill-neutral-40 h-[13px] w-[79px] duration-300 ease-in-out' />
            </div>
          </Link>
        </Tab>
      </Tab.List>
    </Tab.Group>
  );
}
