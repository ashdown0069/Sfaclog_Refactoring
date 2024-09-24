import { headers } from 'next/headers';

export const ModifyNotifications = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/mynotifications/count`,
    {
      method: 'PATCH',
      headers: new Headers(headers()),
    },
  );
  if (!res.ok) {
    return false;
  }
  return true;
};
