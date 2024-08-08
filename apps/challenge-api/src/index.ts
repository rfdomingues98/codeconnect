import { serve } from "@hono/node-server";
import Dockerode from "dockerode";
import { Hono } from "hono";

const app = new Hono();
const docker = new Dockerode();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
