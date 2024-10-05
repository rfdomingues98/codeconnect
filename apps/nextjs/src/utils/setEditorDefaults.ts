import type { Monaco } from "@monaco-editor/react";
import type { Uri } from "monaco-editor";

import type { FileName } from "~/app/(challenges)/challenges/[slug]/_components/editor/constants";
import { files } from "~/app/(challenges)/challenges/[slug]/_components/editor/constants";

const libs = [
  {
    name: "vitest",
    url: "https://unpkg.com/vitest@2.0.5/dist/index.d.ts",
  },
  {
    name: "lodash",
    url: "https://unpkg.com/@types/lodash/index.d.ts",
  },
  {
    name: "react",
    url: "https://unpkg.com/@types/react@18.3.5/index.d.ts",
  },
];

export const fetchLibs = async () => {
  return Promise.all(
    libs.map(async (lib) => {
      const content = await (await fetch(lib.url)).text();
      return {
        url: lib.url,
        content,
        name: lib.name,
      };
    }),
  );
};

function getOrCreateModel(
  monaco: Monaco,
  uri: Uri,
  lang: string | undefined,
  value: string,
) {
  const model = monaco.editor.getModel(uri);
  if (model) {
    model.setValue(value);
    return model;
  }
  return monaco.editor.createModel(value, lang, uri);
}

export const setEditorLibs = async (monaco: Monaco) => {
  for (const fileName in files) {
    const file = files[fileName as FileName];

    if (monaco.editor.getModel(monaco.Uri.parse(`${file.name}`))) continue;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      file.value,
      `${file.name}`,
    );
    getOrCreateModel(
      monaco,
      monaco.Uri.parse(`${file.name}`),
      file.language,
      file.value,
    );
  }

  const extraLibs = await fetchLibs();
  for (const extraLib of extraLibs) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      extraLib.content,
      `file:///node_modules/@types/${extraLib.name}/index.d.ts`,
    );
  }
};
