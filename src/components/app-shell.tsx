import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  CalendarHeart,
  Cog,
  Home,
  LayoutDashboard,
  LogOut,
  Moon,
  PawPrint,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Sun,
  User,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/vets", icon: Stethoscope, label: "Vets" },
  { to: "/pets", icon: PawPrint, label: "Pets" },
  { to: "/bookings", icon: CalendarHeart, label: "Bookings" },
  { to: "/notifications", icon: Bell, label: "Alerts" },
  { to: "/profile", icon: User, label: "Profile" },
];

const adminNav = [
  { to: "/staff", icon: LayoutDashboard, label: "Staff" },
  { to: "/admin", icon: ShieldCheck, label: "Admin" },
  { to: "/verification", icon: ShieldCheck, label: "Verification" },
  { to: "/clinic", icon: Building2, label: "Clinic" },
  { to: "/settings", icon: Cog, label: "Settings" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen w-full">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col p-4 z-40">
        <div className="glass-strong rounded-3xl h-full p-5 flex flex-col">
          <Link to="/home" className="flex items-center gap-2 mb-8">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground shadow-lg shadow-primary/20">
              <PawPrint className="size-5" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">VetCare</div>
              <div className="text-[11px] text-muted-foreground">Pet health, simplified</div>
            </div>
          </Link>

          <nav className="flex flex-col gap-1">
            {nav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)] shadow-lg shadow-primary/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <n.icon className="size-4 relative" />
                  <span className="relative">{n.label}</span>
                </Link>
              );
            })}

            <div className="mt-4 mb-2 px-3 text-[10px] uppercase tracking-wider text-muted-foreground">Workspaces</div>
            {adminNav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  )}
                >
                  <n.icon className="size-4" />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2">
            <button
              onClick={toggle}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <Link
              to="/auth"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
            >
              <LogOut className="size-4" />
              Sign out
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 px-4 pt-4">
        <div className="glass-strong rounded-2xl px-4 py-3 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground">
              <PawPrint className="size-4" />
            </div>
            <span className="font-display font-bold">VetCare</span>
          </Link>
          <div className="flex items-center gap-1">
            <button onClick={toggle} className="size-9 grid place-items-center rounded-xl hover:bg-secondary/60">
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link to="/notifications" className="size-9 grid place-items-center rounded-xl hover:bg-secondary/60 relative">
              <Bell className="size-4" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-destructive" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="lg:pl-64 pb-28 lg:pb-10">
        <div className="px-4 lg:px-10 pt-4 lg:pt-8 max-w-6xl mx-auto">{children}</div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="glass-strong rounded-2xl p-2 flex items-center justify-around">
          {nav.slice(0, 5).map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[52px]",
                  active ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.72_0.14_265)] shadow-lg shadow-primary/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <n.icon className="size-5 relative" />
                <span className="text-[10px] font-medium relative">{n.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-balance">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SearchBar({ placeholder = "Search…" }: { placeholder?: string }) {
  return (
    <div className="glass rounded-2xl flex items-center gap-2 px-4 h-12">
      <Search className="size-4 text-muted-foreground" />
      <input
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
      />
      <button className="size-8 grid place-items-center rounded-lg bg-secondary text-secondary-foreground">
        <Settings className="size-3.5" />
      </button>
    </div>
  );
}
