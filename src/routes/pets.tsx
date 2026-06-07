import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Pill, Plus, Syringe, Weight } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { pets, prescriptions } from "@/lib/mock-data";

export const Route = createFileRoute("/pets")({
  head: () => ({ meta: [{ title: "My pets — VetCare" }] }),
  component: Pets,
});

function Pets() {
  return (
    <AppShell>
      <SectionHeader
        title="My pets"
        subtitle="Manage profiles, medical history, and prescriptions"
        action={
          <button className="size-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-lg shadow-primary/30">
            <Plus className="size-5" />
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {pets.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl overflow-hidden"
          >
            <div
              className="h-28 relative"
              style={{ background: `linear-gradient(135deg, var(--${p.color}), color-mix(in oklab, var(--${p.color}) 60%, white))` }}
            >
              <img
                src={p.image}
                alt={p.name}
                className="absolute -bottom-6 left-5 size-20 rounded-2xl object-cover ring-4 ring-card"
              />
            </div>
            <div className="p-5 pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-lg">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.breed} • {p.species}</div>
                </div>
                <button className="text-xs font-medium text-primary">Edit</button>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <Mini icon={Weight} label="Weight" value={p.weight} />
                <Mini icon={Syringe} label="Vaccines" value="Up to date" />
                <Mini icon={Pill} label="Meds" value={prescriptions.filter((r) => r.petName === p.name).length.toString()} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="font-display font-bold text-lg mb-3">Prescription history</h2>
        <div className="space-y-2">
          {prescriptions.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="size-10 rounded-xl bg-mint text-mint-foreground grid place-items-center">
                <Pill className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{r.medication}</div>
                <div className="text-xs text-muted-foreground">{r.dosage}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{r.date}</div>
                <div className="text-[11px] font-medium">{r.petName}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Mini({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-2 text-center">
      <Icon className="size-3.5 mx-auto text-muted-foreground" />
      <div className="text-[11px] font-semibold mt-1 truncate">{value}</div>
      <div className="text-[9px] text-muted-foreground uppercase">{label}</div>
    </div>
  );
}
