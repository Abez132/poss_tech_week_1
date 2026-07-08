interface TaskInputProps {
  value: string;
  onChange: (val: string) => void;
  onAdd: () => void;
  adding: boolean;
}

export default function TaskInput({
  value,
  onChange,
  onAdd,
  adding,
}: TaskInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onAdd();
  };

  return (
    <div className="flex gap-2 mb-4">
      {/* Input with icon */}
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
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-violet-500/60 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10 disabled:opacity-50"
        />
      </div>

      {/* Add button */}
      <button
        onClick={onAdd}
        disabled={adding || !value.trim()}
        className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-semibold px-5 rounded-xl transition-all shadow-lg shadow-violet-500/30 hover:-translate-y-0.5 hover:shadow-violet-500/50 active:translate-y-0 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none min-w-[96px] flex items-center justify-center"
      >
        {adding ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Add Task"
        )}
      </button>
    </div>
  );
}
