import type { RouterOutputs } from "@codeconnect/api";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@codeconnect/ui/resizable";

import { EditorPanel } from "./panels/editor-panel";
import { TestsPanel } from "./panels/tests-panel";

export default function ChallengeEditor({
  challenge,
}: {
  challenge: NonNullable<RouterOutputs["challenge"]["bySlug"]>;
}) {
  return (
    <>
      <ResizablePanelGroup direction="vertical">
        <EditorPanel initialCode={challenge.initialCode} />
        <ResizableHandle />
        <TestsPanel />
      </ResizablePanelGroup>
    </>
  );
}
