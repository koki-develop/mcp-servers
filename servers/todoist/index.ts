import { TodoistApi } from "@doist/todoist-api-typescript";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getProjects } from "./lib/projects";
import { getTasks } from "./lib/tasks";
import { z } from "zod";

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

  server.tool(
    "get_tasks",
    `
Get all active tasks for a project.

Parameters:

- \`projectId\`: Filter tasks by project ID.

Returns:

- \`id\`: Task ID.
- \`content\`: Task content.
- \`description\`: A description for the task.
- \`parentId\`: ID of parent task (read-only, will be \`null\` for top-level tasks).
- \`order\`: Position under the same parent or project for top-level tasks.
- \`due\`: object representing task due date/time, or \`null\` if no date is set.
- \`deadline\`: object representing task deadline date, or \`null\` if not deadline is set.
- \`duration\`: Object representing a task's duration. Includes a positive integer (greater than zero) for the \`amount\` of time the task will take, and the \`unit\` of time that the amount represents which must be either \`minute\` or \`day\`. The object will be \`null\` if the task has no duration.
`.trim(),
    {
      projectId: z.string(),
    },
    async (args) => {
      const tasks = await getTasks(api, {
        projectId: args.projectId,
      });

      const content = tasks.map((task) => ({
        id: task.id,
        content: task.content,
        description: task.description,
        parentId: task.parentId,
        order: task.order,
        due: task.due,
        deadline: task.deadline,
        duration: task.duration,
      }));

      return {
        content: [{ type: "text", text: JSON.stringify(content) }],
      };
    }
  );

  return server;
}
