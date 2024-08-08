import { ThemeToggle } from "@codeconnect/ui/theme";

import { UserDropdown } from "./user-dropdown";

export function Navbar() {
  return (
    <nav className="flex h-14 w-full items-center justify-between border-b px-6">
      <div className="font-semibold uppercase">Code Connect</div>
      <div className="flex gap-5">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  );
}
