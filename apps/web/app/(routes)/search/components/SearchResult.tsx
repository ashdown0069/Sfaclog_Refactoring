'use client';
import { LogCard } from '@/components/Card/LogCard';
import { UserCard } from '@/components/Card/UserCard';
import { SearchBar } from '@/components/Modal/Search/SearchBar';
import type { ILog } from '@/models/Log';
import type { IUser } from '@/models/User';
import React, { useState } from 'react';
interface Idata {
  logs: ILog[];
  users: IUser[];
  length: number;
}
interface SearchResultProps {
  query: string;
  data: Idata;
}

export function SearchResult({ query, data }: SearchResultProps) {
  const [category, setCategory] = useState<'log' | 'user'>('log');

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='mb-6 flex'>
        <SearchBar />
      </div>
      <div className='text-B1B16 text-text-primary mb-2'>
        &apos;<span className='text-text-point'>{query}</span>
        &apos; 에 대한 검색 결과
      </div>
      {data.length !== 0 && (
        <div>총 {data.length}개의 결과를 발견하였습니다.</div>
      )}
      {data.length === 0 && <div>검색 결과가 존재하지 않습니다.</div>}
      <div className='text-B1M16 w-full flex my-4 justify-start gap-2'>
        <button
          onClick={() => setCategory(() => 'log')}
          type='button'
          className={`${category == 'log' ? 'text-text-point' : 'text-text-secondary'}`}
        >
          로그&#40;{data.logs.length}&#41;
        </button>
        <button
          onClick={() => setCategory(() => 'user')}
          type='button'
          className={`${category == 'user' ? 'text-text-point' : 'text-text-secondary'}`}
        >
          유저&#40;{data.users.length}&#41;
        </button>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        {category === 'log' &&
          data.logs.length > 0 &&
          data.logs.map((log, idx) => <LogCard key={idx} log={log} />)}
        {category === 'user' &&
          data.users.length > 0 &&
          data.users.map((user, idx) => <UserCard key={idx} user={user} />)}
      </div>
    </section>
  );
}
