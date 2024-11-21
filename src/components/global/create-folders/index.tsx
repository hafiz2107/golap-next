'use client';

import FolderPlusDuotone from '@/components/icons/folder-plus-duotone';
import { Button } from '@/components/ui/button';
import { useCreateFolders } from '@/hooks/useCreateFolders';
import React from 'react';

type Props = {
  workspaceId: string;
};

const CreateFolders = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);
  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#3d3d3d] text-[#a8a8a8] hover:text-[#3d3d3d] flex items-center gap-2 py-6 px-4 rounded-2xl"
    >
      <FolderPlusDuotone />
      <p className="font-bold">Create folder</p>
    </Button>
  );
};

export default CreateFolders;
