import { createFolder } from '@/actions/workspace';
import { useMutationData } from './useMutationData';
import { QueryKeys } from '@/contants/query-keys';

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    [QueryKeys.dashboard.createFolder],
    () => createFolder(workspaceId),
    QueryKeys.dashboard.workspaceFolders
  );

  const onCreateNewFolder = () =>
    mutate({ name: 'Unititled Folder', id: 'optimistice--id' });

  return {
    onCreateNewFolder,
  };
};
