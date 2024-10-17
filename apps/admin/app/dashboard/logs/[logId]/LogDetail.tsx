import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DeleteAlert } from '@/components/DeleteAlert';
import type { ILog } from '@/model/Log';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollableUserInfoTable } from '@/components/Table/ScrollableUserInfoTable';
import { UserComment } from '@/components/Table/UserComment';
export const LogDetail = ({ log }: { log: ILog }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-H0M32 p-3'>
          로그 정보
          {log.isDelete && (
            <span className='text-sm text-gray-400'>
              {'  '}
              (스팩로그 페이지에서 삭제됨)
            </span>
          )}
        </CardTitle>
        <div className='flex gap-2'>
          <Button
            variant='ghost'
            asChild
            className='bg-brand-70 hover:bg-brand-90 text-white hover:text-white'
          >
            <a
              target='_blank'
              href={`${process.env.NEXT_PUBLIC_SFACLOG_URL}/log/${log._id}`}
            >
              스팩로그 페이지에서 보기
            </a>
          </Button>
          <Button
            variant='ghost'
            asChild
            className='bg-brand-70 hover:bg-brand-90 text-white hover:text-white'
          >
            <Link
              target='_blank'
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/user/${log.author._id}`}
            >
              유저 정보 보기
            </Link>
          </Button>
          <Button variant='ghost' asChild className='border-highlight-warning'>
            <DeleteAlert
              ButtonTitle='로그 삭제'
              className='bg-highlight-warning hover:bg-highlight-warning text-white hover:text-white'
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <div className='size-[200px] overflow-hidden rounded-md object-cover'>
            {log.thumbnail ? (
              <Image
                className='shadow-custom rounded-md'
                alt='thumbnail'
                width={200}
                height={200}
                src={log.thumbnail}
              />
            ) : (
              <div className='shadow-custom flex size-full items-center justify-center rounded-md bg-gray-300 p-3 text-center text-sm'>
                The thumbnail does not exist
              </div>
            )}
          </div>
          <div className='mx-auto'>
            <Table className='h-full table-auto rounded-md border'>
              <TableHeader className='text-center '>
                <TableRow>
                  <TableHead className='text-center'>제목</TableHead>
                  <TableHead className='text-center'>글쓴이</TableHead>
                  <TableHead className='text-center'>태그</TableHead>
                  <TableHead className='text-center'>카테고리</TableHead>
                  <TableHead className='text-center'>조회수</TableHead>
                  <TableHead className='text-center'>좋아요 수</TableHead>
                  <TableHead className='text-center'>공개여부</TableHead>
                  <TableHead className='text-center'>작성일</TableHead>
                  <TableHead className='text-center'>업데이트</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='text-center'>{log.title}</TableCell>
                  <TableCell className='text-center'>
                    {log.author.nickname}
                  </TableCell>
                  <TableCell className='text-center text-sm'>
                    {log.tags.map((tag, idx) => (
                      <span className='text-xs' key={idx}>
                        {' '}
                        {tag}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className='text-center'>{log.category}</TableCell>
                  <TableCell className='text-center'>{log.views}</TableCell>

                  <TableCell className='text-center'>{log.likes}</TableCell>
                  <TableCell className='text-center'>
                    {log.isVisibility ? '공개' : '비공개'}
                  </TableCell>
                  <TableCell className='text-center'>
                    {log.createdAt.toString().slice(0, 10)}
                  </TableCell>
                  <TableCell className='text-center'>
                    {log.updatedAt.toString().slice(0, 10)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className='text-H2B20 py-2'>좋아요를 누른 유저</div>
        <div>
          <ScrollableUserInfoTable users={log.likedUsers} />
        </div>
        <div className='text-H2B20 py-2'>로그 코멘트</div>
        <div>
          <UserComment comments={log.comments} showLinkToPageBtn={false} />
        </div>
      </CardContent>
    </Card>
  );
};
