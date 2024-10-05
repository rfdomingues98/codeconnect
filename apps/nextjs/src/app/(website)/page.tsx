import Image from "next/image";
import Link from "next/link";

import { Button } from "@codeconnect/ui/button";
import { icons } from "@codeconnect/ui/icons";
import { Input } from "@codeconnect/ui/input";

import { HydrateClient } from "~/trpc/server";

export const runtime = "edge";

export default function HomePage() {
  return (
    <HydrateClient>
      <div className={`flex min-h-screen flex-col`}>
        <main className="flex-1">
          <section className="w-full bg-background py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Collaborate. Code. Conquer.
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Join our coding challenge platform and elevate your skills
                    with real-time collaboration, code execution, and
                    interactive problem-solving.
                  </p>
                </div>
                <div className="space-x-4">
                  <Button size="lg" asChild>
                    <Link href="/challenges">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section
            id="features"
            className="w-full bg-muted py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg bg-background p-4 text-center shadow-lg">
                  <icons.Play className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-bold">Code Execution</h3>
                  <p className="text-muted-foreground">
                    Run your code in real-time and see instant results.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-background p-4 text-center shadow-lg">
                  <icons.CodeBracket className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-bold">Result Display</h3>
                  <p className="text-muted-foreground">
                    View your code output and test results immediately.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-background p-4 text-center shadow-lg">
                  <icons.Pencil className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-bold">
                    Collaborative Canvas
                  </h3>
                  <p className="text-muted-foreground">
                    Brainstorm and visualize solutions together in real-time.
                  </p>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-background p-4 text-center shadow-lg">
                  <icons.VideoCamera className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-bold">Video Conferencing</h3>
                  <p className="text-muted-foreground">
                    Collaborate face-to-face with integrated video calls.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-background py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Execute Code with Ease
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our platform provides a seamless environment for writing
                      and running code. With support for multiple programming
                      languages, you can focus on solving challenges without
                      worrying about setup.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg">Try It Now</Button>
                    <Button size="lg" variant="outline">
                      View Supported Languages
                    </Button>
                  </div>
                </div>
                <Image
                  alt="Code execution demo"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="https://g-x2trai5zoo.vusercontent.net/placeholder.svg?height=310&width=550"
                  width="550"
                  unoptimized
                />
              </div>
            </div>
          </section>
          <section
            id="collaborate"
            className="w-full bg-muted py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <Image
                  alt="Collaboration demo"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                  height="310"
                  src="https://g-x2trai5zoo.vusercontent.net/placeholder.svg?height=310&width=550"
                  width="550"
                  unoptimized
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      Collaborate in Real-Time
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Work together on coding challenges using our collaborative
                      canvas and integrated video conferencing. Share ideas,
                      draw diagrams, and discuss solutions face-to-face.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg">Start Collaborating</Button>
                    <Button size="lg" variant="outline">
                      Learn About Team Features
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            id="signup"
            className="w-full bg-background py-12 md:py-24 lg:py-32"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Level Up Your Coding Skills?
                  </h2>
                  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join our community of developers and start tackling exciting
                    coding challenges today.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button type="submit">Sign Up</Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link className="underline underline-offset-2" href="#">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-muted-foreground">
            © 2024 CodeConnect. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </HydrateClient>
  );
}
