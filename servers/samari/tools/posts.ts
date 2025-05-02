import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { postGroupSchema } from "./types";

export function setGetPostsTool(name: string, server: McpServer) {
  server.tool(
    name,
    `
Get posts.

Parameters:

- \`group\`: (Optional) Post group.

Returns:

- \`id\`: Post ID.
- \`group\`: Post group.
- \`source\`: Source of the post.
- \`title\`: Post title.
- \`url\`: URL of the post.
- \`datetime\`: Date and time of the post.
- \`headline\`: Post headline.
- \`summary\`: Summary of the post.
`.trim(),
    {
      group: postGroupSchema.optional(),
    },
    async ({ group }) => {
      const url = new URL("https://api.samari.news/v0/posts");
      if (group) {
        url.searchParams.set("group", group);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data) }],
      };
    },
  );
}
