import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CalendarHeart,
  CalendarPlus,
  ChevronRight,
  Clock,
  Dna,
  Heart,
  MapPin,
  PawPrint,
  Phone,
  Pill,
  Stethoscope,
  Syringe,
  Utensils,
} from "lucide-react";
import { AppShell, SearchBar } from "@/components/app-shell";
import { VetCard } from "@/components/vet-card";
import { bookings, currentUser, dashboardStats, pets } from "@/lib/mock-data";
import { vets } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [{ title: "Home — VetCare" }, { name: "description", content: "Your pet care dashboard." }],
  }),
  component: Home,
});

const categories = [
  { label: "General", icon: Stethoscope, colorVar: "--sky", fgVar: "--sky-foreground" },
  { label: "Vaccines", icon: Syringe, colorVar: "--mint", fgVar: "--mint-foreground" },
  { label: "Dental", icon: PawPrint, colorVar: "--lavender", fgVar: "--lavender-foreground" },
  { label: "Emergency", icon: AlertCircle, colorVar: "--destructive", fgVar: "--destructive-foreground" },
  { label: "Nutrition", icon: Utensils, colorVar: "--warning", fgVar: "--warning-foreground" },
];

const quickActions = [
  { label: "Book", icon: CalendarPlus, color: "primary" },
  { label: "Records", icon: BookOpen, color: "mint" },
  { label: "Remind", icon: Clock, color: "lavender" },
  { label: "Emergency", icon: Phone, color: "destructive" },
];

function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function healthScoreColor(score: number) {
  if (score >= 90) return "var(--success)";
  if (score >= 70) return "var(--warning)";
  return "var(--destructive)";
}

