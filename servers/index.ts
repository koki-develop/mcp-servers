import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createTodoistServer, todoistServerName } from "./todoist";

export function createServer(name: string): McpServer {
  switch (name) {
    case todoistServerName:
      return createTodoistServer();
    default:
      throw new Error(`Server ${name} not found`);
  }
}
