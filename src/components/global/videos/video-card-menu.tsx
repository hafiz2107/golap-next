import React from 'react';
import Modal from '../modal';
import { Move } from 'lucide-react';
import ChangeVideoLocation from '@/components/forms/change-video-location';
import { Button } from '@/components/ui/button';

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkspace,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      // TODO:Change description
      description="Please change this later"
      title="Move to new workspace/Folder"
      trigger={
        <Button className="p-0 h-5 bg-[#252525] px-1">
          <Move size={18} fill="#4F4F4F" className="text-[#4F4F4F]" />
        </Button>
      }
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
        currentWorkspace={currentWorkspace}
      />
    </Modal>
  );
};

export default CardMenu;
