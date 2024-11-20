'use client';

import FolderDuotone from '@/components/icons/folder-duotone';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Folder from './folder';
import { useQueryData } from '@/hooks/useQueryData';
import { getWorkspaceFolders } from '@/actions/workspace';
import { useMutationDataState } from '@/hooks/useMutationData';

type Props = {
  workspaceId: string;
};

export type FoldersProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: Props) => {
  //Get Folders in currenet workspace
  const { data, isFetched } = useQueryData(['workspace-folders'], () => {
    getWorkspaceFolders(workspaceId);
  });

  const { latestVariable } = useMutationDataState(['create-folder']);

  const { data: folders, status } = data as FoldersProps;

  if (isFetched && folders) {
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" size={20} />
        </div>
      </div>
      {/* TODO complete CN */}
      <section className={cn('flex items-center gap-4 overflow-x-auto w-full')}>
        <Folder name="Folder title" count={51} />
      </section>
    </div>
  );
};

export default Folders;
