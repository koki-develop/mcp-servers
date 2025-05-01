import type { Task, TodoistApi } from "@doist/todoist-api-typescript";
import { paginate } from "./utils";

export type GetTasksParameters = {
  projectId: string;
};

export async function getTasks(
  api: TodoistApi,
  args: GetTasksParameters,
): Promise<Task[]> {
  return paginate({
    fetch: (cursor) => api.getTasks({ cursor, projectId: args.projectId }),
    getItems: (response) => response.results,
    getNextCursor: (response) => response.nextCursor,
  });
}
