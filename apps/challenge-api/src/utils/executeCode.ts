import path from "path";
import { fileURLToPath } from "url";
import Dockerode from "dockerode";

import { cleanDockerLogs } from "./cleanDockerLogs";
import { containerConfigs } from "./createContainerOpts";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const dockerfilePath = path.resolve(__dirname, "..", "dockerfiles");
export async function executeCode(
  docker: Dockerode,
  code: string,
  language: "python" | "typescript",
  tests: string,
) {
  if (language === "typescript") {
    return executeTypeScriptCode(docker, code, tests);
  }
}

async function executeTypeScriptCode(
  docker: Dockerode,
  code: string,
  tests: string,
) {
  const imageName = "ts-executor:latest";
  const imageStream = await docker.buildImage(
    {
      context: path.join(dockerfilePath, "typescript"),
      src: ["Dockerfile"],
    },
    { t: "ts-executor:latest" },
  );

  await new Promise((resolve, reject) => {
    docker.modem.followProgress(imageStream, (err, res) => {
      if (err) reject(err);
      else {
        resolve(res);
      }
    });
  });

  try {
    // Create a Docker container and execute the TypeScript code and tests
    const container = await docker.createContainer(
      containerConfigs.ts(imageName, code, tests),
    );
    console.log(`Container created successfully.`);

    await container.start();
    console.log(`Container started successfully.`);

    // Capture the output
    const rawLogs = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    });

    const logs = await cleanDockerLogs(rawLogs);

    // container.modem.demuxStream(logs, process.stdout, process.stderr);
    // Wait for the container to finish execution
    await container.wait();
    console.log(`Container finished executing.`);

    // Return the logs to the client
    return logs;
  } catch (error) {
    throw error;
  }
}
