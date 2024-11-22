import { createWorkspace } from '@/actions/workspace';
import { useMutationData } from './useMutationData';
import useZodForm from './useZodForm';
import { workspaceSchema } from '@/components/forms/workspace-form/schema';
import { QueryKeys } from '@/contants/query-keys';

export const useCreateWorkspace = () => {
  const { isPending, mutate } = useMutationData(
    [QueryKeys.dashboard.createWorkSpace],
    (data: { name: string }) => createWorkspace(data.name),
    QueryKeys.dashboard.userWorkspaces
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending };
};
