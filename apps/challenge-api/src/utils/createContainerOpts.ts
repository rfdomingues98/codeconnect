import Dockerode from "dockerode";

export const imageConfigs: Record<string, {}> = {};

export const containerConfigs: Record<
  string,
  (
    imageName: string,
    code: string,
    tests: string,
  ) => Dockerode.ContainerCreateOptions
> = {
  ts: (imageName: string, code: string, tests: string) => ({
    Image: imageName,
    AttachStdout: true,
    AttachStderr: true,
    HostConfig: {
      AutoRemove: true,
    },
    Env: [
      `CODE=${code}`, // Pass the TypeScript code as an environment variable
      `TESTS=${tests}`, // Pass the test code as an environment variable
    ],
    Cmd: [
      "/bin/sh",
      "-c",
      `echo "$CODE" > index.ts && echo "$TESTS" > index.test.ts && \
  pnpm vitest run --reporter=json`,
    ], // Assume 'index.ts' is the entry point
    WorkingDir: "/usr/src/app",
  }),
};
