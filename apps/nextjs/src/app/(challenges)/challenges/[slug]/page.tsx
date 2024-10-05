import { notFound } from "next/navigation";

import { cn } from "@codeconnect/ui";
import { icons } from "@codeconnect/ui/icons";
import Markdown from "@codeconnect/ui/markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";
import { Separator } from "@codeconnect/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@codeconnect/ui/tabs";

import { api, HydrateClient } from "~/trpc/server";
import { DifficultyBadge } from "../_components/difficulty-badge";
import ChallengeEditor from "./_components/challenge-editor";
import { VideoCallPanel } from "./_components/panels/videocall-panel";
import { SideBar } from "./_components/sidebar";
import { StatusBar } from "./_components/statusbar";

// export const runtime = "edge"; // Cannot run on edge due to markdown parsing of mathematical expressions

interface Params {
  params: {
    slug: string;
  };
}

export default async function ChallengePage({ params: { slug } }: Params) {
  const challenge = await api.challenge.bySlug({ slug });

  if (!challenge) notFound();
  return (
    <HydrateClient>
      <main className="grid h-screen max-h-screen grid-cols-[max-content,auto] grid-rows-[auto,2.4rem] overflow-auto grid-areas-[sidebar_editor,sidebar_statusbar]">
        <SideBar />
        <div className="h-auto grid-in-[editor]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel minSize={20} defaultSize={40}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel minSize={40} defaultSize={60}>
                  <div className="flex h-full w-full flex-col">
                    <div
                      className={cn(
                        "flex-1 overflow-auto",
                        "scrollbar scrollbar-w-3",
                      )}
                    >
                      <header className="flex flex-col gap-3 p-5">
                        <div className="flex items-center gap-3">
                          <DifficultyBadge difficulty={challenge.difficulty} />

                          <h1 className="w-max text-xl font-medium">
                            {challenge.title}
                          </h1>
                        </div>
                        <div className="flex gap-5">
                          <span className="flex items-center gap-2 text-sm capitalize">
                            <icons.User className="size-4" />
                            {challenge.author?.name}
                          </span>
                          <span className="flex items-center gap-2 text-sm capitalize">
                            <icons.User className="size-4" />
                            {challenge.author?.name}
                          </span>
                          <span className="flex items-center gap-2 text-sm capitalize">
                            <icons.User className="size-4" />
                            {challenge.author?.name}
                          </span>
                        </div>
                      </header>
                      <Separator />
                      <div className="p-5">
                        <Tabs defaultValue="instructions">
                          <TabsList>
                            <TabsTrigger value="instructions">
                              Instructions
                            </TabsTrigger>
                            <TabsTrigger value="output">Output</TabsTrigger>
                          </TabsList>

                          <TabsContent value="instructions">
                            <Markdown content={challenge.description} />
                          </TabsContent>
                          <TabsContent value="output">
                            <div className="flex h-full w-full flex-col"></div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <VideoCallPanel />
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel minSize={50} defaultSize={60}>
              <ChallengeEditor challenge={challenge} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <StatusBar />
      </main>
    </HydrateClient>
  );
}
