import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CalendarHeart, ChevronRight, PawPrint, Stethoscope, Syringe } from "lucide-react";
import { AppShell, SearchBar } from "@/components/app-shell";
import { VetCard } from "@/components/vet-card";
import { bookings, pets, vets } from "@/lib/mock-data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [{ title: "Home — VetCare" }, { name: "description", content: "Your pet care dashboard." }],
  }),
  component: Home,
});

const categories = [
  { label: "General", icon: Stethoscope, color: "sky" },
  { label: "Vaccines", icon: Syringe, color: "mint" },
  { label: "Dental", icon: PawPrint, color: "lavender" },
  { label: "Emergency", icon: CalendarHeart, color: "sky" },
];

function Home() {
  const upcoming = bookings.find((b) => b.status === "upcoming");
  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Hello, Alex 👋</p>
            <h1 className="font-display text-2xl lg:text-3xl font-bold mt-1">How are your pets today?</h1>
          </div>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
            alt="Avatar"
            className="size-12 rounded-2xl object-cover ring-2 ring-card"
          />
        </div>
      </motion.div>

      <div className="mt-5">
        <SearchBar placeholder="Search vets, clinics, services…" />
      </div>

      {/* Hero promo */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-5 relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-br from-primary via-[oklch(0.65_0.16_260)] to-[oklch(0.7_0.14_295)] text-primary-foreground"
      >
        <div className="absolute -right-10 -bottom-10 size-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative max-w-xs">
          <span className="text-[11px] px-2 py-1 rounded-full bg-white/20 font-medium">Limited time</span>
          <h2 className="font-display text-2xl font-bold mt-3 leading-tight">
            Free first wellness check for new pets
          </h2>
          <Link
            to="/vets"
            className="mt-4 inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-white text-primary font-semibold text-sm"
          >
            Book now <ArrowRight className="size-4" />
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80"
          alt=""
          className="absolute right-4 top-4 size-28 lg:size-40 rounded-2xl object-cover opacity-90 hidden sm:block"
        />
      </motion.div>

      {/* Categories */}
      <section className="mt-7">
        <div className="grid grid-cols-4 gap-3">
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className="glass rounded-2xl p-3 flex flex-col items-center gap-2 hover:-translate-y-0.5 transition"
            >
              <div
                className="size-10 rounded-xl grid place-items-center"
                style={{ background: `var(--${c.color})`, color: `var(--${c.color}-foreground)` }}
              >
                <c.icon className="size-5" />
              </div>
              <span className="text-[11px] font-medium">{c.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Upcoming appointment */}
      {upcoming && (
        <section className="mt-7">
          <SectionTitle title="Upcoming appointment" to="/bookings" />
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-5 flex items-center gap-4"
          >
            <div className="size-14 rounded-2xl bg-mint text-mint-foreground grid place-items-center">
              <CalendarHeart className="size-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{upcoming.specialty}</div>
              <div className="text-xs text-muted-foreground">
                {upcoming.vetName} • {upcoming.petName}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-sky text-sky-foreground font-medium">{upcoming.date}</span>
                <span className="px-2 py-0.5 rounded-md bg-secondary font-medium">{upcoming.time}</span>
              </div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </motion.div>
        </section>
      )}

      {/* My pets */}
      <section className="mt-7">
        <SectionTitle title="My pets" to="/pets" />
        <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2 snap-x">
          {pets.map((p) => (
            <Link
              key={p.id}
              to="/pets"
              className="snap-start shrink-0 w-44 glass rounded-3xl p-4 hover:-translate-y-0.5 transition"
            >
              <div
                className="size-20 rounded-2xl mb-3 overflow-hidden"
                style={{ background: `var(--${p.color})` }}
              >
                <img src={p.image} alt={p.name} className="size-full object-cover" />
              </div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.breed}</div>
              <div className="mt-2 flex gap-2 text-[10px]">
                <span className="px-1.5 py-0.5 rounded-md bg-secondary">{p.age}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-secondary">{p.weight}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top vets */}
      <section className="mt-7">
        <SectionTitle title="Top rated nearby" to="/vets" />
        <div className="grid gap-3 lg:grid-cols-2">
          {vets.slice(0, 4).map((v, i) => (
            <VetCard key={v.id} vet={v} index={i} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function SectionTitle({ title, to }: { title: string; to: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-display font-bold text-lg">{title}</h2>
      <Link to={to} className="text-xs font-medium text-primary inline-flex items-center gap-1">
        See all <ChevronRight className="size-3" />
      </Link>
    </div>
  );
}
