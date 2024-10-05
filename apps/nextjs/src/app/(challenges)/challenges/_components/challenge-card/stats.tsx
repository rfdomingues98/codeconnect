import { icons } from "@codeconnect/ui/icons";

export function ChallengeStats() {
  return (
    <div className="flex space-x-4 text-sm text-foreground/70">
      <span className="flex items-center gap-1">
        <icons.StarIcon className="size-3.5" />
        141
      </span>
      <span className="flex items-center gap-1">
        <icons.FireIcon className="size-3.5" />
        91% of 2141
      </span>
      <span className="flex items-center gap-1">
        <icons.PuzzlePieceIcon className="size-3.5" />
        31,321
      </span>
      <span className="flex items-center gap-1">
        <icons.User className="size-3.5" />
        _rdomin
      </span>
      <span className="flex items-center gap-1">
        <icons.ExclamationTriangleIcon className="size-3.5" />2 issues reported
      </span>
    </div>
  );
}
