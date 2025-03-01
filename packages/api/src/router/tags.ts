

import {
  asc
} from "@codeconnect/db";
import { Tags } from "@codeconnect/db/schema";

import { publicProcedure } from "../trpc";

export const tagsRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Tags.findMany({
      orderBy: asc(Tags.name),
    });
  }),
};
