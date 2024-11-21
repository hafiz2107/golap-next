import React from 'react';
import Modal from '../modal';
import { Move } from 'lucide-react';
import ChangeVideoLocation from '@/components/forms/change-video-location';

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
      trigger={<Move size={20} fill="#A4A4A4" className="text-[#A4A4A4]" />}
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
