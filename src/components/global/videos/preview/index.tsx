'use client';

import { getPreviewVideo } from '@/actions/workspace';
import { QueryKeys } from '@/contants/query-keys';
import { useQueryData } from '@/hooks/useQueryData';
import { useRouterPush } from '@/hooks/useRouterPush';
import { CalculteDateDistance, truncateString } from '@/lib/utils';
import { VideoProps } from '@/types/index.type';
import { Dot, Download } from 'lucide-react';
import React, { useEffect } from 'react';
import CopyLink from '../copy-link';
import RichLink from '../rick-link';
import TabMenu from '../../tabs';
import AiTools from '../../ai-tools';
import VideoTranscript from '../../video-transcript';
import Activities from '../../activities';
import { sendEmailForFirstView } from '@/actions/user';

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  //TODO: update view count if !author
  //TODO: Notify the author about view
  const { pushToRoute } = useRouterPush();
  const notifyFirstView = async () => await sendEmailForFirstView(videoId);

  const { data } = useQueryData([QueryKeys.preview.previewVideo], () =>
    getPreviewVideo(videoId)
  );

  const { data: video, status } = data as VideoProps;

  if (status !== 200) pushToRoute('/');

  const dateDistance = CalculteDateDistance({
    start: new Date(),
    end: video.createdAt,
  });

  useEffect(() => {
    if (video.views === 0) notifyFirstView();

    return () => {
      notifyFirstView();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3   overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className="flex gap-x-5 items-start justify-between">
            <h2 className="text-white text-4xl font-bold">{video.title}</h2>
            {/* {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ) : (
              <></>
            )} */}
          </div>
          <span className="flex gap-x-1 mt-2">
            <p className="text-[#9D9D9D] capitalize">{`${video.User?.firstname} ${video.User?.lastname}`}</p>
            <Dot fill="#9D9D9D" className="text-[#9D9D9D]" />
            <p className="text-[#707070]">{dateDistance}</p>
          </span>
        </div>
        <video
          preload="metadata"
          className="w-full aspect-video opacity-50 rounded-xl"
          controls
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`}
          />
        </video>
        <div className="flex flex-col text-2xl gap-y-4">
          <div className="flex gap-x-5 items-center justify-between">
            <p className="text-[#BDBDBD] font-semibold">Description</p>
            {/* {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ) : (
              <></>
            )} */}
          </div>
          <p className="text-[#9D9D9D] text-lg font-medium">
            {video.description}
          </p>
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end items-center gap-x-3">
          <CopyLink
            videoId={videoId}
            className="rounded-full bg-transparent px-10"
            varient="outline"
          />
          <RichLink
            description={truncateString(video.description as string, 150)}
            id={videoId}
            source={video.source}
            title={video.title as string}
          />
          <Download className="text-[#4d4c4c]" />
        </div>
        <div>
          <TabMenu
            defaulValue="AI Tools"
            triggers={['AI Tools', 'Transcript', 'Activity']}
          >
            <AiTools
              plan={video.User?.subscription?.plan}
              trial={video.User?.trial as boolean}
              videoId={videoId}
            />

            <VideoTranscript transcript={video.description as string} />
            <Activities
              author={video.User?.firstname as string}
              videoId={videoId}
            />
          </TabMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
