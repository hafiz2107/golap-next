import { User } from 'lucide-react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import React from 'react';
import { useSearch } from '@/hooks/useSearch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  workspaceId: string;
};

export const InfoBarSearch = ({ open, setOpen, workspaceId }: Props) => {
  const { isFetching, onSearchQuery, onUsers, query } = useSearch(
    'get-infobar',
    'INFOBAR',
    workspaceId
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Command className='sm:hidden'>
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* <CommandInput
          value={query}
          placeholder="Search user or folders..."
          onValueChange={onSearchQuery}
        /> */}
        <Input
          value={query}
          type="text"
          placeholder="Search user or folders..."
          onChange={onSearchQuery}
        />
        {isFetching ? (
          <div className="flex flex-col gap-y-2 p-4">
            <Skeleton className="w-full h-8 rounded-xl" />
          </div>
        ) : (
          <div className="p-1">
            <CommandList>
              {onUsers && onUsers.users?.length ? (
                <CommandGroup heading="Users">
                  {onUsers.users.map((user) => (
                    <div
                      key={user.id}
                      className="flex gap-x-3 items-center w-full p-3 rounded-xl cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage src={user.image as string} />
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <h3 className="text-bold text-lg capitalize">
                          {user.firstname} {user.lastname}
                        </h3>
                        {/* <p className="text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">
                      {user?.subscription?.plan || ''}
                    </p> */}
                      </div>
                    </div>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No users found.</CommandEmpty>
              )}
            </CommandList>

            {onUsers && onUsers.folders?.length ? (
              <>
                <Separator />
                <CommandList>
                  <CommandEmpty>No Folders found.</CommandEmpty>
                  <CommandGroup heading="Folders">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search Emoji</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                  </CommandGroup>
                </CommandList>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </CommandDialog>
    </Command>
  );
};

export default InfoBarSearch;
