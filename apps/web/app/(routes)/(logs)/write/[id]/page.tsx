import { auth } from '@/auth/auth';
import { LogEditor } from '../components/LogEditor';
import { notFound } from 'next/navigation';
const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session.user) return null;
  //로그 아이디로 로그 정보 가져오기
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/${params.id}`,
  );
  //로그 정보가 없을 경우 404 페이지로 이동
  if (!res.ok) {
    notFound();
  }
  const log = await res.json();
  return (
    <div className='mx-auto w-full max-w-[960px]'>
      <LogEditor
        logContent={log.content}
        logTags={log.tags}
        logTitle={log.title}
        logCategory={log.category}
        isVisibility={log.isVisibility}
        logThumbnail={log.thumbnail}
      />
    </div>
  );
};

export default Page;
