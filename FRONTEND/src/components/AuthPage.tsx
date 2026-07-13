import { useState } from "react";
import { login, register } from "../api";

interface AuthPageProps {
  onAuth: (token: string) => void;
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res =
        mode === "login"
          ? await login(email, password)
          : await register(email, password);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      localStorage.setItem("token", data.token);
      onAuth(data.token);
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070f] flex items-center justify-center px-4 font-sans relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px] -top-32 -left-24 pointer-events-none" />
      <div className="fixed w-[400px] h-[400px] rounded-full bg-blue-600/15 blur-[100px] -bottom-20 -right-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm bg-[rgba(18,18,30,0.9)] backdrop-blur-2xl border border-white/[0.07] rounded-3xl p-8 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 mb-3">
            <svg
              width="22"
              height="22"
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
          <h1 className="text-xl font-bold text-white tracking-tight">
            Task Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-violet-500/60 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              placeholder={
                mode === "register" ? "At least 6 characters" : "••••••••"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all focus:border-violet-500/60 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-400 rounded-xl px-4 py-2.5 text-sm">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-linear-to-br from-violet-600 to-indigo-600 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-violet-500/30 hover:-translate-y-0.5 hover:shadow-violet-500/50 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <p className="text-center text-sm text-slate-500 mt-6">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError(null);
            }}
            className="text-violet-400 font-semibold hover:text-violet-300 transition-colors"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
