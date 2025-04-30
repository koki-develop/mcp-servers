import type { Project, Task, TodoistApi } from "@doist/todoist-api-typescript";

export async function getProjects(api: TodoistApi): Promise<Project[]> {
  return _paginate({
    fetch: (cursor) => api.getProjects({ cursor }),
    getItems: (response) => response.results,
    getNextCursor: (response) => response.nextCursor,
  });
}

export type GetTasksParameters = {
  projectId: string;
};

export async function getTasks(
  api: TodoistApi,
  args: GetTasksParameters
): Promise<Task[]> {
  return _paginate({
    fetch: (cursor) => api.getTasks({ cursor, projectId: args.projectId }),
    getItems: (response) => response.results,
    getNextCursor: (response) => response.nextCursor,
  });
}

async function _paginate<T, U>({
  fetch,
  getItems,
  getNextCursor,
}: {
  fetch: (cursor: string | null) => Promise<T>;
  getItems: (response: T) => U[];
  getNextCursor: (response: T) => string | null;
}): Promise<U[]> {
  const items: U[] = [];
  let cursor: string | null = null;
  do {
    const response = await fetch(cursor);
    items.push(...getItems(response));
    cursor = getNextCursor(response);
  } while (cursor != null);

  return items;
}
