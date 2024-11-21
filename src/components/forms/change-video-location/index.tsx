import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useMoveVideos } from '@/hooks/useMoveVideos';
import React from 'react';

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
  const workspace = folders.find((val) => val.id === currentWorkspace);

  return (
    <form className="flex flex-col gap-y-5 w-4/5">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
        {workspace && (
          <p className="text-[#a4a4a4]">{workspace.name} Workspace</p>
        )}
        <p className="text-[#a4a4a4] text-sm">Folder name</p>
      </div>

      <Separator orientation="horizontal" />

      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex flex-col gap-y-2">
          <p className="text-xs">Workspace</p>
          <select className="rounded-xl text-base bg-transparent">
            <option className="text-[#a4a4a4]" value="Somthing">
              Workspace name
            </option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
