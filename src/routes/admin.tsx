import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, CalendarHeart, DollarSign, Stethoscope, Users } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { vets } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — VetCare" }] }),
  component: Admin,
});

function Admin() {
  const stats = [
    { label: "Total users", value: "12,482", icon: Users, color: "sky" },
    { label: "Active vets", value: "856", icon: Stethoscope, color: "mint" },
    { label: "Monthly bookings", value: "9.4k", icon: CalendarHeart, color: "lavender" },
    { label: "Revenue (MTD)", value: "$182k", icon: DollarSign, color: "sky" },
  ];

  return (
    <AppShell>
      <SectionHeader title="Admin dashboard" subtitle="Platform overview" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-3xl p-5"
          >
            <div
              className="size-10 rounded-xl grid place-items-center"
              style={{ background: `var(--${s.color})`, color: `var(--${s.color}-foreground)` }}
            >
              <s.icon className="size-5" />
            </div>
            <div className="font-display text-2xl font-bold mt-4">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <section className="mt-8 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Bookings this week</h2>
            <Activity className="size-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-2 h-40">
            {[40, 65, 55, 80, 72, 90, 60].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, type: "spring" }}
                className="flex-1 rounded-t-xl bg-gradient-to-t from-primary to-[oklch(0.75_0.12_265)]"
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h2 className="font-display font-bold text-lg mb-4">Top vets</h2>
          <div className="space-y-3">
            {vets.slice(0, 4).map((v) => (
              <div key={v.id} className="flex items-center gap-3">
                <img src={v.image} alt="" className="size-10 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{v.name}</div>
                  <div className="text-[11px] text-muted-foreground">{v.reviews} reviews</div>
                </div>
                <div className="text-xs font-bold">★ {v.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
