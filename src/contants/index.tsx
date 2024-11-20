import {
  Bell,
  CreditCard,
  FileDuoToneBlack,
  Home,
  Settings,
} from '@/components/icons';
import React from 'react';

export const MENU_ITEMS = (
  workaspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: 'Home', href: `/dashboard/${workaspaceId}/home`, icon: <Home /> },
  {
    title: 'My library',
    href: `/dashboard/${workaspaceId}`,
    icon: <FileDuoToneBlack />,
  },
  {
    title: 'Notifications',
    href: `/dashboard/${workaspaceId}/notifications`,
    icon: <Bell />,
  },
  {
    title: 'Billing',
    href: `/dashboard/${workaspaceId}/billing`,
    icon: <CreditCard />,
  },
  {
    title: 'Settings',
    href: `/dashboard/${workaspaceId}/settings`,
    icon: <Settings />,
  },
];
