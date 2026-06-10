import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarCheck,
  CalendarPlus,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  XCircle,
} from "lucide-react";
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

  const totalUpcoming = bookings.filter((b) => b.status === "upcoming").length;
  const totalCompleted = bookings.filter((b) => b.status === "completed").length;
  const totalCancelled = bookings.filter((b) => b.status === "cancelled").length;
  const totalSpend = bookings
    .filter((b) => b.status === "completed")
    .reduce((s, b) => s + b.price, 0);

  const tabCounts: Record<(typeof tabs)[number], number> = {
    upcoming: totalUpcoming,
    completed: totalCompleted,
    cancelled: totalCancelled,
  };

  return (
    <AppShell>
      <SectionHeader
        title="My appointments"
        subtitle="Track and manage your bookings"
        badge={totalUpcoming}
      />

      {/* ── Summary bar ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {[
          {
            label: "Upcoming",
            value: totalUpcoming,
            icon: CalendarPlus,
            color: "sky",
          },
          {
            label: "Completed",
            value: totalCompleted,
            icon: CalendarCheck,
            color: "mint",
          },
          {
            label: "Total spent",
            value: `$${totalSpend}`,
            icon: DollarSign,
            color: "lavender",
          },
        ].map((s) => (
          <div key={s.label} className="glass rounded-2xl p-3 flex flex-col gap-1">
            <div
              className="size-7 rounded-lg grid place-items-center"
              style={{ background: `var(--${s.color})`, color: `var(--${s.color}-foreground)` }}
            >
              <s.icon className="size-3.5" />
            </div>
            <div className="font-display font-bold text-lg leading-none">{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Tabs ────────────────────────────────── */}
      <div className="inline-flex p-1 rounded-xl glass mb-5">
        {tabs.map((t) => (
          <button
            key={t}
            id={`tab-${t}`}
            onClick={() => setTab(t)}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors",
              tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="bk-pill"
                className="absolute inset-0 rounded-lg bg-primary shadow-md shadow-primary/30"
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
              />
            )}
            <span className="relative">{t}</span>
            <span
              className={cn(
                "relative text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
                tab === t ? "bg-white/25 text-white" : "bg-secondary text-muted-foreground",
              )}
            >
              {tabCounts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Booking list ────────────────────────── */}
      <div className="space-y-3">
        {list.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <div className="size-14 rounded-2xl bg-secondary grid place-items-center mx-auto mb-3">
              <CalendarCheck className="size-6 text-muted-foreground" />
            </div>
            <div className="font-semibold">No {tab} appointments</div>
            <div className="text-sm text-muted-foreground mt-1">
              {tab === "upcoming" ? "Book your first appointment with a vet." : "Nothing here yet."}
            </div>
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
    upcoming: { icon: Clock, color: "sky", label: "Upcoming" },
    completed: { icon: CheckCircle2, color: "mint", label: "Completed" },
    cancelled: { icon: XCircle, color: "lavender", label: "Cancelled" },
  }[b.status];
  const Icon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="glass rounded-3xl p-5 card-hover"
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-3">
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={{ background: `var(--${meta.color})`, color: `var(--${meta.color}-foreground)` }}
        >
          <Icon className="size-3" /> {meta.label}
        </div>
        <div className="text-sm font-bold">${b.price}</div>
      </div>

      {/* Main content */}
      <div className="mt-3 flex items-center gap-3">
        {/* Vet avatar */}
        <img
          src={b.vetImage}
          alt={b.vetName}
          className="size-12 rounded-xl object-cover ring-2 ring-border shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="font-display font-bold truncate">{b.specialty}</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {b.vetName} · for <span className="font-medium text-foreground">{b.petName}</span>
          </div>
          <div className="text-[11px] text-muted-foreground">{b.clinicName}</div>
        </div>
      </div>

      {/* Date/time row */}
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="size-3.5" /> {b.date}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {b.time}
        </span>
        {b.notes && (
          <>
            <span>•</span>
            <span className="text-warning font-medium truncate">{b.notes}</span>
          </>
        )}
      </div>

      {/* Actions */}
      {b.status === "upcoming" && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button className="h-9 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition">
            Reschedule
          </button>
          <button className="h-9 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold flex items-center justify-center gap-1 hover:bg-secondary/80 transition">
            <MapPin className="size-3" /> Directions
          </button>
          <button className="h-9 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition">
            Join call
          </button>
        </div>
      )}
      {b.status === "completed" && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-9 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition">
            View summary
          </button>
          <button className="h-9 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition">
            Book again
          </button>
        </div>
      )}
    </motion.div>
  );
}
