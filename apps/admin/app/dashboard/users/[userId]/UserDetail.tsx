import { DeleteAlert } from '@/components/DeleteAlert';
import { UserComment } from '@/components/Table/UserComment';
import { UserInfoTable } from '@/components/Table/UserInfoTable';
import { WrittenLogRecordTable } from '@/components/Table/WrittenLogRecordTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { IComment } from '@/model/Comments';
import type { ILog } from '@/model/Log';
import type { IUser } from '@/model/User';
import Link from 'next/link';
import React from 'react';

export const UserDetail = ({
  userInfo,
}: {
  userInfo: { user: IUser; logs: ILog[]; comments: IComment[] };
}) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-H0M32 p-3'>유저 정보</CardTitle>
        <div className='flex gap-2'>
          <Button
            variant='ghost'
            asChild
            className='bg-brand-70 hover:bg-brand-90 text-white hover:text-white'
          >
            <Link
              target='_blank'
              href={`${process.env.NEXT_PUBLIC_SFACLOG_URL}/user/${userInfo.user.pageUrl}`}
            >
              유저 페이지로 이동
            </Link>
          </Button>
          <Button variant='ghost' asChild className='border-highlight-warning'>
            <DeleteAlert className='bg-highlight-warning hover:bg-highlight-warning text-white hover:text-white' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='font-pretendard p-3'>
        <div className='p-3'>
          <UserInfoTable user={userInfo.user} />
        </div>
        <div>
          <div className='p-3'>
            <div className='text-H2B20 py-2'>작성한 로그</div>
            <WrittenLogRecordTable logs={userInfo.logs} />
          </div>
          <div className='p-3'>
            <div className='text-H2B20 py-1'>작성 댓글</div>
            <UserComment
              comments={userInfo.comments}
              showUserInfoBtn={false}
              showLinkToPageBtn
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
