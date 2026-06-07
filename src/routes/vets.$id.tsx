import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Calendar, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { vets } from "@/lib/mock-data";

export const Route = createFileRoute("/vets/$id")({
  head: () => ({ meta: [{ title: "Vet details — VetCare" }] }),
  component: VetDetail,
});

function VetDetail() {
  const { id } = Route.useParams();
  const vet = vets.find((v) => v.id === id);
  if (!vet) throw notFound();

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-4">
        <Link to="/vets" className="size-10 grid place-items-center rounded-xl glass">
          <ArrowLeft className="size-4" />
        </Link>
        <div className="flex gap-2">
          <button className="size-10 grid place-items-center rounded-xl glass"><Phone className="size-4" /></button>
          <button className="size-10 grid place-items-center rounded-xl glass"><MessageCircle className="size-4" /></button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-6"
      >
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <img src={vet.image} alt={vet.name} className="size-28 rounded-3xl object-cover" />
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold">{vet.name}</h1>
            <p className="text-sm text-muted-foreground">{vet.specialty}</p>
            <div className="flex items-center gap-3 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-warning text-warning" />
                <span className="font-semibold">{vet.rating}</span>
                <span className="text-muted-foreground">({vet.reviews})</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="size-3" /> {vet.distance}
              </span>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {vet.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <Stat icon={Award} label="Experience" value={`${vet.experience} yrs`} />
          <Stat icon={Star} label="Rating" value={`${vet.rating}/5`} />
          <Stat icon={Calendar} label="Fee" value={`$${vet.price}`} />
        </div>
      </motion.div>

      <section className="mt-6">
        <h2 className="font-display font-bold text-lg mb-2">About</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{vet.about}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-display font-bold text-lg mb-2">Clinic</h2>
        <div className="glass rounded-2xl p-4">
          <div className="font-medium">{vet.clinic}</div>
          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <MapPin className="size-3" /> {vet.address}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display font-bold text-lg mb-2">Available today</h2>
        <div className="flex gap-2 flex-wrap">
          {vet.available.map((slot) => (
            <span key={slot} className="px-3 py-1.5 rounded-xl glass text-sm font-medium">{slot}</span>
          ))}
        </div>
      </section>

      <div className="sticky bottom-24 lg:bottom-6 mt-8">
        <Link
          to="/book/$id"
          params={{ id: vet.id }}
          className="block w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground font-semibold grid place-items-center shadow-lg shadow-primary/30"
        >
          Book appointment — ${vet.price}
        </Link>
      </div>
    </AppShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-3 text-center">
      <Icon className="size-4 mx-auto text-primary" />
      <div className="font-bold mt-1 text-sm">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
