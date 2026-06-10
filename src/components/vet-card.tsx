import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, MapPin, Star } from "lucide-react";
import type { Vet } from "@/lib/mock-data";

export function VetCard({ vet, index = 0 }: { vet: Vet; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="h-full"
    >
      <Link
        to="/vets/$id"
        params={{ id: vet.id }}
        className="glass rounded-3xl p-4 flex gap-4 card-hover block h-full"
      >
        {/* Vet photo */}
        <div className="relative shrink-0">
          <img
            src={vet.image}
            alt={vet.name}
            className="size-20 rounded-2xl object-cover"
          />
          {/* Verified badge */}
          <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-success border-2 border-card grid place-items-center shadow-sm">
            <span className="text-[10px] font-bold text-success-foreground">✓</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name + rating row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-bold truncate">{vet.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{vet.specialty}</p>
              <p className="text-[11px] text-muted-foreground/80 truncate">{vet.clinic}</p>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-0.5">
              <div className="flex items-center gap-1 text-xs font-bold">
                <Star className="size-3 fill-warning text-warning" />
                {vet.rating}
              </div>
              <div className="text-[10px] text-muted-foreground whitespace-nowrap">
                {vet.reviews} reviews
              </div>
            </div>
          </div>

          {/* Distance + experience */}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" /> {vet.distance}
            </span>
            <span>•</span>
            <span>{vet.experience} yrs exp</span>
          </div>

          {/* Tags + price row */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1.5 flex-wrap">
              {vet.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
              {vet.availableToday && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-success text-success-foreground flex items-center gap-1">
                  <Clock className="size-2.5" /> Today
                </span>
              )}
            </div>
            <div className="text-sm font-bold shrink-0">
              ${vet.price}
              <span className="text-xs text-muted-foreground font-normal">/visit</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
