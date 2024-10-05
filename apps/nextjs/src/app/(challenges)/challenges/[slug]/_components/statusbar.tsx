import { Button } from "@codeconnect/ui/button";

export function StatusBar() {
  return (
    <div className="flex h-full items-center gap-3 border-t px-3 text-xs grid-in-[statusbar]">
      <Button size="xs">Feedback</Button>
      <Button variant="secondary" size="xs">
        Report
      </Button>
    </div>
  );
}
