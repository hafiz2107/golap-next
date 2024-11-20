import { createWorkspace } from '@/actions/workspace';
import { useMutationData } from './useMutationData';
import useZodForm from './useZodForm';
import { workspaceSchema } from '@/components/forms/workspace-form/schema';

export const useCreateWorkspace = () => {
  const { isPending, mutate } = useMutationData(
    ['create-workspace'],
    (data: { name: string }) => createWorkspace(data.name),
    'user-workspaces'
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending };
};
