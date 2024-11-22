import { getAllUserVideos, getFolderInfo } from '@/actions/workspace';
import FolderInfo from '@/components/global/folders/folder-info';
import Videos from '@/components/global/videos';
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

const FolderPage = async ({ params }: Props) => {
  const { folderId, workspaceId } = await params;

  const query = await new QueryClient();

  await query.prefetchQuery({
    queryKey: [QueryKeys.folder.folderVideos],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: [QueryKeys.folder.folderInfo],
    queryFn: () => getFolderInfo(folderId),
  });

  // await query.prefetchQuery({
  //   queryKey: [QueryKeys.folder.folderInfo],
  //   queryFn: () => getFolderInfo(folderId),
  // });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        videosKey="folder-videos"
      />
    </HydrationBoundary>
  );
};

export default FolderPage;
