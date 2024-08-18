import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type EditorMode = "normal" | "vim" | "emacs";
export type EditorTheme = "dark" | "light" | "sync";
export interface EditorState {
  mode: EditorMode;
  theme: EditorTheme;
  activeFile?: string;
}

export interface EditorActions {
  setActiveFile: (fileName: string) => void;
  setMode: (mode: EditorMode) => void;
  setTheme: (theme: EditorTheme) => void;
}

export type EditorStore = EditorState & EditorActions;

export const initEditorStore = (): EditorState => {
  return defaultInitState;
};

export const defaultInitState: EditorState = {
  mode: "normal",
  theme: "sync",
};

export const createEditorStore = (
  initState: EditorState = defaultInitState,
) => {
  return createStore<EditorStore>()(
    persist(
      (set) => ({
        ...initState,
        setActiveFile: (fileName: string) => set({ activeFile: fileName }),
        setMode: (mode: EditorMode) => set({ mode }),
        setTheme: (theme: EditorTheme) => set({ theme }),
      }),
      {
        name: "codeconnect-editor-settings",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
