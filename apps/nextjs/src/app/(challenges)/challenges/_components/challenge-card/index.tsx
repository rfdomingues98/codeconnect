import Link from "next/link";

import type { RouterOutputs } from "@codeconnect/api";
import { Card, CardContent, CardHeader, CardTitle } from "@codeconnect/ui/card";

import { DifficultyBadge } from "../difficulty-badge";
import { ChallengeStats } from "./stats";
import { ChallengeTags } from "./tags";

interface Props {
  challenge: RouterOutputs["challenge"]["getInfinite"]["data"][number];
}

export function ChallengeCard({ challenge }: Props) {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <DifficultyBadge difficulty={challenge.difficulty} />
          <Link href={`/challenges/${challenge.slug}`}>
            <span>{challenge.title}</span>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChallengeStats />
        <ChallengeTags />
      </CardContent>
    </Card>
  );
}
