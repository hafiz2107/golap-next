import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import InfoBarSearch from '../search/info-bar-search';

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
    </header>
  );
};

export default InfoBar;
