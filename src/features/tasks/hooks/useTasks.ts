import { useCallback, useEffect, useMemo, useState } from 'react';
import * as taskService from '../../../services/taskService';
import type {
  CreateTaskInput,
  Task,
  TaskFilter,
  UpdateTaskInput,
} from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const addTask = useCallback(async (input: CreateTaskInput) => {
    setError(null);

    try {
      const created = await taskService.createTask(input);
      setTasks((current) => [created, ...current]);
      return created;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task';
      setError(message);
      throw err;
    }
  }, []);

  const editTask = useCallback(async (id: string, input: UpdateTaskInput) => {
    setError(null);

    try {
      const updated = await taskService.updateTask(id, input);
      setTasks((current) =>
        current.map((task) => (task.id === id ? updated : task)),
      );
      return updated;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update task';
      setError(message);
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id: string) => {
    setError(null);

    try {
      await taskService.deleteTask(id);
      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      setError(message);
      throw err;
    }
  }, []);

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    reload: loadTasks,
  };
}
