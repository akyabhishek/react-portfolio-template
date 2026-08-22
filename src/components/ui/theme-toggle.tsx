import { motion, AnimatePresence } from "motion/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useState } from "react";
import { useTheme } from "../theme-provider";

const sparkles = Array.from({ length: 6 }, (_, i) => ({
  angle: i * 60,
}));

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [burst, setBurst] = useState(0);

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
    setBurst((b) => b + 1);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative h-8 w-8 rounded-full flex items-center justify-center cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-blue-400 transition-colors"
      aria-label="Toggle theme"
      whileTap={{ scale: 0.75, rotate: 15 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {/* Sparkle burst */}
      <AnimatePresence>
        {burst > 0 && (
          <motion.span
            key={burst}
            className="absolute inset-0 pointer-events-none"
          >
            {sparkles.map(({ angle }, i) => (
              <motion.span
                key={i}
                className={`absolute left-1/2 top-1/2 h-1 w-1 rounded-full ${isDark ? "bg-amber-500" : "bg-blue-400"}`}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 18,
                  y: Math.sin((angle * Math.PI) / 180) * 18,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        className="absolute"
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? -180 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <FiSun size={18} />
      </motion.span>

      <motion.span
        className="absolute"
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 180,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <FiMoon size={18} />
      </motion.span>
    </motion.button>
  );
}
