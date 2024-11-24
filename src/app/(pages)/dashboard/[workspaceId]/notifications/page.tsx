'use client';

import { getNotifications } from '@/actions/user';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { QueryKeys } from '@/contants/query-keys';
import { useQueryData } from '@/hooks/useQueryData';
import { NotificationsProps } from '@/types/index.type';
import { User } from 'lucide-react';
import React from 'react';

const NotificationsPage = () => {
  const { data } = useQueryData(
    [QueryKeys.dashboard.userNotifications],
    getNotifications
  );

  const { data: notifications, status } = data as NotificationsProps;
  if (status !== 200)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No notifications</p>
      </div>
    );

  // TODO Setup user details when notifications is added
  return (
    <div className="flex flex-col">
      {notifications.notification.map((noti) => (
        <div
          key={noti.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <p>{noti.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsPage;
