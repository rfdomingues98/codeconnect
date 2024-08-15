"use client";

import type { Extension, ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { emacs } from "@replit/codemirror-emacs";
import { vim } from "@replit/codemirror-vim";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day";
import CodeMirror, { keymap, scrollPastEnd } from "@uiw/react-codemirror";

import { useTheme } from "@codeconnect/ui/theme";

import { useEditorStore } from "~/providers/editor-store-provider";
import { customSearchPanel } from "./search";

interface Props {
  initialCode: string;
}

export function CodeEditor({ initialCode }: Props) {
  const [value, setValue] = useState(initialCode);
  const { resolvedTheme } = useTheme();
  const onChange = useCallback((val: string, _viewUpdate: ViewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  const { mode } = useEditorStore((state) => state);
  const extensions: Extension[] = [
    mode === "normal"
      ? keymap.of(vscodeKeymap)
      : mode === "vim"
        ? vim({ status: true })
        : emacs(),
    javascript({ jsx: true, typescript: true }),
    customSearchPanel,
    scrollPastEnd(),
  ];
  return (
    <CodeMirror
      className="h-full"
      value={value}
      height="100%"
      theme={resolvedTheme === "dark" ? tokyoNight : tokyoNightDay}
      extensions={extensions}
      onChange={onChange}
    />
  );
}
