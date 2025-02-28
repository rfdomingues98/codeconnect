import { cn } from "@codeconnect/ui";
import { icons } from "@codeconnect/ui/icons";

export function Loading({ className }: { className?: string }) {
  return <icons.Spinner className={cn("size-6 animate-spin", className)} />;
}
