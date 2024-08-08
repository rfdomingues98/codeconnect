import { authRouter } from "./router/auth";
import { challengeRouter } from "./router/challenge";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  challenge: challengeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
