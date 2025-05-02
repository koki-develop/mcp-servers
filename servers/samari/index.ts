import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { setGetPostsTool } from "./tools/posts";

export const samariServerName = "samari";

export function createSamariServer() {
  const server = new McpServer({
    name: samariServerName,
    version: "1.0.0",
  });

  setGetPostsTool("get_posts", server);

  return server;
}
