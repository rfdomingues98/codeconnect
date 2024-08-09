export function cleanDockerLogs(
  stream: NodeJS.ReadableStream,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let logs = "";

    stream.on("data", (chunk: Buffer) => {
      let i = 0;
      while (i < chunk.length) {
        const headerSize = 8;
        if (i + headerSize > chunk.length) break;

        // Skip header
        const logChunkSize = chunk.readUInt32BE(i + 4);
        const logStart = i + headerSize;
        const logEnd = logStart + logChunkSize;

        if (logEnd > chunk.length) break;

        // Extract log content
        const logChunk = chunk.slice(logStart, logEnd).toString("utf8");
        logs += logChunk;

        i = logEnd;
      }
    });

    stream.on("end", () => resolve(logs));
    stream.on("error", reject);
  });
}
