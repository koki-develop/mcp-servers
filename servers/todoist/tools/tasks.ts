import type { TodoistApi } from "@doist/todoist-api-typescript";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getSections } from "../lib/sections";
import { getTasks } from "../lib/tasks";

export function setGetTasksTool(
  name: string,
  server: McpServer,
  api: TodoistApi,
) {
  server.tool(
    name,
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
- \`section\`: Object representing the section the task belongs to.
  - \`id\`: Section ID.
  - \`name\`: Section name.
  - \`order\`: Section position among other sections from the same project.
`.trim(),
    {
      projectId: z.string(),
    },
    async (args) => {
      const [sections, tasks] = await Promise.all([
        getSections(api, args.projectId),
        getTasks(api, { projectId: args.projectId }),
      ]);

      const content = tasks.map((task) => ({
        id: task.id,
        content: task.content,
        description: task.description,
        parentId: task.parentId,
        order: task.order,
        due: task.due,
        deadline: task.deadline,
        duration: task.duration,
        section: (() => {
          const section = sections.find(
            (section) => section.id === task.sectionId,
          );
          if (!section) return null;
          return {
            id: section.id,
            name: section.name,
            order: section.sectionOrder,
          };
        })(),
      }));

      return {
        content: [{ type: "text", text: JSON.stringify(content) }],
      };
    },
  );
}
