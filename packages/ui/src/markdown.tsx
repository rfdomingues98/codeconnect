import * as prod from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export default function Markdown({ content }: { content: string }) {
  const contentToRender = unified()
    .use(remarkParse)
    .use(remarkRehype)
    // @ts-expect-error idk
    .use(rehypeReact, production)
    .processSync(content).result;

  return <div>{contentToRender}</div>;
}
