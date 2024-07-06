import React from 'react';
import { SearchResult } from './components/SearchResult';

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const query = searchParams.query || '';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?query=${searchParams.query}`,
  );
  const data = await res.json();
  return (
    <div className='mt-14 main__page'>
      <SearchResult query={query} data={data} />
    </div>
  );
}
