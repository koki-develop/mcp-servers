export async function paginate<T, U>({
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
