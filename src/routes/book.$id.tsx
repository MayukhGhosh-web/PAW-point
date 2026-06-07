import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { addDays, format } from "date-fns";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { pets, vets } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book/$id")({
  head: () => ({ meta: [{ title: "Book appointment — VetCare" }] }),
  component: Booking,
});

function Booking() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const vet = vets.find((v) => v.id === id);
  if (!vet) throw notFound();

  const today = new Date();
  const days = Array.from({ length: 10 }, (_, i) => addDays(today, i));
  const reasons = ["Checkup", "Vaccination", "Dental", "Skin issue", "Follow-up"];

  const [day, setDay] = useState(days[1]);
  const [slot, setSlot] = useState(vet.available[1]);
  const [pet, setPet] = useState(pets[0].id);
  const [reason, setReason] = useState(reasons[0]);

  return (
    <AppShell>
      <div className="flex items-center gap-3 mb-5">
        <Link to="/vets/$id" params={{ id: vet.id }} className="size-10 grid place-items-center rounded-xl glass">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="font-display text-xl font-bold">Book appointment</h1>
      </div>

      <div className="glass rounded-3xl p-4 flex gap-3 items-center">
        <img src={vet.image} alt="" className="size-14 rounded-2xl object-cover" />
        <div>
          <div className="font-semibold">{vet.name}</div>
          <div className="text-xs text-muted-foreground">{vet.specialty}</div>
        </div>
      </div>

      <Section title="Choose pet">
        <div className="grid grid-cols-3 gap-3">
          {pets.map((p) => (
            <button
              key={p.id}
              onClick={() => setPet(p.id)}
              className={cn(
                "rounded-2xl p-3 text-left transition",
                pet === p.id ? "bg-primary text-primary-foreground" : "glass",
              )}
            >
              <img src={p.image} alt="" className="size-10 rounded-xl object-cover mb-2" />
              <div className="text-sm font-semibold">{p.name}</div>
              <div className={cn("text-[10px]", pet === p.id ? "text-primary-foreground/80" : "text-muted-foreground")}>
                {p.species}
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Select date">
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
          {days.map((d) => {
            const sel = d.toDateString() === day.toDateString();
            return (
              <button
                key={d.toISOString()}
                onClick={() => setDay(d)}
                className={cn(
                  "shrink-0 w-16 py-3 rounded-2xl text-center transition",
                  sel ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "glass",
                )}
              >
                <div className="text-[10px] uppercase tracking-wide opacity-70">{format(d, "EEE")}</div>
                <div className="font-display font-bold text-lg">{format(d, "d")}</div>
                <div className="text-[10px] opacity-70">{format(d, "MMM")}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Available slots">
        <div className="grid grid-cols-4 gap-2">
          {vet.available.map((t) => (
            <button
              key={t}
              onClick={() => setSlot(t)}
              className={cn(
                "h-11 rounded-xl text-sm font-medium transition",
                slot === t ? "bg-primary text-primary-foreground" : "glass",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Reason for visit">
        <div className="flex flex-wrap gap-2">
          {reasons.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={cn(
                "px-3 h-9 rounded-full text-sm font-medium transition",
                reason === r ? "bg-primary text-primary-foreground" : "glass",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </Section>

      <motion.div layout className="glass-strong rounded-3xl p-5 mt-6">
        <div className="flex justify-between text-sm"><span className="text-muted-foreground">Consultation</span><span>${vet.price}</span></div>
        <div className="flex justify-between text-sm mt-1"><span className="text-muted-foreground">Booking fee</span><span>$2</span></div>
        <div className="h-px bg-border my-3" />
        <div className="flex justify-between font-bold"><span>Total</span><span>${vet.price + 2}</span></div>
      </motion.div>

      <button
        onClick={() => {
          toast.success("Appointment confirmed!", { description: `${format(day, "PPP")} at ${slot}` });
          navigate({ to: "/bookings" });
        }}
        className="mt-6 w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
      >
        <Check className="size-5" /> Confirm booking
      </button>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="font-display font-bold text-base mb-3">{title}</h2>
      {children}
    </section>
  );
}
