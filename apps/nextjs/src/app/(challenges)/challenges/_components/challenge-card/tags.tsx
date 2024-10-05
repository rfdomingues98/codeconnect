import { Badge } from "@codeconnect/ui/badge";
import { icons } from "@codeconnect/ui/icons";

export function ChallengeTags() {
  return (
    <div className="mt-2 flex items-center gap-2 text-xs text-foreground/70">
      <icons.TagIcon className="size-3.5" />
      <Badge className="text-foregroud/70 bg-background/70 hover:bg-background/70 hover:text-foreground">
        Dynamic Programming
      </Badge>
      <Badge className="text-foregroud/70 bg-background/70 hover:bg-background/70 hover:text-foreground">
        Javascript
      </Badge>
    </div>
  );
}
