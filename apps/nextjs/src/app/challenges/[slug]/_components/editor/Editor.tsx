/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import type { EditorProps, Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";
import EditorMonaco, { useMonaco } from "@monaco-editor/react";

import { useTheme } from "@codeconnect/ui/theme";

import type { FileName } from "./constants";
import { setEditorLibs } from "~/utils/setEditorDefaults";
import { files } from "./constants";
import CatppuccinLatte from "./themes/catppuccin-latte.json";
import CatppuccinMocha from "./themes/catppuccin-mocha.json";

export default function Editor({
  fileName = "index.ts",
  ...props
}: EditorProps & {
  fileName?: FileName;
  initialCode?: string;
}) {
  const monaco = useMonaco();

  const { resolvedTheme } = useTheme();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const file = files[fileName];

  useEffect(() => {
    if (resolvedTheme === "dark") monaco?.editor.setTheme("CatppuccinMocha");
    else monaco?.editor.setTheme("CatppuccinLatte");
  }, [monaco?.editor, resolvedTheme]);

  useEffect(() => {
    editorRef.current?.focus();
    if (monaco) {
      const model = monaco.editor.getModel(monaco.Uri.parse(file.name));
      editorRef.current?.setModel(model);
    }
  }, [file.name, monaco]);

  const options: ComponentProps<typeof EditorMonaco>["options"] = {
    selectOnLineNumbers: true,
    minimap: { enabled: false },
    fontSize: 12,
    fixedOverflowWidgets: true,
  };

  const handleOnMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleBeforeMount = async (monaco: Monaco) => {
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

    monaco.editor.registerEditorOpener({
      openCodeEditor(source, resource, selectionOrPosition) {
        const model = monaco.editor.getModel(resource);
        source.setModel(model);
        if (monaco.Range.isIRange(selectionOrPosition)) {
          source.revealRangeInCenterIfOutsideViewport(selectionOrPosition);
          source.setSelection(selectionOrPosition);
        } else {
          source.revealPositionInCenterIfOutsideViewport(selectionOrPosition!);
          source.setPosition(selectionOrPosition!);
        }
        return true;
      },
    });
    monaco.languages.typescript.typescriptDefaults.setModeConfiguration({
      definitions: true,
      completionItems: true,
      documentSymbols: true,
      codeActions: true,
      diagnostics: true,
      onTypeFormattingEdits: true,
    });
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      typeRoots: ["types"],
    });

    if (typeof window !== "undefined") {
      await setEditorLibs(monaco);
      const libs =
        monaco.languages.typescript.typescriptDefaults.getExtraLibs();
      console.log({ libs, monaco });
    }
  };

  return (
    <EditorMonaco
      width="100%"
      theme="CatppuccinMocha"
      options={options}
      beforeMount={handleBeforeMount}
      onMount={handleOnMount}
      path={file.name}
      defaultLanguage={file.language}
      defaultValue={props.initialCode ?? file.value}
      {...props}
    />
  );
}
