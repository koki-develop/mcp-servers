import { parseArgs } from "node:util";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./servers";

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
});

const serverName = positionals[2];
if (!serverName) {
  throw new Error("Server name is required");
}

const server = createServer(serverName);
const transport = new StdioServerTransport();
await server.connect(transport);
