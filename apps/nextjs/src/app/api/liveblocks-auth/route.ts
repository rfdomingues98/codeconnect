import { Liveblocks } from "@liveblocks/node";

import type { Session } from "@codeconnect/auth";
import { auth } from "@codeconnect/auth";

import { env } from "~/env";
import { colors, getRandom } from "~/utils/getRandom";

type User = Session["user"];
const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(_request: Request) {
  // Get the current user from your database
  const session = await auth();

  // Anonymous user info
  const anonymousUser: User = {
    id: "anonymous",
    name: "Anonymous",
    email: "none",
    image: "N/A",
  };

  const { id, name, email, image } = session?.user ?? anonymousUser;
  // Get current user info from session (defined in /auth.config.ts)
  // If no session found, this is a logged out/anonymous user

  const lbSession = liveblocks.prepareSession(`${id}`, {
    userInfo: {
      name: name ?? undefined,
      email: email ?? undefined,
      avatar: image ?? undefined,
      color: getRandom(colors, id),
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  lbSession.allow(`liveblocks:examples:*`, lbSession.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await lbSession.authorize();

  return new Response(body, { status });
}
