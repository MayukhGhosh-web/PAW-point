import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import type { Vet } from "@/lib/mock-data";

export function VetCard({ vet, index = 0 }: { vet: Vet; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to="/vets/$id"
        params={{ id: vet.id }}
        className="glass rounded-3xl p-4 flex gap-4 group hover:-translate-y-0.5 transition block"
      >
        <div className="relative shrink-0">
          <img
            src={vet.image}
            alt={vet.name}
            className="size-20 rounded-2xl object-cover"
          />
          <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-success border-2 border-card grid place-items-center">
            <span className="text-[10px] font-bold text-success-foreground">✓</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold truncate">{vet.name}</h3>
              <p className="text-xs text-muted-foreground">{vet.specialty}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium shrink-0">
              <Star className="size-3 fill-warning text-warning" />
              {vet.rating}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" /> {vet.distance}
            </span>
            <span>•</span>
            <span>{vet.experience} yrs exp</span>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1.5">
              {vet.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="text-sm font-bold">
              ${vet.price}
              <span className="text-xs text-muted-foreground font-normal">/visit</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
