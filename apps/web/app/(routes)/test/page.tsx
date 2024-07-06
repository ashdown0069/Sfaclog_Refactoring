import { headers } from 'next/headers';
import React from 'react';

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/auth`, {
    cache: 'no-cache',
    headers: headers(),
  });

  const data = await res.json();
  return (
    <div>
      <div>test page</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default page;
