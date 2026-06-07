import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, PawPrint, ShieldCheck, Stethoscope, UserRound } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/role")({
  head: () => ({ meta: [{ title: "Choose your role — VetCare" }] }),
  component: RolePage,
});

const roles = [
  {
    id: "owner",
    title: "Pet owner",
    desc: "Book trusted vets and manage your pets' care in one place.",
    icon: UserRound,
    color: "sky",
  },
  {
    id: "vet",
    title: "Veterinarian",
    desc: "Grow your clinic with verified listings and bookings.",
    icon: Stethoscope,
    color: "mint",
  },
  {
    id: "admin",
    title: "Administrator",
    desc: "Verify vets, manage users and oversee the platform.",
    icon: ShieldCheck,
    color: "lavender",
  },
] as const;

function RolePage() {
  const [selected, setSelected] = useState<string>("owner");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid place-items-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground">
            <PawPrint className="size-5" />
          </div>
          <span className="font-display font-bold text-lg">VetCare</span>
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-center text-balance">
          How will you use VetCare?
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          You can switch roles later from settings.
        </p>

        <div className="grid md:grid-cols-3 gap-3 mt-8">
          {roles.map((r, i) => {
            const active = selected === r.id;
            return (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(r.id)}
                className={`text-left glass rounded-3xl p-5 transition relative overflow-hidden ${
                  active ? "ring-2 ring-primary shadow-xl shadow-primary/20" : "hover:bg-card/80"
                }`}
              >
                <div
                  className="size-12 rounded-2xl grid place-items-center mb-4"
                  style={{ background: `var(--${r.color})`, color: `var(--${r.color}-foreground)` }}
                >
                  <r.icon className="size-6" />
                </div>
                <div className="font-display font-bold text-lg">{r.title}</div>
                <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
                {active && (
                  <motion.div
                    layoutId="role-ring"
                    className="absolute inset-0 rounded-3xl border-2 border-primary pointer-events-none"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (selected === "vet") navigate({ to: "/verification" });
              else if (selected === "admin") navigate({ to: "/admin" });
              else navigate({ to: "/auth" });
            }}
            className="h-12 px-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground font-semibold shadow-xl shadow-primary/30"
          >
            Continue <ArrowRight className="size-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
