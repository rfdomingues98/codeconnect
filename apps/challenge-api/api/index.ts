import type { PageConfig } from "next";
import { handle } from "@hono/node-server/vercel";
import { Hono } from "hono";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

export default handle(app);
