import * as prod from "react/jsx-runtime";
import rehypeMathjax from "rehype-mathjax";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export default function Markdown({ content }: { content: string }) {
  const contentToRender = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjax)
    .use(rehypeStringify)
    // @ts-expect-error idk
    .use(rehypeReact, production)
    .processSync(content).result;

  return (
    <div className="prose max-w-full dark:prose-invert">{contentToRender}</div>
  );
}
