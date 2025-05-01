import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function setGetCurrentDatetimeTool(server: McpServer) {
  server.tool(
    "get_current_datetime",
    "Get the current date and time",
    {},
    async () => {
      const now = new Date();
      return {
        content: [{ type: "text", text: now.toLocaleString() }],
      };
    }
  );
}
