import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { addDays, format } from "date-fns";
import { ArrowLeft, Check, AlertCircle, X, Stethoscope, Calendar, Clock, FileText } from "lucide-react";
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
  const [pet, setPet] = useState("");
  const [reason, setReason] = useState(reasons[0]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!pet) newErrors.pet = "Please select a pet";
    if (!slot) newErrors.slot = "Please select a time slot";
    if (!day) newErrors.day = "Please select a date";
    if (!reason) newErrors.reason = "Please select a reason for visit";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleFinalSubmit = () => {
    const selectedPet = pets.find((p) => p.id === pet);
    toast.success("Appointment confirmed!", {
      description: `${selectedPet?.name}'s appointment with ${vet.name} on ${format(day, "PPP")} at ${slot}`,
    });
    navigate({ to: "/bookings" });
  };

  return (
    <AppShell>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/vets/$id" params={{ id: vet.id }} className="size-10 grid place-items-center rounded-xl glass hover:bg-secondary/60 transition">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="font-display text-2xl font-bold">Book appointment</h1>
      </div>

      <motion.div layout className="glass rounded-3xl p-5 flex gap-4 items-center mb-6">
        <img src={vet.image} alt={vet.name} className="size-16 rounded-2xl object-cover" />
        <div>
          <div className="font-semibold text-foreground">{vet.name}</div>
          <div className="text-sm text-muted-foreground">{vet.specialty}</div>
          <div className="text-xs text-muted-foreground/70 mt-1">{vet.clinic}</div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showConfirmation ? (
          <ConfirmationModal
            vet={vet}
            pet={pets.find((p) => p.id === pet)!}
            day={day}
            slot={slot}
            reason={reason}
            price={vet.price}
            onConfirm={handleFinalSubmit}
            onEdit={() => setShowConfirmation(false)}
          />
        ) : (
          <motion.div layout>
            <Section title="Choose pet" error={errors.pet}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {pets.map((p) => (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setPet(p.id);
                      setErrors({ ...errors, pet: "" });
                    }}
                    className={cn(
                      "rounded-2xl p-3 text-left transition-all duration-200 relative overflow-hidden group",
                      pet === p.id
                        ? "bg-gradient-to-br from-primary to-[oklch(0.72_0.14_265)] text-primary-foreground shadow-lg shadow-primary/30"
                        : "glass hover:bg-secondary/40",
                    )}
                  >
                    {pet === p.id && (
                      <motion.div layoutId="pet-selection" className="absolute top-2 right-2">
                        <div className="size-5 rounded-full bg-primary-foreground flex items-center justify-center">
                          <Check className="size-3 text-primary" />
                        </div>
                      </motion.div>
                    )}
                    <img src={p.image} alt={p.name} className="size-12 rounded-xl object-cover mb-2 group-hover:scale-105 transition" />
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className={cn("text-[10px] mt-1", pet === p.id ? "text-primary-foreground/80" : "text-muted-foreground")}>
                      {p.species}
                    </div>
                  </motion.button>
                ))}
              </div>
            </Section>

            <Section title="Select date" error={errors.day}>
              <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 snap-x">
                {days.map((d) => {
                  const sel = d.toDateString() === day.toDateString();
                  return (
                    <motion.button
                      key={d.toISOString()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setDay(d);
                        setErrors({ ...errors, day: "" });
                      }}
                      className={cn(
                        "shrink-0 w-20 py-3 rounded-2xl text-center transition-all duration-200 snap-center",
                        sel
                          ? "bg-gradient-to-b from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground shadow-lg shadow-primary/30"
                          : "glass hover:bg-secondary/40",
                      )}
                    >
                      <div className="text-[10px] uppercase tracking-wide opacity-70">{format(d, "EEE")}</div>
                      <div className="font-display font-bold text-lg">{format(d, "d")}</div>
                      <div className="text-[10px] opacity-70">{format(d, "MMM")}</div>
                    </motion.button>
                  );
                })}
              </div>
            </Section>

            <Section title="Available time slots" error={errors.slot}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {vet.available.map((t) => (
                  <motion.button
                    key={t}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSlot(t);
                      setErrors({ ...errors, slot: "" });
                    }}
                    className={cn(
                      "h-11 rounded-xl text-sm font-medium transition-all duration-200",
                      slot === t
                        ? "bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)] text-primary-foreground shadow-lg shadow-primary/30"
                        : "glass hover:bg-secondary/40",
                    )}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </Section>

            <Section title="Reason for visit" error={errors.reason}>
              <div className="flex flex-wrap gap-2">
                {reasons.map((r) => (
                  <motion.button
                    key={r}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setReason(r);
                      setErrors({ ...errors, reason: "" });
                    }}
                    className={cn(
                      "px-4 h-10 rounded-full text-sm font-medium transition-all duration-200",
                      reason === r
                        ? "bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)] text-primary-foreground shadow-lg shadow-primary/30"
                        : "glass hover:bg-secondary/40",
                    )}
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </Section>

            <motion.div layout className="glass-strong rounded-3xl p-5 mt-8 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Consultation</span>
                  <span className="font-medium">${vet.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Booking fee</span>
                  <span className="font-medium">$2</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${vet.price + 2}</span>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirm}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)] text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all mb-4"
            >
              <Check className="size-5" /> Review & Confirm
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

function ConfirmationModal({
  vet,
  pet,
  day,
  slot,
  reason,
  price,
  onConfirm,
  onEdit,
}: {
  vet: typeof vets[0];
  pet: typeof pets[0];
  day: Date;
  slot: string;
  reason: string;
  price: number;
  onConfirm: () => void;
  onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="glass-strong rounded-3xl p-6 mb-6 border border-border/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="size-12 rounded-full bg-gradient-to-br from-mint to-mint-foreground flex items-center justify-center">
          <Check className="size-6 text-mint-foreground" />
        </div>
        <div>
          <h2 className="font-display font-bold text-lg">Confirm your appointment</h2>
          <p className="text-xs text-muted-foreground">Review details before booking</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <ConfirmationRow icon={Stethoscope} label="Veterinarian" value={vet.name} />
        <ConfirmationRow icon={Calendar} label="Date" value={format(day, "EEEE, MMMM d, yyyy")} />
        <ConfirmationRow icon={Clock} label="Time" value={slot} />
        <ConfirmationRow icon={FileText} label="Reason" value={reason} />
        <ConfirmationRow
          icon={Stethoscope}
          label="Pet"
          value={`${pet.name} (${pet.species})`}
        />
      </div>

      <div className="bg-secondary/30 rounded-2xl p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Consultation</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground">Booking fee</span>
          <span>$2</span>
        </div>
        <div className="h-px bg-border mb-3" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">${price + 2}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEdit}
          className="h-12 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 transition"
        >
          Edit Details
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConfirm}
          className="h-12 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.72_0.14_265)] text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
        >
          Confirm Booking
        </motion.button>
      </div>
    </motion.div>
  );
}

function ConfirmationRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Check;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="size-8 rounded-lg bg-secondary/50 flex items-center justify-center">
        <Icon className="size-4 text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  error,
}: {
  title: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <motion.section layout className="mt-7 mb-2">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-display font-bold text-base">{title}</h2>
        {error && <AlertCircle className="size-4 text-red-500" />}
      </div>
      {error && <p className="text-xs text-red-500 mb-3 flex items-center gap-1"><AlertCircle className="size-3" /> {error}</p>}
      {children}
    </motion.section>
  );
}
