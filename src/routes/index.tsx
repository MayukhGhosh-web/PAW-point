import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PawPrint, Stethoscope, HeartPulse, Sparkles } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/auth" }), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen grid place-items-center px-6 relative overflow-hidden">
      <motion.div
        className="absolute size-[500px] rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="size-24 mx-auto rounded-3xl bg-gradient-to-br from-primary via-[oklch(0.68_0.16_265)] to-[var(--lavender-foreground)] grid place-items-center text-primary-foreground shadow-2xl shadow-primary/40 mb-6"
        >
          <PawPrint className="size-12" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-5xl font-extrabold tracking-tight"
        >
          VetCare
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 text-muted-foreground text-balance max-w-xs mx-auto"
        >
          Trusted veterinary care for every paw, claw, and feather.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-5 mt-10 text-muted-foreground"
        >
          {[Stethoscope, HeartPulse, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              className="size-10 rounded-xl glass grid place-items-center"
            >
              <Icon className="size-4" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <Link
            to="/auth"
            className="text-xs text-muted-foreground hover:text-foreground transition"
          >
            Skip intro →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
