import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { bookings, type Booking } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — VetCare" }] }),
  component: Bookings,
});

const tabs = ["upcoming", "completed", "cancelled"] as const;

function Bookings() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("upcoming");
  const list = bookings.filter((b) => b.status === tab);

  return (
    <AppShell>
      <SectionHeader title="My appointments" subtitle="Track and manage your bookings" />

      <div className="inline-flex p-1 rounded-xl glass">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-1.5 rounded-lg text-sm font-medium capitalize",
              tab === t ? "text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="bk-pill"
                className="absolute inset-0 rounded-lg bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {list.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
            No {tab} appointments.
          </div>
        )}
        {list.map((b, i) => (
          <BookingCard key={b.id} b={b} i={i} />
        ))}
      </div>
    </AppShell>
  );
}

function BookingCard({ b, i }: { b: Booking; i: number }) {
  const meta = {
    upcoming: { icon: Clock, color: "sky", label: "Upcoming" },
    completed: { icon: CheckCircle2, color: "mint", label: "Completed" },
    cancelled: { icon: XCircle, color: "lavender", label: "Cancelled" },
  }[b.status];
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
      className="glass rounded-3xl p-5"
    >
      <div className="flex items-center justify-between">
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: `var(--${meta.color})`, color: `var(--${meta.color}-foreground)` }}
        >
          <Icon className="size-3" /> {meta.label}
        </div>
        <div className="text-sm font-bold">${b.price}</div>
      </div>
      <div className="mt-3">
        <div className="font-semibold">{b.specialty}</div>
        <div className="text-xs text-muted-foreground">{b.vetName} • for {b.petName}</div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Calendar className="size-3" /> {b.date}</span>
        <span>•</span>
        <span>{b.time}</span>
      </div>
      {b.status === "upcoming" && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-10 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium">Reschedule</button>
          <button className="h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium">Join call</button>
        </div>
      )}
    </motion.div>
  );
}
