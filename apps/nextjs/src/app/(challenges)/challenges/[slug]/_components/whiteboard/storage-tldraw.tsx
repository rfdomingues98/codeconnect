"use client";

import { useSelf } from "@liveblocks/react/suspense";
import { DefaultStylePanel, Tldraw } from "tldraw";

import { Avatars } from "./avatars";

import "tldraw/tldraw.css";

import { useStorageStore } from "./use-storage-store";

/**
 * IMPORTANT: LICENSE REQUIRED
 * To remove the watermark, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */

export function StorageTldraw() {
  // Getting authenticated user info. Doing this using selectors instead
  // of just `useSelf()` to prevent re-renders on Presence changes
  const id = useSelf((me) => me.id);
  const info = useSelf((me) => me.info);

  const store = useStorageStore({
    user: {
      id,
      color: info.color,
      name: info.name ?? "Anonymous",
    },
  });

  return (
    <div className="h-full min-h-[700px] w-full">
      <Tldraw
        store={store}
        components={{
          // Render a live avatar stack at the top-right
          StylePanel: () => (
            <div
              style={{
                display: "flex-column",
                marginTop: 4,
              }}
            >
              <Avatars />
              <DefaultStylePanel />
            </div>
          ),
        }}
        autoFocus
      />
    </div>
  );
}
