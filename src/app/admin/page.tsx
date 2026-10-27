"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await loginAction(formData);
    setLoading(false);

    if (res.success) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      setError(res.error || "Authentication failed.");
    }
  };

  return (
    <div className="admin-theme min-h-screen flex items-center justify-center p-4 bg-[#08080C] text-slate-100">
      <div className="w-full max-w-md glass-card p-8 sm:p-10 border-white/10 shadow-2xl relative overflow-hidden bg-[#12121A]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-blue text-white flex items-center justify-center mx-auto shadow-glowSm mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
            KS Digital Admin
          </h1>
          <p className="text-xs text-slate-300">
            Sign in to manage CRM leads and update website content
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sawantketan87@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-sm mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Access Admin Portal <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Protected route with role-based access control.
        </p>
      </div>
    </div>
  );
}
