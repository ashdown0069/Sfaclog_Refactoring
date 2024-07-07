import type { IUser } from '@/models/User';
import {
  ProfileContainer,
  ProfileIntro,
  Hr,
  ProfileFlwFlwer,
  MyProfileHeader,
  ProfileCareer,
  MyProfileLink,
  ProfileSNS,
} from './components';
import { MyProfileLogout } from './components/MyProfileLogout';

export async function MyProfileCard({ user }: { user: IUser }) {
  return (
    <ProfileContainer>
      <MyProfileHeader updateMyPofileLink='/mypage/edit' />
      <ProfileIntro
        username={user.nickname}
        userintro={user.intro}
        avatar={user.avatar}
        pageUrl={user.pageUrl}
      />
      <div className='mt-6'>
        <ProfileFlwFlwer
          LinkUrl='/mypage/follow'
          followingCount={user.following.length}
          followerCount={user.follower.length}
        />
      </div>
      {user.career.length > 0 && (
        <>
          <Hr />
          <ProfileCareer career={user.career} />
        </>
      )}
      {user.sns.length > 0 && (
        <>
          <Hr />
          <ProfileSNS sns={user.sns} />
        </>
      )}
      <Hr />
      <div className='flex flex-col gap-3'>
        <div className='text-B1B16'>나의 활동</div>
        <MyProfileLink href='/mypage?category=mylogs' title='나의 로그' />
        <MyProfileLink
          href='/mypage?category=mycomments'
          title='내가 쓴 댓글'
        />
        <MyProfileLink href='/mypage?category=mybookmarks' title='관심 로그' />
        <MyProfileLink href='/mypage/recently-log' title='최근 본 로그' />
      </div>
      <Hr />
      <div className='flex flex-col gap-3'>
        <MyProfileLink href='/mypage/follow' title='팔로우 관리' />
        <MyProfileLink href='/mypage/edit' title='개인정보 수정' />
        <MyProfileLink
          href='/mypage/policy'
          title='이용약관&개인정보 처리 방침'
        />
        <MyProfileLogout />
        <MyProfileLink href='/mypage/delete-account' title='회원탈퇴' />
      </div>
    </ProfileContainer>
  );
}
