import * as monaco from "monaco-editor";

const packageSuggestions = [
  { label: "react", insertText: "react", detail: "React library" },
  { label: "react-dom", insertText: "react-dom", detail: "React DOM library" },
  { label: "vitest", insertText: "vitest", detail: "Vitest testing framework" },
  { label: "lodash", insertText: "lodash", detail: "Lodash utility library" },
  // Add more package suggestions here
];

export function setupAutoImportSuggestions() {
  monaco.languages.registerCompletionItemProvider("typescript", {
    triggerCharacters: ['"', "'", "/"],
    provideCompletionItems: (model, position) => {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Check if the current line is an import statement
      if (/import\s.*\sfrom\s['"]/.exec(textUntilPosition)) {
        const suggestions = packageSuggestions.map((pkg) => ({
          label: pkg.label,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: pkg.insertText,
          detail: pkg.detail,
          range,
        }));

        return {
          suggestions,
        };
      }

      return { suggestions: [] };
    },
  });
}
