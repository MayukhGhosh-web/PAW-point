import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  CalendarClock,
  CheckCheck,
  ChevronRight,
  Clock,
  Pill,
  RefreshCw,
  Sparkles,
  Syringe,
} from "lucide-react";
import { useState, useMemo } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { notifications, type Notification } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — VetCare" }] }),
  component: Notifs,
});

// ─── Icon & color config ─────────────────────────────────────────────────────

const typeConfig = {
  appointment: {
    icon: CalendarClock,
    bg: "var(--sky)",
    fg: "var(--sky-foreground)",
    pill: "bg-sky/20 text-sky-foreground",
    label: "Appointment",
  },
  reminder: {
    icon: Syringe,
    bg: "var(--lavender)",
    fg: "var(--lavender-foreground)",
    pill: "bg-lavender/20 text-lavender-foreground",
    label: "Reminder",
  },
  prescription: {
    icon: Pill,
    bg: "var(--mint)",
    fg: "var(--mint-foreground)",
    pill: "bg-mint/20 text-mint-foreground",
    label: "Prescription",
  },
  system: {
    icon: Sparkles,
    bg: "var(--primary)",
    fg: "var(--primary-foreground)",
    pill: "bg-primary/10 text-primary",
    label: "Update",
  },
} as const;

// ─── Category tabs config ─────────────────────────────────────────────────────

type TabKey = "all" | "appointments" | "reminders" | "updates";

const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "All", icon: Bell },
  { key: "appointments", label: "Appointments", icon: Calendar },
  { key: "reminders", label: "Reminders", icon: Clock },
  { key: "updates", label: "Updates", icon: RefreshCw },
];

// ─── Notification card ────────────────────────────────────────────────────────

function NotifCard({
  n,
  index,
  onRead,
}: {
  n: Notification;
  index: number;
  onRead: (id: string) => void;
}) {
  const cfg = typeConfig[n.type];
  const Icon = cfg.icon;

  return (
    <motion.div
      key={n.id}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ delay: index * 0.04, duration: 0.28, ease: [0.25, 0.8, 0.25, 1] }}
      onClick={() => onRead(n.id)}
      className={cn(
        "group relative glass rounded-2xl px-4 py-4 flex gap-3 cursor-pointer",
        "transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-px",
        n.unread
          ? "border-l-[3px] border-l-primary/60 bg-primary/[0.03]"
          : "opacity-80 hover:opacity-100",
      )}
    >
      {/* Unread dot */}
      {n.unread && (
        <span className="absolute top-4 right-4 size-2 rounded-full bg-primary shadow-md shadow-primary/40" />
      )}

      {/* Icon badge */}
      <div
        className="size-11 rounded-2xl grid place-items-center shrink-0 shadow-sm"
        style={{ background: cfg.bg, color: cfg.fg }}
      >
        <Icon className="size-[18px]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-3">
        {/* Header row */}
        <div className="flex items-start gap-2 justify-between">
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm leading-snug truncate",
                n.unread ? "font-semibold text-foreground" : "font-medium text-foreground/80",
              )}
            >
              {n.title}
            </p>
            {n.petName && (
              <span className={cn("inline-flex items-center text-[10px] font-semibold mt-0.5 px-1.5 py-0.5 rounded-full", cfg.pill)}>
                {n.petName}
              </span>
            )}
          </div>
          <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5 whitespace-nowrap">
            {n.time}
          </span>
        </div>

        {/* Body */}
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
          {n.body}
        </p>

        {/* Action button */}
        {n.actionLabel && (
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {n.actionLabel}
            <ChevronRight className="size-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: TabKey }) {
  const msgs: Record<TabKey, { emoji: string; title: string; sub: string }> = {
    all: {
      emoji: "🔔",
      title: "All caught up!",
      sub: "No notifications right now. We'll let you know when something needs your attention.",
    },
    appointments: {
      emoji: "📅",
      title: "No appointment alerts",
      sub: "Confirmations and reminders for your upcoming visits will appear here.",
    },
    reminders: {
      emoji: "💊",
      title: "No reminders",
      sub: "Vaccination, medication, and health check reminders will show up here.",
    },
    updates: {
      emoji: "✨",
      title: "No updates",
      sub: "Prescription additions, lab results, and platform news will appear here.",
    },
  };
  const { emoji, title, sub } = msgs[tab];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl py-16 px-8 flex flex-col items-center text-center gap-3"
    >
      <div className="text-4xl mb-1">{emoji}</div>
      <p className="font-display font-bold text-lg">{title}</p>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{sub}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function Notifs() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

  const markRead = (id: string) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  // Merge in live-read state
  const enriched = useMemo(
    () =>
      notifications.map((n) => ({
        ...n,
        unread: n.unread && !readIds.has(n.id),
      })),
    [readIds],
  );

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? enriched
        : enriched.filter((n) => n.category === activeTab),
    [enriched, activeTab],
  );

  const unreadCount = enriched.filter((n) => n.unread).length;

  return (
    <AppShell>
      {/* Header */}
      <SectionHeader
        title="Notifications"
        subtitle="Stay on top of your pets' care"
        action={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/70 transition-colors"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </button>
          ) : null
        }
      />

      {/* Unread summary pill */}
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full"
          >
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category tabs */}
      <div className="relative mb-5 -mx-1">
        <div className="flex gap-1.5 overflow-x-auto pb-1 px-1 scrollbar-none snap-x snap-mandatory">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            const TabIcon = tab.icon;
            const count =
              tab.key === "all"
                ? enriched.filter((n) => n.unread).length
                : enriched.filter((n) => n.category === tab.key && n.unread).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                  active
                    ? "text-primary-foreground shadow-md shadow-primary/25"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="tab-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <TabIcon className="size-3.5 relative" />
                <span className="relative">{tab.label}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      "relative size-4 rounded-full text-[10px] font-bold grid place-items-center",
                      active ? "bg-white/25 text-primary-foreground" : "bg-primary/15 text-primary",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-2.5"
        >
          <AnimatePresence>
            {filtered.length === 0 ? (
              <EmptyState tab={activeTab} />
            ) : (
              filtered.map((n, i) => (
                <NotifCard key={n.id} n={n} index={i} onRead={markRead} />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Bottom padding spacer */}
      <div className="h-4" />
    </AppShell>
  );
}
