import { VideoInfoProps } from '@/types/index.type';
import React from 'react';
import Loader from '../loader';
import CardMenu from './video-card-menu';
import ChangeVideoLocation from '@/components/forms/change-video-location';

type Props = VideoInfoProps;

const VideoCard = (props: Props) => {
  //TODO Keep date
  return (
    <Loader state={false}>
      {/* <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <CardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentWorkspace={props.workspaceId}
            currentFolderName={props.Folder?.name}
          />
        </div>
      </div> */}
      <ChangeVideoLocation />
    </Loader>
  );
};

export default VideoCard;
