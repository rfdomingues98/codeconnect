import { cn } from "@codeconnect/ui";
import { Badge } from "@codeconnect/ui/badge";

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) {
  return (
    <Badge
      className={cn(
        "uppercase",
        difficulty === "easy" && "hover:bg-green-60 bg-green-600",
        difficulty === "medium" && "hover:bg-yellow-60 bg-yellow-600",
        difficulty === "hard" && "hover:bg-red-60 bg-red-600",
      )}
    >
      {difficulty}
    </Badge>
  );
}
