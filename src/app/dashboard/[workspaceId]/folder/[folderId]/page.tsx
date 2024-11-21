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
    queryKey: [],
    queryFn: () => '',
  });

  return <HydrationBoundary state={dehydrate(query)}></HydrationBoundary>;
};

export default FolderPage;
