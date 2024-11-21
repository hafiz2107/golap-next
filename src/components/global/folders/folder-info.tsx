'use client';

import { getFolderInfo } from '@/actions/workspace';
import { QueryKeys } from '@/contants/query-keys';
import { useQueryData } from '@/hooks/useQueryData';
import { FolderProps } from '@/types/index.type';
import React from 'react';

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData([QueryKeys.folder.folderInfo], () =>
    getFolderInfo(folderId)
  );

  const { data: folderInfo } = data as FolderProps;

  return (
    <div className="flex items-center">
      <h2 className="text-[#BDBDBD] text-2xl">{folderInfo.name}</h2>
    </div>
  );
};

export default FolderInfo;
