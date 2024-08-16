import { icons } from "@codeconnect/ui/icons";

export function SideBar() {
  return (
    <aside className="flex w-14 justify-center border-r py-6 grid-in-[sidebar]">
      <icons.Logo theme="dark" className="size-11" />
    </aside>
  );
}
