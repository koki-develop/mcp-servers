import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const todoistServerName = "todoist";

export function createTodoistServer() {
  const server = new McpServer({
    name: todoistServerName,
    version: "1.0.0",
  });

  // TODO: implement tools

  return server;
}
