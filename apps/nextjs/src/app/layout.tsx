import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@codeconnect/ui";
import { ThemeProvider } from "@codeconnect/ui/theme";
import { Toaster } from "@codeconnect/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { EditorStoreProvider } from "@codeconnect/editor";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Code Connect",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Code Connect",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("scrollbar-track-background scrollbar-thumb-primary/50")}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "bg-background font-sans text-foreground",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          <TRPCReactProvider>
            <EditorStoreProvider>{props.children}</EditorStoreProvider>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
