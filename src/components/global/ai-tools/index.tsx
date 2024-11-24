/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import React from 'react';
import Loader from '../loader';
import VideoRecorderDuotone from '@/components/icons/video-recorder-duotone';
import { FileDuoToneBlack } from '@/components/icons';
import { Bot, DownloadIcon, Pencil, StarsIcon } from 'lucide-react';

type Props = {
  plan: 'PRO' | 'FREE';
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {
  //TODO:Setup the AI hook
  return (
    <TabsContent
      value="AI Tools"
      className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10 data-[state=inactive]:hidden"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="w-8/12 flex flex-col gap-y-2">
            <h2 className="text-3xl font-bold self-start">AI Tools</h2>
            <p className="text-[#BDBDBD]">
              Take your video to the next
              <br /> step with the power of AI!
            </p>
          </div>
          {/* {plan === 'FREE' ? (
          !trial ? (
            <Button className="w-4/12 mt-2 text-sm">
              <Loader state={false} color="#000">
                Try now
              </Loader>
            </Button>
          ) : (
            ''
          )
        ) : (
          ''
        )} */}

          {/* TODO Clear this button */}
          <div className="">
            <div className="flex items-end gap-2">
              <Button className="mt-2 text-sm" variant={'secondary'}>
                <Loader state={false} color="#000">
                  Try now
                </Loader>
              </Button>

              {/* TODO payment button */}
              <Button className="mt-2 text-sm">
                <Loader state={false} color="#000">
                  Pay now
                </Loader>
              </Button>
            </div>

            {/* <Button className="mt-2 text-sm w-full" variant={'outline'}>
            <Loader state={false} color="#000">
              Generate now
            </Loader>
          </Button> */}
          </div>
        </div>
        <div className="border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f]">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#a22fe0]">Golap AI</h2>
            <StarsIcon color="#a22fe0" fill="#a22fe0" />
          </div>

          <div className="flex items-start gap-2">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">Summary</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">Summary</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]">
              <Bot color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">AI Agent</h3>
              <p className="text-muted-foreground text-sm">
                Viewers can ask questions on your video and our AI agent will
                respond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
