"use client";

import type { ChallengeContextType } from "~/contexts/challenge";
import { ChallengeContext } from "~/contexts/challenge";

export function ChallengeProvider({
  challenge,
  children,
}: {
  challenge: ChallengeContextType;
  children: React.ReactNode;
}) {
  return (
    <ChallengeContext.Provider value={challenge}>
      {children}
    </ChallengeContext.Provider>
  );
}
