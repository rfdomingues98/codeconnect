import type { Monaco } from "@monaco-editor/react";
import type { ComponentProps, FormEventHandler } from "react";
import { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

import { ResizablePanel } from "@codeconnect/ui/resizable";
import { useTheme } from "@codeconnect/ui/theme";

import CatppuccinLatte from "./themes/catppuccin-latte.json";
import CatppuccinMocha from "./themes/catppuccin-mocha.json";

interface Props {
  initialCode: string;
}
export function EditorPanel({ initialCode }: Props) {
  const { resolvedTheme } = useTheme();
  const monaco = useMonaco();
  useEffect(() => {
    if (resolvedTheme === "dark") monaco?.editor.setTheme("CatppuccinMocha");
    else monaco?.editor.setTheme("CatppuccinLatte");
  }, [monaco?.editor, resolvedTheme]);

  const options: ComponentProps<typeof Editor>["options"] = {
    selectOnLineNumbers: true,
    minimap: { enabled: false },
    fontSize: 14,
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("CatppuccinMocha", {
      inherit: true,
      base: "vs-dark",
      ...CatppuccinMocha,
    });
    monaco.editor.defineTheme("CatppuccinLatte", {
      inherit: true,
      base: "vs-dark",
      ...CatppuccinLatte,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("Submitting code...");
  };
  return (
    <ResizablePanel minSize={20} defaultSize={60}>
      <form action="#" onSubmit={handleSubmit}>
        <div className="w-full">
          <label htmlFor="comment" className="sr-only">
            Add your code
          </label>
          <Editor
            width="100%"
            height="85vh"
            defaultLanguage="typescript"
            theme="CatppuccinMocha"
            options={options}
            defaultValue={initialCode}
            beforeMount={handleEditorDidMount}
            // loading={}
          />
        </div>
      </form>
    </ResizablePanel>
  );
}
