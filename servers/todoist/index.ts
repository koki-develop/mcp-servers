import { TodoistApi } from "@doist/todoist-api-typescript";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getProjects } from "./lib/projects";
import { getTasks } from "./lib/tasks";
import { z } from "zod";
import { setGetProjectsTool } from "./tools/projects";
import { setGetTasksTool } from "./tools/tasks";

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

  setGetProjectsTool("get_projects", server, api);
  setGetTasksTool("get_tasks", server, api);

  return server;
}
