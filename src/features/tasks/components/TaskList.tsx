import type { Task, TaskFilter } from "../types/task";
import { EmptyState } from "./EmptyState.tsx";
import { TaskItem } from "./TaskItem";

type TaskListProps = {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export function TaskList({
  tasks,
  filter,
  loading,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return <p className="loading-state">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