function Home() {
  const upcoming = bookings.find((b) => b.status === "upcoming");
  const upcomingPet = pets.find((p) => p.name === upcoming?.petName);

  // Days until next appointment
  const daysUntil = upcoming ? 2 : null; // mock

  return (
    <AppShell>
      {/* ── Greeting ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success pulse-dot inline-block" />
              {getTimeGreeting()}
            </p>
            <h1 className="font-display text-2xl lg:text-3xl font-bold mt-0.5 truncate">
              {currentUser.firstName} 👋
            </h1>
            {upcomingPet && (
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-warning font-semibold">⚡ </span>
                {upcomingPet.name}'s vaccine due{" "}
                <span className="font-semibold text-foreground">{upcomingPet.nextVaccine}</span>
              </p>
            )}
          </div>
          <Link to="/profile" className="shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="size-14 rounded-2xl object-cover ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-200 shadow-md"
            />
          </Link>
        </div>
      </motion.div>

      {/* ── Search ──────────────────────────────────── */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06, duration: 0.3 }}
      >
        <SearchBar placeholder="Search vets, clinics, services…" />
      </motion.div>

      {/* ── Stats Row ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mt-4 flex gap-3 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide"
      >
        {[
          {
            icon: PawPrint,
            label: "Pets",
            value: dashboardStats.totalPets,
            color: "sky",
            to: "/pets",
          },
          {
            icon: CalendarHeart,
            label: "Upcoming",
            value: dashboardStats.upcomingBookings,
            color: "lavender",
            to: "/bookings",
          },
          {
            icon: Pill,
            label: "Active Meds",
            value: dashboardStats.activePrescriptions,
            color: "mint",
            to: "/pets",
          },
          {
            icon: Heart,
            label: "Avg Health",
            value: `${Math.round(pets.reduce((s, p) => s + p.healthScore, 0) / pets.length)}%`,
            color: "success",
            to: "/pets",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 + i * 0.05 }}
          >
            <Link to={stat.to} className="stat-card block">
              <div
                className="size-8 rounded-xl grid place-items-center mb-1"
                style={{
                  background: `var(--${stat.color})`,
                  color: `var(--${stat.color}-foreground)`,
                }}
              >
                <stat.icon className="size-4" />
              </div>
              <div className="text-xl font-display font-bold leading-none mt-1">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 whitespace-nowrap">{stat.label}</div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Hero Promo ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.35 }}
        className="mt-5 relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-br from-primary via-[oklch(0.65_0.16_260)] to-[oklch(0.7_0.14_295)] text-primary-foreground"
      >
        {/* Decorative blobs */}
        <div className="absolute -right-12 -bottom-12 size-64 rounded-full bg-white/8 blur-3xl pointer-events-none" />
        <div className="absolute right-20 top-4 size-24 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer-bg rounded-3xl pointer-events-none" />

        <div className="relative max-w-xs">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/20 font-semibold tracking-wide backdrop-blur-sm">
            ✦ Limited time
          </span>
          <h2 className="font-display text-2xl font-bold mt-3 leading-tight">
            Free first wellness check for new pets
          </h2>
          <p className="text-sm text-white/70 mt-1">No commitment. Book in under 60 seconds.</p>
          <Link
            to="/vets"
            className="mt-4 inline-flex items-center gap-2 px-5 h-10 rounded-xl bg-white text-primary font-semibold text-sm shadow-lg hover:bg-white/90 transition"
          >
            Book now <ArrowRight className="size-4" />
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80"
          alt="Happy dog"
          className="absolute right-4 top-1/2 -translate-y-1/2 size-32 lg:size-44 rounded-2xl object-cover opacity-90 hidden sm:block shadow-2xl ring-2 ring-white/20"
        />
      </motion.div>

      {/* ── Categories ──────────────────────────────── */}
      <section className="mt-7">
        <SectionTitle title="Services" />
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="glass rounded-2xl p-2.5 sm:p-3 flex flex-col items-center gap-1.5 sm:gap-2 card-hover focus-ring"
            >
              <div
                className="size-9 sm:size-10 rounded-xl grid place-items-center"
                style={{ background: `var(${c.colorVar})`, color: `var(${c.fgVar})` }}
              >
                <c.icon className="size-4 sm:size-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold leading-tight text-center">{c.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Upcoming Appointment ─────────────────────── */}
      {upcoming && (
        <section className="mt-7">
          <SectionTitle title="Upcoming appointment" to="/bookings" />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-5 card-hover border border-primary/10"
          >
            <div className="flex items-center gap-4">
              {/* Vet avatar */}
              <div className="relative shrink-0">
                <img
                  src={upcoming.vetImage}
                  alt={upcoming.vetName}
                  className="size-16 rounded-2xl object-cover ring-2 ring-card shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-success border-2 border-card grid place-items-center shadow-sm">
                  <span className="text-[9px] font-bold text-success-foreground">✓</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-display font-bold truncate">{upcoming.specialty}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {upcoming.vetName} · for {upcoming.petName}
                </div>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky text-sky-foreground text-xs font-semibold">
                    <CalendarHeart className="size-3" /> {upcoming.date}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-xs font-medium">
                    <Clock className="size-3" /> {upcoming.time}
                  </span>
                  {daysUntil !== null && (
                    <span className="text-[11px] text-warning font-semibold">in {daysUntil} days</span>
                  )}
                </div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground shrink-0" />
            </div>

            {/* Action buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="h-9 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-secondary/80 transition">
                <MapPin className="size-3.5" /> Get directions
              </button>
              <Link
                to="/bookings"
                className="h-9 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 transition"
              >
                <CalendarHeart className="size-3.5" /> View details
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* ── My Pets ──────────────────────────────────── */}
      <section className="mt-7">
        <SectionTitle title="My pets" to="/pets" />
        <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2 snap-x scrollbar-hide">
          {pets.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.05 }}
            >
              <Link
                to="/pets"
                className="snap-start shrink-0 w-44 glass rounded-3xl overflow-hidden block card-hover"
              >
                {/* Pet image banner */}
                <div
                  className="h-24 relative"
                  style={{ background: `linear-gradient(135deg, var(--${p.color}), color-mix(in oklab, var(--${p.color}) 70%, white))` }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute -bottom-5 left-4 size-16 rounded-2xl object-cover ring-3 ring-card shadow-md"
                  />
                  {/* Health score badge */}
                  <div
                    className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                    style={{ background: healthScoreColor(p.healthScore) }}
                  >
                    {p.healthScore}%
                  </div>
                </div>
                <div className="p-3 pt-7">
                  <div className="font-display font-bold text-sm">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.breed}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground/80 flex items-center gap-1">
                    <Syringe className="size-2.5" />
                    <span>Vaccine: {p.nextVaccine}</span>
                  </div>
                  <div className="mt-2 flex gap-1.5 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded-md bg-secondary font-medium">{p.age}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-secondary font-medium">{p.weight}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Add pet card */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 + pets.length * 0.05 }}
          >
            <Link
              to="/pets"
              className="snap-start shrink-0 w-44 glass rounded-3xl h-[168px] flex flex-col items-center justify-center gap-2 card-hover border-dashed"
            >
              <div className="size-10 rounded-2xl bg-secondary grid place-items-center">
                <Dna className="size-5 text-muted-foreground" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">Add a pet</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Top Rated Vets ───────────────────────────── */}
      <section className="mt-7">
        <SectionTitle title="Top rated nearby" to="/vets" />
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="hidden lg:grid gap-3 lg:grid-cols-2">
          {vets.slice(0, 4).map((v, i) => (
            <VetCard key={v.id} vet={v} index={i} />
          ))}
        </div>
        <div className="lg:hidden flex gap-3 overflow-x-auto -mx-4 px-4 pb-2 snap-x scrollbar-hide">
          {vets.slice(0, 4).map((v, i) => (
            <div key={v.id} className="snap-start shrink-0 w-[280px]">
              <VetCard vet={v} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick Actions ────────────────────────────── */}
      <section className="mt-7 mb-2">
        <SectionTitle title="Quick actions" />
        <div className="flex gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="quick-action"
              aria-label={action.label}
            >
              <div
                className={cn(
                  "size-11 rounded-2xl grid place-items-center shadow-sm",
                  action.color === "primary" && "bg-primary text-primary-foreground shadow-primary/30",
                  action.color === "mint" && "bg-mint text-mint-foreground",
                  action.color === "lavender" && "bg-lavender text-lavender-foreground",
                  action.color === "destructive" && "bg-destructive text-destructive-foreground",
                )}
                style={
                  action.color === "primary"
                    ? { boxShadow: "0 4px 12px oklch(0.62 0.16 245 / 35%)" }
                    : {}
                }
              >
                <action.icon className="size-5" />
              </div>
              <span className="text-[11px] font-semibold text-center leading-tight">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function SectionTitle({ title, to }: { title: string; to?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-display font-bold text-lg">{title}</h2>
      {to && (
        <Link to={to} className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:gap-1.5 transition-all">
          See all <ChevronRight className="size-3" />
        </Link>
      )}
    </div>
  );
}
