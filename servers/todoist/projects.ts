import type { Project, TodoistApi } from "@doist/todoist-api-typescript";

export async function getProjects(api: TodoistApi): Promise<Project[]> {
  const projects: Project[] = [];
  let cursor: string | null = null;
  do {
    const response = await api.getProjects({ cursor });
    projects.push(...response.results);
    cursor = response.nextCursor;
  } while (cursor != null);

  return projects;
}
