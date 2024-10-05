import Link from "next/link";

import type { RouterOutputs } from "@codeconnect/api";
import { Card, CardContent, CardHeader, CardTitle } from "@codeconnect/ui/card";

import { DifficultyBadge } from "../difficulty-badge";
import { ChallengeStats } from "./stats";
import { ChallengeTags } from "./tags";

interface Props {
  challenge: RouterOutputs["challenge"]["getInfinite"]["data"][number];
  index?: number;
}

export function ChallengeCard({ challenge, index }: Props) {
  return (
    <Card className="rounded-lg">
      <Link href={`/challenges/${challenge.slug}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <DifficultyBadge difficulty={challenge.difficulty} />
            {index}
            <span>{challenge.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChallengeStats />
          <ChallengeTags />
        </CardContent>
      </Link>
    </Card>
  );
}
