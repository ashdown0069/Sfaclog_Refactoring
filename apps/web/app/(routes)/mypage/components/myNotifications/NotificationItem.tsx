import { Avatar } from '@/components/Avatar/Avatar';
import type { ILog } from '@/models/Log';
import type { INotification, IUser } from '@/models/User';
import { formatDate } from '@/utils/formatUtils';
import Link from 'next/link';
import React from 'react';
interface NotificationItemProps
  extends Omit<INotification, 'notifierId' | 'triggerLog'> {
  notifierId: Pick<IUser, 'nickname' | 'avatar' | 'pageUrl'>;
  triggerLog: Pick<ILog, 'title' | '_id'> | null;
}
const NotificationItem = ({
  isRead,
  notiType,
  notifierId,
  triggerLog,
  createdAt,
}: NotificationItemProps) => {
  const notiMap = {
    comment: (
      <p>
        <Link
          className='text-B1B16 text-ellipsis underline'
          href={`/user/${notifierId.pageUrl}`}
        >
          {notifierId.nickname}
        </Link>
        &nbsp;님이 회원님&nbsp;
        <Link
          className='text-B1B16 text-ellipsis underline'
          href={`/log/${triggerLog && triggerLog._id}`}
        >
          {triggerLog && triggerLog.title}
        </Link>
        &nbsp;로그에 댓글을 작성했습니다.
      </p>
    ),
    likes: (
      <p>
        <Link
          className='text-B1B16 text-ellipsis underline'
          href={`/user/${notifierId.pageUrl}`}
        >
          {notifierId.nickname}
        </Link>
        &nbsp;님이 회원님의
        <Link
          className='text-B1B16 text-ellipsis underline'
          href={`/log/${triggerLog && triggerLog._id}`}
        >
          {triggerLog && triggerLog.title}
        </Link>
        &nbsp; 로그를 좋아합니다.
      </p>
    ),
    follow: (
      <p>
        <Link
          className='text-B1B16 text-ellipsis underline'
          href={`/user/${notifierId.pageUrl}`}
        >
          {notifierId.nickname}
        </Link>
        &nbsp;님이 회원을 팔로우 하였습니다.
      </p>
    ),
  };
  return (
    <div className='w-full h-20 bg-white shadow-custom flex items-center px-2 py-1 gap-3'>
      <div>
        <Link href={`/user/${notifierId.pageUrl}`}>
          <Avatar size='m' url={notifierId.avatar} />
        </Link>
      </div>
      <div className='text-text-primary'>{notiMap[notiType]}</div>
      <div className='text-B3R12 text-text-secondary'>
        {createdAt && formatDate(createdAt?.toString())}
        &nbsp;{isRead && '읽음'}
      </div>
    </div>
  );
};

export default NotificationItem;
