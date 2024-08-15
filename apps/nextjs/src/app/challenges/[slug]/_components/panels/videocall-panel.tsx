"use client";

import { useRef, useState } from "react";

import type { ImperativePanelHandle } from "@codeconnect/ui/resizable";
import { cn } from "@codeconnect/ui";
import { Button } from "@codeconnect/ui/button";
import { icons } from "@codeconnect/ui/icons";
import { ResizablePanel } from "@codeconnect/ui/resizable";

export function VideoCallPanel() {
  const testsRef = useRef<ImperativePanelHandle | null>(null);
  const [panelState, setPanelState] = useState<"expanded" | "collapsed">(
    "expanded",
  );

  const togglePanelState = () => {
    if (testsRef.current?.isExpanded()) testsRef.current.collapse();
    else testsRef.current?.expand();
  };

  return (
    <ResizablePanel
      minSize={30}
      defaultSize={40}
      collapsible
      collapsedSize={4}
      ref={testsRef}
      onCollapse={() => setPanelState("collapsed")}
      onExpand={() => setPanelState("expanded")}
    >
      <div className="grow-full flex h-full flex-col">
        <header
          className={cn(
            "flex cursor-pointer items-center justify-between p-3",
            panelState === "collapsed" && "h-full py-0",
            panelState === "expanded" && "h-10 border-b",
          )}
          onClick={togglePanelState}
        >
          <p className="text-sm">Video Conference</p>
          <div className="flex items-center gap-3">
            {panelState === "collapsed" && (
              <>
                <Button className="" size="xs">
                  <icons.VideoCamera className="size-4" />
                </Button>
                <Button className="" size="xs">
                  <icons.MicrophoneIcon className="size-4" />
                </Button>
                <Button className="" size="xs">
                  <icons.PhoneIcon className="size-4" />
                </Button>
              </>
            )}
            <Button size="icon" variant="link">
              <icons.ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  panelState === "collapsed" && "rotate-180",
                )}
              />
            </Button>
          </div>
        </header>
        <div className="h-full">
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-3">
            <div className="aspect-video h-full bg-zinc-900"></div>
            <div className="flex gap-3">
              <div className="flex gap-3">
                <Button size="icon">
                  <icons.VideoCamera className="size-5" />
                </Button>
                <Button size="icon">
                  <icons.MicrophoneIcon className="size-5" />
                </Button>
                <Button size="icon">
                  <icons.PhoneIcon className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-full w-full">
          
              
            </div>
          </div>
        </div> */}
      </div>
    </ResizablePanel>
  );
}
