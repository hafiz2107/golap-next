import CreateFolders from '@/components/global/create-folders';
import CreateWorkspace from '@/components/global/create-workspace';
import Folders from '@/components/global/folders';
import Videos from '@/components/global/videos';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { QueryKeys } from '@/contants/query-keys';
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs';
import React from 'react';

type Props = {
  params: Promise<{ workspaceId: string }>;
};

const WorkspaceDetailsPage = async ({ params }: Props) => {
  const { workspaceId } = await params;
  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="p-[8px] data-[state=active]:text-[#e1e0e0] font-semibold px-6 rounded-full data-[state=active]:bg-[#414141]"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="p-[8px] data-[state=active]:text-[#e1e0e0] font-semibold px-6 rounded-full data-[state=active]:bg-[#414141]"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkspace />
            <CreateFolders workspaceId={workspaceId} />
          </div>
        </div>
        <section className=" py-9">
          <TabsContent value="videos" className="flex flex-col gap-3">
            <Folders workspaceId={workspaceId} />
            <Separator />
            <Videos
              workspaceId={workspaceId}
              folderId={workspaceId}
              videosKey={QueryKeys.dashboard.userVideos}
            />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default WorkspaceDetailsPage;
