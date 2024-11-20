'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Loader from '../loader';
import FolderDuotone from '@/components/icons/folder-duotone';
import { useMutationData } from '@/hooks/useMutationData';
import { renameFolders } from '@/actions/workspace';
import { Input } from '@/components/ui/input';

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ id, name, count, optimistic }: Props) => {
  const [onRename, setOnRename] = useState(false);
  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);

  const { isPending, mutate } = useMutationData(
    ['rename-folders'],
    (data: { name: string }) => renameFolders(id, name),
    'workspace-folders',
    Renamed
  );
  const pathName = usePathname();
  const router = useRouter();

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathName}/folder/${id}`);
  };

  const handleFolderRename = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    //TODO Rename functionality
    e.stopPropagation();
    Rename();
  };

  const updateFolderName: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (inputRef.current && folderCardRef.current) {
      if (
        !inputRef.current.contains(e?.target as Node | null) &&
        !folderCardRef.current.contains(e.target as Node | null)
      ) {
        if (inputRef.current.value) {
            mutate({ name: inputRef.current.value });
        } else {
          Renamed();
        }
      }
    }
  };

  return (
    <div
      ref={folderCardRef}
      onClick={handleFolderClick}
      className={cn(
        'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]'
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              autoFocus
              onBlur={updateFolderName}
              ref={inputRef}
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300 font-semibold"
              onDoubleClick={handleFolderRename}
            >
              {name}
            </p>
          )}

          <span className="text-sm text-neutral-500 font-semibold">
            {count || 0} videos
          </span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};

export default Folder;
