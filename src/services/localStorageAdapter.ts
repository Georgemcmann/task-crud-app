const STORAGE_KEY = 'task-crud-app:tasks';

export function readFromStorage<T>(fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeToStorage<T>(value: T): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}
