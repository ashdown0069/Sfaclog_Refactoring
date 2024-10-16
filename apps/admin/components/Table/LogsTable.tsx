'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { DeleteAlert } from '@/components/DeleteAlert';

export type TableLog = {
  _id: string;
  author: Iauthor;
  title: string;
  category: string;
  likes: string;
  views: string;
  isVisibility: boolean;
};

interface Iauthor {
  _id: string;
  nickname: string;
}

export const columns: ColumnDef<TableLog>[] = [
  {
    accessorKey: 'author',
    header: () => <div className='ml-2'>글쓴이</div>,
    cell: ({ row }) => {
      const nickname = row.original.author.nickname;
      return <div className='ml-2'>{nickname}</div>;
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          제목
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>{row.getValue('title')}</div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          카테고리
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>{row.getValue('category')}</div>
      );
    },
  },
  {
    accessorKey: 'likes',
    header: () => <div className='text-left'>좋아요 수</div>,
    cell: ({ row }) => <div>{row.getValue('likes')}</div>,
  },
  {
    accessorKey: 'views',
    header: () => <div className='text-left'>조회수</div>,
    cell: ({ row }) => <div>{row.getValue('views')}</div>,
  },
  {
    accessorKey: 'isVisibility',
    header: '공개여부',
    cell: ({ row }) => (
      <div>{row.getValue('isVisibility') ? '공개' : '비공개'}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const logId = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='size-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>설정</DropdownMenuLabel>
            <DropdownMenuItem className='p-4 text-center hover:bg-slate-100'>
              <Link href={`/dashboard/logs/${logId}`}>모든 정보 보기</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className='cursor-pointer hover:bg-slate-100'
            >
              <DeleteAlert />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function LogsTable({ data }: { data: TableLog[] }) {
  const Alllogs = React.useMemo(() => data, [data]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: Alllogs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [position, setPosition] =
    React.useState<keyof typeof filteringTranslation>('nickname');
  const filteringTranslation = {
    nickname: '글쓴이',
    title: '제목',
  };
  return (
    <div className='w-full'>
      <div className='flex items-center justify-start py-4'>
        <Input
          placeholder={`${filteringTranslation[position]}(으)로 필터링`}
          value={(table.getColumn(position)?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn(position)?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-2'>
              {filteringTranslation[position]}{' '}
              <ChevronDown className='ml-2 size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel className='flex justify-center'>
              필터링 옵션
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value='nickname'>
                글쓴이
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='title'>제목</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전 페이지
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음 페이지
          </Button>
        </div>
      </div>
    </div>
  );
}
