interface HeaderProps {
  activeCount: number;
  completedCount: number;
  totalCount: number;
}

export default function Header({
  activeCount,
  completedCount,
  totalCount,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left: logo + title */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Task Manager
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {activeCount === 0 && totalCount > 0
              ? "All done — great work! 🎉"
              : `${activeCount} task${activeCount !== 1 ? "s" : ""} left to do`}
          </p>
        </div>
      </div>

      {/* Right: stats pill */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 shrink-0">
        <div className="flex flex-col items-center">
          <span className="text-base font-bold text-slate-200 leading-none">
            {completedCount}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">
            done
          </span>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex flex-col items-center">
          <span className="text-base font-bold text-slate-200 leading-none">
            {totalCount}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">
            total
          </span>
        </div>
      </div>
    </div>
  );
}
