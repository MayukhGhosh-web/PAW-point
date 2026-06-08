import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "VetCare — Trusted veterinary care for every paw" },
      {
        name: "description",
        content:
          "Book verified veterinarians near you instantly. Manage your pet's health records, get expert care, and build lasting relationships with the best vets in your city.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-2.5 hover:opacity-80 transition">
            <div className="size-10 rounded-lg bg-primary grid place-items-center text-primary-foreground shadow-sm">
              <PawPrint className="size-5" />
            </div>
            <span className="font-display font-bold text-lg">VetCare</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#features" className="hover:text-neutral-900 transition">
              Features
            </a>
            <a href="#how" className="hover:text-neutral-900 transition">
              How it works
            </a>
            <a href="#testimonials" className="hover:text-neutral-900 transition">
              Reviews
            </a>
            <a href="#for-vets" className="hover:text-neutral-900 transition">
              For vets
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="hidden sm:inline-flex h-10 px-4 items-center rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition"
            >
              Sign in
            </Link>
            <Link
              to="/role"
              className="h-10 px-5 inline-flex items-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-md hover:shadow-primary/25 transition"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 pt-16 lg:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 h-8 rounded-full border border-neutral-200 bg-neutral-50 text-xs text-neutral-600 font-medium"
          >
            <CheckCircle2 className="size-3.5 text-primary" />
            Trusted by 00+ pet parents
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="font-display text-5xl lg:text-6xl font-bold tracking-tight mt-6 text-neutral-900 leading-tight"
          >
            Veterinary care designed for
            <br />
            <span className="text-primary">your pet's best life</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-neutral-600 text-lg leading-relaxed max-w-lg"
          >
            Book verified veterinarians instantly, manage health records in one place, and get
            expert care from vets you can trust. Same-day appointments available in your city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/role"
              className="h-12 px-6 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition duration-200"
            >
              Book your vet <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/vets"
              className="h-12 px-6 inline-flex items-center justify-center rounded-lg border border-neutral-200 font-semibold text-neutral-900 hover:bg-neutral-50 transition duration-200"
            >
              Browse vets
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-sm"
          >
            {[
              { v: "0F+", l: "Pet parents" },
              { v: "-5+", l: "Vets verified" },
              { v: "0.48★", l: "Avg rating" },
            ].map((s) => (
              <div key={s.l} className="border border-neutral-200 rounded-lg p-4 text-center">
                <div className="font-display font-bold text-xl text-neutral-900">{s.v}</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80"
              alt="Veterinarian examining a dog with care and expertise"
              className="w-full h-96 object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border border-neutral-200"
          >
            <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center flex-shrink-0">
              <CalendarCheck className="size-5" />
            </div>
            <div>
              <div className="text-xs text-neutral-500">Next appointment</div>
              <div className="text-sm font-semibold text-neutral-900">Lalu • Jun 21, 10:30 AM</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 lg:px-6 py-20 border-t border-neutral-100"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Everything for your pet's health
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            From booking to follow-ups, we've built VetCare to make veterinary care simple and
            stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Stethoscope,
              title: "Verified veterinarians",
              body: "Every vet is license-verified and reviewed by real pet owners. Book with confidence.",
            },
            {
              icon: CalendarCheck,
              title: "Same-day appointments",
              body: "No calls, no waiting lists. Choose your slot and confirm instantly.",
            },
            {
              icon: HeartPulse,
              title: "Complete health records",
              body: "Vaccinations, prescriptions, diagnoses—all in one place. Always accessible.",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition"
            >
              <div className="size-12 rounded-lg bg-primary/10 text-primary grid place-items-center">
                <f.icon className="size-6" />
              </div>
              <h3 className="mt-4 font-display font-bold text-lg text-neutral-900">{f.title}</h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Booking takes three minutes
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            A simple process that feels natural. No complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: "01",
              t: "Add your pet's info",
              b: "Tell us about your dog or cat—breed, age, medical history. It takes 90 seconds.",
            },
            {
              n: "02",
              t: "Find and pick a vet",
              b: "Filter by specialty, location, availability, and ratings. See real reviews from other pet owners.",
            },
            {
              n: "03",
              t: "Book and you're done",
              b: "Choose your appointment time. Get a reminder 24 hours before. That's it.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 text-6xl font-black text-neutral-100">
                {s.n}
              </div>
              <div className="relative border border-neutral-200 rounded-lg p-6">
                <h3 className="font-display font-bold text-lg text-neutral-900">{s.t}</h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{s.b}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials & Trust */}
      <section
        id="testimonials"
        className="max-w-7xl mx-auto px-4 lg:px-6 py-20 border-t border-neutral-100"
      >
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
            Trusted by pet owners across India
          </h2>
          <p className="mt-4 text-neutral-600 text-lg">
            Read what other pet parents think about VetCare
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya Sharma",
              pet: "Max • Golden Retriever",
              review:
                "Finding a good vet for Max was stressful. VetCare changed everything. Dr. Mehta was perfect, and booking was instant.",
              rating: 5,
              city: "Mumbai",
            },
            {
              name: "Rahul Gupta",
              pet: "Milo • Pug",
              review:
                "I love having all Milo's records in one place. The app is beautiful and easy to use. Highly recommend!",
              rating: 5,
              city: "Bangalore",
            },
            {
              name: "Divya Nair",
              pet: "Bella • Labrador",
              review:
                "Same-day appointments were a lifesaver when Bella got sick. Professional vets, transparent pricing, zero hassle.",
              rating: 5,
              city: "Delhi",
            },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-neutral-200 rounded-lg p-6 hover:shadow-md transition"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-neutral-700 leading-relaxed">{t.review}</p>
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="font-semibold text-neutral-900">{t.name}</div>
                <div className="text-sm text-neutral-600">{t.pet}</div>
                <div className="text-xs text-neutral-500 mt-1">{t.city}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 border border-neutral-200 rounded-lg p-8 bg-neutral-50"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Active users", value: "00+" },
              { icon: Stethoscope, label: "Verified vets", value: "0+" },
              { icon: CheckCircle2, label: "Appointments booked", value: "00+" },
              { icon: Star, label: "Average rating", value: "0.48★" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="size-8 text-primary mx-auto mb-3" />
                <div className="font-display font-bold text-2xl text-neutral-900">{stat.value}</div>
                <div className="text-sm text-neutral-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* For vets CTA */}
      <section
        id="for-vets"
        className="max-w-7xl mx-auto px-4 lg:px-6 py-20 border-t border-neutral-100"
      >
        <div className="bg-neutral-900 rounded-2xl p-8 lg:p-12 grid lg:grid-cols-[1fr_auto] items-center gap-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-xs px-3 h-8 rounded-full border border-white/20 bg-white/5 mb-4">
              <ShieldCheck className="size-3.5" /> For veterinarians
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
              Grow your practice with verified visibility
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed max-w-lg">
              Get listed, manage appointments, and build your reputation. Verification is fast and
              free. Let VetCare help you reach more pet owners.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Link
              to="/role"
              className="h-12 px-6 inline-flex items-center gap-2 rounded-lg bg-white text-neutral-900 font-semibold hover:shadow-lg transition"
            >
              Join as a vet <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 lg:px-6 py-12 border-t border-neutral-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <PawPrint className="size-4" /> © 2026 VetCare. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-neutral-600">
            <a href="#" className="hover:text-neutral-900 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-900 transition">
              Terms
            </a>
            <a href="#" className="hover:text-neutral-900 transition">
              Contact
            </a>
            <a href="#" className="hover:text-neutral-900 transition">
              Careers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
