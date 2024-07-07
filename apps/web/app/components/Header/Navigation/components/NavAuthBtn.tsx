'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CapsuleButton } from '@repo/ui/Button';
import { NavProfile } from '../NavProfile';
import { NavNotification } from '../NavNotification';
import { NavMessage } from '../NavMessage';

interface NavAuthBtnProps {
  avatar?: string;
  isLoggedin: boolean;
}

export function NavAuthBtn({ avatar, isLoggedin }: NavAuthBtnProps) {
  const [openWidget, setOpenWidget] = useState<
    '알림' | '메시지' | '드롭다운' | null
  >(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = openWidget === '드롭다운';

  const handleOpenWidget = (
    widgetName: '알림' | '메시지' | '드롭다운' | null,
  ) => {
    setOpenWidget(current => (current === widgetName ? null : widgetName));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenWidget(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {isLoggedin && (
        <div className='flex items-center gap-5'>
          <NavProfile
            avatar={avatar}
            isOpen={isOpen}
            onToggle={() => handleOpenWidget('드롭다운')}
          />
        </div>
      )}
      {!isLoggedin && (
        <div className='flex w-[171px] grow items-center gap-2'>
          <CapsuleButton style='outline' size='small'>
            <Link href={'/login'}>로그인</Link>
          </CapsuleButton>
          <CapsuleButton style='solid' size='small'>
            <Link href={'/signup/policy'}>회원가입</Link>
          </CapsuleButton>
        </div>
      )}
    </div>
  );
}
