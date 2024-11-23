import { getUserProfile, getVideoComments } from '@/actions/user';
import { getPreviewVideo } from '@/actions/workspace';
import VideoPreview from '@/components/global/videos/preview';
import { QueryKeys } from '@/contants/query-keys';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

type Props = {
  params: {
    videoId: string;
  };
};

const PreviewVideoPage = async ({ params }: Props) => {
  const { videoId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: [QueryKeys.preview.previewVideo],
    queryFn: () => getPreviewVideo(videoId),
  });

  await query.prefetchQuery({
    queryKey: [QueryKeys.user.userProfile],
    queryFn: () => getUserProfile(),
  });

  await query.prefetchQuery({
    queryKey: [QueryKeys.preview.videoComments],
    queryFn: () => getVideoComments(videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
};

export default PreviewVideoPage;
