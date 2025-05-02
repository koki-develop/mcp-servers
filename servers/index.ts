import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createTodoistServer, todoistServerName } from "./todoist";
import { createUtilitiesServer, utilitiesServerName } from "./utilities";
import { createSamariServer, samariServerName } from "./samari";

const servers: Record<string, () => McpServer> = {
  [samariServerName]: createSamariServer,
  [todoistServerName]: createTodoistServer,
  [utilitiesServerName]: createUtilitiesServer,
};

export function createServer(name: string): McpServer {
  const server = servers[name];
  if (!server) {
    throw new Error(`Server ${name} not found`);
  }
  return server();
}
