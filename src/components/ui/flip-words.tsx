"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function pickRandom<T>(arr: T[], exclude: T, count: number): T[] {
  const pool = arr.filter((w) => w !== exclude);
  const picked: T[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sequentialIndex = useRef(0);
  const timeoutChain = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Ref mirrors isSpinning synchronously so exit animations read the correct phase
  const isSpinningRef = useRef(false);
  const nextSpinAt = useRef(Date.now() + duration);

  const clearTimeouts = useCallback(() => {
    timeoutChain.current.forEach(clearTimeout);
    timeoutChain.current = [];
  }, []);

  const startSpin = useCallback(() => {
    const nextIndex = (sequentialIndex.current + 1) % words.length;
    sequentialIndex.current = nextIndex;
    const target = words[nextIndex];

    if (prefersReducedMotion) {
      setCurrentWord(target);
      nextSpinAt.current = Date.now() + duration;
      return;
    }

    const spinCount = 3 + Math.floor(Math.random() * 3);
    const intermediates = pickRandom(words, target, spinCount);
    const sequence = [...intermediates, target];

    const delays = sequence.map((_, i) => 50 + i * 40);

    isSpinningRef.current = true;
    setIsSpinning(true);
    let cumulative = 0;
    sequence.forEach((word, i) => {
      cumulative += delays[i];
      const id = setTimeout(() => {
        if (i === sequence.length - 1) isSpinningRef.current = false;
        setCurrentWord(word);
        if (i === sequence.length - 1) {
          setIsSpinning(false);
          nextSpinAt.current = Date.now() + duration;
        }
      }, cumulative);
      timeoutChain.current.push(id);
    });
  }, [words, prefersReducedMotion, duration]);

  // Drift-compensated rest timer
  useEffect(() => {
    if (isSpinning) return;
    const delay = Math.max(0, nextSpinAt.current - Date.now());
    const id = setTimeout(startSpin, delay);
    return () => clearTimeout(id);
  }, [isSpinning, startSpin]);

  useEffect(() => clearTimeouts, [clearTimeouts]);

  const spinning = isSpinningRef.current;

  return (
    <span className="relative inline-grid">
      {/* Invisible sizers so the container matches the widest word */}
      {words.map((w, i) => (
        <span
          key={i}
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
          aria-hidden="true"
        >
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout">
        <motion.span
          aria-live="polite"
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.5 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: spinning ? 0.04 : 0.15 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0, position: "absolute" as const }
              : {
                  opacity: 0,
                  scale: 0.5,
                  position: "absolute" as const,
                  transition: { duration: spinning ? 0.04 : 0.15 },
                }
          }
          className={cn(
            "z-10 inline-block col-start-1 row-start-1 text-left text-neutral-900 dark:text-neutral-100 whitespace-nowrap",
            className,
          )}
          key={currentWord}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
