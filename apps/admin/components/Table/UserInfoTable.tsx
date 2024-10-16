import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { IUser } from '@/model/User';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollableUserInfoTable } from './ScrollableUserInfoTable';
export const UserInfoTable = ({ user }: { user: IUser }) => {
  return (
    <>
      <div className='w-full table-auto rounded-md border'>
        <Table>
          <TableHeader className='p-3 text-center'>
            <TableRow>
              <TableHead className='text-center'>아바타</TableHead>
              <TableHead className='text-center'>이름</TableHead>
              <TableHead className='text-center'>닉네임</TableHead>
              <TableHead className='text-center'>이메일</TableHead>
              <TableHead className='text-center'>관심사</TableHead>
              <TableHead className='text-center'>계정 상태</TableHead>
              <TableHead className='text-center'>OAuth</TableHead>
              <TableHead className='text-center'>가입일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='flex justify-center'>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>SF</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className='text-center'>{user.legalname}</TableCell>
              <TableCell className='text-center'>{user.nickname}</TableCell>
              <TableCell className='text-center'>{user.email}</TableCell>
              <TableCell className='text-center'>
                {user.interests.length == 0 && '없음'}
                {user.interests.length !== 0 && user.interests.join(', ')}
              </TableCell>

              <TableCell className='text-center'>
                {user.isVerified ? 'Verified' : 'Processing'}
              </TableCell>
              <TableCell className='text-center'>
                {user.isOAuth ? 'True' : 'False'}
              </TableCell>
              <TableCell className='text-center'>
                {user.updatedAt.toString().slice(0, 10)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='text-H2B20 mt-5'>팔로잉 ({user.following.length})</div>
      <ScrollableUserInfoTable users={user.following} />
      <div className='text-H2B20 mt-5'>팔로워 ({user.follower.length})</div>
      <ScrollableUserInfoTable users={user.follower} />
    </>
  );
};
