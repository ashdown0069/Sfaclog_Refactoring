import { INotification } from '@/models/User';
import { IconGroupGray } from '@repo/ui/Icon';
import React from 'react';
import NotificationItem from './NotificationItem';
import { ModifyNotifications } from './ModifyNotifications';

interface NotificationsProps {
  notifications: INotification[];
}
const Notifications = async ({ notifications }: NotificationsProps) => {
  //isRead를 true로 변경
  await ModifyNotifications();

  return (
    <section>
      {notifications.length == 0 && (
        <div className='flex flex-col w-full h-64 justify-center items-center gap-10'>
          <IconGroupGray />
          <p className='text-B1M16'>아직 도착한 알림이 없습니다.</p>
        </div>
      )}
      <div className='flex flex-col gap-3'>
        {notifications.length > 0 &&
          notifications.map(noti => (
            //@ts-ignore
            <NotificationItem {...noti} key={noti._id} />
          ))}
      </div>
    </section>
  );
};

export default Notifications;
