import { api, HydrateClient } from "~/trpc/server";
import { FilterCard } from "./_components/filter-card";
import ChallengesPage from "./page.client";
import { searchParamsCache } from "./searchParams";

export interface Challenge {
  id: string;
  description: string;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
  slug: string;
  initialCode: string;
  authorId: string | null;
  duration: string | null;
  difficulty: "easy" | "medium" | "hard";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = searchParamsCache.parse(searchParams);
  await api.challenge.getInfinite.prefetchInfinite({
    limit: 10,
    ...filters,
  });
  return (
    <div className="page container mx-auto">
      <div className="flex gap-4 overflow-hidden pt-20">
        <FilterCard />
        <div className="flex flex-1 justify-end gap-4 overflow-y-auto">
          <div className="flex w-[calc(100%-400px)] flex-col gap-4">
            <HydrateClient>
              <ChallengesPage />
            </HydrateClient>
          </div>
        </div>
      </div>
    </div>
  );
}
