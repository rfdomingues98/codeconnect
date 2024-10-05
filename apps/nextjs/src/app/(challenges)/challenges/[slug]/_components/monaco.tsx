import React, { useEffect, useRef, useState } from "react";
import { loader, Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

// Initialize Monaco loader
loader.config({ monaco });

interface File {
  name: string;
  language: string;
  value: string;
}

interface MonacoEditorProps {
  files: File[];
  onFileChange?: (fileName: string, newValue: string) => void;
  externalPackages?: string[];
}

function getOrCreateModel(
  monaco: Monaco,
  uri: monaco.Uri,
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

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  files,
  onFileChange,
  externalPackages,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [currentFile, setCurrentFile] = useState<File>(files[0]);

  useEffect(() => {
    if (!editorRef.current) {
      initializeEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const model = getOrCreateModel(
        monaco,
        monaco.Uri.parse(`file:///${currentFile.name}`),
        currentFile.language,
        currentFile.value,
      );

      editorRef.current.setModel(model);
    }
  }, [currentFile]);

  const initializeEditor = () => {
    editorRef.current = monaco.editor.create(
      document.getElementById("monaco-container")!,
      {
        value: currentFile.value,
        language: currentFile.language,
        theme: "vs-dark",
        automaticLayout: true,
      },
    );

    // Set up TypeScript compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
    });

    // Add external packages
    externalPackages?.forEach((pkg) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        `declare module '${pkg}' { }`,
        `file:///node_modules/${pkg}/index.d.ts`,
      );
    });

    // Set up file system
    files.forEach((file) => {
      monaco.editor.createModel(
        file.value,
        file.language,
        monaco.Uri.parse(`file:///${file.name}`),
      );
    });

    // Handle file changes
    editorRef.current.onDidChangeModelContent(() => {
      const newValue = editorRef.current!.getValue();
      onFileChange?.(currentFile.name, newValue);
    });
  };

  const handleFileSelect = (fileName: string) => {
    const selectedFile = files.find((file) => file.name === fileName);
    if (selectedFile) {
      setCurrentFile(selectedFile);
    }
  };

  return (
    <div>
      <div>
        <select onChange={(e) => handleFileSelect(e.target.value)}>
          {files.map((file) => (
            <option key={file.name} value={file.name}>
              {file.name}
            </option>
          ))}
        </select>
      </div>
      <div id="monaco-container" style={{ width: "800px", height: "600px" }} />
    </div>
  );
};

export default MonacoEditor;
