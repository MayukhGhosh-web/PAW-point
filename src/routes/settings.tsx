import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  HelpCircle,
  Lock,
  LogOut,
  Moon,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { AppShell, SectionHeader } from "@/components/app-shell";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — VetCare" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, toggle } = useTheme();
  const [push, setPush] = useState(true);
  const [emails, setEmails] = useState(false);

  return (
    <AppShell>
      <SectionHeader title="Settings" subtitle="Preferences and account" />

      <Section title="Account">
        <Row icon={UserRound} title="Profile" desc="Name, email, photo" to="/profile" />
        <Row icon={Lock} title="Password & security" desc="Update credentials" />
        <Row icon={CreditCard} title="Payment methods" desc="Cards & invoices" />
      </Section>

      <Section title="Preferences">
        <Toggle
          icon={Moon}
          title="Dark mode"
          desc="Lower the lights"
          checked={theme === "dark"}
          onChange={toggle}
        />
        <Toggle
          icon={Bell}
          title="Push notifications"
          desc="Reminders and updates"
          checked={push}
          onChange={() => setPush((v) => !v)}
        />
        <Toggle
          icon={Bell}
          title="Email summaries"
          desc="Weekly digest"
          checked={emails}
          onChange={() => setEmails((v) => !v)}
        />
        <Row icon={Globe} title="Language" desc="English (US)" />
      </Section>

      <Section title="Support">
        <Row icon={HelpCircle} title="Help center" desc="FAQs & guides" />
        <Row icon={ShieldCheck} title="Privacy & terms" desc="How we handle data" />
      </Section>

      <Section title="Danger zone">
        <Row icon={Trash2} title="Delete account" desc="Permanent and irreversible" danger />
        <Link
          to="/auth"
          className="glass rounded-2xl p-4 flex items-center gap-3 text-destructive"
        >
          <div className="size-10 rounded-xl bg-destructive/10 grid place-items-center">
            <LogOut className="size-4" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">Sign out</div>
            <div className="text-xs text-muted-foreground">End your session on this device</div>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      </Section>

      <p className="text-center text-xs text-muted-foreground mt-8">VetCare v1.0.0</p>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="px-1 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
        {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  title,
  desc,
  to,
  danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  to?: string;
  danger?: boolean;
}) {
  const inner = (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={`glass rounded-2xl p-4 flex items-center gap-3 ${
        danger ? "text-destructive" : ""
      }`}
    >
      <div
        className={`size-10 rounded-xl grid place-items-center ${
          danger ? "bg-destructive/10" : "bg-secondary"
        }`}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ChevronRight className="size-4 text-muted-foreground" />
    </motion.div>
  );
  return to ? <Link to={to}>{inner}</Link> : <button className="w-full text-left">{inner}</button>;
}

function Toggle({
  icon: Icon,
  title,
  desc,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className="size-10 rounded-xl bg-secondary grid place-items-center">
        <Icon className="size-4" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full relative transition ${
          checked ? "bg-primary" : "bg-secondary"
        }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-0.5 size-5 rounded-full bg-card shadow"
        />
      </button>
    </div>
  );
}
