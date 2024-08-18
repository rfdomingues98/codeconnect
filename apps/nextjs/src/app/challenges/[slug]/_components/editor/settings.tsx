import { useEditorStore } from "@codeconnect/editor";
import { Button } from "@codeconnect/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@codeconnect/ui/popover";
import { Separator } from "@codeconnect/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@codeconnect/ui/toggle-group";

import type { EditorMode, EditorTheme } from "~/stores/editor-store";
import { defaultInitState } from "~/stores/editor-store";

export function Settings() {
  const { mode, setMode, theme, setTheme } = useEditorStore((state) => state);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-4">
        <header>
          <p className="text-xl font-medium">Settings</p>
          <Separator className="mt-2" />
        </header>
        <div className="grid grid-cols-[max-content_auto] items-center gap-x-3 gap-y-5">
          <div>Mode</div>
          <div>
            <ToggleGroup
              id="mode"
              type="single"
              value={mode}
              defaultValue={defaultInitState.mode}
              onValueChange={(value) => {
                if (value) setMode(value as EditorMode);
              }}
            >
              <ToggleGroupItem value="normal">Normal</ToggleGroupItem>
              <ToggleGroupItem value="vim">Vim</ToggleGroupItem>
              <ToggleGroupItem value="emacs">Emacs</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div>Theme</div>
          <div>
            <ToggleGroup
              id="theme"
              type="single"
              value={theme}
              defaultValue={defaultInitState.theme}
              onValueChange={(value) => {
                if (value) setTheme(value as EditorTheme);
              }}
            >
              <ToggleGroupItem value="light">Light</ToggleGroupItem>
              <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
              <ToggleGroupItem value="sync">Sync</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
