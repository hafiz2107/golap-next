import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { ReactNode } from 'react';

type Props = {
  triggers: string[];
  children: ReactNode;
  defaulValue: string;
};

const TabMenu = ({ children, defaulValue, triggers }: Props) => {
  return (
    <Tabs defaultValue={defaulValue} className="w-full">
      <TabsList className="flex justify-start bg-transparent">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className="capitalize text-base data-[state=active]:bg-[#1D1D1D] data-[state=inactive]"
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default TabMenu;
