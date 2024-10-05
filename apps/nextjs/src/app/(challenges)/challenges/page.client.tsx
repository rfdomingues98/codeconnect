"use client";

import { useCallback, useEffect, useRef } from "react";
import { useQueryStates } from "nuqs";

import { cn } from "@codeconnect/ui";

import { api } from "~/trpc/react";
import { ChallengeCard } from "./_components/challenge-card";
import { ChallengeCardSkeleton } from "./_components/challenge-card/skeleton";
import { filtersParsers } from "./searchParams";

export default function ChallengesPage() {
  const [filters] = useQueryStates(filtersParsers);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = api.challenge.getInfinite.useInfiniteQuery(
    {
      limit: 10,
      ...filters,
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length < 10) return undefined;
        return lastPage.nextOffset;
      },
    },
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, loadMore]);

  if (status === "error") return <p>Failed to fetch challenges</p>;
  return (
    <div
      className={cn(
        "contents transition-opacity duration-150",
        isFetching && "opacity-50",
      )}
    >
      {data?.pages
        .flatMap((page) => page.data)
        .map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            index={index + 1}
          />
        ))}
      {isFetching && <ChallengeCardSkeleton count={2} />}
      <div ref={loader} className="h-10" />
    </div>
  );
}
