import { icons } from "@codeconnect/ui/icons";

export const REALISTIC_MOCK_TREE_DATA = [
  {
    id: "1",
    name: "Source Code",
    children: [
      { id: "2", name: "index.ts", language: "typescript" },
      { id: "3", name: "utils.ts", language: "typescript" },
      { id: "4", name: "styles.css", language: "css" },
    ],
  },
];
export const TREE_MOCK_DATA = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      {
        id: "d1",
        name: "Alice",
        children: [
          { id: "d11", name: "Alice2", icon: icons.DocumentIcon },
          { id: "d12", name: "Bob2" },
          { id: "d13", name: "Charlie2" },
        ],
      },
      { id: "d2", name: "Bob", icon: icons.DocumentIcon },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "5",
    name: "Direct Messages",
    children: [
      {
        id: "e1",
        name: "Alice",
        children: [
          { id: "e11", name: "Alice2" },
          { id: "e12", name: "Bob2" },
          { id: "e13", name: "Charlie2" },
        ],
      },
      { id: "e2", name: "Bob" },
      { id: "e3", name: "Charlie" },
    ],
  },
  {
    id: "6",
    name: "Direct Messages",
    children: [
      {
        id: "f1",
        name: "Alice",
        children: [
          { id: "f11", name: "Alice2" },
          { id: "f12", name: "Bob2" },
          { id: "f13", name: "Charlie2" },
        ],
      },
      { id: "f2", name: "Bob" },
      { id: "f3", name: "Charlie" },
    ],
  },
];

export const utilsCodeExample = `export function add(a: number, b: number): number {
  return a + b;
}
`;
export const typescriptCodeExample = `import { add } from "./utils";

console.log("Hello, TypeScript!");
console.log(add(1, 2));
`;

export const tsTestsCodeExample = `import {expect, describe, it} from "vitest";

describe("Sample TypeScript Test", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
}
`;

export const cssCodeExample = `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

export type FileName = "index.ts" | "styles.css" | "index.test.ts" | "utils.ts";

export const files: Record<
  FileName,
  { name: string; language: "typescript" | "css"; value: string }
> = {
  "index.ts": {
    name: "index.ts",
    language: "typescript",
    value: typescriptCodeExample,
  },
  "utils.ts": {
    name: "utils.ts",
    language: "typescript",
    value: utilsCodeExample,
  },
  "styles.css": {
    name: "style.css",
    language: "css",
    value: cssCodeExample,
  },
  "index.test.ts": {
    name: "index.test.ts",
    language: "typescript",
    value: tsTestsCodeExample,
  },
};
