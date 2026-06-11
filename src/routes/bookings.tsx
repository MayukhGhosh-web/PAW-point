import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Clock, XCircle, AlertCircle, Stethoscope } from "lucide-react";
import { useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { bookings, type Booking } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings — VetCare" }] }),
  component: Bookings,
});

const tabs = ["pending", "confirmed", "upcoming", "completed", "cancelled"] as const;

function Bookings() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("confirmed");
  const list = bookings.filter((b) => b.status === tab);

  const tabLabels: Record<typeof tabs[number], string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <AppShell>
      <SectionHeader title="My appointments" subtitle="Track and manage your bookings" />

      <div className="inline-flex p-1 rounded-xl glass gap-1 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-4 py-1.5 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors",
              tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="bk-pill"
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{tabLabels[t]}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {list.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-10 text-center"
          >
            <div className="text-sm font-medium text-muted-foreground">
              No {tabLabels[tab].toLowerCase()} appointments
            </div>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {tab === "pending" && "Payment pending for these appointments"}
              {tab === "confirmed" && "Your confirmed appointments will appear here"}
              {tab === "upcoming" && "Your upcoming appointments will appear here"}
              {tab === "completed" && "Your completed appointments will appear here"}
              {tab === "cancelled" && "Your cancelled appointments will appear here"}
            </p>
          </motion.div>
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
    pending: { icon: AlertCircle, color: "orange", label: "Pending" },
    confirmed: { icon: CheckCircle2, color: "mint", label: "Confirmed" },
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
      whileHover={{ y: -2 }}
      className="glass rounded-3xl p-5 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
          style={{ background: `var(--${meta.color})`, color: `var(--${meta.color}-foreground)` }}
        >
          <Icon className="size-3" /> {meta.label}
        </div>
        <div className="text-sm font-bold text-primary">${b.price}</div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-sm font-semibold text-foreground">{b.specialty}</div>
          <div className="text-xs text-muted-foreground mt-1">{b.vetName}</div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/30">
            <Stethoscope className="size-3" />
            <span>{b.petName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border/50 pt-3">
          <span className="flex items-center gap-1 flex-1">
            <Calendar className="size-3" /> {b.date}
          </span>
          <span className="flex items-center gap-1 flex-1">
            <Clock className="size-3" /> {b.time}
          </span>
        </div>
      </div>

      {b.status === "upcoming" && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-10 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition">Reschedule</button>
          <button className="h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">Join call</button>
        </div>
      )}
      {b.status === "confirmed" && (
        <div className="mt-4">
          <button className="w-full h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition">Join call</button>
        </div>
      )}
      {b.status === "pending" && (
        <div className="mt-4">
          <button className="w-full h-10 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition">Complete Payment</button>
        </div>
      )}
    </motion.div>
  );
}
