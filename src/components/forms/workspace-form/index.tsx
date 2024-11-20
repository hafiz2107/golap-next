import FormGenerator from '@/components/global/form-generator';
import Loader from '@/components/global/loader';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace';
import React from 'react';

type Props = {};

const WorkspaceForm = (props: Props) => {
  const { errors, isPending, onFormSubmit, register } = useCreateWorkspace();

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        name="name"
        placeholder="Work, Leisure, etc..."
        label="Workspace name"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
      />

      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create workspace</Loader>
      </Button>
    </form>
  );
};

export default WorkspaceForm;
