import type { Filter } from "../types";

interface EmptyStateProps {
  filter: Filter;
  loading: boolean;
}

export default function EmptyState({ filter, loading }: EmptyStateProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-14">
        <span className="w-7 h-7 border-2 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-600">Loading your tasks…</p>
      </div>
    );
  }

  const icon =
    filter === "completed" ? "🏆" : filter === "active" ? "✨" : "📋";
  const title =
    filter === "completed"
      ? "Nothing completed yet"
      : filter === "active"
        ? "All tasks complete!"
        : "No tasks yet";
  const hint =
    filter === "all" ? "Add your first task above to get started." : "";

  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
      <span className="text-4xl mb-1 opacity-40">{icon}</span>
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      {hint && <p className="text-xs text-slate-600">{hint}</p>}
    </div>
  );
}
