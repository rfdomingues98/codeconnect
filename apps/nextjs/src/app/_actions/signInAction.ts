"use server";

import { signIn } from "@codeconnect/auth";

export async function signInWithDiscordAction() {
  "use server";
  await signIn("discord");
}
