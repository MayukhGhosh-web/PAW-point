import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, DollarSign, TrendingUp, Users } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { bookings } from "@/lib/mock-data";

export const Route = createFileRoute("/staff")({
  head: () => ({ meta: [{ title: "Staff dashboard — VetCare" }] }),
  component: Staff,
});

function Staff() {
  const stats = [
    { label: "Today's visits", value: "12", icon: CalendarCheck, color: "sky", trend: "+8%" },
    { label: "Patients", value: "284", icon: Users, color: "mint", trend: "+12%" },
    { label: "Avg. wait", value: "9m", icon: Clock, color: "lavender", trend: "-3m" },
    { label: "Revenue", value: "$1.2k", icon: DollarSign, color: "sky", trend: "+18%" },
  ];

  return (
    <AppShell>
      <SectionHeader title="Staff dashboard" subtitle="Today at PawPrint Clinic" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl p-4"
          >
            <div className="flex items-start justify-between">
              <div
                className="size-9 rounded-xl grid place-items-center"
                style={{ background: `var(--${s.color})`, color: `var(--${s.color}-foreground)` }}
              >
                <s.icon className="size-4" />
              </div>
              <span className="text-[11px] font-semibold text-success inline-flex items-center gap-0.5">
                <TrendingUp className="size-3" /> {s.trend}
              </span>
            </div>
            <div className="font-display text-2xl font-bold mt-3">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="font-display font-bold text-lg mb-3">Today's queue</h2>
        <div className="glass rounded-3xl overflow-hidden">
          {bookings.slice(0, 5).map((b, i) => (
            <div key={b.id} className="flex items-center gap-3 p-4 border-b border-border last:border-0">
              <div className="size-10 rounded-xl bg-secondary grid place-items-center font-bold text-sm">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{b.petName} — {b.specialty}</div>
                <div className="text-xs text-muted-foreground">{b.vetName}</div>
              </div>
              <div className="text-xs font-semibold px-2 py-1 rounded-md bg-sky text-sky-foreground">{b.time}</div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
