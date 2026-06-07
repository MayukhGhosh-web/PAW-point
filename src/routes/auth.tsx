import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Apple, Mail, PawPrint, Stethoscope, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

type Role = "owner" | "vet";

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [role, setRole] = useState<Role>("owner");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Visual side */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden">
        <motion.div
          className="absolute inset-10 rounded-[3rem] bg-gradient-to-br from-primary/30 via-[var(--lavender)]/40 to-[var(--mint)]/30 blur-2xl"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="relative glass-strong rounded-[2.5rem] p-10 max-w-md">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground mb-6">
            <PawPrint className="size-7" />
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight text-balance">
            Healthcare your pet deserves.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Book vetted professionals, manage records, and never miss a vaccination.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { v: "12k+", l: "Pet parents" },
              { v: "850+", l: "Verified vets" },
              { v: "4.9★", l: "Avg rating" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-card/60 p-3 text-center">
                <div className="font-display font-bold text-lg">{s.v}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground">
              <PawPrint className="size-5" />
            </div>
            <span className="font-display font-bold text-lg">VetCare</span>
          </div>

          <h1 className="font-display text-3xl font-bold">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === "login" ? "Sign in to manage your pets' care." : "Start with a free profile."}
          </p>

          <div className="mt-6 inline-flex p-1 rounded-xl bg-secondary text-sm">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative px-4 py-1.5 rounded-lg font-medium ${
                  mode === m ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-pill"
                    className="absolute inset-0 rounded-lg bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative capitalize">{m === "login" ? "Sign in" : "Register"}</span>
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(mode === "login" ? "Welcome back!" : "Account created!");
              if (mode === "register" && role === "vet") navigate({ to: "/verification" });
              else navigate({ to: "/home" });
            }}
            className="mt-6 space-y-3"
          >
            {mode === "register" && (
              <>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">I'm a</span>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {([
                      { id: "owner", label: "Pet owner", icon: UserRound },
                      { id: "vet", label: "Veterinarian", icon: Stethoscope },
                    ] as const).map((r) => (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        className={`h-12 rounded-xl border flex items-center justify-center gap-2 text-sm font-medium transition ${
                          role === r.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border text-muted-foreground hover:bg-secondary/60"
                        }`}
                      >
                        <r.icon className="size-4" />
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Full name" type="text" placeholder="Alex Morgan" />
              </>
            )}
            <Field label="Email" type="email" placeholder="you@example.com" />
            <Field label="Password" type="password" placeholder="••••••••" />

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or continue with <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="h-11 rounded-xl glass flex items-center justify-center gap-2 text-sm font-medium">
              <Mail className="size-4" /> Google
            </button>
            <button className="h-11 rounded-xl glass flex items-center justify-center gap-2 text-sm font-medium">
              <Apple className="size-4" /> Apple
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing you agree to our <Link to="/" className="underline">Terms</Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1 w-full h-12 px-4 rounded-xl bg-card/60 border border-border focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition"
      />
    </label>
  );
}
