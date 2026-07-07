import type { TaskFilter } from "../types/task";

const FILTERS: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

type TaskFiltersProps = {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
};

export function TaskFilters({ filter, onChange }: TaskFiltersProps) {
  return (
    <div
      className="task-filters"
      role="tablist"
      aria-label="Filter tasks by status"
    >
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={filter === value}
          className={filter === value ? "filter-btn active" : "filter-btn"}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
