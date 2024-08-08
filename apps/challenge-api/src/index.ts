import fs from "fs";
import path from "path";
import { serve } from "@hono/node-server";
import Dockerode from "dockerode";
import { Hono } from "hono";
import { streamText } from "hono/streaming";

const app = new Hono();
const docker = new Dockerode();

async function executePythonCode(code: string): Promise<NodeJS.ReadableStream> {
  const tempDir = path.join(__dirname, "temp");
  const filePath = path.join(tempDir, "script.py");

  // Ensure the temp directory exists
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Write the code to a temporary file
  fs.writeFileSync(filePath, code);

  // Build the Docker image from the Dockerfile
  const dockerfilePath = "Dockerfile";
  const imageStream = await docker.buildImage(
    {
      context: __dirname,
      src: [dockerfilePath, "temp/script.py"],
    },
    { t: "python-executor:latest" },
  );

  await new Promise((resolve, reject) => {
    docker.modem.followProgress(imageStream, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });

  // Create and start a container
  const container = await docker.createContainer({
    Image: "python-executor:latest",
    HostConfig: {
      AutoRemove: true, // Automatically remove the container when it exits
      Memory: 512 * 1024 * 1024, // 512MB
      CpuShares: 512,
    },
  });

  await container.start();

  // Capture the output
  const logs = await container.logs({
    stdout: true,
    stderr: true,
    follow: true,
  });

  await container.wait();

  return logs;
}

app.get("/", async (c) => {
  const output = await executePythonCode(`print("Hello world")\n`);
  return streamText(c, async (stream) => {
    const chunk = output.read();
    await stream.write(chunk.slice(8)); // for some reason it returns some weird characters for the 8 first bytes
  });
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
