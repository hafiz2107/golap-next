'use client';

import FolderDuotone from '@/components/icons/folder-duotone';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import React, { useEffect } from 'react';
import Folder from './folder';
import { useQueryData } from '@/hooks/useQueryData';
import { getWorkspaceFolders } from '@/actions/workspace';
import { useMutationDataState } from '@/hooks/useMutationData';
import { QueryKeys } from '@/contants/query-keys';
import { FoldersProps } from '@/types/index.type';
import { useDispatch } from 'react-redux';
import { FOLDERS } from '@/redux/slice/folders';

type Props = {
  workspaceId: string;
};

const Folders = ({ workspaceId }: Props) => {
  const dispatch = useDispatch();
  //Get Folders in currenet workspace
  const { data, isFetched } = useQueryData(
    [QueryKeys.dashboard.workspaceFolders],
    () => getWorkspaceFolders(workspaceId)
  );

  const { latestVariables } = useMutationDataState([
    QueryKeys.dashboard.createFolder,
  ]);

  const { data: folders, status } = data as FoldersProps;

  useEffect(() => {
    if (isFetched && folders) {
      dispatch(FOLDERS({ folders }));
    }
  }, [dispatch, folders, isFetched]);

  //TODO: Add redux for folders
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
      <section
        className={cn(
          status !== 200 && 'justify-center',
          'flex items-center gap-4 overflow-x-auto w-full'
        )}
      >
        {status !== 200 ? (
          <p className=" text-neutral-300 font-semibold">
            No folders in workspace
          </p>
        ) : (
          <>
            {latestVariables && latestVariables.status === 'pending' && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}

            {folders.map((folder) => (
              <Folder
                id={folder.id}
                key={folder.id}
                name={folder.name}
                count={folder._count.videos}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
