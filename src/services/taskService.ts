import type { CreateTaskInput, Task, UpdateTaskInput } from '../features/tasks/types/task';
import { readFromStorage, writeToStorage } from './localStorageAdapter';

function getAllTasks(): Task[] {
  return readFromStorage<Task[]>([]);
}

function saveTasks(tasks: Task[]): void {
  writeToStorage(tasks);
}

export async function getTasks(): Promise<Task[]> {
  return getAllTasks();
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const now = new Date().toISOString();
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    description: input.description?.trim() || undefined,
    status: input.status,
    createdAt: now,
    updatedAt: now,
  };

  const tasks = getAllTasks();
  tasks.unshift(task);
  saveTasks(tasks);
  return task;
}

export async function updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
  const tasks = getAllTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    throw new Error('Task not found');
  }

  const existing = tasks[index];
  const updated: Task = {
    ...existing,
    ...input,
    title: input.title !== undefined ? input.title.trim() : existing.title,
    description:
      input.description !== undefined
        ? input.description.trim() || undefined
        : existing.description,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updated;
  saveTasks(tasks);
  return updated;
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = getAllTasks();
  const nextTasks = tasks.filter((task) => task.id !== id);

  if (nextTasks.length === tasks.length) {
    throw new Error('Task not found');
  }

  saveTasks(nextTasks);
}
