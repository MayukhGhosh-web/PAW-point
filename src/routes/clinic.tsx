import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Clock, MapPin, Phone, Save, Stethoscope } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";

export const Route = createFileRoute("/clinic")({
  head: () => ({ meta: [{ title: "Clinic details — VetCare" }] }),
  component: Clinic,
});

const hours = [
  { day: "Mon", open: "09:00", close: "18:00" },
  { day: "Tue", open: "09:00", close: "18:00" },
  { day: "Wed", open: "09:00", close: "18:00" },
  { day: "Thu", open: "09:00", close: "20:00" },
  { day: "Fri", open: "09:00", close: "20:00" },
  { day: "Sat", open: "10:00", close: "16:00" },
  { day: "Sun", open: "Closed", close: "" },
];

function Clinic() {
  return (
    <AppShell>
      <SectionHeader title="Clinic details" subtitle="Manage your clinic's public profile" />

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-strong rounded-3xl p-6 space-y-5"
        >
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-[var(--sky)] text-[var(--sky-foreground)] grid place-items-center">
              <Building2 className="size-5" />
            </div>
            <div>
              <div className="font-display font-bold text-lg">PawPrint Veterinary Clinic</div>
              <div className="text-xs text-muted-foreground">Last updated 2d ago</div>
            </div>
          </div>

          <Field icon={Building2} label="Clinic name" value="PawPrint Veterinary Clinic" />
          <Field icon={MapPin} label="Address" value="221 Baker Street, Downtown" />
          <Field icon={Phone} label="Phone" value="+1 (415) 555-0148" />
          <Field icon={Stethoscope} label="Specialization" value="Small animal surgery, orthopedic" />

          <button className="h-11 px-5 rounded-xl bg-primary text-primary-foreground font-semibold inline-flex items-center gap-2 shadow-lg shadow-primary/30">
            <Save className="size-4" /> Save changes
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="size-4 text-primary" />
            <h2 className="font-display font-bold">Operating hours</h2>
          </div>
          <div className="space-y-2 text-sm">
            {hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between">
                <span className="text-muted-foreground w-10">{h.day}</span>
                <span className="font-medium">
                  {h.close ? `${h.open} – ${h.close}` : h.open}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-4 glass rounded-3xl overflow-hidden h-56 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--sky)] via-[var(--mint)] to-[var(--lavender)] opacity-60" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="glass-strong rounded-2xl px-4 py-3 flex items-center gap-2">
            <MapPin className="size-4 text-primary" />
            <span className="text-sm font-medium">221 Baker Street, Downtown</span>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1 relative">
        <Icon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          defaultValue={value}
          className="w-full h-12 pl-11 pr-4 rounded-xl bg-card/60 border border-border focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition"
        />
      </div>
    </label>
  );
}
