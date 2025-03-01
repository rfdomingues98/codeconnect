"use client";

import { createContext, useContext } from "react";

import type { RouterOutputs } from "@codeconnect/api";

export type ChallengeContextType = NonNullable<
  RouterOutputs["challenge"]["bySlug"]
>;

export const ChallengeContext = createContext<ChallengeContextType | null>(
  null,
);

const useCurrentChallenge = () => {
  const challenge = useContext(ChallengeContext);
  if (!challenge)
    throw new Error(
      "useCurrentChallenge has to be used within <ChallengeContext.Provider>",
    );
  return challenge;
};

export { useCurrentChallenge };
