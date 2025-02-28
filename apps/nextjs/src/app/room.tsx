"use client";

import type { ReactNode } from "react";
import { LiveMap } from "@liveblocks/core";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";

import { Loading } from "./_components/loading";

export function Room({ children }: { children: ReactNode }) {
  const roomId = "liveblocks:examples:nextjs-tldraw-whiteboard-storage";

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ presence: undefined }}
      initialStorage={{ records: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
}
