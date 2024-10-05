import { z } from "zod";

import { desc } from "@codeconnect/db";
import { Challenges, DifficultyEnum } from "@codeconnect/db/schema";

import { publicProcedure } from "../trpc";

export const challengeRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Challenges.findMany({
      orderBy: desc(Challenges.id),
      limit: 10,
    });
  }),
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),

        title: z.string().optional(),
        difficulty: z.array(z.enum(DifficultyEnum.enumValues)).optional(),
        language: z.string().optional(),
        tag: z.array(z.string()).optional(),
        sort: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20;
      const cursor = input.cursor ?? 0;
      const { title, difficulty } = input;
      const items = await ctx.db.query.Challenges.findMany({
        columns: { id: true, title: true, difficulty: true, slug: true },
        limit: limit,
        offset: cursor,
        where: (challenge, { and, ilike, inArray }) =>
          and(
            title ? ilike(challenge.title, `%${title}%`) : undefined,
            difficulty && difficulty.length > 0
              ? inArray(challenge.difficulty, difficulty)
              : undefined,
          ),
      });

      return {
        data: items,
        nextOffset: cursor + items.length,
      };
    }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.Challenges.findFirst({
        where: (challenge, { eq }) => eq(challenge.id, input.id),
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
        where: (challenge, { eq }) => eq(challenge.slug, input.slug),
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
