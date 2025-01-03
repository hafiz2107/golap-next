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
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Modal from '../modal';
import { Menu, PlusCircle } from 'lucide-react';
import Search from '../search';
import { MENU_ITEMS } from '@/contants';
import SidebarItem from './sidebar-item';
import { useQueryData } from '@/hooks/useQueryData';
import { getNotifications } from '@/actions/user';
import WorkspacePlaceholder from './workspace-placeholder';
import GlobalCard from '../global-card';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import InfoBar from '../info-bar';
import { QueryKeys } from '@/contants/query-keys';
import { useDispatch } from 'react-redux';
import { WORKSPACES } from '@/redux/slice/workspaces';
import { useRouterPush } from '@/hooks/useRouterPush';
import FullScreenLoading from '../loader/fullscreenLoading';
import PaymentButton from '../payment-button';

type Props = {
  activeWorkspaceId: string;
};

//TODO:Add payments action to upgrade button
const Sidebar = ({ activeWorkspaceId }: Props) => {
  const { isNavigating, pushToRoute } = useRouterPush();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const { data, isFetched } = useQueryData(
    [QueryKeys.dashboard.userWorkspaces],
    getWorkSpaces
  );
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const { data: notifications } = useQueryData(
    [QueryKeys.dashboard.userNotifications],
    getNotifications
  );

  const { data: workspace } = data as WorkspaceProps;
  const { data: count } = notifications as NotificationProps;

  const onChangeActiveWorkspace = (value: string) =>
    pushToRoute(`/dashboard/${value}`);

  // TODO: Uncomment the line where currentWorkspace is used
  const currentWorkspace = workspace?.workspace?.find(
    (val) => val.id === activeWorkspaceId
  );

  useEffect(() => {
    if (isFetched && workspace) {
      dispatch(WORKSPACES({ workspaces: workspace.workspace }));
    }
  }, [dispatch, isFetched, workspace]);

  const SidebarSection = (
    <div className="z-50 bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
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
                  workspace.WorkSpace && (
                    <SelectItem
                      value={workspace.WorkSpace.id}
                      key={workspace.WorkSpace.id}
                    >
                      {workspace.WorkSpace.name}
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
      {!!workspace.workspace.length && (
        <>
          <Separator className="w-4/5" />
          <p className="w-full text-[#9D9D9D] font-bold mt-4">Workspaces</p>
          {workspace.workspace.length === 1 &&
            workspace.members.length === 0 && (
              <div className="w-full mt-[-10px]">
                <p className="text-[#9D9D9D] font-medium text-sm">
                  {workspace.subscription?.plan === 'FREE'
                    ? 'Upgrade to create workspaces'
                    : 'No workspaces'}
                </p>
              </div>
            )}

          <nav className="w-full">
            <ul className="h-[130px]  overflow-auto overflow-x-hidden fade-layer">
              {workspace.workspace.map((item) => {
                return (
                  // item.type === 'PERSONAL' && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                  // )
                );
              })}
              {!!workspace.members.length &&
                workspace.members.map((item) => (
                  <SidebarItem
                    href={`/dashboard/${item.WorkSpace.id}`}
                    selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                    title={item.WorkSpace.name}
                    notifications={0}
                    key={item.WorkSpace.id}
                    icon={
                      <WorkspacePlaceholder>
                        {item.WorkSpace.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                ))}
            </ul>
          </nav>
        </>
      )}

      {/* TODO:Make responsive when memeber workspace is there */}
      {/* {!!workspace.members.length && (
        <>
          <Separator />
          <p className="w-full text-[#9D9D9D] font-bold mt-4">
            Other Workspaces
          </p>
          <nav className="w-full">
            <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer"></ul>
          </nav>
        </>
      )} */}
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === 'FREE' && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription, AI summary and more."
          footer={<PaymentButton />}
        />
      )}
    </div>
  );

  return isNavigating ? (
    <FullScreenLoading text="Switching workspace" />
  ) : (
    <div className="full !z-[40]">
      <InfoBar workspaceId={activeWorkspaceId} />
      <div className="md:hidden fixed my-4 ">
        <Sheet>
          <SheetTrigger asChild className="ml-2 ">
            <Button variant={'ghost'} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className="p-0 w-fit h-full">
            <SheetTitle className="hidden"></SheetTitle>
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
