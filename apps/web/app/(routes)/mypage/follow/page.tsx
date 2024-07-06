import { auth } from '@/auth/auth';
import { Follow } from '@/components/Follow/Follow';
import { Pagination } from '@/components/Pagination/Pagination';

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await auth();
  const { userId } = session.user;
  //following || followers
  const filter = searchParams.filter || 'following';
  const page = searchParams.page || '1';
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/follow/${userId}?filter=${filter}&page=${page}`,
  );

  const data = await res.json();

  return (
    <div className='main__page'>
      <Follow
        users={data.follow}
        followingCount={data.followingCount}
        followerCount={data.followerCount}
        filter={filter}
      />
      {data.follow.length > 0 && (
        <>
          <Pagination
            countAll={data.follow.length}
            currentPage={page}
            itemsPerPage={10}
          />
        </>
      )}
    </div>
  );
}

export default page;
