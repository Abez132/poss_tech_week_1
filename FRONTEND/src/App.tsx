import { useEffect, useState } from "react";
import type { Task, Filter, Priority } from "./types";
import { apiFetch } from "./api";
import AuthPage from "./components/AuthPage";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import TaskInput from "./components/TaskInput";
import FilterBar from "./components/FilterBar";
import TaskItem from "./components/TaskItem";
import EmptyState from "./components/EmptyState";

export default function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        const res = await apiFetch("/users");
        const data = await res.json();
        setTasks(data);
      } catch {
        setError("Could not connect to the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  if (!token) {
    return <AuthPage onAuth={(t) => setToken(t)} />;
  }

  const addTask = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setAdding(true);
    try {
      const res = await apiFetch("/users", {
        method: "POST",
        body: JSON.stringify({ task: trimmed, priority }),
      });
      const data = await res.json();
      setTasks((prev) => [...prev, data[0]]);
      setInput("");
      setPriority("Medium");
    } catch {
      setError("Failed to add task.");
    } finally {
      setAdding(false);
    }
  };

  const toggleTask = async (id: string) => {
    setCompletingId(id);
    try {
      const res = await apiFetch(`/users/${id}`, { method: "PATCH" });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: updated.completed } : t,
        ),
      );
    } catch {
      setError("Failed to update task.");
    } finally {
      setCompletingId(null);
    }
  };

  const deleteTask = async (id: string) => {
    setDeletingId(id);
    try {
      await apiFetch(`/users/${id}`, { method: "DELETE" });
      setTimeout(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        setDeletingId(null);
      }, 300);
    } catch {
      setError("Failed to delete task.");
      setDeletingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTasks([]);
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const filterCounts: Record<Filter, number> = {
    all: totalCount,
    active: activeCount,
    completed: completedCount,
  };

  return (
    <div className="min-h-screen bg-[#07070f] flex items-start justify-center px-4 py-14 font-sans overflow-hidden relative">
      {/* Ambient background blobs */}
      <div className="fixed w-125 h-125 rounded-full bg-violet-600/20 blur-[100px] -top-32 -left-24 animate-pulse pointer-events-none" />
      <div className="fixed w-100 h-100 rounded-full bg-blue-600/15 blur-[100px] -bottom-20 -right-20 animate-pulse pointer-events-none" />
      <div className="fixed w-75 h-75 rounded-full bg-pink-500/10 blur-[80px] top-1/2 left-2/3 pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-145 bg-surface backdrop-blur-2xl border border-white/[0.07] rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]">
        {/* Logout button */}
        <div className="flex justify-end -mb-2">
          <button
            onClick={logout}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1 rounded-lg m-7 hover:bg-red-400/10"
          >
            Sign out
          </button>
        </div>

        <Header
          activeCount={activeCount}
          completedCount={completedCount}
          totalCount={totalCount}
        />

        {totalCount > 0 && <ProgressBar progress={progress} />}

        <TaskInput
          value={input}
          onChange={setInput}
          priority={priority}
          onPriorityChange={setPriority}
          onAdd={addTask}
          adding={adding}
        />

        {/* Error banner */}
        {error && (
          <div
            onClick={() => setError(null)}
            className="flex justify-between items-center bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl px-4 py-2.5 text-sm mb-4 cursor-pointer hover:bg-red-500/15 transition-colors"
          >
            <span>⚠ {error}</span>
            <span className="opacity-50 text-xs ml-2">✕</span>
          </div>
        )}

        <FilterBar filter={filter} onChange={setFilter} counts={filterCounts} />

        {/* Task list */}
        <div className="flex flex-col gap-2 min-h-[100px]">
          {loading || filtered.length === 0 ? (
            <EmptyState filter={filter} loading={loading} />
          ) : (
            filtered.map((task, i) => (
              <TaskItem
                key={task.id}
                task={task}
                index={i}
                isDeleting={deletingId === task.id}
                isCompleting={completingId === task.id}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
