import Loader from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useMoveVideos } from '@/hooks/useMoveVideos';
import React, { useEffect } from 'react';

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkspace,
}: Props) => {
  const {
    errors,
    folders,
    isFetching,
    isFolders,
    isPending,
    onFormSubmit,
    register,
    workspaces,
  } = useMoveVideos(videoId, currentWorkspace!);

  const folder = folders.find((val) => val.id === currentFolder);
  const workspace = workspaces.find((val) => val.id === currentWorkspace);

  return (
    <form className="flex flex-col gap-y-5 " onSubmit={onFormSubmit}>
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p>{workspace.name || '-'}</p>}

        <h2 className="text-xs mt-4 text-[#a4a4a4]">Current Folder</h2>
        {folder ? (
          <p className="">{folder?.name || '-'}</p>
        ) : (
          'This video has no folder'
        )}
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex flex-col gap-y-2">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xl text-base bg-transparent"
            {...register('workspace_id')}
          >
            {workspaces.map((space) => (
              <option
                className="text-[#a4a4a4]"
                value={space.id}
                key={space.id}
              >
                {space.name}
              </option>
            ))}
            {/* <option className="text-[#a4a4a4]" value="Somthing">
              Workspace name
            </option> */}
          </select>
        </Label>

        {isFetching ? (
          <div className="flex flex-col gap-y-2">
            <p className="text-xs">Folders in workspace</p>
            <Skeleton className="w-full h-5 rounded-xl" />
          </div>
        ) : (
          <Label className="flex flex-col gap-y-2">
            <p className="text-xs">Folders in workspace</p>
            {isFolders && isFolders.length ? (
              <select
                className="rounded-xl bg-transparent text-base"
                {...register('folder_id')}
              >
                {isFolders.map((folder, key) =>
                  key === 0 ? (
                    <option
                      value={folder.id}
                      key={folder.id}
                      className="text-[#a4a4a4]"
                    >
                      {folder.name}
                    </option>
                  ) : (
                    <option
                      value={folder.id}
                      key={folder.id}
                      className="text-[#a4a4a4]"
                    >
                      {folder.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className="text-[#a4a4a4] text-sm">
                Selected workspace has no folders
              </p>
            )}
          </Label>
        )}
      </div>
      <Button>
        <Loader state={isPending} color="#000">
          Move video
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
