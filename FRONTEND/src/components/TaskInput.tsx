import type { Priority } from "../types";

interface TaskInputProps {
  value: string;
  onChange: (val: string) => void;
  priority: Priority;
  onPriorityChange: (p: Priority) => void;
  onAdd: () => void;
  adding: boolean;
}

const priorityStyles: Record<Priority, string> = {
  High: "text-red-400 border-red-500/40 bg-red-500/10",
  Medium: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
  Low: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
};

export default function TaskInput({
  value,
  onChange,
  priority,
  onPriorityChange,
  onAdd,
  adding,
}: TaskInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onAdd();
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2">
        {/* Text input with icon */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <input
            type="text"
            placeholder="Add a new task…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={adding}
            className="w-full bg-white/4 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-violet-500/60 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 disabled:opacity-50"
          />
        </div>

        {/* Add button */}
        <button
          onClick={onAdd}
          disabled={adding || !value.trim()}
          className="bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-semibold px-5 rounded-xl transition-all shadow-lg shadow-violet-500/30 hover:-translate-y-0.5 hover:shadow-violet-500/50 active:translate-y-0 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none min-w-[96px] flex items-center justify-center"
        >
          {adding ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Add Task"
          )}
        </button>
      </div>

      {/* Priority selector */}
      <div className="flex gap-2 items-center">
        <span className="text-xs text-slate-600 shrink-0">Priority:</span>
        <div className="flex gap-1.5">
          {(["High", "Medium", "Low"] as Priority[]).map((p) => (
            <button
              key={p}
              onClick={() => onPriorityChange(p)}
              className={`text-xs px-3 py-1 rounded-lg border font-medium transition-all
                ${
                  priority === p
                    ? priorityStyles[p]
                    : "text-slate-500 border-white/8 bg-white/3 hover:border-white/20"
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
