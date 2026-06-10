import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bell,
  Building2,
  CalendarHeart,
  Cog,
  Command,
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
import { currentUser, notifications } from "@/lib/mock-data";

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

const unreadCount = notifications.filter((n) => n.unread).length;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen w-full">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col p-4 z-40">
        <div className="glass-strong rounded-3xl h-full p-5 flex flex-col">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2.5 mb-8 group">
            <div className="size-10 rounded-2xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-200">
              <PawPrint className="size-5" />
            </div>
            <div>
              <div className="font-display text-lg font-bold leading-none">VetCare</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Pet health, simplified</div>
            </div>
          </Link>

          {/* Primary nav */}
          <nav className="flex flex-col gap-0.5">
            {nav.map((n) => {
              const active = pathname === n.to;
              const isAlerts = n.to === "/notifications";
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    active
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)] shadow-lg shadow-primary/30"
                      transition={{ type: "spring", stiffness: 320, damping: 32 }}
                    />
                  )}
                  <n.icon className="size-4 relative shrink-0" />
                  <span className="relative flex-1">{n.label}</span>
                  {isAlerts && unreadCount > 0 && (
                    <span className={cn(
                      "relative size-5 rounded-full text-[10px] font-bold grid place-items-center",
                      active ? "bg-white/25 text-white" : "bg-destructive text-white"
                    )}>
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Workspace nav */}
            <div className="mt-5 mb-2 px-3">
              <div className="h-px bg-border mb-3" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Workspaces</span>
            </div>
            {adminNav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                  )}
                >
                  <n.icon className="size-4 shrink-0" />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom: user chip + actions */}
          <div className="mt-auto space-y-1 pt-4 border-t border-border">
            {/* User chip */}
            <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/60 transition-all duration-150 group">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="size-8 rounded-xl object-cover ring-2 ring-border group-hover:ring-primary/40 transition-all"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{currentUser.firstName}</div>
                <div className="text-[10px] text-muted-foreground truncate">{currentUser.plan === "premium" ? "✦ Premium" : "Free plan"}</div>
              </div>
            </Link>

            <button
              onClick={toggle}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-150"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <Link
              to="/auth"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/8 transition-all duration-150"
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
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground shadow-md shadow-primary/20">
              <PawPrint className="size-4" />
            </div>
            <span className="font-display font-bold">VetCare</span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              className="size-9 grid place-items-center rounded-xl hover:bg-secondary/60 transition text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link
              to="/notifications"
              className="size-9 grid place-items-center rounded-xl hover:bg-secondary/60 transition relative"
            >
              <Bell className="size-4 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-4 rounded-full bg-destructive text-white text-[9px] font-bold grid place-items-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="ml-1">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="size-8 rounded-xl object-cover ring-2 ring-border"
              />
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
        <div className="glass-strong rounded-2xl p-1.5 flex items-center justify-around shadow-xl">
          {nav.slice(0, 5).map((n) => {
            const active = pathname === n.to;
            const isAlerts = n.to === "/notifications";
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[52px] transition-all duration-150",
                  active ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.72_0.14_265)] shadow-lg shadow-primary/30"
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  />
                )}
                <div className="relative">
                  <n.icon className="size-5 relative" />
                  {isAlerts && unreadCount > 0 && !active && (
                    <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-destructive text-white text-[8px] font-bold grid place-items-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
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
  badge,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: string | number;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-balance">{title}</h1>
          {badge !== undefined && (
            <span className="px-2 py-0.5 rounded-full bg-primary/12 text-primary text-xs font-bold">
              {badge}
            </span>
          )}
        </div>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SearchBar({ placeholder = "Search…" }: { placeholder?: string }) {
  return (
    <div className="glass rounded-2xl flex items-center gap-2 px-4 h-12 focus-within:ring-2 focus-within:ring-primary/30 transition-all duration-200">
      <Search className="size-4 text-muted-foreground shrink-0" />
      <input
        id="main-search"
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground"
      />
      <div className="flex items-center gap-1 shrink-0">
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-secondary text-[10px] text-muted-foreground font-mono select-none">
          <Command className="size-2.5" />K
        </kbd>
        <button
          aria-label="Search filters"
          className="size-8 grid place-items-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
        >
          <Settings className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
