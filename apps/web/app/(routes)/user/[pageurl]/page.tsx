import { MypageNotFound } from '@/(routes)/mypage/components/MypageNotFound';
import { LogCard } from '@/components/Card/LogCard';
import { Pagination } from '@/components/Pagination/Pagination';
import type { ILog } from '@/models/Log';

export default async function Page({
  params,
  searchParams,
}: {
  params: { pageurl: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page || '1';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${params.pageurl}/pagination?page=${page}`,
  );
  const data = await res.json();
  return (
    <>
      <section>
        {data.logs.length > 0 && (
          <>
            <div className='grid min-w-max grid-cols-2 items-start gap-6'>
              {data.logs.map((log: ILog, idx: number) => (
                <LogCard key={idx} log={log} />
              ))}
            </div>
            <Pagination
              countAll={data.length}
              currentPage={page}
              itemsPerPage={6}
            />
          </>
        )}
      </section>
      {data.logs.length === 0 && (
        <div className='mx-auto flex items-center justify-center'>
          <MypageNotFound
            title='유저가 로그를 작성하지 않았어요.'
            LinkLabel='메인 페이지'
            href='/'
          />
        </div>
      )}
    </>
  );
}
