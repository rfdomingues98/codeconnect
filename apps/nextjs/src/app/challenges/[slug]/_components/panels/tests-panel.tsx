"use client";

import { useRef, useState } from "react";

import type { ImperativePanelHandle } from "@codeconnect/ui/resizable";
import { cn } from "@codeconnect/ui";
import { Button } from "@codeconnect/ui/button";
import { icons } from "@codeconnect/ui/icons";
import { ResizablePanel } from "@codeconnect/ui/resizable";

import { CodeEditor } from "../codemirror/editor";
import { files } from "../editor/constants";

export function TestsPanel() {
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
      minSize={10}
      defaultSize={40}
      collapsible
      collapsedSize={4}
      ref={testsRef}
      onCollapse={() => setPanelState("collapsed")}
      onExpand={() => setPanelState("expanded")}
    >
      <div className="flex h-full flex-col">
        <header
          className={cn(
            "flex cursor-pointer items-center justify-between p-3",
            panelState === "collapsed" && "h-full py-0",
            panelState === "expanded" && "h-10 border-b",
          )}
          onClick={togglePanelState}
        >
          <p className="text-sm">Tests</p>
          <Button size="icon" variant="link">
            <icons.ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                panelState === "collapsed" && "rotate-180",
              )}
            />
          </Button>
        </header>
        <div className="h-[calc(100%-40px)] w-full">
          <label htmlFor="comment" className="sr-only">
            Add your code
          </label>
          <CodeEditor initialCode={files["index.test.ts"].value} />
        </div>
      </div>
    </ResizablePanel>
  );
}
