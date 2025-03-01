import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";

import { EditorPanel } from "./panels/editor-panel";
import { TestsPanel } from "./panels/tests-panel";

export default function ChallengeEditor() {
  return (
    <>
      <ResizablePanelGroup direction="vertical">
        <EditorPanel />
        <ResizableHandle />
        <TestsPanel />
      </ResizablePanelGroup>
    </>
  );
}
