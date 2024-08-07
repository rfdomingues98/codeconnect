import { HydrateClient } from "~/trpc/server";
import IDE from "./_components/editor/ide";

export const runtime = "edge";

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="flex-1 overflow-auto">
        {/* <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            IDE
          </h1> */}

        <IDE />
      </main>
    </HydrateClient>
  );
}
