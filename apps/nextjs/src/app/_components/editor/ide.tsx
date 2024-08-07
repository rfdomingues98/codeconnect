"use client";

import type { Monaco } from "@monaco-editor/react";
import type { ComponentProps, FormEventHandler } from "react";
import { useEffect, useState } from "react";
import { cn } from "@codeconnect/ui";
import Markdown from "@codeconnect/ui/markdown";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";
import { Editor } from "@monaco-editor/react";

import exercises from "../../../exercises.json";
import DarkPlus from "./themes/dark_plus.json";

interface Test {
  code: string;
  result: unknown;
}
interface Exercise {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  tests: Test[];
}

export default function IDE() {
  const [exerciseId, setExerciseId] = useState(3);

  const [exercise, setExercise] = useState<Exercise | null>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    exercises[exerciseId]!,
  );
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setExercise(exercises[exerciseId]!);
  }, [exerciseId]);
  const options: ComponentProps<typeof Editor>["options"] = {
    selectOnLineNumbers: true,
    minimap: { enabled: false },
    fontSize: 14,
  };
  const handlePrevious = () => {
    setExerciseId((current) => (current - 1) % exercises.length);
  };
  const handleNext = () => {
    setExerciseId((current) => (current + 1) % exercises.length);
  };
  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("DarkPlus", {
      inherit: true,
      base: "vs-dark",
      ...DarkPlus,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Submitting code...");
    console.log({ exercises });
  };

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={20} defaultSize={30}>
        <div className="flex h-full flex-col">
          <div
            className={cn(
              "prose dark:prose-invert w-full flex-1 overflow-auto p-5 pb-1",
              "scrollbar scrollbar-w-3",
            )}
          >
            <h1 className="text-2xl font-medium">{exercise?.title}</h1>
            <Markdown content={exercise?.description ?? ""} />
          </div>
          <div className="box-border flex h-[350px] items-center justify-center p-3 shadow shadow-red-300">
            <div className="aspect-square h-full bg-zinc-900"></div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={50} defaultSize={70}>
        <form action="#" onSubmit={handleSubmit}>
          <div className="w-full">
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              width="100%"
              height="85vh"
              defaultLanguage="typescript"
              theme="DarkPlus"
              options={options}
              defaultValue={exercise?.initialCode}
              value={exercise?.initialCode}
              beforeMount={handleEditorDidMount}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex gap-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                onClick={handleNext}
              >
                Next
              </button>
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Run
              </button>
            </div>
          </div>
        </form>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
