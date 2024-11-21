import { getAllUserVideos, getFolderInfo } from '@/actions/workspace';
import FolderInfo from '@/components/global/folders/folder-info';
import { QueryKeys } from '@/contants/query-keys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

type Props = {
  params: { folderId: string; workspaceId: string };
};

const FolderPage = async ({ params: { folderId, workspaceId } }: Props) => {
  const query = await new QueryClient();

  await query.prefetchQuery({
    queryKey: [QueryKeys.folder.folderVideos],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: [QueryKeys.folder.folderInfo],
    queryFn: () => getFolderInfo(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
    </HydrationBoundary>
  );
};

export default FolderPage;
