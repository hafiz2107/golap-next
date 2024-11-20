import React, { useEffect, useState } from 'react';

import { searchInfobar, searchUsers } from '@/actions/user';
import { useQueryData } from './useQueryData';
import {
  InfoBarSearchProps,
  SearchReturnType,
  UserSearchProps,
} from '@/types/index.type';

export const useSearch = <T extends 'WORKSPACE' | 'USERS' | 'INFOBAR'>(
  key: string,
  type: T,
  workspaceId?: string
): SearchReturnType<T> => {
  const [query, setQuery] = useState('');
  const [debounce, setDebounce] = useState('');
  const [onUsers, setOnUsers] = useState<UserSearchProps | InfoBarSearchProps>(
    undefined
  );

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e === 'string') {
      setQuery(e);
    } else {
      setQuery(e.target.value);
    }
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 300);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === 'USERS') {
        const users = await searchUsers(queryKey[1] as string);

        if (users.status === 200) setOnUsers(users.data);
      }

      if (type === 'INFOBAR') {
        if (workspaceId) {
          const infobarResults = await searchInfobar(
            queryKey[1] as string,
            workspaceId
          );

          if (infobarResults?.status === 200)
            setOnUsers(infobarResults.data as InfoBarSearchProps);
        }
      }
    },
    false
  );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(undefined);

    return () => {
      debounce;
    };
  }, [debounce]);

  return { onSearchQuery, query, isFetching, onUsers } as SearchReturnType<T>;
};
