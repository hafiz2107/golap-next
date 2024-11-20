import { Input } from '@/components/ui/input';
import { Search, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import InfoBarSearch from '../search/info-bar-search';
import { Button } from '@/components/ui/button';
import VideoRecorderIcon from '@/components/icons/video-recorder';
import { UserButton } from '@clerk/nextjs';

type Props = {
  workspaceId: string;
};

const InfoBar = ({ workspaceId }: Props) => {
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  return (
    <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search size={25} className="text-[#707070]" />
        <Input
          onClick={() => setSearchBoxOpen(true)}
          className="bg-transparent border-none !placeholder-neutral-500"
          placeholder="Search for people, projects & folders"
        />
      </div>

      <InfoBarSearch
        open={searchBoxOpen}
        setOpen={setSearchBoxOpen}
        workspaceId={workspaceId}
      />
      <div className="flex items-center gap-4">
        <Button className="bg-[#9D9D9D] flex items-center gap-2s">
          <UploadIcon size={20} />{' '}
          <span className="flex items-center gap-2">Upload</span>
        </Button>
        <Button className="bg-[#9D9D9D] flex items-center gap-2s">
          <VideoRecorderIcon />
          <span className="flex items-center gap-2">Record</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
