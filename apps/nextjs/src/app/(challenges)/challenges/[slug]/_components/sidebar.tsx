import Link from "next/link";

import { Canvas } from "@codeconnect/canvas";
import { Button } from "@codeconnect/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@codeconnect/ui/dialog";
import { icons } from "@codeconnect/ui/icons";

export function SideBar() {
  return (
    <aside className="flex w-14 flex-col items-center justify-between gap-4 border-r py-6 grid-in-[sidebar]">
      <Link href="/">
        <icons.Logo className="size-11" />
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <icons.PresentationBarChartIcon className="size-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[720px] min-w-[1280px] p-0">
          <Canvas />
        </DialogContent>
      </Dialog>
    </aside>
  );
}
