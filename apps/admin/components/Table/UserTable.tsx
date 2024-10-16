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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { DeleteAlert } from '@/components/DeleteAlert';

export type TableUser = {
  _id: string;
  avatar: string;
  username: string;
  nickname: string;
  email: string;
  isVerified: boolean;
  isOAuth: boolean;
};

export const columns: ColumnDef<TableUser>[] = [
  {
    accessorKey: 'avatar',
    header: () => <div className='ml-2 text-left'>아바타</div>,
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback>SF</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        아이디
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>{row.getValue('username')}</div>
      );
    },
  },
  {
    accessorKey: 'nickname',
    header: () => <div className='text-left'>닉네임</div>,
    cell: ({ row }) => {
      return (
        <div className='text-left font-medium'>{row.getValue('nickname')}</div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          이메일
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'isVerified',
    header: 'Status',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue('isVerified') ? 'verfied' : 'processing'}
      </div>
    ),
  },
  {
    accessorKey: 'isOAuth',
    header: 'OAuth',
    cell: ({ row }) => (
      <div className='capitalize'>
        {row.getValue('isOAuth') ? 'True' : 'False'}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,

    cell: ({ row }) => {
      const userId = row.original._id;
      return (
        <DropdownMenu key={userId}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='size-8 p-0'
              onClick={e => e.stopPropagation()}
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='size-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>설정</DropdownMenuLabel>
            <DropdownMenuItem className='p-4 text-center hover:bg-slate-100'>
              <Link href={`/dashboard/users/${userId}`}>모든 정보 보기</Link>
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

export function UserTable({ data }: { data: TableUser[] }) {
  const memoData = React.useMemo(() => data, [data]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: memoData,
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
    React.useState<keyof typeof filteringTranslation>('username');
  const filteringTranslation = {
    username: '아이디',
    nickname: '닉네임',
    email: '이메일',
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
              <DropdownMenuRadioItem value='username'>
                아이디
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='nickname'>
                닉네임
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='email'>
                이메일
              </DropdownMenuRadioItem>
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
