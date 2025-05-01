import type { TodoistApi } from "@doist/todoist-api-typescript";
import { paginate } from "./utils";

export function getSections(api: TodoistApi, projectId: string) {
  return paginate({
    fetch: (cursor) => api.getSections({ projectId, cursor }),
    getItems: (response) => response.results,
    getNextCursor: (response) => response.nextCursor,
  });
}
