import { authRouter } from "./router/auth";
import { challengeRouter } from "./router/challenge";
import { programmingLanguageRouter } from "./router/programming-language";
import { tagsRouter } from "./router/tags";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  /* post: postRouter, */
  challenge: challengeRouter,
  tags: tagsRouter,
  programmingLanguage: programmingLanguageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
