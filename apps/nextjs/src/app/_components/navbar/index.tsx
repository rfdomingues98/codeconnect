import { ThemeToggle } from "@codeconnect/ui/theme";

import { UserDropdown } from "./user-dropdown";

export function Navbar() {
  return (
    <nav className="flex h-full w-full items-center justify-between border-b px-6 py-2 grid-in-[navbar]">
      <div className="font-semibold uppercase"></div>
      <div className="flex gap-5">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  );
}
