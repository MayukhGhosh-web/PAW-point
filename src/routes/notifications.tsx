import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, Calendar, Pill, Sparkles } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — VetCare" }] }),
  component: Notifs,
});

const iconMap = {
  appointment: { icon: Calendar, color: "sky" },
  reminder: { icon: Bell, color: "lavender" },
  prescription: { icon: Pill, color: "mint" },
  system: { icon: Sparkles, color: "sky" },
} as const;

function Notifs() {
  return (
    <AppShell>
      <SectionHeader
        title="Notifications"
        subtitle="Stay on top of your pets' care"
        action={<button className="text-xs font-medium text-primary">Mark all read</button>}
      />

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const meta = iconMap[n.type];
          const Icon = meta.icon;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl p-4 flex gap-3"
            >
              <div
                className="size-10 rounded-xl grid place-items-center shrink-0"
                style={{ background: `var(--${meta.color})`, color: `var(--${meta.color}-foreground)` }}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-sm truncate">{n.title}</div>
                  <span className="text-[11px] text-muted-foreground shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{n.body}</p>
              </div>
              {n.unread && <span className="size-2 rounded-full bg-primary mt-1 shrink-0" />}
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}
