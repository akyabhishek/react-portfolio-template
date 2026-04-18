import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText, Quote, X } from "lucide-react";

type Principle = {
  id: string;
  title: string;
  detail: string;
};

const principles: Principle[] = [
  {
    id: "01",
    title: "Be brutally honest with yourself",
    detail:
      "Everything starts here. Clarity in decisions, growth, and relationships comes from self-honesty.",
  },
  {
    id: "02",
    title: "Do meaningful work, but do not romanticize it",
    detail:
      "Do what you enjoy and can sustain long-term, then get really good at it. Money follows value, not just passion.",
  },
  {
    id: "03",
    title: "Obsession beats talent if directed well",
    detail:
      "Focused obsession, sustained over time, can outperform talent and privilege.",
  },
  {
    id: "04",
    title: "Consistency is greater than motivation",
    detail:
      "Keep learning daily, even when motivation is low. Consistency compounds.",
  },
  {
    id: "05",
    title: "People stay by choice, not conditions",
    detail:
      "The right people stay through phases, not just comfort, but relationships still need effort.",
  },
  {
    id: "06",
    title:
      "Keep learning, keep hustling, and do not forget to smile along the way",
    detail:
      "Progress should be consistent and ambitious, but joy is what makes the journey sustainable.",
  },
];

export default function PrinciplesValuesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <motion.section
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ type: "spring", stiffness: 230, damping: 24 }}
    >
      <div className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80 mt-2">
          Principles and Values
        </p>
        <h2 className="text-xl font-bold tracking-tight max-w-2xl">
          How I decide, grow, and show up.
        </h2>
        <p className="text-xs text-muted-foreground/80 mt-2">
          Tap any number to reveal the thought behind it.
        </p>
      </div>

      <div className="relative rounded-3xl border border-border/70 bg-gradient-to-b from-background/95 to-muted/20 backdrop-blur-sm overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        {principles.map((principle, index) => {
          const isOpen = openId === principle.id;
          return (
            <motion.div
              key={principle.id}
              className="relative border-b border-border/70 last:border-b-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : principle.id)}
                className="group relative w-full flex items-center justify-between px-5 sm:px-7 md:px-10 py-6 cursor-pointer transition-colors duration-300 hover:bg-foreground/[0.03]"
              >
                <span
                  className={`text-2xl sm:text-3xl font-semibold tabular-nums tracking-tight transition-all duration-300 ${
                    isOpen
                      ? "text-foreground/80"
                      : "text-foreground/25 group-hover:text-foreground/55"
                  }`}
                >
                  {principle.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase border rounded-full px-3 py-1 transition-all duration-300 ${
                    isOpen
                      ? "opacity-100 text-foreground/70 border-foreground/20 bg-foreground/[0.04]"
                      : "opacity-0 group-hover:opacity-100 text-muted-foreground/70 border-border bg-background/40"
                  }`}
                >
                  {isOpen ? (
                    <>
                      <X className="h-3 w-3" />
                      close
                    </>
                  ) : (
                    <>
                      <BookOpenText className="h-3 w-3" />
                      read
                    </>
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-7 md:px-10 pb-8 space-y-3">
                      <Quote className="h-5 w-5 text-foreground/30" />
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug">
                        {principle.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                        {principle.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
