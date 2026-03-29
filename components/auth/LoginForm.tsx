"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/auth/InputField";
import FormWrapper from "@/components/auth/FormWrapper";
import { supabase } from "@/lib/supabaseClient";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    document.cookie = "sb-auth=1; path=/; max-age=604800; SameSite=Lax";
    router.push("/app");
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <InputField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="alex@kineticcurator.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#474554] tracking-wide">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-semibold text-[#6C5CE7] hover:text-[#5a4bd1] transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#F2F4F6] rounded-lg px-4 py-3 text-sm text-[#191c1e] placeholder:text-[#787586] outline-none transition-all duration-150 focus:bg-white focus:ring-2 focus:ring-[#6C5CE7]/25 focus:shadow-[0_0_0_2px_rgba(108,92,231,0.15)]"
          />
        </div>

        {error && (
          <p className="text-sm text-[#ba1a1a] -mt-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-bold text-sm text-center text-white bg-gradient-to-r from-[#6C5CE7] to-[#22D3EE] shadow-[0_4px_16px_rgba(108,92,231,0.35)] hover:shadow-[0_6px_24px_rgba(108,92,231,0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-[#c8c4d7]/40" />
          <span className="text-[10px] font-bold tracking-[0.15em] text-[#787586] uppercase">
            Secure Portal
          </span>
          <div className="flex-1 h-px bg-[#c8c4d7]/40" />
        </div>
      </div>
    </FormWrapper>
  );
}
