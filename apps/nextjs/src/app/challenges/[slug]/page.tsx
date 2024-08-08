import { notFound } from "next/navigation";

import { cn } from "@codeconnect/ui";
import { Badge } from "@codeconnect/ui/badge";
import { icons } from "@codeconnect/ui/icons";
import Markdown from "@codeconnect/ui/markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";
import { Separator } from "@codeconnect/ui/separator";

import { api, HydrateClient } from "~/trpc/server";
import ChallengeEditor from "./_components/editor/challenge-editor";

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
      <main className="flex-1 overflow-auto">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={20} defaultSize={40}>
            <div className="flex h-full w-full flex-col">
              <div
                className={cn(
                  "flex-1 overflow-auto",
                  "scrollbar scrollbar-w-3",
                )}
              >
                <header className="p-5">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={cn(
                        "uppercase",
                        challenge.difficulty === "easy" && "bg-green-600",
                        challenge.difficulty === "medium" && "bg-yellow-600",
                        challenge.difficulty === "hard" && "bg-red-600",
                      )}
                    >
                      {challenge.difficulty}
                    </Badge>

                    <h1 className="w-max text-2xl font-medium">
                      {challenge.title}
                    </h1>
                  </div>

                  <span className="flex items-center gap-2 capitalize">
                    <icons.User className="size-4" />
                    {challenge.author?.name}
                  </span>
                </header>
                <Separator />
                <div className="p-5">
                  <Markdown content={challenge.description} />
                </div>
              </div>
              <div className="box-border flex h-[350px] items-center justify-center border-t p-3">
                <div className="aspect-square h-full bg-zinc-900"></div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={50} defaultSize={60}>
            <ChallengeEditor challenge={challenge} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </HydrateClient>
  );
}
