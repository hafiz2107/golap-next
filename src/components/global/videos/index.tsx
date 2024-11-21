'use client';

import { getAllUserVideos } from '@/actions/workspace';
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone';
import { useQueryData } from '@/hooks/useQueryData';
import { cn } from '@/lib/utils';
import { VideosProps } from '@/types/index.type';
import React from 'react';
import VideoCard from './video-card';

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  // TODO: Add videos logic
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );

  const { status: videosStatus, data: videos } = videoData as VideosProps;

  const video = {
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    id: '123',
    title: 'mock title',
    source: 'mock source',
    processing: false,
    User: {
      firstname: 'mock firstname',
      lastname: 'mock lastname',
      image: 'mock image',
    },
    Folder: {
      id: '123',
      name: 'mock folder name',
    },
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex  items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videosStatus !== 200
            ? 'flex justify-center items-center'
            : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {/* {videosStatus === 200 ? (
          videos.map((video) => <VideoCard />)
        ) : (
          <p className="text-[#BDBDBD]">No videos found</p>
        )} */}

        <VideoCard workspaceId={workspaceId} {...video} />
      </section>
    </div>
  );
};

export default Videos;
