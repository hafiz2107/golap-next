import React from 'react';
import ToogleFirstView from '@/components/global/first-view-setting';
import ThemeSwitcher from '@/components/theme/theme-switcher';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { QueryKeys } from '@/contants/query-keys';
import { getFirstView } from '@/actions/user';

const SettingsPage = async () => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: [QueryKeys.settings.firstView],
    queryFn: () => getFirstView(),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(query)}>
        <ThemeSwitcher />
        <ToogleFirstView />
      </HydrationBoundary>
    </div>
  );
};

export default SettingsPage;
