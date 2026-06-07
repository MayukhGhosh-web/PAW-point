import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AppShell, SearchBar, SectionHeader } from "@/components/app-shell";
import { VetCard } from "@/components/vet-card";
import { vets } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vets/")({
  head: () => ({ meta: [{ title: "Find a vet — VetCare" }] }),
  component: Vets,
});

const filters = ["All", "Surgery", "Dermatology", "Dental", "Exotic"];

function Vets() {
  const [active, setActive] = useState("All");
  const list = active === "All" ? vets : vets.filter((v) => v.tags.includes(active));
  return (
    <AppShell>
      <SectionHeader title="Nearby vets" subtitle="Verified professionals within 5 km" />
      <SearchBar placeholder="Search by name or clinic" />

      <div className="mt-4 flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "px-4 h-9 rounded-full text-sm font-medium whitespace-nowrap transition relative",
              active === f ? "text-primary-foreground" : "text-muted-foreground glass",
            )}
          >
            {active === f && (
              <motion.span
                layoutId="vet-filter"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {list.map((v, i) => (
          <VetCard key={v.id} vet={v} index={i} />
        ))}
      </div>
    </AppShell>
  );
}
