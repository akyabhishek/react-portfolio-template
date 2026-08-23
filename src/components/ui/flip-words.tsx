"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        aria-live="polite"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 100, damping: 10 }
        }
        exit={
          prefersReducedMotion
            ? { opacity: 0, position: "absolute" as const }
            : {
                opacity: 0,
                y: -40,
                x: 40,
                filter: "blur(8px)",
                scale: 2,
                position: "absolute" as const,
              }
        }
        className={cn(
          "z-10 inline-block relative text-left text-neutral-900 dark:text-neutral-100",
          className,
        )}
        key={currentWord}
      >
        {/* edit suggested by Sajal: https://x.com/DewanganSajal */}
        {prefersReducedMotion
          ? currentWord
          : currentWord.split(" ").map((word, wordIndex) => (
              <motion.span
                key={word + wordIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3,
                  duration: 0.3,
                }}
                className="inline-block whitespace-nowrap"
              >
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={word + letterIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: wordIndex * 0.3 + letterIndex * 0.05,
                      duration: 0.2,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </motion.span>
            ))}
      </motion.div>
    </AnimatePresence>
  );
};
