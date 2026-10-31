import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CounterState =
  | { status: "loading" }
  | { status: "ready"; total: number }
  | { status: "error" };

export default function PageViewCounter() {
  const [state, setState] = useState<CounterState>({ status: "loading" });
  const [displayedTotal, setDisplayedTotal] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const total = state.status === "ready" ? state.total : null;

  useEffect(() => {
    if (total === null || !isInView || prefersReducedMotion) return;

    const animation = animate(0, total, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (value) => setDisplayedTotal(Math.round(value)),
      onComplete: () => setDisplayedTotal(total),
    });

    return () => animation.stop();
  }, [total, isInView, prefersReducedMotion]);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/page-views", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Page-view request failed (${response.status})`);
        }
        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("totalPageViews" in data) ||
          typeof data.totalPageViews !== "number" ||
          !Number.isSafeInteger(data.totalPageViews) ||
          data.totalPageViews < 0
        ) {
          throw new Error("Invalid page-view response");
        }
        if (active) setState({ status: "ready", total: data.totalPageViews });
      } catch (error: unknown) {
        if (active) {
          console.error("[page-views] Could not load total", error);
          setState({ status: "error" });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void load();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <span
      ref={counterRef}
      className={state.status === "ready"
        ? "mt-2 block whitespace-nowrap text-xs text-muted-foreground sm:mt-0 sm:inline-block"
        : "text-xs text-muted-foreground"}
    >
      {state.status === "ready" && (
        <>
          {" "}
          <span aria-hidden="true" className="mx-2 hidden opacity-50 sm:inline">
            |
          </span>{" "}
          <span role="status" aria-live="polite" aria-atomic="true">
            <span className="sr-only">
              {state.total.toLocaleString()} views
            </span>
            <span aria-hidden="true">
              <span className="tabular-nums">
                {(prefersReducedMotion
                  ? state.total
                  : displayedTotal
                ).toLocaleString()}
              </span>{" "}
              views
            </span>
          </span>
        </>
      )}
    </span>
  );
}
