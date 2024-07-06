'use server';

//페이지네이션 기능 필요할 때 사용
export const getLogsData = async (
  category: string = 'all',
  sortingType: 'popular' | 'latest' | 'oldest',
  page: number = 1,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/pagination?page=${page}&sort=${sortingType}&category=${category}`,
      { cache: 'no-cache' },
    );
    if (!response.ok) {
      throw new Error('server error');
    }
    const logs = await response.json();
    return logs.logs;
  } catch (e: any) {
    return [];
  }
};

export const getLogData = async (logId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${logId}`,
      { cache: 'no-cache' },
    );
    if (!response.ok) {
      throw new Error('server error');
    }
    const log = await response.json();
    return log;
  } catch (e: any) {
    return null;
  }
};
