interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(124,58,237,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-violet-400 min-w-[32px] text-right">
        {Math.round(progress)}%
      </span>
    </div>
  );
}
