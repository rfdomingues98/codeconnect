"use client";

import { LiveblocksProvider } from "@liveblocks/react";

import { EditorStoreProvider } from "@codeconnect/editor";
import { ThemeProvider } from "@codeconnect/ui/theme";

import { TRPCReactProvider } from "~/trpc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <TRPCReactProvider>
        <EditorStoreProvider>
          <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
            {children}
          </LiveblocksProvider>
        </EditorStoreProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
