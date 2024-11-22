import { VideoInfoProps } from '@/types/index.type';
import React from 'react';
import Loader from '../loader';
import CardMenu from './video-card-menu';
import { formatDistance } from 'date-fns';
import CopyLink from './copy-link';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share2, User } from 'lucide-react';

type Props = VideoInfoProps & { workspaceId: string };

const VideoCard = (props: Props) => {
  //TODO Keep date
  const daysAgo = formatDistance(props.createdAt, Date.now(), {
    addSuffix: true,
  });
  return (
    <Loader
      state={props.processing}
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl p-2"
    >
      {/* TODO: Add a skeleton when processing */}
      <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-30 hidden group-hover:flex  group-hover:gap-3">
          <CardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentWorkspace={props.workspaceId}
            currentFolderName={props.Folder?.name}
          />
          <CopyLink className="p-0 h-5 bg-[#252525] px-1" videoId={props.id} />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            preload="metadata"
            controls={false}
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-y-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">
              {props.title}
            </h2>
            <div className="mt-4 flex gap-x-2 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize font-semibold text-[#BDBDBD] text-xs">{`${props.User?.firstname} ${props.User?.lastname}`}</p>
                <p className="flex gap-2 items-center capitalize font-semibold text-[#9D9D9D] text-xs">
                  {daysAgo}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-2 items-center">
                <Share2 size={12} fill="#9D9D9D" className="text-[#9D9D9D]" />
                <p className=" text-xs font-semibold text-[#9D9D9D] capitalize">
                  {props.User?.firstname}&apos;s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
