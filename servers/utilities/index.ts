import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { setGetCurrentDatetimeTool } from "./tools/datetime";

export const utilitiesServerName = "utilities";

export function createUtilitiesServer() {
  const server = new McpServer({
    name: utilitiesServerName,
    version: "1.0.0",
  });

  setGetCurrentDatetimeTool(server);

  return server;
}
