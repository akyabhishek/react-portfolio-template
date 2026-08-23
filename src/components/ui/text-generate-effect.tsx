"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      prefersReducedMotion
        ? { duration: 0 }
        : { duration: duration ? duration : 1, delay: stagger(0.2) },
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-neutral-600 dark:text-neutral-400 opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-normal", className)}>
      <div className="">
        <div className=" text-neutral-600 dark:text-neutral-400 leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
