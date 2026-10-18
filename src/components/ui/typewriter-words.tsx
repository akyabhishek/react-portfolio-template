import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function TypewriterWords({
  words,
  duration = 2000,
  className,
}: {
  words: readonly [string, ...string[]];
  duration?: number;
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const characters = Array.from(words[wordIndex % words.length]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isComplete = characterCount === characters.length;
    const timeout = setTimeout(
      () => {
        if (!isDeleting && isComplete) {
          setIsDeleting(true);
        } else if (isDeleting && characterCount === 0) {
          setWordIndex((index) => (index + 1) % words.length);
          setIsDeleting(false);
        } else {
          setCharacterCount((count) => count + (isDeleting ? -1 : 1));
        }
      },
      !isDeleting && isComplete ? duration : isDeleting ? 35 : 65,
    );

    return () => clearTimeout(timeout);
  }, [
    characterCount,
    characters.length,
    duration,
    isDeleting,
    prefersReducedMotion,
    words.length,
  ]);

  return (
    <span className={cn("relative inline-grid max-w-full align-top", className)}>
      <span className="sr-only">{words[0]}</span>
      {words.map((word, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 min-w-0 break-words px-2"
        >
          {word}
        </span>
      ))}
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 min-w-0 break-words px-2 text-neutral-900 dark:text-neutral-100"
      >
        {prefersReducedMotion
          ? words[0]
          : characters.slice(0, characterCount).join("")}
        {!prefersReducedMotion && (
          <span className="ml-0.5 inline-block h-[1em] animate-pulse border-r-2 border-current align-middle" />
        )}
      </span>
    </span>
  );
}
