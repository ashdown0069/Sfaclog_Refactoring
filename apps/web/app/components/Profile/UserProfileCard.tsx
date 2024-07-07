import {
  Hr,
  ProfileContainer,
  ProfileIntro,
  ProfileSNS,
  ProfileCareer,
  ProfileFlwFlwer,
  UserProfileLogs,
} from './components';
import type { IUser } from '@/models/User';
import { UserFollowBtn } from './components/UserFollowBtn';
import type { ILog } from '@/models/Log';

interface UserProfileProps {
  author: IUser;
  isLogOwner: boolean; //유저가 생성한 로그들을 모두보여줄땐 false로 설정
  userId: string;
  authorRecentLogs: ILog[] | [];
  isLoggedIn?: boolean;
}
//id following follower nickname avatar intro sns career 만 가져옴
export async function UserProfileCard({
  author,
  isLogOwner,
  authorRecentLogs,
  userId,
  isLoggedIn = false,
}: UserProfileProps) {
  //ProfileFlwFlwer를 클릭했을 때 소유자면 마이페이지로,
  const LinkUrl = isLogOwner ? '/mypage/follow' : `#`;
  const isFollowing = author.follower.includes(userId);

  return (
    <ProfileContainer>
      <div className='flex flex-col gap-5'>
        <ProfileIntro
          username={author.nickname}
          userintro={author.intro}
          avatar={author.avatar}
          pageUrl={author.pageUrl}
        />
        <ProfileFlwFlwer
          LinkUrl={LinkUrl}
          followingCount={author.following.length}
          followerCount={author.follower.length}
        />
        {!isLogOwner && (
          <UserFollowBtn
            nickname={author.nickname}
            isFollowing={isFollowing}
            isLoggedIn={isLoggedIn}
          />
        )}
      </div>

      {Object.entries(author.sns).length > 0 && (
        <>
          <Hr />
          <ProfileSNS sns={author.sns} />
        </>
      )}
      {author.career.length > 0 && (
        <>
          <Hr />
          <ProfileCareer career={author.career} />
        </>
      )}

      {authorRecentLogs.length > 0 && (
        <>
          <Hr />
          <UserProfileLogs
            pageUrl={author.pageUrl}
            authorRecentLogs={authorRecentLogs}
          />
        </>
      )}
    </ProfileContainer>
  );
}
