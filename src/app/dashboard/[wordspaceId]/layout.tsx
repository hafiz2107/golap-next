import React from 'react';
import { getNotifications, onAuthenticateUser } from '@/actions/user';
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from '@/actions/workspace';
import { redirect } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Sidebar from '@/components/global/sidebar';
import GlobalHeader from '@/components/global/global-header';

type Props = {
  params: { wordspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ children, params }: Props) => {
  const { wordspaceId } = await params;

  const auth = await onAuthenticateUser();

  if (!auth.user?.workspace || !auth.user?.workspace.length)
    return redirect('/auth/sign-in');

  const hasAccess = await verifyAccessToWorkspace(wordspaceId);

  if (hasAccess.status !== 200)
    return redirect(`/dashboard/${auth.user.workspace[0].id}`);

  //TODO: Add something went wrong page
  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['workspace-folders'],
    queryFn: () => getWorkspaceFolders(wordspaceId),
  });

  await query.prefetchQuery({
    queryKey: ['user-videos'],
    queryFn: () => getAllUserVideos(wordspaceId),
  });

  await query.prefetchQuery({
    queryKey: ['user-workspaces'],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ['user-notifications'],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={wordspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
          <GlobalHeader workspace={hasAccess.data.workspace} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
