import { TodoistApi, type Project } from "@doist/todoist-api-typescript";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const todoistServerName = "todoist";

export function createTodoistServer() {
  const server = new McpServer({
    name: todoistServerName,
    version: "1.0.0",
  });

  const apiToken = process.env.TODOIST_API_TOKEN;
  if (!apiToken) {
    throw new Error("TODOIST_API_TOKEN is not set");
  }
  const api = new TodoistApi(apiToken);

  server.tool(
    "get_projects",
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
      const projects: Project[] = [];
      let cursor: string | null = null;
      do {
        const response = await api.getProjects({ cursor });
        projects.push(...response.results);
        cursor = response.nextCursor;
      } while (cursor != null);

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

  return server;
}
