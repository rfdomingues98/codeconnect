/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { z } from "zod";

import {
  and,
  desc,
  ilike,
  inArray,
  withCursorPagination,
} from "@codeconnect/db";
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
        cursor: z.string().nullish(),

        title: z.string().optional(),
        difficulty: z.array(z.enum(DifficultyEnum.enumValues)).optional(),
        language: z.string().optional(),
        tag: z.array(z.string()).optional(),
        sort: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 20;
      const cursor = input.cursor;
      const { title, difficulty } = input;

      let timestamp: string | undefined;
      let id: string | undefined;
      if (cursor) {
        const split_cursor = cursor.split("_");
        timestamp = split_cursor[0]!;
        id = split_cursor[1]!;
      }

      const items = await ctx.db.query.Challenges.findMany({
        ...withCursorPagination({
          limit: limit,
          cursors: [
            [
              Challenges.createdAt,
              "desc",
              cursor ? new Date(timestamp!) : undefined,
            ],
            [Challenges.id, "asc", cursor ? id : undefined],
          ],
          where: and(
            title ? ilike(Challenges.title, `%${title}%`) : undefined,
            difficulty && difficulty.length > 0
              ? inArray(Challenges.difficulty, difficulty)
              : undefined,
          ),
        }),
        orderBy: [desc(Challenges.createdAt)],
        columns: {
          id: true,
          title: true,
          difficulty: true,
          slug: true,
          createdAt: true,
        },
      });

      let nextCursor: string | null = null;
      if (items.length >= limit) {
        const lastItem = items.at(-1);
        nextCursor = lastItem
          ? `${lastItem.createdAt.toISOString()}_${lastItem.id}`
          : null;
      }

      return {
        data: items,
        nextCursor,
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
