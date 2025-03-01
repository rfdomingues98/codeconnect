import { asc, eq } from "@codeconnect/db";
import { ChallengeLanguages, ProgrammingLanguages } from "@codeconnect/db/schema";
import { z } from "zod";
import { publicProcedure } from "../trpc";

export const programmingLanguageRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.ProgrammingLanguages.findMany({
      orderBy: asc(ProgrammingLanguages.name),
    });
  }),
  allByChallengeId: publicProcedure.input(z.object({ challengeId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.query.ChallengeLanguages.findMany({
      where: eq(ChallengeLanguages.challengeId, input.challengeId),
      with: {
        language: true,
      },
    }).then(results =>
      results
        .map(result => result.language)
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }),
};
