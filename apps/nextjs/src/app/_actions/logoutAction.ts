"use server";

import { signOut } from "@codeconnect/auth";

export async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}
