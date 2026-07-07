import { useEffect, useState } from "react";
import type { CreateTaskInput, Task, TaskStatus } from "../types/task";

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

type TaskFormProps = {
  initialTask?: Task | null;
  onSubmit: (input: CreateTaskInput) => Promise<void>;
  onCancel?: () => void;
};

export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditing = Boolean(initialTask);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description ?? "");
      setStatus(initialTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
    setValidationError(null);
  }, [initialTask]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setValidationError("Title is required");
      return;
    }

    setValidationError(null);
    setSubmitting(true);

    try {
      await onSubmit({
        title: trimmedTitle,
        description: description.trim() || undefined,
        status,
      });
      if (!isEditing) {
        setTitle("");
        setDescription("");
        setStatus("todo");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          disabled={submitting}
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Optional details..."
          rows={3}
          disabled={submitting}
        />
      </div>

      <div className="form-row form-row-inline">
        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
            disabled={submitting}
          >
            {STATUS_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          {isEditing && onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={submitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Saving..." : isEditing ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>

      {validationError && <p className="form-error">{validationError}</p>}
    </form>
  );
}
