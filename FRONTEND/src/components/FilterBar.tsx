import type { Filter } from "../types";

interface FilterBarProps {
  filter: Filter;
  onChange: (f: Filter) => void;
  counts: Record<Filter, number>;
}

const labels: Record<Filter, string> = {
  all: "All",
  active: "Active",
  completed: "Done",
};

export default function FilterBar({
  filter,
  onChange,
  counts,
}: FilterBarProps) {
  return (
    <div className="flex gap-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 mb-5">
      {(["all", "active", "completed"] as Filter[]).map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all
            ${
              filter === f
                ? "bg-gradient-to-br from-violet-600/25 to-indigo-600/20 text-violet-300 font-semibold shadow-inner"
                : "text-slate-500 hover:text-violet-400 hover:bg-violet-500/[0.08]"
            }`}
        >
          {labels[f]}
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-md min-w-[18px] text-center
            ${filter === f ? "bg-violet-500/30 text-violet-300" : "bg-white/[0.08] text-slate-500"}`}
          >
            {counts[f]}
          </span>
        </button>
      ))}
    </div>
  );
}
