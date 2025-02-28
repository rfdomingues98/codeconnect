"use client";

import { useCallback } from "react";
import Link from "next/link";

import { Button } from "@codeconnect/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@codeconnect/ui/dialog";
import { icons } from "@codeconnect/ui/icons";

import { Canvas } from "./whiteboard";

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;
type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent;
}>;

export function SideBar() {
  // Memoize the callback functions to prevent unnecessary re-renders
  const handleEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => e.preventDefault(),
    [],
  );
  const handleInteractOutside = useCallback(
    (e: PointerDownOutsideEvent | FocusOutsideEvent) => e.preventDefault(),
    [],
  );
  const handlePointerDownOutside = useCallback(
    (e: PointerDownOutsideEvent) => e.preventDefault(),
    [],
  );

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
        <DialogContent
          className="min-w-[1280px]"
          onEscapeKeyDown={handleEscapeKeyDown}
          onInteractOutside={handleInteractOutside}
          onPointerDownOutside={handlePointerDownOutside}
        >
          <DialogHeader>
            <DialogTitle>Whiteboard</DialogTitle>
            <DialogDescription>
              Use the whiteboard to draw your ideas
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full items-center space-x-2">
            <Canvas />
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
