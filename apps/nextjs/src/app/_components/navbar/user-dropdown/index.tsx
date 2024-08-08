import Image from "next/image";

import { auth, signIn } from "@codeconnect/auth";
import { Button } from "@codeconnect/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@codeconnect/ui/dropdown-menu";

import { UserDropdownContent } from "./content";

export async function UserDropdown() {
  const session = await auth();

  if (!session) {
    return (
      <form>
        <Button
          formAction={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          Sign in with Discord
        </Button>
      </form>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={
              session.user.image ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s"
            }
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <UserDropdownContent />
    </DropdownMenu>
  );
}
