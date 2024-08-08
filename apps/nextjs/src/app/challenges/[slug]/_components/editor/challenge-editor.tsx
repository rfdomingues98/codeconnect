"use client";

import { useRef } from "react";

import type { RouterOutputs } from "@codeconnect/api";
import type { ImperativePanelHandle } from "@codeconnect/ui/resizable";
import { cn } from "@codeconnect/ui";
import { Button } from "@codeconnect/ui/button";
import { icons } from "@codeconnect/ui/icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";

import { EditorPanel } from "./editor-panel";
import { LanguageSelector } from "./language-selector";

export default function ChallengeEditor({
  challenge,
}: {
  challenge: NonNullable<RouterOutputs["challenge"]["bySlug"]>;
}) {
  const testsRef = useRef<ImperativePanelHandle | null>(null);
  console.log({ testsRef });

  return (
    <>
      <div className="flex h-10 items-center justify-between border-b p-3 py-6">
        <div className="flex items-center space-x-5">
          <LanguageSelector />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Test</Button>
          <Button variant="primary">Submit</Button>
        </div>
      </div>
      <ResizablePanelGroup direction="vertical">
        <EditorPanel initialCode={challenge.initialCode} />
        <ResizableHandle />
        <ResizablePanel
          minSize={20}
          defaultSize={40}
          collapsible
          collapsedSize={10}
          ref={testsRef}
        >
          <div
            className={cn(
              "h-full p-3",
              testsRef.current?.isCollapsed() && "py-0",
            )}
          >
            <div className="flex h-full items-center justify-between">
              <p>Tests</p>
              <Button
                size="icon"
                variant="link"
                onClick={() => {
                  if (testsRef.current?.isExpanded())
                    testsRef.current.collapse();
                  else testsRef.current?.expand();
                }}
              >
                <icons.ChevronDown
                  className={cn(
                    "size-4",
                    testsRef.current?.isCollapsed() && "rotate-180",
                  )}
                />
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
