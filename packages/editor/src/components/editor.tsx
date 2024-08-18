"use client";

import type { Extension, ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { emacs } from "@replit/codemirror-emacs";
import { vim } from "@replit/codemirror-vim";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import CodeMirror, { keymap, scrollPastEnd } from "@uiw/react-codemirror";

import { cn } from "@codeconnect/ui";

import { useEditorStore } from "../providers";
import { customSearchPanel } from "./search";

type Props = ReactCodeMirrorProps;

export function Editor(props: Props) {
  const { mode } = useEditorStore((state) => state);
  const defaultExtensions: Extension[] = [
    mode === "normal"
      ? keymap.of(vscodeKeymap)
      : mode === "vim"
        ? vim({ status: true })
        : emacs(),
    javascript({ jsx: true, typescript: true }),
    customSearchPanel,
    scrollPastEnd(),
  ];
  let extensions: Extension[];
  if (props.extensions)
    extensions = [...defaultExtensions, ...props.extensions];
  else extensions = defaultExtensions;

  return (
    <CodeMirror
      height="100%"
      {...props}
      extensions={extensions}
      className={cn("h-full", props.className)}
    />
  );
}
