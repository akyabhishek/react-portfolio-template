import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "@/components/theme-provider";

export default function GitHubCalendarSection() {
  const { theme } = useTheme();

  const resolvedScheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          delay: 0.08,
        }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
          Activity
        </p>
        <h2 className="text-xl font-bold tracking-tight mb-5">
          GitHub Contributions
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 22,
          delay: 0.16,
        }}
      >
        <GitHubCalendar
          username="akyabhishek"
          blockSize={11}
          blockRadius={4}
          colorScheme={resolvedScheme}
        />
      </motion.div>
    </motion.div>
  );
}
