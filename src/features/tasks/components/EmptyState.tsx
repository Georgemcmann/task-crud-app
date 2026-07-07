type EmptyStateProps = {
  filter: string;
};

export function EmptyState({ filter }: EmptyStateProps) {
  const message =
    filter === "all"
      ? "No tasks yet. Add your first task above."
      : `No ${filter.replace("-", " ")} tasks.`;

  return (
    <div className="empty-state">
      <p>{message}</p>
    </div>
  );
}
