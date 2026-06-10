import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Pill, Plus, Shield, Syringe, Weight } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { pets, prescriptions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pets")({
  head: () => ({ meta: [{ title: "My pets — VetCare" }] }),
  component: Pets,
});

function healthScoreColor(score: number) {
  if (score >= 90) return { bg: "var(--success)", fg: "var(--success-foreground)", label: "Excellent" };
  if (score >= 70) return { bg: "var(--warning)", fg: "var(--warning-foreground)", label: "Good" };
  return { bg: "var(--destructive)", fg: "var(--destructive-foreground)", label: "Needs care" };
}

function Pets() {
  return (
    <AppShell>
      <SectionHeader
        title="My pets"
        subtitle="Manage profiles, medical history, and prescriptions"
        badge={pets.length}
        action={
          <button
            id="add-pet-btn"
            className="size-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-lg shadow-primary/30 hover:opacity-90 active:scale-95 transition-all"
            aria-label="Add pet"
          >
            <Plus className="size-5" />
          </button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {pets.map((p, i) => {
          const health = healthScoreColor(p.healthScore);
          const rxCount = prescriptions.filter((r) => r.petName === p.name).length;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="glass rounded-3xl overflow-hidden card-hover"
            >
              {/* Color banner */}
              <div
                className="h-32 relative"
                style={{
                  background: `linear-gradient(135deg, var(--${p.color}), color-mix(in oklab, var(--${p.color}) 60%, white))`,
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute -bottom-7 left-5 size-20 rounded-2xl object-cover ring-4 ring-card shadow-lg"
                />
                {/* Health score badge */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md"
                  style={{ background: health.bg, color: health.fg }}
                >
                  <Activity className="size-3" />
                  {p.healthScore}% · {health.label}
                </div>
              </div>

              <div className="p-5 pt-10">
                {/* Name + actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-bold text-xl">{p.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {p.breed} · {p.species}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.insured && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-mint text-mint-foreground text-[10px] font-semibold">
                        <Shield className="size-2.5" /> Insured
                      </div>
                    )}
                    <button className="text-xs font-semibold text-primary hover:underline">Edit</button>
                  </div>
                </div>

                {/* Stats chips */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <Mini icon={Weight} label="Weight" value={p.weight} />
                  <Mini icon={Syringe} label="Vaccines" value="Up to date" />
                  <Mini icon={Pill} label="Meds" value={rxCount === 0 ? "None" : `${rxCount} active`} />
                </div>

                {/* Vaccine next date */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last visit</span>
                  <span className="font-medium">{p.lastVisit}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-muted-foreground">Next vaccine</span>
                  <span className={cn(
                    "font-semibold",
                    // Highlight if in the near future (simple heuristic)
                    p.nextVaccine.includes("Jun") ? "text-warning" : "text-foreground"
                  )}>
                    {p.nextVaccine}
                  </span>
                </div>

                {/* CTA */}
                <button className="mt-4 w-full h-9 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition">
                  Book appointment
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prescription history */}
      <section className="mt-8">
        <h2 className="font-display font-bold text-lg mb-3">Prescription history</h2>
        <div className="space-y-2.5">
          {prescriptions.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              className="glass rounded-2xl p-4 flex items-center gap-3 card-hover"
            >
              <div className="size-11 rounded-xl bg-mint text-mint-foreground grid place-items-center shrink-0">
                <Pill className="size-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{r.medication}</div>
                <div className="text-xs text-muted-foreground truncate">{r.dosage}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{r.prescribedBy}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-muted-foreground">{r.date}</div>
                <div
                  className="mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: `var(--${
                      pets.find((p) => p.name === r.petName)?.color ?? "sky"
                    })`,
                    color: `var(--${
                      pets.find((p) => p.name === r.petName)?.color ?? "sky"
                    }-foreground)`,
                  }}
                >
                  {r.petName}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-secondary/70 p-2.5 text-center">
      <Icon className="size-3.5 mx-auto text-muted-foreground" />
      <div className="text-[11px] font-bold mt-1.5 truncate">{value}</div>
      <div className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  );
}
