import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodSchema } from 'zod';

const useZodForm = <T>(
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValues?: T
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const onFormSubmit = handleSubmit(async (values) => {
    await mutation({ ...values });
  });

  return { register, watch, reset, errors, onFormSubmit };
};

export default useZodForm;
