import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getProjects } from "../lib/projects";
import type { TodoistApi } from "@doist/todoist-api-typescript";

export function setGetProjectsTool(
  name: string,
  server: McpServer,
  api: TodoistApi
) {
  server.tool(
    name,
    `
Get all projects.

Returns:

- \`id\`: Project ID.
- \`parentId\`: ID of parent project (will be \`null\` for top-level projects).
- \`name\`: Project name.
- \`order\`: Project position under the same parent.
`.trim(),
    {},
    async () => {
      const projects = await getProjects(api);

      const content = projects.map((project) => ({
        id: project.id,
        parentId: project.parentId,
        name: project.name,
        order: project.order,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify(content) }],
      };
    }
  );
}
