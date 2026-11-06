import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Signal marks, plus the extra punctuation and a single x. */
const DEFAULT_GLYPHS = Array.from("01/·—\\-*#?!~^x:¬§");

/** How often unresolved characters pick a new mark. */
const FRAME_MS = 32;
/** Ignore another hover until the previous pass has settled. */
const REPLAY_MS = 1000;

export interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Full decode length in milliseconds. */
  duration?: number;
  /** Glyphs shown while a character is still unresolved. */
  charset?: string;
  /**
   * `auto` plays when the nearest link or button is hovered or focused.
   * `self` plays from this element directly.
   */
  trigger?: "auto" | "self";
}

function glyphsOf(charset?: string) {
  const glyphs = charset ? Array.from(charset) : DEFAULT_GLYPHS;
  return glyphs.length > 0 ? glyphs : DEFAULT_GLYPHS;
}

function randomGlyph(glyphs: string[], current: string) {
  const index = Math.floor(Math.random() * glyphs.length);
  let next = glyphs[index] ?? current;
  if (glyphs.length > 1 && next === current) {
    next = glyphs[(index + 1) % glyphs.length] ?? next;
  }
  return next;
}

export function ScrambleText({
  text,
  className,
  duration = 550,
  charset,
  trigger = "auto",
}: ScrambleTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastPlayRef = useRef(Number.NEGATIVE_INFINITY);
  const propsRef = useRef({ text, duration, charset, prefersReducedMotion });
  const [display, setDisplay] = useState(text);
  const [running, setRunning] = useState(false);

  propsRef.current = { text, duration, charset, prefersReducedMotion };

  const cancel = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const restore = useCallback(() => {
    cancel();
    setDisplay(propsRef.current.text);
    setRunning(false);
  }, [cancel]);

  useEffect(() => {
    restore();
  }, [text, restore]);

  const play = useCallback(() => {
    const {
      text: label,
      duration: ms,
      charset: glyphs,
      prefersReducedMotion: reduce,
    } = propsRef.current;

    const now = performance.now();
    if (reduce || label.length === 0) {
      restore();
      return;
    }
    if (now - lastPlayRef.current < REPLAY_MS) return;

    cancel();
    lastPlayRef.current = now;
    const original = Array.from(label);
    const pool = glyphsOf(glyphs);
    const shown = original.slice();
    const startedAt = now;
    let lastPaint = 0;
    setRunning(true);

    const tick = (frameNow: number) => {
      const elapsed = frameNow - startedAt;
      const progress = Math.min(elapsed / ms, 1);

      if (frameNow - lastPaint >= FRAME_MS) {
        lastPaint = frameNow;
        const revealed = original.length * progress;
        for (let index = 0; index < original.length; index++) {
          const char = original[index] ?? "";
          if (char === " " || index < revealed) {
            shown[index] = char;
          } else {
            shown[index] = randomGlyph(pool, shown[index] ?? char);
          }
        }
        setDisplay(shown.join(""));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      setDisplay(label);
      setRunning(false);
      frameRef.current = null;
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [cancel, restore]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || prefersReducedMotion) {
      if (prefersReducedMotion) restore();
      return;
    }

    const parent = node.closest(
      "a, button, [role='button'], [role='link']",
    );
    const target =
      trigger === "self" ? node : ((parent as HTMLElement | null) ?? node);

    const onFocus = () => {
      if (target.matches(":hover")) return;
      play();
    };
    target.addEventListener("pointerenter", play);
    target.addEventListener("focus", onFocus);

    return () => {
      target.removeEventListener("pointerenter", play);
      target.removeEventListener("focus", onFocus);
      cancel();
    };
  }, [cancel, play, prefersReducedMotion, restore, trigger]);

  useEffect(() => cancel, [cancel]);

  return (
    <span
      ref={rootRef}
      className={cn(
        "relative inline-block font-variant-numeric tabular-nums",
        className,
      )}
      data-scramble={running ? "running" : "idle"}
    >
      <span className="sr-only">{text}</span>
      <span className="invisible" aria-hidden="true">
        {text || "\u200b"}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
      >
        {display}
      </span>
    </span>
  );
}
