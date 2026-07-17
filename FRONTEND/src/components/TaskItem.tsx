import type { Task, Priority } from "../types";

interface TaskItemProps {
  task: Task;
  isDeleting: boolean;
  isCompleting: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
}

const priorityBadge: Record<Priority, string> = {
  High: "text-red-400 bg-red-500/10 border-red-500/25",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/25",
  Low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
};

export default function TaskItem({
  task,
  isDeleting,
  isCompleting,
  onToggle,
  onDelete,
  index,
}: TaskItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 bg-white/3 border border-white/[0.07] rounded-2xl px-4 py-3.5 transition-all duration-300
        hover:bg-white/5 hover:border-violet-500/20 hover:-translate-y-px hover:shadow-lg hover:shadow-black/30
        ${task.completed ? "opacity-50" : ""}
        ${isDeleting ? "opacity-0 translate-x-4 scale-[0.97] pointer-events-none" : ""}
      `}
      style={{
        animation: `slideIn 0.3s ease both`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => onToggle(task.id)}
        disabled={isCompleting}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
          ${
            task.completed
              ? "bg-linear-to-br from-violet-600 to-indigo-600 border-transparent shadow-md shadow-violet-500/40"
              : "border-white/15 hover:border-violet-500 hover:bg-violet-500/15 hover:scale-110 hover:shadow-violet-500/30"
          }
          ${isCompleting ? "animate-pulse border-violet-500" : ""}
          disabled:cursor-not-allowed
        `}
      >
        {task.completed && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Task text + priority badge */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm leading-snug wrap-break-word ${task.completed ? "line-through text-slate-600" : "text-slate-300"}`}
          >
            {task.task}
          </span>
          <span
            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border shrink-0 ${priorityBadge[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        {task.completed && (
          <p className="text-[11px] text-violet-500/70 font-medium mt-0.5">
            Completed
          </p>
        )}
      </div>

      {/* Delete button — hidden until hover */}
      <button
        onClick={() => onDelete(task.id)}
        disabled={isDeleting}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 hover:scale-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      </button>
    </div>
  );
}
