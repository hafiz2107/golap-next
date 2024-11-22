import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const useRouterPush = () => {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const pushToRoute = (path: string) => {
    startTransition(() => {
      router.push(path);
    });
  };

  return { isNavigating, pushToRoute };
};
