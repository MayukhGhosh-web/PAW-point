import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "VetCare — Trusted vets, booked in seconds" },
      {
        name: "description",
        content:
          "Discover verified veterinarians near you and book offline clinic appointments for every pet.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 px-4 lg:px-10 pt-4">
        <div className="max-w-6xl mx-auto glass-strong rounded-2xl px-4 lg:px-6 py-3 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground">
              <PawPrint className="size-4" />
            </div>
            <span className="font-display font-bold">VetCare</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#vets" className="hover:text-foreground transition">For vets</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="hidden sm:inline-flex h-9 px-4 items-center rounded-xl text-sm font-medium hover:bg-secondary/60"
            >
              Sign in
            </Link>
            <Link
              to="/role"
              className="h-9 px-4 inline-flex items-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/30"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 lg:px-10 pt-12 lg:pt-24 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 h-8 rounded-full glass text-xs text-muted-foreground"
          >
            <Sparkles className="size-3.5 text-primary" />
            Now in 40+ cities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight mt-5 text-balance"
          >
            The healthcare your pet
            <span className="bg-gradient-to-r from-primary to-[var(--lavender-foreground)] bg-clip-text text-transparent">
              {" "}truly deserves.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-muted-foreground text-lg max-w-lg"
          >
            Discover verified veterinarians, book offline clinic visits, and keep every record
            in one beautiful place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/role"
              className="h-12 px-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground font-semibold shadow-xl shadow-primary/30"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/vets"
              className="h-12 px-6 inline-flex items-center rounded-xl glass font-semibold"
            >
              Browse vets
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { v: "12k+", l: "Pet parents" },
              { v: "850+", l: "Verified vets" },
              { v: "4.9★", l: "Avg rating" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-3 text-center">
                <div className="font-display font-bold text-xl">{s.v}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-[var(--lavender)]/30 to-[var(--mint)]/20 rounded-[3rem] blur-2xl" />
          <div className="relative glass-strong rounded-[2.5rem] p-6 lg:p-8">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80"
              alt="Veterinarian holding a small dog"
              className="rounded-3xl w-full h-72 lg:h-96 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl p-3 flex items-center gap-3 shadow-xl">
              <div className="size-10 rounded-xl bg-[var(--mint)] text-[var(--mint-foreground)] grid place-items-center">
                <CalendarCheck className="size-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Next appointment</div>
                <div className="text-sm font-semibold">Luna • Jun 12, 10:30</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 lg:px-10 py-16">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-center text-balance">
          Everything your pet's care needs
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Stethoscope,
              title: "Verified vets",
              body: "Every veterinarian on VetCare is license-verified and reviewed.",
              color: "sky",
            },
            {
              icon: CalendarCheck,
              title: "Instant booking",
              body: "Pick a slot at a real clinic — no calls, no waiting.",
              color: "mint",
            },
            {
              icon: HeartPulse,
              title: "Health records",
              body: "Vaccinations, prescriptions and history — always with you.",
              color: "lavender",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6"
            >
              <div
                className="size-11 rounded-xl grid place-items-center"
                style={{ background: `var(--${f.color})`, color: `var(--${f.color}-foreground)` }}
              >
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display font-bold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="max-w-6xl mx-auto px-4 lg:px-10 py-16">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-center text-balance">
          Book a vet in three steps
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { n: "01", t: "Add your pet", b: "Create a profile with breed, age & medical history." },
            { n: "02", t: "Pick a vet", b: "Filter by specialty, distance, rating or price." },
            { n: "03", t: "Confirm visit", b: "Choose a clinic time slot and get a reminder." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6"
            >
              <div className="font-display text-4xl font-extrabold bg-gradient-to-br from-primary to-[var(--lavender-foreground)] bg-clip-text text-transparent">
                {s.n}
              </div>
              <h3 className="mt-3 font-display font-bold text-lg">{s.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* For vets CTA */}
      <section id="vets" className="max-w-6xl mx-auto px-4 lg:px-10 py-16">
        <div className="glass-strong rounded-[2rem] p-8 lg:p-12 grid lg:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground glass px-3 h-8 rounded-full">
              <ShieldCheck className="size-3.5 text-primary" /> For veterinarians
            </div>
            <h2 className="mt-4 font-display text-3xl lg:text-4xl font-bold text-balance">
              Grow your practice with verified visibility.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Get listed, manage appointments, and build your reputation. Verification is fast and free.
            </p>
          </div>
          <Link
            to="/role"
            className="h-12 px-6 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30"
          >
            Join as a vet <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 lg:px-10 py-10 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <PawPrint className="size-3.5" /> © 2026 VetCare. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </footer>
    </div>
  );
}
