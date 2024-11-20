'use client';

import { getWorkSpaces } from '@/actions/workspace';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { NotificationProps, WorkspaceProps } from '@/types/index.type';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Modal from '../modal';
import { PlusCircle } from 'lucide-react';
import Search from '../search';
import { MENU_ITEMS } from '@/contants';
import SidebarItem from './sidebar-item';
import { useQueryData } from '@/hooks/useQueryData';
import { getNotifications } from '@/actions/user';

type Props = {
  activeWorkspaceId: string;
};

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();

  const { data, isFetched } = useQueryData(['user-workspaces'], getWorkSpaces);
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const { data: notifications } = useQueryData(
    ['user-notifications'],
    getNotifications
  );

  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notifications as NotificationProps;

  const onChangeActiveWorkspace = (value: string) =>
    router.push(`/dashboard/${value}`);

  const currentWorkspace = workspace?.workspace?.find(
    (val) => val.id === activeWorkspaceId
  );

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/golap-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl font-semibold">Golap</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>

        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace?.workspace?.map((work) => (
              <SelectItem key={work.id} value={work.id}>
                {work.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (workspace) =>
                  workspace.Workspace && (
                    <SelectItem
                      value={workspace.Workspace.id}
                      key={workspace.Workspace.id}
                    >
                      {workspace.Workspace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>

      {currentWorkspace?.type === 'PUBLIC' &&
        workspace.subscription?.plan === 'PRO' && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/70 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90 fill-neutral-500"
                />
                <span className="text-neutral-400 font-bold text-xs">
                  Invite to workspace
                </span>
              </span>
            }
            title="Invite to workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}

      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              selected={pathName === item.href}
              title={item.title}
              notifications={
                (item.title === 'Notifications' &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
