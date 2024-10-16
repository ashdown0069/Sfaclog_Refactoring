'use client';
import { SfaclogLogo } from '@repo/ui/Icon';
import LoadingBackGround from '../public/LoadingBackground.svg';
import LoadingCharacter from '../public/LoadingCharacter.svg';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen w-screen'>
      <div className='flex w-full flex-col items-center justify-center bg-white'>
        <div className='relative'>
          <LoadingBackGround />
          <LoadingCharacter className='absolute left-1 top-1/4' />
        </div>
        <SfaclogLogo className='fill-brand-100  h-32 w-72' />
        <div className='flex w-1/4 flex-col gap-3'>
          <div>
            <Label htmlFor='email' className='pl-1'>
              이메일
            </Label>
            <Input type='email' id='email' placeholder='Email' />
          </div>
          <div>
            <Label htmlFor='email' className='pl-1'>
              비밀번호
            </Label>
            <Input type='password' id='password' placeholder='Password' />
          </div>
          <Button asChild className='bg-brand-70 hover:bg-brand-90'>
            <Link href='/dashboard'>Click Me!</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
