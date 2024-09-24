import { headers } from 'next/headers';

export const CountNotification = async () => {
  let countNoti = 0;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/mynotifications/count`,
    {
      method: 'GET',
      headers: new Headers(headers()),
      next: { tags: ['notifications'] },
    },
  );
  if (!res.ok) {
    countNoti = 0;
  }
  const result = await res.json();
  countNoti = result.length;

  return countNoti;
};
