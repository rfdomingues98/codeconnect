import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type EditorMode = "normal" | "vim" | "emacs";
export interface EditorState {
  mode: EditorMode;
  activeFile?: string;
}

export interface EditorActions {
  setActiveFile: (fileName: string) => void;
  setMode: (mode: EditorMode) => void;
}

export type EditorStore = EditorState & EditorActions;

export const initEditorStore = (): EditorState => {
  return defaultInitState;
};

export const defaultInitState: EditorState = {
  mode: "normal",
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
      }),
      {
        name: "codeconnect-editor-settings",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
