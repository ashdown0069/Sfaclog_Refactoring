import React from 'react';

export function ProfileContainer({ children }: { children: React.ReactNode }) {
  return (
    <aside className='shadow-custom flex h-fit !w-[245px] shrink-0 flex-col rounded-md p-5'>
      {children}
    </aside>
  );
}
