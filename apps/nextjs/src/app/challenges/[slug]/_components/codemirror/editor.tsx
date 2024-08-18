"use client";

import type { ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day";

import { Editor } from "@codeconnect/editor";
import { useTheme } from "@codeconnect/ui/theme";

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

  return (
    <Editor
      value={value}
      theme={resolvedTheme === "dark" ? tokyoNight : tokyoNightDay}
      onChange={onChange}
    />
  );
}
