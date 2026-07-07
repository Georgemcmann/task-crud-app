import type { Task } from "../types/task";

const STATUS_LABELS: Record<Task["status"], string> = {
  todo: "Todo",
  "in-progress": "In Progress",
  done: "Done",
};

type TaskItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  function handleDelete() {
    const confirmed = window.confirm(`Delete "${task.title}"?`);
    if (confirmed) {
      void onDelete(task.id);
    }
  }

  return (
    <article className="task-item">
      <div className="task-item-content">
        <div className="task-item-header">
          <h3>{task.title}</h3>
          <span className={`status-badge status-${task.status}`}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-item-actions">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
