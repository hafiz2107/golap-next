import { useAppSelector } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useMutationData } from './useMutationData';
import { QueryKeys } from '@/contants/query-keys';
import { getWorkspaceFolders, moveVideoLocation } from '@/actions/workspace';
import useZodForm from './useZodForm';
import { MoveVideoSchema } from '@/components/forms/change-video-location/schema';

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkspaceReducer);

  const [isFetching, setIsFetching] = useState(false);

  const [isFolders, setIsFolders] = useState<
    | ({ _count: { videos: number } } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
        updatedAt: Date;
      })[]
    | undefined
  >(undefined);

  const { isPending, mutate } = useMutationData(
    [QueryKeys.folder.changeVideoLocation],
    (data: { folder_id: string; workspace_id: string }) =>
      moveVideoLocation(videoId, data.workspace_id, data.folder_id),
    QueryKeys.dashboard.workspaceFolders
  );

  const { errors, onFormSubmit, register, watch } = useZodForm(
    MoveVideoSchema,
    mutate,
    {
      folder_id: null,
      workspace_id: currentWorkspace,
    }
  );

  const fetchFolders = async (workspace: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workspace);
    setIsFetching(false);
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);

  useEffect(() => {
    const workSpace = watch(async (value) => {
      if (value.workspace_id) await fetchFolders(value.workspace_id);
    });

    return () => workSpace.unsubscribe();
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
  };
};
