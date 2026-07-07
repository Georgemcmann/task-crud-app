export type TaskStatus = 'todo' | 'in-progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  status: TaskStatus;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;

export type TaskFilter = 'all' | TaskStatus;
