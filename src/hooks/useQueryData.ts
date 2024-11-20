import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from '@tanstack/react-query';

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isPending, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  return { data, isPending, isFetched, refetch, isFetching };
};
