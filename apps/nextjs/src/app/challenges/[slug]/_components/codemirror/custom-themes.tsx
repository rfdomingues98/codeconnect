import { tags as t } from "@lezer/highlight";
import { createTheme } from "thememirror";

export const lightTheme = createTheme({
  variant: "light",
  settings: {
    background: "#fafafa",
    foreground: "#5c6166",
    caret: "#dc8a78",
    selection: "#7c7f934d",
    lineHighlight: "#8839ef26",
    gutterBackground: "#fafafa",
    gutterForeground: "#7c7f93",
  },
  styles: [
    {
      tag: t.comment,
      color: "#9ca0b0",
    },
    {
      tag: t.variableName,
      color: "#5c6166",
    },
    {
      tag: [t.string, t.special(t.brace)],
      color: "#5c6166",
    },
    {
      tag: t.number,
      color: "#5c6166",
    },
    {
      tag: t.bool,
      color: "#5c6166",
    },
    {
      tag: t.null,
      color: "#5c6166",
    },
    {
      tag: t.keyword,
      color: "#bc6bff",
    },
    {
      tag: t.operator,
      color: "#5c6166",
    },
    {
      tag: t.className,
      color: "#3cc38f",
    },
    {
      tag: t.definition(t.typeName),
      color: "#1e66f5",
    },
    {
      tag: t.typeName,
      color: "#5c6166",
    },
    {
      tag: t.angleBracket,
      color: "#04a5e5",
    },
    {
      tag: t.tagName,
      color: "#5c6166",
    },
    {
      tag: t.attributeName,
      color: "#5c6166",
    },
  ],
});
