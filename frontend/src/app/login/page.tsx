"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/contexts/auth-context";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFields = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFields) {
    setServerError(null);
    const result = await login(values.email, values.password);
    if (result.error) {
      setServerError(result.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen font-body text-on-surface relative overflow-hidden px-4 flex items-center justify-center">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-container/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-surface-container/30 blur-[100px] rounded-full pointer-events-none"></div>

      <main className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="text-3xl font-black text-white italic font-headline tracking-tighter mb-2">
            StackForge
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl glow-orange overflow-hidden relative border-t border-white/5">
          <div className="p-8 md:p-10">
            <header className="text-center mb-10">
              <h1 className="text-white text-3xl font-extrabold font-headline tracking-tight mb-3 leading-tight">
                Welcome Back
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Log in to continue your journey
              </p>
            </header>

            <div className="space-y-6">
              {serverError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm font-medium text-center">
                  {serverError}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      {...register("email")}
                      className="w-full h-12 bg-surface-container-lowest border-none text-white rounded-lg px-4 focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                      placeholder="alex@engineering.com"
                      type="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      className="w-full h-12 bg-surface-container-lowest border-none text-white rounded-lg px-4 focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-600"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs ml-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black text-sm uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(250,92,27,0.4)] transition-all duration-300 active:scale-95 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in…" : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Don&apos;t have an account?{" "}
            <a
              className="text-primary font-bold hover:text-white transition-colors ml-1"
              href="/sign-up"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>

      <div className="fixed bottom-10 right-10 flex flex-col items-end opacity-20 pointer-events-none select-none">
        <div className="text-[120px] font-black text-white/5 leading-none font-headline uppercase select-none">
          FORGE
        </div>
        <div className="text-[80px] font-black text-primary/10 leading-none font-headline uppercase select-none -mt-8">
          STACK
        </div>
      </div>
    </div>
  );
}
