import type { Project, TodoistApi } from "@doist/todoist-api-typescript";
import { paginate } from "./utils";

export async function getProjects(api: TodoistApi): Promise<Project[]> {
  return paginate({
    fetch: (cursor) => api.getProjects({ cursor }),
    getItems: (response) => response.results,
    getNextCursor: (response) => response.nextCursor,
  });
}
