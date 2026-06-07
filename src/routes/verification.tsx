import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, FileText, ShieldCheck, Upload, XCircle } from "lucide-react";
import { AppShell, SectionHeader } from "@/components/app-shell";

export const Route = createFileRoute("/verification")({
  head: () => ({ meta: [{ title: "Verification — VetCare" }] }),
  component: Verification,
});

const docs = [
  { name: "Veterinary certificate", status: "verified", file: "cert-2024.pdf" },
  { name: "Practice license", status: "review", file: "license-AB-9821.pdf" },
  { name: "Government ID", status: "verified", file: "id-front.jpg" },
  { name: "Clinic registration", status: "pending", file: null },
] as const;

const statusMap = {
  verified: { label: "Verified", color: "var(--success)", fg: "var(--success-foreground)", Icon: CheckCircle2 },
  review: { label: "Under review", color: "var(--warning)", fg: "var(--warning-foreground)", Icon: Clock },
  pending: { label: "Pending upload", color: "var(--muted)", fg: "var(--muted-foreground)", Icon: Upload },
  rejected: { label: "Rejected", color: "var(--destructive)", fg: "var(--destructive-foreground)", Icon: XCircle },
} as const;

function Verification() {
  const progress = 65;
  return (
    <AppShell>
      <SectionHeader
        title="Vet verification"
        subtitle="Complete verification to start accepting appointments"
      />

      <div className="glass-strong rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground">
            <ShieldCheck className="size-6" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="font-display font-bold text-lg">Under review</div>
          </div>
          <div className="text-sm font-semibold">{progress}%</div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-[oklch(0.7_0.14_265)]"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          We typically review documents within 24 hours. You'll receive a notification when complete.
        </p>
      </div>

      <h2 className="font-display font-bold text-lg mt-8 mb-3">Required documents</h2>
      <div className="space-y-3">
        {docs.map((d, i) => {
          const s = statusMap[d.status];
          return (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="size-10 rounded-xl bg-secondary grid place-items-center">
                <FileText className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{d.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {d.file ?? "No file uploaded"}
                </div>
              </div>
              <div
                className="px-2.5 h-7 rounded-full text-[11px] font-medium inline-flex items-center gap-1"
                style={{ background: s.color, color: s.fg }}
              >
                <s.Icon className="size-3" />
                {s.label}
              </div>
              {d.status !== "verified" && (
                <button className="h-9 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold">
                  Upload
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 glass rounded-3xl p-5 flex items-start gap-3">
        <ShieldCheck className="size-5 text-primary mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Until verification is complete, your profile is hidden from pet owners and you cannot
          receive new bookings.
        </p>
      </div>
    </AppShell>
  );
}
