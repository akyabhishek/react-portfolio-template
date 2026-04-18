import { motion } from "framer-motion";
import { Code2, Wrench, Zap, Sparkles, ShieldCheck, Cloud } from "lucide-react";

const colophonItems = [
  {
    icon: Code2,
    label: "Core Stack",
    value: "React, TypeScript, Vite",
    note: "Fast, type-safe frontend architecture.",
  },
  {
    icon: Sparkles,
    label: "UI System",
    value: "Tailwind CSS + shadcn/ui",
    note: "Reusable components with consistent design language.",
  },
  {
    icon: Zap,
    label: "Motion",
    value: "Framer Motion",
    note: "Subtle transitions to improve flow and hierarchy.",
  },
  {
    icon: Wrench,
    label: "Tooling",
    value: "ESLint + TypeScript config",
    note: "Code quality checks and predictable DX.",
  },
  {
    icon: ShieldCheck,
    label: "Quality",
    value: "Manual QA + responsive checks",
    note: "Optimized for desktop readability.",
  },
  {
    icon: Cloud,
    label: "Deployment",
    value: "Vercel",
    note: "Global edge delivery with simple release flow.",
  },
];

export default function ColophonSection() {
  return (
    <motion.section
      className="mt-12"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
          Colophon
        </p>
        <h2 className="text-xl font-bold tracking-tight">
          How This Site Is Built
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          A quick technical snapshot of the tools, design choices, and workflow
          behind this portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {colophonItems.map(({ icon: Icon, label, value, note }, i) => (
          <motion.div
            key={label}
            className="bg-background hover:bg-muted/30 transition-colors duration-300 p-5 flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </div>
            <p className="text-sm font-semibold leading-snug">{value}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {note}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
