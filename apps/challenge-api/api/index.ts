import type { PageConfig } from "next";
import { serve } from "@hono/node-server";
import Dockerode from "dockerode";
import { Hono } from "hono";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath("/api");
const docker = new Dockerode();

app.get("/hello", (c) => {
  docker.createContainer({ Image: "hello-world" });
  return c.json({
    message: "Hello from Hono!",
  });
});

serve(app);
