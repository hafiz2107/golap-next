'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import Loader from '../loader';
import FolderDuotone from '@/components/icons/folder-duotone';
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData';
import { renameFolders } from '@/actions/workspace';
import { Input } from '@/components/ui/input';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { FolderPen, Trash } from 'lucide-react';

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

  const { mutate } = useMutationData(
    ['rename-folders'],
    (data: { name: string; id: string }) => renameFolders(id, data.name),
    'workspace-folders',
    Renamed
  );

  const { latestVariables: latestFolderName } = useMutationDataState([
    'rename-folders',
  ]);

  const pathName = usePathname();
  const router = useRouter();

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathName}/folder/${id}`);
  };

  const handleFolderRename = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    e.stopPropagation();
    Rename();
  };

  const updateFolderName: React.FocusEventHandler<HTMLInputElement> = () => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id });
      } else {
        Renamed();
      }
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          ref={folderCardRef}
          onClick={handleFolderClick}
          className={cn(
            optimistic && 'opacity-60',
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
                  className="border-none text-base w-full focus:border-none outline-none h-6 text-neutral-300 bg-transparent px-4"
                />
              ) : (
                <p
                  onClick={(e) => e.stopPropagation()}
                  className="text-neutral-300 font-semibold"
                  onDoubleClick={handleFolderRename}
                >
                  {latestFolderName &&
                  latestFolderName.status === 'pending' &&
                  latestFolderName.variables.id === id
                    ? latestFolderName.variables.name
                    : name}
                </p>
              )}

              <span className="text-sm text-neutral-500 font-semibold">
                {count || 0} {count && count > 1 ? 'videos' : 'video'}
              </span>
            </div>
          </Loader>
          <FolderDuotone />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleFolderRename}>
          Rename
          <ContextMenuShortcut>
            <FolderPen size={14} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Delete
          <ContextMenuShortcut>
            <Trash size={14} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Folder;
