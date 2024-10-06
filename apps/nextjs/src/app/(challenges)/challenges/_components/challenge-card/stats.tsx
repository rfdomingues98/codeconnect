import type { ReactNode } from "react";

import { icons } from "@codeconnect/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@codeconnect/ui/tooltip";

interface StatProps {
  icon: keyof typeof icons;
  text: ReactNode;
  tooltip?: string;
}

function Stat({ icon, text, tooltip }: StatProps) {
  const Icon = icons[icon];
  const trigger = (
    <span className="flex items-center gap-1">
      <Icon className="size-3.5" />
      {text}
    </span>
  );
  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    trigger
  );
}

export function ChallengeStats() {
  return (
    <div className="flex space-x-4 text-sm text-foreground/70">
      <Stat
        icon="StarIcon"
        text="141"
        tooltip="Total times this challenge has been favorited."
      />
      <Stat
        icon="FireIcon"
        text="91% of 2141"
        tooltip="Satisfaction rate on this challenge after completion."
      />
      <Stat
        icon="PuzzlePieceIcon"
        text="31,321"
        tooltip="Total times this challenge has been completed."
      />
      <Stat
        icon="User"
        text="_rDomin"
        tooltip="The author of this challenge."
      />
      <Stat icon="ExclamationTriangleIcon" text="2 issues reported" />
    </div>
  );
}
