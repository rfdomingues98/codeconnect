"use client";

import { Suspense, useState } from "react";

import { Button } from "@codeconnect/ui/button";
import { Tree } from "@codeconnect/ui/file-tree";
import { icons } from "@codeconnect/ui/icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";
import { Skeleton } from "@codeconnect/ui/skeleton";

import { useCurrentChallenge } from "~/contexts/challenge";
import { REALISTIC_MOCK_TREE_DATA } from "../editor/constants";
import Editor from "../editor/Editor";
import { LanguageSelector } from "../editor/language-selector";
import { Settings } from "../editor/settings";

type FileName = "index.ts" | "styles.css";
export function EditorPanel() {
  const [content, setContent] = useState<FileName>("index.ts");
  const challenge = useCurrentChallenge();

  return (
    <>
      <ResizablePanel minSize={20} defaultSize={60}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={15} defaultSize={20}>
            <Tree
              data={REALISTIC_MOCK_TREE_DATA}
              className="h-full w-full flex-shrink-0"
              initialSlelectedItemId="2"
              onSelectChange={(item) => {
                setContent(item?.name as FileName);
              }}
              folderIcon={icons.FolderIcon}
              itemIcon={icons.DocumentIcon}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={60} defaultSize={80}>
            <div className="flex h-full flex-col">
              <div className="flex h-12 items-center justify-between border-b px-4 py-2">
                <div className="flex h-full items-center gap-2">
                  <span>{content}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Suspense fallback={<Skeleton className="h-8 w-24" />}>
                    <LanguageSelector />
                  </Suspense>
                  <Settings />
                  <Button size="sm" variant="outline">
                    Format
                  </Button>
                  <Button size="sm" variant="outline">
                    Run
                  </Button>
                  <Button size="sm" variant="primary">
                    Submit
                  </Button>
                </div>
              </div>
              <div className="h-[calc(100%-48px)] w-full">
                <label htmlFor="comment" className="sr-only">
                  Add your code
                </label>
                <Editor
                  fileName={content}
                  initialCode={challenge.languages[0]?.initialCode}
                  key="code-editor"
                  value={challenge.languages[0]?.initialCode}
                />
                {/*                 <CodeEditor initialCode={initialCode} /> */}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </>
  );
}
