import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, HelpCircle, LogOut, MapPin, PawPrint, Settings, Shield } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useTheme } from "@/components/theme-provider";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — VetCare" }] }),
  component: Profile,
});

function Profile() {
  const { theme, toggle } = useTheme();
  const rows = [
    { icon: PawPrint, label: "Pet profiles", to: "/pets" },
    { icon: CreditCard, label: "Payment methods" },
    { icon: MapPin, label: "Saved addresses" },
    { icon: Shield, label: "Privacy & security" },
    { icon: Settings, label: "App preferences" },
    { icon: HelpCircle, label: "Help & support" },
  ];

  return (
    <AppShell>
      <div className="glass-strong rounded-3xl p-6 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 -top-10 h-32 bg-gradient-to-b from-primary/30 to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&q=80"
          alt=""
          className="size-24 rounded-3xl object-cover mx-auto ring-4 ring-card relative"
        />
        <h1 className="font-display text-xl font-bold mt-3">Alex Morgan</h1>
        <p className="text-sm text-muted-foreground">alex@example.com</p>
        <div className="grid grid-cols-3 gap-3 mt-5">
          <Stat label="Pets" value="3" />
          <Stat label="Visits" value="14" />
          <Stat label="Saved" value="$220" />
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl divide-y divide-border overflow-hidden">
        {rows.map((r) => (
          <button key={r.label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/60 text-left">
            <div className="size-9 rounded-xl bg-secondary grid place-items-center">
              <r.icon className="size-4" />
            </div>
            <span className="text-sm font-medium flex-1">{r.label}</span>
            <span className="text-muted-foreground">›</span>
          </button>
        ))}

        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="size-9 rounded-xl bg-secondary grid place-items-center">
            <Settings className="size-4" />
          </div>
          <span className="text-sm font-medium flex-1">Dark mode</span>
          <button
            onClick={toggle}
            className={`relative w-11 h-6 rounded-full transition ${theme === "dark" ? "bg-primary" : "bg-secondary"}`}
          >
            <span
              className={`absolute top-0.5 size-5 bg-card rounded-full shadow transition ${
                theme === "dark" ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <Link
        to="/auth"
        className="mt-4 w-full h-12 rounded-2xl bg-destructive/10 text-destructive font-medium grid place-items-center"
      >
        <span className="inline-flex items-center gap-2"><LogOut className="size-4" /> Sign out</span>
      </Link>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card/60 p-3">
      <div className="font-display font-bold text-lg">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
