import { cn } from "@codeconnect/ui";
import { Skeleton } from "@codeconnect/ui/skeleton";

export function ChallengeCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => i).map((i) => (
        <div key={i} className="w-full rounded-lg border bg-card p-4 shadow">
          <div className="flex-grow">
            <Skeleton
              className={cn("w-1/4 rounded bg-muted text-2xl font-bold")}
            >
              &nbsp;
            </Skeleton>
            <Skeleton className={cn("mt-4 w-full rounded bg-muted text-sm")}>
              &nbsp;
            </Skeleton>
            <Skeleton className={cn("mt-2 w-1/4 rounded bg-muted text-sm")}>
              &nbsp;
            </Skeleton>
          </div>
        </div>
      ))}
    </>
  );
}
