import { z } from "zod";

import { desc, eq } from "@codeconnect/db";
import { Challenges } from "@codeconnect/db/schema";

import { publicProcedure } from "../trpc";

export const challengeRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Challenges.findMany({
      orderBy: desc(Challenges.id),
      limit: 10,
    });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Challenges.findFirst({
        where: eq(Challenges.id, input.id),
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Challenges.findFirst({
        where: eq(Challenges.slug, input.slug),
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
};
