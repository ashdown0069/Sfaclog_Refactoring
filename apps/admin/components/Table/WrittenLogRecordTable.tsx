'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ILog } from '@/model/Log';
import { useRouter } from 'next/navigation';

export function WrittenLogRecordTable({ logs }: { logs: ILog[] }) {
  const router = useRouter();
  return (
    <div className='relative rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-2/6 text-center'>제목</TableHead>
            <TableHead className='w-1/6 text-center'>카테고리</TableHead>
            <TableHead className='w-1/6 text-center'>조회 수</TableHead>
            <TableHead className='w-1/6 text-center'>좋아요 수</TableHead>
            <TableHead className='w-1/6 text-center'>작성일</TableHead>
            <TableHead className='w-1/6'></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className='max-h-80 overflow-auto'>
        <Table>
          <TableBody>
            {logs.map(log => (
              <TableRow
                onClick={() => router.push(`/dashboard/logs/${log._id}`)}
                key={log._id}
                className='hover:bg-brand-5 cursor-pointer'
              >
                <TableCell className='w-2/6 truncate pl-3 text-center'>
                  {log.title}
                </TableCell>
                <TableCell className='w-1/6 text-center'>
                  {log.category}
                </TableCell>
                <TableCell className='w-1/6 text-center'>{log.views}</TableCell>
                <TableCell className='w-1/6 text-center'>{log.likes}</TableCell>
                <TableCell className='w-1/6 text-center'>
                  {log.createdAt.slice(0, 10)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell className='pr-8 text-right'>
              총 {logs.length}개의 로그
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
